import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'
import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const uid = params.uid;
    // console.log("UID: " + uid);
    if (uid.split("@").length > 1) {
        const content = uid.split("@");
        console.log(content[0])
        console.log(content[1])
        const response = await fetch(`https://${content[1]}/.well-known/webfinger?resource=acct:${content[0]}@${content[1]}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        const webfinger = await response.json();

        if(response.status != 200) { redirect(303,'/feed') }
        console.log(webfinger);

        let actorURL = '';

        for(let i = 0; i < webfinger.links.length; i++) {
            if(webfinger.links[i].rel == 'self') {
                actorURL = webfinger.links[i].href;
                break;
            }
        }

        if (actorURL == '') { redirect(303,'/feed') } // Something wrong with the webfinger

        const actorResponse = await fetch(actorURL,{
            method: 'GET',
            headers: {
                "content-type": `application/activity+json`,
            }
        })
        console.log(actorURL)
        const actorContent = await actorResponse.json();


    } else {
        const { data: usernameData, error: usernameError } = await supabase
            .from('profiles')
            .select()
            .eq('display_name', uid)
            .maybeSingle()

        if (usernameData == null) {
            redirect(303, '/feed');
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
            redirect(303, '/feed');
        }

        return {
            userInformation: {
                display_name: data.user.user_metadata.display_name,
                uuid: uid,
                bio: data.user.user_metadata.bio,
                profile_photo: data.user.user_metadata.profile_photo_url,
                name: data.user.user_metadata.name,
            }
        }
    }

}