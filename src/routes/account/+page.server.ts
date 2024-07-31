import { redirect, fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import type { Actions } from './$types'
import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private'
import { createClient } from '@supabase/supabase-js'

export const actions: Actions = {
    save: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()

        const bio = formData.get('bio');

        if (String(bio).length <= 2 || String(bio).length >= 300) {
            return fail(400, {
                error: "You're being rate limited.",
                invalid: true,
                message: "Bio must be greater than 2 characters and at most 300 characters"
            });
        }

        let supabaseAdmin = createClient(VITE_SUPABASE_URL, SERVICE_ROLE_KEY);

        let user = await supabase.auth.getUser();
        if (user.data.user == null) { redirect(303, '/') }
        let uid = user.data.user.id;
        let user_metadata = user.data.user.user_metadata;

        const { data: databaseData, error: databaseError } = await supabaseAdmin
            .from('profiles')
            .update({ bio: bio })
            .eq('id', uid)
        const { data: userData, error: userError } = await supabase.auth.updateUser({
            data: {
                bio: bio,
                display_name: user_metadata.display_name,
                email: user.data.user.email,
                profile_photo_url: user_metadata.profile_photo_url,
            }
        })

        if (userError) {
            return fail(500, {
                message: 'Server error. Try again later.'
            });
        }


    },
}