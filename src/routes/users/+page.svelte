<script lang="ts">
    import { goto } from "$app/navigation";

    export let data;
    let search_value: string;
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
        <div class="join">
            <label
                class="input input-bordered flex items-center gap-2 join-item"
            >
                <input
                    type="text"
                    bind:value={search_value}
                    class="grow"
                    placeholder="Search"
                />
            </label>
            <button class="btn btn-primary join-item" on:click={()=>{goto(`/@${search_value}`)}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    class="h-4 w-4"
                >
                    <path
                        fill-rule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>

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
                        <a href="/@{user.display_name}">{user.display_name}</a>
                    </h1>
                </div>
            </div>
        {/each}
        <div class="join justify-center">
            {#if Number(data.pageNumber) > 1}
                <button class="join-item btn">«</button>
            {/if}

            <button class="join-item btn">Page {data.pageNumber}</button>
            <button
                class="join-item btn"
                on:click={() => {
                    goto(`/users?p=${Number(data.pageNumber) + 1}`);
                }}>»</button
            >
        </div>
    </div>
</div>
