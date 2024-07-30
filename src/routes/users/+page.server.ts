

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'
import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ params, url, locals: { supabase } }) => {
    const supabaseAdmin = createClient(VITE_SUPABASE_URL, SERVICE_ROLE_KEY, { // TODO: clean this up. i don't think this is the proper way to do this lol!
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    let page = url.searchParams.get("p");
    if(page == null) { page = "1" }
    // console.log(page);
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers({
        page: Number(page),
        perPage: 10
    })
    //console.log({users});
    // we only want id and some stuff from user_metadata
    let userDump = [];
    for(let i = 0; i < users.length; i++) {
        let curr_user = users[i];
        userDump.push({
            id: curr_user.id,
            display_name: curr_user.user_metadata.display_name,
            profile_photo_url: curr_user.user_metadata.profile_photo_url,
        })
    }
    return {
        userInformation: userDump
    }
}