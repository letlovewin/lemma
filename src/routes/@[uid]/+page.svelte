<script>
    export let data;
    // console.log(data.userInformation);
    let profile_photo_url = data.userInformation.profile_photo;
    let display_name = data.userInformation.display_name;
    let uuid = data.userInformation.uuid;
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
                    <div class="w-50 rounded-xl">
                        <img
                            src={profile_photo_url}
                            alt="{display_name}'s profile photo"
                        />
                    </div>
                </div>
            {/if}
            <h1
                class="scroll-m-20 text-xl font-extrabold lg:text-3xl text-center my-auto ms-5"
            >
                {display_name}
            </h1>
        </div>
        <br />
        <div>
            <p class="mt-5">{data.userInformation.bio}</p>
        </div>
    </div>
</div>
