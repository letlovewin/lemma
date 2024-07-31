import { redirect, fail } from '@sveltejs/kit'

import type { Actions } from './$types'


export const actions: Actions = {
    reset: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const password = formData.get('password') as string

        const { data, error } = await supabase.auth.updateUser({
            password: password
        })
        if(error) {
            console.log(error)
        } else {
            redirect(303,'/feed')
        }

    },
}