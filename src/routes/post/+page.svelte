<script>
    export let form;
</script>

<svelte:head>
    <title>lemma - post</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

<div class="container mx-auto p-5">
    <h1 class="text-center text-4xl font-extrabold lg:text-2xl">
        Post a listing
    </h1>

    <form method="POST" action="?/post" enctype="multipart/form-data">
        <div class="grid justify-center mt-2 gap-2">
            
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Upload image(s)</span>
                </div>
                <input
                    type="file"
                    name="photo-upload"
                    class="file-input file-input-bordered w-full max-w-xs"
                />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                <input name="name" type="text" class="grow" placeholder="Item name" />
            </label>
            <label class="input input-bordered flex items-center gap-2">
                <input name="price" type="number" class="grow" placeholder="Price" />
            </label>

            <textarea
                class="textarea textarea-bordered"
                name="bio"
                placeholder="Additional information"
            ></textarea>

            <label class="input input-bordered flex items-center gap-2">
                <input name="contact-info" type="text" class="grow" placeholder="Contact information" />
            </label>

            <button class="btn btn-primary" type="submit">Post</button>
        </div>
    </form>
    {#key form?.message}
        {#if form?.message != undefined}
            <p class="text-error text-center mt-5 text-wrap">
                {form?.message}
            </p>
        {/if}
    {/key}
</div>
