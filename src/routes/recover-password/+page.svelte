<script>
    export let form;
</script>

<svelte:head>
    <title>lemma - password reset</title>
</svelte:head>

<div class="grid justify-items-center p-5">
    <form
        class="mt-10 flex flex-col items-center"
        method="POST"
        action="?/reset"
    >
        <img
            src={"/favicon.png"}
            alt="Lemma Icon"
            style="width:128px;height:128px;"
        />
        <h1
            class="scroll-m-20 text-2xl font-extrabold lg:text-3xl text-center my-5"
        >
            Password reset
        </h1>
        <label class="input input-bordered flex items-center gap-2 mb-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70"
            >
                <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
                />
                <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
                />
            </svg>
            <input type="email" name="email" class="grow" placeholder="Email" />
        </label>
        <button class="btn btn-primary self-center mt-5" type="submit"
            >Send reset email</button
        >
        {#key form?.message}
            {#if form?.message != undefined && form?.success === true}
                <p class="text-primary mt-5">{form?.message}</p>
            {:else if form?.message != undefined && form?.success === undefined}
                <p class="text-secondary mt-5">An unknown error has occured.</p>
            {/if}
        {/key}
    </form>
</div>
