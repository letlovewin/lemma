import { redirect, fail } from '@sveltejs/kit'
import { AuthApiError } from "@supabase/supabase-js";

import type { Actions } from './$types'

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    if(username.length > 20 || username.length <= 1) {
      return fail(400, {
        error: "You're being rate limited.",
        email: email,
        invalid: true,
        message: "Username must be less than 20 characters and more than 1 character long."
      });
    }

    const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: username, bio: "New user...", profile_photo_url: "" } } })
    if (error) {
      // console.error(error.code)
      if (error instanceof AuthApiError) {
        return fail(400, {
          error: "You're being rate limited.",
          email: email,
          invalid: true,
          message: error.message
        });
      }

      return fail(500, {
        message: 'Server error. Try again later.'
      });

    } else {
      redirect(303, '/signup/verify')
    }
  },
}