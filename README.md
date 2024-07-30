
![Logo](https://github.com/letlovewin/lemma/blob/main/static/favicon.png?raw=true)


# lemma

A federated alternative to Facebook Marketplace.


## Deployment (Work In Progress)

First, clone the repository

```bash
git clone https://github.com/letlovewin/lemma.git
cd lemma
```

Next, install all dependencies
```bash
npm install
```

Next, you have to set up a [Supabase](https://supabase.com) account, and create a new project. From here, you should have a `SUPABASE_URL`, a `SUPABASE_KEY`, and a `SERVICE_ROLE_KEY`. If you don't see `SERVICE_ROLE_KEY`, go to your project settings -> API, and copy the `service_role` field.

Next, create a .env.local file, and populate it with your `SUPABASE_URL` and `SUPABASE_KEY`:

```bash
touch .env.local
echo VITE_SUPABASE_URL="your SUPABASE_URL here" >> .env.local
echo VITE_SUPABASE_KEY="your SUPABASE_KEY here" >> .env.local
echo SERVICE_ROLE_KEY="your SERVICE_ROLE_KEY here" >> .env.local
```

From here, there are two options: hosting the website using your own machinery, or deploying the website using [Vercel](https://vercel.com). I'll give a tutorial for both.

### Vercel
Create an account on [Vercel](https://vercel.com). Then go back to your `lemma/` directory, and run 

```bash
npm install vercel-cli
vercel login
```

and follow the prompt.

Next, create a new Vercel project, and name it however you want. Create two new environment variables in the project.

`VITE_SUPABASE_URL` should be your actual Supabase URL. `VITE_SUPABASE_KEY` should be your actual Supabase key. `SERVICE_ROLE_KEY` should be your service_role key.

Now that that's finished, run

```bash
vercel link
```
and follow the instructions to link `lemma/` to your project on Vercel.