<script lang="ts">
    import "../app.css";
    import { browser } from "$app/environment";
    import { goto, invalidate } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;
    $: ({ session, supabase } = data);
    let email = "";
    let redirect_link = "/";
    let home_redirect_link = "/";
    let photo = data.user?.user_metadata.profile_photo_url;
    let display_name = data.user?.user_metadata.display_name;

    let instance_name = "";

    if (data.user != null) {
        email = data.user.email![0];
        redirect_link = "/@" + data.user.user_metadata.display_name;
    }

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate("supabase:auth");
            }

            instance_name = window.location.host;
        });

        return () => data.subscription.unsubscribe();
    });

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        goto("/");
    }
</script>

<div class="flex flex-col h-screen justify-between">
    <header>
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <a href={home_redirect_link} class="btn btn-ghost text-xl">
                    {instance_name}
                </a>
            </div>

            <div class="flex-none">
                {#if data.user === null}
                    <a
                        role="button"
                        class="btn btn-primary btn-sm"
                        href="/signin">Sign in</a
                    >
                {:else if data.user != undefined}
                    <a href={redirect_link} class="me-2">
                        {#if photo === ""}
                        <div class="avatar placeholder">
                            <div
                                class="bg-neutral text-neutral-content w-12 rounded-xl"
                            >
                                <span>{email}</span>
                            </div>
                        </div>
                        {:else}
                        <div class="avatar">
                            <div class="w-12 rounded-xl">
                                <img
                                    src={photo}
                                    alt="{display_name}'s profile photo"
                                />
                            </div>
                        </div>
                        {/if}
                    </a>
                    <details class="dropdown dropdown-end">
                        <summary class="btn btn-ghost m-1"
                            ><svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="inline-block h-5 w-5 stroke-current"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg></summary
                        >
                        <ul
                            class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        >
                            <li>
                                <a href="/post">Make a post</a>
                            </li>
                            <li>
                                <a href="/users">Search users</a>
                            </li>
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
                    </details>
                {/if}
            </div>
        </div>
    </header>
    <main>
        <slot></slot>
    </main>
    <footer class="text-center pb-5">
        <a class="link-sexy" href="https://github.com/letlovewin/lemma"
            >Github</a
        >
        |
        <a class="link-sexy" href="https://fediverse.info/">Fediverse</a>
    </footer>
</div>
