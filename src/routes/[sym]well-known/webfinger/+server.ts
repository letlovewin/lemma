/*
    This is the implementation of the webfinger protocol.
*/

import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params, request, locals: { supabase } }) => {
    let resource = await url.searchParams.get("resource");
    if (resource == null) { return new Response(null, { status: 400 }) }
    let contents = resource?.split(":");
    if (contents![0] != 'acct') {
        return new Response(null, { status: 400 })
    }
    if (contents[1].split('@')[1] != url.hostname) {
        return new Response(null, { status: 400 }) //contacting the wrong server bud
    }
    let uid = contents[1].split('@')[0];

    const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select()
        .eq('display_name', uid)
        .maybeSingle()

    if (usernameData != null) {
        return new Response(
            JSON.stringify({
                subject: `acct:${url.hostname}/actor/${uid}`,
                aliases: [
                    `https://${url.hostname}/@${uid}`
                ],
                links: [
                    {
                        rel: "self", // this should point to the api endpoint for the actor object
                        type: "application/activity+json",
                        href: `https://${url.hostname}/@${uid}`
                    },
                    {
                        rel: "http://webfinger.net/rel/profile-page", // this is what a human should look at if they want more info about the person that's been referenced
                        type: "text/html",
                        href: `https://${url.hostname}/@${uid}`
                    }
                ]
            })
            , {
                status: 200, headers: new Headers({
                    "content-type": `application/jrd+json`,
                }),
            },
        );
    }

    return new Response(null, { status: 400 })

};