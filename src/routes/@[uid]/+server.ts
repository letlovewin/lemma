/*
{
    "@context": ["https://www.w3.org/ns/activitystreams", { "@language": "en- US" }],
    "type": "Person",
    "id": `https://${url.hostname}/@${uid}`,
    "outbox": `https://${url.hostname}/@${uid}/outbox`,
    "following": `https://${url.hostname}/@${uid}/following`,
    "followers": `https://${url.hostname}/@${uid}/followers`,
    "inbox": `https://${url.hostname}/@${uid}/inbox`,
    "preferredUsername": `${uid}`,
    "summary": `${usernameData.bio}`,
    "icon": [
      //tbd add this later
    ],
    "publicKey": {
      "@context": "https://w3id.org/security/v1",
      "@type": "Key",
      "id": "https://paul.kinlan.me/paul#main-key",
      "owner": "https://paul.kinlan.me/paul",
      "publicKeyPem": process.env.ACTIVITYPUB_PUBLIC_KEY
    }
  }
*/

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

    const { data: usernameKeyData, error: usernameKeyError } = await supabaseAdmin.auth.admin.getUserById(usernameData.id)

    return new Response(
        JSON.stringify({
            "@context": ["https://www.w3.org/ns/activitystreams", {
                "toot": "http://joinmastodon.org/ns#",
                "manuallyApprovesFollowers": "as:manuallyApprovesFollowers",
                "alsoKnownAs": {
                    "@id": "as:alsoKnownAs",
                    "@type": "@id"
                },
                "movedTo": {
                    "@id": "as:movedTo",
                    "@type": "@id"
                },
                "indexable": "toot:indexable",
                "suspended": "toot:suspended"
            }, { "@language": "en- US" }],
            "type": "Person",
            "id": `https://${url.hostname}/@${uid}`,
            "outbox": `https://${url.hostname}/@${uid}/outbox`,
            "following": `https://${url.hostname}/@${uid}/following`,
            "followers": `https://${url.hostname}/@${uid}/followers`,
            "inbox": `https://${url.hostname}/@${uid}/inbox`,
            "preferredUsername": `${uid}`,
            "summary": `${usernameData.bio}`,
            "icon": [
                //tbd add this later
            ],
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