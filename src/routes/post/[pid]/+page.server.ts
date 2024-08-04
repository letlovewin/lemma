import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types'
import { SERVICE_ROLE_KEY, VITE_SUPABASE_URL } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import sanitizeHtml from 'sanitize-html';

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
    let pid = params.pid;

    const { data: postData, error: postError } = await supabase
        .from('posts')
        .select()
        .eq('id', pid)
        .maybeSingle()

    if (!postData) { return { post_content: null } }

    if (postError) { return { post_content: null } }

    let post_content = postData;
    const { data } = supabase
        .storage
        .from('post_photos')
        .getPublicUrl(`${postData.id}/photo.jpeg`)
    post_content.photo_url = data.publicUrl;

    return {post_content};
}