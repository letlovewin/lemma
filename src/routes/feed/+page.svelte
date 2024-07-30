<script lang="ts">
    import { onMount } from "svelte";

    let verification_modal: any;
    export let data;

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
    <dialog id="verification_modal" class="modal" bind:this={verification_modal}>
        <div class="modal-box">
            <h3 class="text-lg font-bold">Success!</h3>
            <p class="py-4">You can't log in until you've verified your email. Check your email for a verification link we sent.</p>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>Close</button>
        </form>
    </dialog>
    <h1 class="text-center text-4xl font-extrabold lg:text-2xl">
        No posts yet. Be the first?
    </h1>
</div>
