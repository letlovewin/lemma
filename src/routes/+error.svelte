<script language="javascript">
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
</script>

<svelte:head>
    <title>lemma - 404</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>
{#if $page.status == 404}
    <div class="mt-10">
        <h1 class="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center">
            This page doesn't exist.
        </h1>
    </div>
    <div class="flex justify-center gap-5 mt-5">
        <a role="button" class="btn btn-primary w-24" href="/">Home</a>
    </div>
    <br />
{/if}
