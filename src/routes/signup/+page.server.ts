import { generate, count } from "random-words"; // wasn't going to use a random string of alphanumeric characters for uid, i think it looks ugly

import { redirect, fail } from '@sveltejs/kit'
import { AuthApiError } from "@supabase/supabase-js";

import type { Actions } from './$types'
import type { QueryData, QueryError, QueryResult } from "@supabase/supabase-js";

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    const { error } = await supabase.auth.signUp({ email, password, options: { data: { display_name: username, } } })
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
      const { error } = await supabase
        .from('users')
        .insert({ 
          display_name: username,
          bio: "",
          uid: (await supabase.auth.getUser()).data.user?.id, 
        })
      redirect(303, '/signup/verify')
    }
  },
}