import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'
import { createClient } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ params, url, locals: { supabase } }) => {
    let status: any = url.searchParams.get("v");

    if (status == null) { status = false } else { status = Boolean(status) } // this is to remind the user to check their email after signing up.

    if (!(await supabase.auth.getSession()).data.session) {
        return {
            status: status,
            data: null
        }
    }

    const { data, error } = await supabase
        .from('posts')
        .select()
        .limit(20)

    if (data!.length==0) {
        return {
            status: false,
            content: null
        }
    }

    for (const item of data!) {
        const { data } = supabase
            .storage
            .from('post_photos')
            .getPublicUrl(`${item.id}/photo.jpeg`)
        item.photo_url = data.publicUrl;
    }

    return {
        status: false,
        content: data
    }
}