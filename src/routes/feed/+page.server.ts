import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'
import { createClient } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ params, url, locals: { supabase } }) => {
    let status : any = url.searchParams.get("v");
    
    if(status == null) { status = false } else { status = Boolean(status) } // this is to remind the user to check their email after signing up.

    return {
        status: status
    }
}