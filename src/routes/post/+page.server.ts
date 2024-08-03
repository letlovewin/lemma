import { redirect, fail } from '@sveltejs/kit'
import type { Actions } from './$types'
import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'

/*
return fail(400, {
                invalid: true,
                message: "Bio must be greater than 2 characters and at most 300 characters"
            });
*/

export const actions: Actions = {
    post: async ({ url,request, locals: { supabase } }) => {
        const formData = await request.formData()

        let bio = formData.get('bio');
        let name = formData.get('name');
        let price = formData.get('price');
        let contactInfo = formData.get('contact-info');
        let photo = formData.get('photo-upload');

        if (String(bio).length > 300) { return fail(400, { invalid: true, message: "Additional information must be lesser than 300 characters" }) }
        if (String(name).length > 50) { return fail(400, { invalid: true, message: "Name can't be longer than 50 characters" }) }
        if (String(contactInfo).length > 100) { return fail(400, { invalid: true, message: "Contact information can't be longer than 100 characters" }) }
        if (Number(price) < 0) { return fail(400, { invalid: true, message: "Price can't be lesser than 0" }) }

        let supabaseAdmin = createClient(VITE_SUPABASE_URL, SERVICE_ROLE_KEY);

        let user = await supabase.auth.getUser();
        if (user.data.user == null) { redirect(303, '/') }
        let uid = user.data.user.id;
        let user_metadata = user.data.user.user_metadata;
        const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select()
        .eq('display_name', uid)
        .maybeSingle()

        if(usernameData.posts == null) {
            let new_outbox = {
                "@context": "https://www.w3.org/ns/activitystreams",
                "id": `https://${url.hostname}/@${uid}/outbox`,
                "type": "OrderedCollection",
                "summary": `${user_metadata.bio}`,
                "totalItems": 0,
                "orderedItems": []
            }
            const { error } = await supabaseAdmin
                .from('profiles')
                .update({ posts: new_outbox })
                .eq('display_name', uid)
        } else {
            let outbox = usernameData.outbox;
            let posts = outbox.orderedItems;
            let totalItems = outbox.totalItems;
            
        }

        
    },
}