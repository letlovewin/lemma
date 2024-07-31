<script>
    export let data, form;
    let display_name = data.user?.user_metadata.display_name;
    let bio = data.user?.user_metadata.bio;
</script>

<svelte:head>
    <title>lemma - account</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

<div class="container mx-auto p-5">
    <h1 class="text-center text-4xl font-extrabold lg:text-2xl">Account</h1>

    <form method="POST" action="?/save">
        <div class="grid justify-center mt-2 gap-2">
            <div class="tooltip" data-tip="Display names are immutable">
                <input
                type="text"
                name="displayname"
                placeholder="@{display_name}"
                class="input input-bordered w-full max-w-xs"
                disabled
            />
            </div>
            

            <textarea
                class="textarea textarea-bordered"
                name="bio"
                placeholder={bio}
            ></textarea>

            <button class="btn btn-primary" type="submit">Save changes</button>
        </div>
    </form>
    {#key form?.message}
        {#if form?.message != undefined}
            <p class="text-secondary text-center mt-5 text-wrap">
                {form?.message}
            </p>
        {/if}
    {/key}
</div>
