<script lang="ts">
    import { onMount } from "svelte";

    export let data;
    let verification_modal: any;
    onMount(() => {
        if (data.status == true) {
            verification_modal.showModal();
        }
    });

    async function markSold(postID: Number) {
        const { data: postData, error: postError } = await data.supabase
            .from("posts")
            .update({ sold: true })
            .eq("id", postID);
    }

    async function deletePost(postID: Number) {

        const { data: postData, error: postError } = await data.supabase
            .from("posts")
            .select()
            .eq("id", postID)
            .maybeSingle();

        const date = postData.created_at;

        const { data: userData, error: userError } = await data.supabase
            .from("profiles")
            .select()
            .eq("display_name", data.user?.user_metadata.display_name)
            .maybeSingle();

        let posts = userData.posts;
        posts.totalItems -= 1;

        for (let i = 0; i < posts.orderedItems.length; i++) {
            if (posts.orderedItems[i].published == date) {
                posts.orderedItems.splice(i, 1);
                break;
            }
        }

        const { data: updatePostData, error: updatePostError } =
            await data.supabase
                .from("profiles")
                .update({ posts: posts })
                .eq("display_name", data.user?.user_metadata.display_name);

        const response = await data.supabase.from("posts").delete().eq("id", postID);
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
    {#if data.user == null}
        <div class="mt-10">
            <img
                src={"/favicon.png"}
                alt="Lemma Icon"
                style="width:128px;height:128px;"
                class="mx-auto mb-5"
            />
            <h1
                class="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center"
            >
                A federated alternative to Facebook Marketplace.
            </h1>
        </div>
        <div class="flex justify-center gap-5 mt-5">
            <a role="button" class="btn btn-primary w-24" href="/signup"
                >Sign up</a
            >
            <a role="button" class="btn btn-neutral w-24" href="/about"
                >Learn more</a
            >
        </div>
        <br />
    {:else}
        <dialog
            id="verification_modal"
            class="modal"
            bind:this={verification_modal}
        >
            <div class="modal-box">
                <h3 class="text-lg font-bold">Success!</h3>
                <p class="py-4">
                    You can't log in until you've verified your email. Check
                    your email for a verification link we sent.
                </p>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>Close</button>
            </form>
        </dialog>
        {#if !data.content}
            <h1 class="text-center text-4xl font-extrabold lg:text-2xl">
                No listings on this instance yet. <a
                    href="/post"
                    class="link-sexy">Be the first?</a
                >
            </h1>
        {:else}
            <div class="flex flex-wrap gap-2 place-content-center">
                {#each data.content as post}
                    <div class="card card-compact bg-base-100 w-96 shadow-xl">
                        <figure>
                            <a href="post/{post.id}">
                                {#if post.sold}
                                    <div class="image-container">
                                        <img
                                            src={post.photo_url}
                                            alt="Post"
                                            class="blur-sm"
                                        />
                                        <div class="centered">
                                            <p
                                                class="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center"
                                            >
                                                Sold
                                            </p>
                                        </div>
                                    </div>
                                {:else}
                                    <img src={post.photo_url} alt="Post" />
                                {/if}
                            </a>
                        </figure>

                        <div class="card-body">
                            {#if data.user?.user_metadata.display_name == post.display_name}
                                <details class="dropdown float-right">
                                    <summary class="btn m-1"
                                        ><svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            class="bi bi-three-dots"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
                                            />
                                        </svg></summary
                                    >
                                    <ul
                                        class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                    >
                                        {#if !post.sold}
                                            <li class="text-primary">
                                                <button
                                                    on:click={() => {
                                                        markSold(post.id);
                                                    }}
                                                    ><svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        class="bi bi-check"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"
                                                        />
                                                    </svg> Mark as sold</button
                                                >
                                            </li>
                                        {/if}
                                        <li class="text-error">
                                            <button
                                                on:click={() => {
                                                    deletePost(post.id);
                                                }}
                                                ><svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    class="bi bi-trash"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                                                    />
                                                    <path
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                                                    />
                                                </svg> Delete post</button
                                            >
                                        </li>
                                    </ul>
                                </details>
                            {/if}
                            <p class="text-xs">
                                ${post.price.toLocaleString()}<br /><a
                                    href="@{post.display_name}"
                                    class="text-sm link-sexy"
                                    >@{post.display_name}</a
                                ><br />{@html post.description}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</div>
