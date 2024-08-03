import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, params, request, locals: { supabase } }) => {
    let uid = params.uid;

    const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select()
        .eq('display_name', uid)
        .maybeSingle()

    if (usernameData == null) { return new Response(null, { status: 400 }) }

    // generate the outbox ad hoc if it doesn't already exist.
    if (usernameData.posts == null) {
        const supabaseAdmin = createClient(VITE_SUPABASE_URL,SERVICE_ROLE_KEY);
        let new_outbox = {
            "@context": "https://www.w3.org/ns/activitystreams",
            "id": `https://${url.hostname}/@${uid}/outbox`,
            "type": "OrderedCollection",
            "summary": `${usernameData.bio}`,
            "totalItems": 0,
            "orderedItems": []
        }
        const { error } = await supabaseAdmin
            .from('profiles')
            .update({ posts: new_outbox })
            .eq('display_name', uid)

        if (error) { return new Response(null, { status: 500 }) }

        return new Response(JSON.stringify(new_outbox), { status: 200 });
    }
    return new Response(usernameData.posts, { status: 200 });
};