/*
    Actor
*/

import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params, request, locals: { supabase } }) => {

    const supabaseAdmin = createClient(VITE_SUPABASE_URL, SERVICE_ROLE_KEY);

    let uid = params.uid

    const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select()
        .eq('display_name', uid)
        .maybeSingle()

    if (usernameData == null) { return new Response(null, { status: 400 }) };

    const { data: usernameKeyData, error: usernameKeyError } = await supabaseAdmin.auth.admin.getUserById(usernameData.id)

    console.log(usernameKeyData.user?.user_metadata.name);

    return new Response(
        JSON.stringify({
            "@context": ["https://www.w3.org/ns/activitystreams", { "@language": "en- US" }],
            "type": "Person",
            "id": `https://${url.hostname}/@${uid}`,
            "outbox": `https://${url.hostname}/@${uid}/outbox`,
            "following": `https://${url.hostname}/@${uid}/following`,
            "followers": `https://${url.hostname}/@${uid}/followers`,
            "inbox": `https://${url.hostname}/@${uid}/inbox`,
            "url": `https://${url.hostname}/@${uid}`,
            "preferredUsername": `${uid}`,
            "name": `${usernameKeyData.user?.user_metadata.name}`,
            "summary": `${usernameData.bio}`,
            "icon": {
                "type": "Image",
                "mediaType": "image/*",
                "url": `${usernameKeyData.user?.user_metadata.profile_photo_url}`
            },
            "publicKey": {
                "id": `https://${url.hostname}/@${uid}#main-key`,
                "owner": `https://${url.hostname}/@${uid}`,
                "publicKeyPem": `${usernameKeyData.user?.user_metadata.actorPublicKey}`
            }
        })
        , {
            status: 200, headers: new Headers({
                "content-type": `application/activity+json`,
                "accept": `application/ld+json`
            }),
        },
    );

};