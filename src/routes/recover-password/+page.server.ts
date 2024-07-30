import { generate, count } from "random-words"; // wasn't going to use a random string of alphanumeric characters for uid, i think it looks ugly

import { redirect, fail } from '@sveltejs/kit'
import { AuthApiError } from "@supabase/supabase-js";

import type { Actions } from './$types'


export const actions: Actions = {
    reset: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/password-reset',
        })
        if(error) {
            
        } else {
            return { success: true, message: "Reset email has been sent." }
        }
        
    }
}