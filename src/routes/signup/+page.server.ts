import { redirect, fail } from '@sveltejs/kit'
import { AuthApiError } from "@supabase/supabase-js";
import type { Actions } from './$types'

const crypto = await import('node:crypto');

export const actions: Actions = {
  signup: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    const usernameRegex = /^[a-zA-Z0-9]+$/

    if (username.length > 20 || username.length <= 1 ) {
      return fail(400, {
        email: email,
        invalid: true,
        message: "Username must be less than 20 characters and more than 1 character long"
      });
    }

    if(!username.match(usernameRegex)) {
      return fail(400, {
        email: email,
        invalid: true,
        message: "Username can't have any spaces and must be alphanumeric"
      });
    }

    const { data: usernameData, error: usernameError } = await supabase
      .from('profiles')
      .select()
      .eq('display_name', username)
      .maybeSingle()

    if (usernameError) {
      console.log(usernameError)
      return fail(500, {
        email: email,
        invalid: true,
        message: "Server error. Try again later"
      });
    }
    console.log(usernameData);
    if (usernameData != null) {
      return fail(400, {
        email: email,
        invalid: true,
        message: "Username already exists"
      });
    }

    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 2048 })

    const { error } = await supabase.auth.signUp({
      email, password, options: {
        data: {
          display_name: username, bio: "New user...", profile_photo_url: "", actorPublicKey: publicKey.export({
            type: "pkcs1",
            format: "pem",
          }), actorPrivateKey: privateKey.export({
            type: "pkcs1",
            format: "pem",
          })
        }
      }
    })
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