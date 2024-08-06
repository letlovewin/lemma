<script>
    export let data, form;
    let display_name = data.user?.user_metadata.display_name;
    let bio = data.user?.user_metadata.bio;
    let name = data.user?.user_metadata.name;
    let photo_url = data.user?.user_metadata.profile_photo_url;

    if (name == undefined) {
        name = "Name";
    }

    if (photo_url == "") {
        photo_url = "Profile picture URL";
    }
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

    <form method="POST" action="?/save" enctype="multipart/form-data">
        <div class="grid justify-center mt-2 gap-2">
            {#if photo_url == "" || photo_url == "Profile picture URL"}
                <div class="avatar placeholder">
                    <div
                        class="bg-neutral text-neutral-content w-24 rounded-xl"
                    >
                        <span class="text-3xl">{display_name[0]}</span>
                    </div>
                </div>
            {:else}
                <div class="avatar flex place-content-center">
                    <div class="w-24 rounded-xl">
                        <img src={photo_url} alt="Your avatar" />
                    </div>
                </div>
            {/if}
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Profile photo</span>
                </div>
                <input
                    type="file"
                    name="photo-upload"
                    accept="image/jpeg"
                    class="file-input file-input-bordered w-full max-w-xs"
                />
            </label>
            <div class="tooltip" data-tip="Display names are immutable">
                <input
                    type="text"
                    name="displayname"
                    placeholder="@{display_name}"
                    class="input input-bordered w-full max-w-xs"
                    disabled
                />
            </div>
            <input
                type="text"
                name="name"
                placeholder={name}
                class="input input-bordered w-full max-w-xs"
            />

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
            <p class="text-error text-center mt-5 text-wrap">
                {form?.message}
            </p>
        {/if}
    {/key}
</div>
