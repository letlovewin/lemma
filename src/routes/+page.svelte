<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
</script>

<svelte:head>
    <title>lemma</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

<div class="container mx-auto p-5">
    <div class="mt-10">
        <img
            src={"/favicon.png"}
            alt="Lemma Icon"
            style="width:128px;height:128px;"
            class="mx-auto mb-5"
        />
        <h1 class="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center">
            A federated alternative to Facebook Marketplace.
        </h1>
    </div>
    <div class="flex justify-center gap-5 mt-5">
        <a role="button" class="btn btn-primary w-24" href="/signup">Sign up</a>
        <a role="button" class="btn btn-neutral w-24" href="/about"
            >Learn more</a
        >
    </div>
    <br />
</div>
