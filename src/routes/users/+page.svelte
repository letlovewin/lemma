<script>
    import { goto } from "$app/navigation";

    export let data;
    console.log(data.userInformation);
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
        {#each data.userInformation as user}
            <div>
                <div class="flex mt-2">
                    {#if user.profile_photo_url === ""}
                        <button
                            on:click={() => {
                                goto(`/@${user.display_name}`);
                            }}
                        >
                            <div class="avatar placeholder">
                                <div
                                    class="bg-neutral text-neutral-content w-24 rounded-full"
                                >
                                    <span class="text-3xl"
                                        >{user.display_name[0]}</span
                                    >
                                </div>
                            </div>
                        </button>
                    {:else}
                        <div class="avatar">
                            <div class="w-24 rounded-xl">
                                <img
                                    src={user.profile_photo_url}
                                    alt={user.display_name + "'s profile photo"}
                                />
                            </div>
                        </div>
                    {/if}
                    <h1
                        class="scroll-m-20 text-xl font-extrabold lg:text-3xl text-center my-auto ms-5"
                    >
                        {user.display_name}
                    </h1>
                </div>
            </div>
        {/each}
    </div>
</div>
