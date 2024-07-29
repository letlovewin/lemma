<script>
    import "../app.css";
    import { browser } from "$app/environment";
    import { goto, invalidate } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;
    $: ({ session, supabase } = data);

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth");
            }
        });

        return () => data.subscription.unsubscribe();
    });
</script>

<div class="flex flex-col h-screen justify-between">
    <header>
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <a href="/" class="btn btn-ghost text-xl"> lemma </a>
            </div>
            <div class="flex-none">
                <button
                    class="btn btn-primary btn-sm"
                    on:click={() => {
                        if (browser) {
                            goto("/signin");
                        }
                    }}
                >
                    Sign in
                </button>
            </div>
        </div>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer class="text-center mb-5">
        <a href="https://github.com/letlovewin/lemma">Github Repo</a> |
        <a href="https://fediverse.info/">Fediverse</a>
    </footer>
</div>
