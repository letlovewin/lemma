<script>
    export let data;
    // console.log(data.userInformation);
    let profile_photo_url = data.userInformation?.profile_photo;
    let display_name = data.userInformation?.display_name;
    let name = data.userInformation?.name;
    let outbox = data.userInformation.outbox;
    let posts = data.userInformation.posts;
    if(posts.next) {
        posts = posts.orderedItems;
    }
</script>

<svelte:head>
    <title>lemma</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

<div class="container mx-auto p-5">
    <div class="grid justify-center">
        <div class="flex">
            {#key display_name}
                {#if profile_photo_url === ""}
                    <div class="avatar placeholder">
                        <div
                            class="bg-neutral text-neutral-content w-24 rounded-full"
                        >
                            <span class="text-3xl">{display_name[0]}</span>
                        </div>
                    </div>
                {:else}
                    <div class="avatar">
                        <div class="w-24 rounded-full">
                            <img
                                src={profile_photo_url}
                                alt="{display_name}'s profile photo"
                            />
                        </div>
                    </div>
                {/if}
                <div class="grid content-center ms-5">
                    <h1
                        class="scroll-m-20 text-xl font-extrabold lg:text-3xl text-center my-auto ms-5"
                    >
                        {#if data.userInformation.instance}
                            @{display_name}@{data.userInformation.instance}
                        {:else}
                            @{display_name}
                        {/if}
                    </h1>
                    <p class="text-center">
                        {name}
                    </p>
                    <div class="columns-3 mt-2">
                        <div><p>{outbox.totalItems} listings</p></div>
                        <div><p>NaN followers</p></div>
                        <div><p>NaN following</p></div>
                    </div>
                </div>
            {/key}
        </div>
        <div class="divider"></div>
        {#if data.userInformation?.bio}
            <div>
                <p>{@html data.userInformation?.bio}</p>
            </div>
        {/if}
        <div class="grid column-2 content-center mt-2">
            <button class="btn btn-primary">Follow</button>
        </div>
        <div>
            {#each posts as post}
                <div class="card lg:card-side bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                            alt="Album"
                        />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">New album is released!</h2>
                        <p>{@html post.object.content}</p>
                        {#if post.price}
                            <p>{post.price}</p>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
