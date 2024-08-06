<script>
    export let data;
    // console.log(data.userInformation);

    let profile_photo_url = data.userInformation?.profile_photo;
    let display_name = data.userInformation?.display_name;
    let name = data.userInformation?.name;
    let outbox = data.userInformation?.outbox;
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
                                    class="bg-neutral text-neutral-content w-36 rounded-full"
                                >
                                    <span class="text-3xl"
                                        >{display_name[0]}</span
                                    >
                                </div>
                            </div>
                        {:else}
                            <div class="avatar">
                                <div class="w-36 rounded-full">
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

            <!--
            
            
            <div class="grid grid-rows-3">
                <div class="flex justify-center"></div>
                {#if data.userInformation.instance == null}
                    <div>
                        {#each outbox.orderedItems as post}
                            {#if post.object.attachment != []}
                                {#if post.object.attachment.mediaType.startsWith("image/")}
                                    <div
                                        class="card lg:card-side bg-base-100 shadow-xl"
                                    >
                                        <figure>
                                            <img
                                                src={post.url}
                                                alt={post.name}
                                            />
                                        </figure>
                                        <div class="card-body">
                                            <h2 class="card-title">
                                                New album is released!
                                            </h2>
                                            <p>{@html post.object.content}</p>
                                            {#if post.price}
                                                <p>{post.price}</p>
                                            {/if}
                                        </div>
                                    </div>
                                {/if}
                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
            -->
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
