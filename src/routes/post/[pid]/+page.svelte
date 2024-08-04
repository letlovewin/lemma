<script lang="ts">
    export let data;
</script>

<svelte:head>
    <title>lemma</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

<div class="container mx-auto p-5">
    {#if data.post_content}
    <div class="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={data.post_content?.photo_url}
            alt="Post" />
        </figure>
        <div class="card-body">
          <p>{data.post_content?.description}</p>
        </div>
      </div>
    {:else}
        <h1 class="text-center text-4xl font-extrabold lg:text-2xl">
            This post doesn't exist.
        </h1>
        <div class="flex justify-center gap-5 mt-5">
            <a role="button" class="btn btn-primary w-24" href="/">Home</a>
        </div>
    {/if}
</div>
