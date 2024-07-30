<script lang="ts">
    import "../app.css";
    import { browser } from "$app/environment";
    import { goto, invalidate } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;
    $: ({ session, supabase } = data);
    let email = "";
    let redirect_link = "/";

    if (data.user != null) {
        email = data.user.email![0];
        redirect_link = "/users/" + data.user.user_metadata.display_name;
        
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
                <a href="/" class="btn btn-ghost text-xl"> lemma </a>
            </div>
            <div class="flex-none">
                {#if data.user === null}
                    <a
                        role="button"
                        class="btn btn-primary btn-sm"
                        href="/signin">Sign in</a
                    >
                {:else if data.user != undefined}
                    <div class="dropdown dropdown-end me-2">
                        <div
                            tabindex="0"
                            role="button"
                            class="btn btn-ghost rounded-btn"
                        >
                            More
                        </div>
                        <ul
                            class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
                        >
                            <li>
                                <a href="/account">Settings</a>
                            </li>
                            <li>
                                <button
                                    on:click={() => {
                                        signOut();
                                    }}>Sign out</button
                                >
                            </li>
                        </ul>
                    </div>
                    <div class="avatar placeholder">
                        <div
                            class="bg-neutral text-neutral-content w-12 rounded-full"
                        >
                            <a role="button" href={redirect_link}
                                ><span>{email}</span></a
                            >
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer class="text-center mb-5">
        <a class="link-sexy" href="https://github.com/letlovewin/lemma"
            >Github</a
        >
        |
        <a class="link-sexy" href="https://fediverse.info/">Fediverse</a>
    </footer>
</div>
