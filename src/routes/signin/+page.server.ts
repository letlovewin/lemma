import { fail, redirect } from '@sveltejs/kit'
import { AuthApiError } from '@supabase/supabase-js'

import type { Actions } from './$types'

export const actions: Actions = {
  signin: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        return fail(400, {
          error: 'Invalid credentials',
          email: email,
          invalid: true,
          message: error.message
        });
      }
      return fail(500, {
        message: 'Server error. Try again later.'
      });
    } else {
      redirect(303, '/feed')
    }
  },
}