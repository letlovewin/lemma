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

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params, request, locals: { supabase } }) => {

    let uid = params.uid

    const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select()
        .eq('display_name', uid)
        .maybeSingle()

    console.log(usernameData)

    return new Response(
        JSON.stringify({
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
        })
        , {
            status: 200, headers: new Headers({
                "content-type": `application/activity+json`,
            }),
        },
    );

};