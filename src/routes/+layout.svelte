<script lang="ts">
    import "../app.css";
    import { browser } from "$app/environment";
    import { goto, invalidate } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;
    $: ({ session, supabase } = data);
    let email = '';
    let redirect_link = '/';

    if(data.user != null) {
        if(data.user.email != undefined) {
            email = data.user.email[0];
        }
    }

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth");
            }

            
        });

        return () => data.subscription.unsubscribe();
    });

    async function signOut() {
        const { error } = await supabase.auth.signOut();
    }
</script>

<div class="flex flex-col h-screen justify-between">
    <header>
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <a href={redirect_link} class="btn btn-ghost text-xl"> lemma </a>
            </div>
            <div class="flex-none">
                {#if data.user === null}
                    <a role="button" class="btn btn-primary btn-sm" href="/signin">Sign in</a>
                {:else if data.user != undefined}
                    <div class="avatar placeholder">
                        <div
                            class="bg-neutral text-neutral-content w-12 rounded-full"
                        >
                            <a role="button" href="/feed"><span>{email}</span></a>
                        </div>
                    </div>
                    <div class="divider divider-horizontal"></div>
                    <button
                        class="btn btn-primary btn-sm"
                        on:click={() => {
                            signOut();
                        }}
                    >
                        Sign out
                    </button>
                {/if}
            </div>
        </div>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer class="text-center mb-5">
        <a class="link" href="https://github.com/letlovewin/lemma"
            >Github Repo</a
        >
        |
        <a class="link" href="https://fediverse.info/">Fediverse</a>
    </footer>
</div>
