
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

You have to set up your Supabase database as well. First, run

```SQL
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  display_name text,
  bio text,

  primary key (id)
);

alter table public.profiles enable row level security;
```

in the SQL editor. After that's finished, run

```SQL
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, bio)
  values (new.id, new.raw_user_meta_data ->> 'display_name', new.raw_app_meta_data ->> 'bio');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```
Now, back to our `lemma/` directory. Create a .env.local file, and populate it with your `SUPABASE_URL` and `SUPABASE_KEY`:

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

After you've finished that, run

```bash
vercel deploy
```

to deploy your instance. 

**NOTE**: This is NOT complete. I am writing this tutorial alongside whatever development I'm doing. At this point, this is what you have to do if you want to host a clone of this website, sans the ability to post, interact with other users, or even be connected to the Fediverse. Once I implement those features in this repo, I'll add more instructions for that.