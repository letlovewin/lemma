<script>
    export let data;
    // console.log(data.userInformation);

    let profile_photo_url = data.userInformation?.profile_photo;
    let display_name = data.userInformation?.display_name;
    let name = data.userInformation?.name;
    let outbox = data.userInformation?.outbox;
    console.log(String(outbox.orderedItems[0].attachment[0].mediaType));
    console.log(
        String(outbox.orderedItems[0].attachment[0].mediaType).startsWith(
            "image",
        ),
    );
</script>

<svelte:head>
    <title>lemma</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

{#key data.userInformation}
    <div class="container mx-auto p-5">
        {#if data.userInformation}
            <div class="grid rows-3">
                <div class="flex justify-center">
                    <div class="me-2">
                        {#if profile_photo_url === ""}
                            <div class="avatar placeholder">
                                <div
                                    class="bg-neutral text-neutral-content w-36 rounded-xl"
                                >
                                    <span class="text-3xl"
                                        >{display_name[0]}</span
                                    >
                                </div>
                            </div>
                        {:else}
                            <div class="avatar">
                                <div class="w-36 rounded-xl">
                                    <img
                                        src={profile_photo_url}
                                        alt="{display_name}'s profile photo"
                                    />
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="grid grid-rows-2">
                <div>
                    {#if data.userInformation.instance}
                        <h1
                            class="scroll-m-20 text-xl font-extrabold lg:text-3xl text-center my-auto ms-5"
                        >
                            <a
                                href={data.userInformation.profileURL}
                                class="link-sexy"
                            >
                                @{display_name}@{data.userInformation.instance}
                            </a>
                        </h1>
                    {:else}
                        <h1
                            class="scroll-m-20 text-xl font-extrabold lg:text-3xl text-center my-auto ms-5"
                        >
                            @{display_name}
                        </h1>
                    {/if}
                </div>
                <div>
                    <p class="text-center">
                        {name}
                    </p>
                    <p class="text-center">
                        {outbox.totalItems} listings
                    </p>
                </div>
                {#if data.userInformation?.bio}
                    <div>
                        <p class="text-center mt-2">
                            {@html data.userInformation?.bio}
                        </p>
                    </div>
                {/if}
            </div>

            <div class="flex flex-wrap place-content-center mt-5">
                {#if data.userInformation.instance == null}
                    <div>
                        {#each outbox.orderedItems as post}
                            {#if String(post.attachment[0].mediaType).startsWith("image/", 0)}
                                <div class="card bg-base-100 w-96 shadow-xl">
                                    <figure>
                                        <a href={post.url}>
                                            <img
                                                src={post.attachment[0].url}
                                                alt="Post"
                                            />
                                        </a>
                                    </figure>
                                    <div class="card-body">
                                        <p>
                                            {post.content}
                                        </p>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
        {:else}
            <h1 class="text-center text-4xl font-extrabold lg:text-2xl">
                This user doesn't exist.
            </h1>
            <div class="flex justify-center gap-5 mt-5">
                <a role="button" class="btn btn-primary w-24" href="/">Home</a>
            </div>
        {/if}
    </div>
{/key}
