import type { Actions } from './$types'


export const actions: Actions = {
    reset: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://lemma-swart.vercel.app/password-reset',
        })
        if(error) {
            
        } else {
            return { success: true, message: "Reset email has been sent." }
        }
        
    }
}