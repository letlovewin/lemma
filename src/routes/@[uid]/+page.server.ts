import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'
import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    const uid = params.uid;
    // console.log("UID: " + uid);

    const { data: usernameData, error: usernameError } = await supabase
        .from('profiles')
        .select()
        .eq('display_name', uid)
        .maybeSingle()

    if(usernameData == null) {
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
            profile_photo: data.user.user_metadata.profile_photo_url
        }
    }
}