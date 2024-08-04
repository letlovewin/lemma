import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'
import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import sanitizeHtml from 'sanitize-html';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const uid = params.uid;
    // console.log("UID: " + uid);
    if (uid.split("@").length > 1) {
        const content = uid.split("@");

        const response = await fetch(`https://${content[1]}/.well-known/webfinger?resource=acct:${content[0]}@${content[1]}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.status != 200) { return { userInformation: null } }

        const webfinger = await response.json();

        let actorURL = '';

        for (let i = 0; i < webfinger.links.length; i++) {
            if (webfinger.links[i].rel == 'self') {
                actorURL = webfinger.links[i].href;
                break;
            }
        }

        if (actorURL == '') { return { userInformation: null } } // Something wrong with the webfinger

        const actorResponse = await fetch(actorURL, {
            method: 'GET',
            headers: {
                "accept": `application/activity+json`,
            }
        })

        const actorContent = await actorResponse.json();

        // Some instances put HTML in their summaries and not plain text, which doesn't play well with the set up on this instance.
        const sanitizedDisplayName = sanitizeHtml(actorContent.preferredUsername);
        const sanitizedSummary = sanitizeHtml(actorContent.summary);
        const sanitizedName = sanitizeHtml(actorContent.name);

        const outboxResponse = await fetch(actorContent.outbox, { method: 'GET', headers: { accept: `application/activity+json` } })
        let outboxContent = await outboxResponse.json();

        if(outboxContent.first) { // meaning the user is from an instance with a paginated outbox..
            let posts;

            const postsResponse = await fetch(outboxContent.first, {
                method: 'GET',
                headers: {
                    "accept": `application/activity+json`,
                }
            })
            posts = await postsResponse.json()
            outboxContent = posts;
        }

        let profileURL = null;
        for (let i = 0; i < webfinger.links.length; i++) {
            if (webfinger.links[i].rel == 'http://webfinger.net/rel/profile-page') {
                profileURL = webfinger.links[i].href;
                break;
            }
        }

        return { // TODO load posts from other instances on this instance. not right now though
            userInformation: {
                display_name: sanitizedDisplayName,
                bio: sanitizedSummary,
                profile_photo: actorContent.icon.url,
                name: sanitizedName,
                instance: content[1],
                outbox: outboxContent,
                profileURL: profileURL
            }
        }

    } else {
        const { data: usernameData, error: usernameError } = await supabase
            .from('profiles')
            .select()
            .eq('display_name', uid)
            .maybeSingle()

        if (usernameData == null) {
            return { userInformation: null }
        }
        const supabaseAdmin = createClient(VITE_SUPABASE_URL, SERVICE_ROLE_KEY, { // TODO: clean this up. i don't think this is the proper way to do this lol!
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })

        const { data, error } = await supabaseAdmin.auth.admin.getUserById(usernameData.id);

        if (error) {
            console.log(error)
            redirect(303, '/');
        }

        const { data: outboxData, error: outboxError } = await supabase
            .from('profiles')
            .select()
            .eq('display_name', uid)
            .maybeSingle()

        return {
            userInformation: {
                display_name: data.user.user_metadata.display_name,
                bio: data.user.user_metadata.bio,
                profile_photo: data.user.user_metadata.profile_photo_url,
                name: data.user.user_metadata.name,
                instance: null,
                outbox: outboxData.posts,
            }
        }
    }

}