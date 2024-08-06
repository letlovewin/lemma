import { redirect, fail } from '@sveltejs/kit'
import type { Actions } from './$types'
import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'

export const actions: Actions = {
    post: async ({ url, request, locals: { supabase } }) => {
        const formData = await request.formData()

        let bio = formData.get('bio');
        let price = formData.get('price');
        let alt = formData.get('alt');
        let photo = formData.get('photo-upload') as File;

        if (String(bio).length > 300) { return fail(400, { invalid: true, message: "Additional information must be lesser than 300 characters" }) }
        if (Number(price) < 0) { return fail(400, { invalid: true, message: "Price can't be lesser than 0" }) }
        if (String(alt).length < 0) { return fail(400, { message: "Must include alt text" }) };
        if (String(alt).length > 100) { return fail(400, { message: "Alt text must be lesser than 100 characters" }) }
        if (photo.size == 0) { return fail(400, { invalid: true, message: "Must include a photo" }) }

        let supabaseAdmin = createClient(VITE_SUPABASE_URL, SERVICE_ROLE_KEY);

        let user = await supabase.auth.getUser();
        if (user.data.user == null) { redirect(303, '/') }

        let new_post = {
            owner: user.data.user.id,
            display_name: user.data.user.user_metadata.display_name,
            description: `${bio}`,
            price: Number(price),
            sold: false,
            alt_text: alt
        }

        const { data: writeData, error: writeError } = await supabaseAdmin.from('posts').insert(new_post).select();

        if (writeError) { console.log(writeError); return fail(500, { message: "Server error. Try again later" }) }

        const { data: fileWriteData, error: fileWriteError } = await supabaseAdmin
            .storage
            .from('post_photos')
            .upload(`${writeData[0].id}/photo.jpeg`, photo, {
                cacheControl: '3600',
                upsert: false
            })

        let photoURL = await supabaseAdmin.storage.from('post_photos').getPublicUrl(`${writeData[0].id}/photo.jpeg`).data.publicUrl;

        let new_note = {
            "@context": "https://www.w3.org/ns/activitystreams",
            "id": `https://${url.hostname}/post/${writeData[0].id}`,
            "type": "Note",
            "content": `${new_post.description}`,
            "url": `https://${url.hostname}/post/${writeData[0].id}`,
            "attributedTo": `https://${url.hostname}/@${new_post.display_name}`,
            "to": [
                "https://www.w3.org/ns/activitystreams#Public"
            ],
            "cc": [],
            "published": `${writeData[0].created_at}`,
            "tag": [],
            "replies": {},
            "attachment": [
                {
                    "type": "Document",
                    "mediaType": "image/jpeg",
                    "url": `${photoURL}`,
                    "name": `${alt}`,
                }
            ]
        }

        const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select()
        .eq('display_name', new_post.display_name)
        .maybeSingle()

        let outbox = usernameData.posts;
        outbox.orderedItems.push(new_note);
        outbox.totalItems += 1;

        console.log(outbox)

        const { data: databaseData, error: databaseError } = await supabaseAdmin
            .from('profiles')
            .update({ posts: outbox })
            .eq('display_name', new_post.display_name)
    },
}