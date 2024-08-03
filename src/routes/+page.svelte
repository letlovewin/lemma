<script lang="ts">
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;
    let verification_modal: any;
    onMount(() => {
        if (data.status == true) {
            verification_modal.showModal();
        }
    });
</script>

<svelte:head>
    <title>lemma</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

<div class="container mx-auto p-5">
    {#if data.user == null}
        <div class="mt-10">
            <img
                src={"/favicon.png"}
                alt="Lemma Icon"
                style="width:128px;height:128px;"
                class="mx-auto mb-5"
            />
            <h1
                class="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center"
            >
                A federated alternative to Facebook Marketplace.
            </h1>
        </div>
        <div class="flex justify-center gap-5 mt-5">
            <a role="button" class="btn btn-primary w-24" href="/signup"
                >Sign up</a
            >
            <a role="button" class="btn btn-neutral w-24" href="/about"
                >Learn more</a
            >
        </div>
        <br />
    {:else}
        <dialog
            id="verification_modal"
            class="modal"
            bind:this={verification_modal}
        >
            <div class="modal-box">
                <h3 class="text-lg font-bold">Success!</h3>
                <p class="py-4">
                    You can't log in until you've verified your email. Check
                    your email for a verification link we sent.
                </p>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>Close</button>
            </form>
        </dialog>
        <h1 class="text-center text-4xl font-extrabold lg:text-2xl">
            No posts yet. Be the first?
        </h1>
    {/if}
</div>
