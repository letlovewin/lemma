<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
</script>

<svelte:head>
    <title>lemma</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

<div class="flex flex-col items-center p-5">
    <div class="max-w-lg">
        <h3 class="scroll-m-20 text-xl font-extrabold lg:text-5xl text-center">
            About
        </h3>
        <br />
        <p>
            This is a federated alternative to Facebook Marketplace— I wasn't comfortable having my purchases be visible to a platform that's known for having issues with privacy, especially amidst its crappy moderation and the fact that it's festering with bigotry, so I started developing this platform.
        </p>
        <br />
        <h5 class="scroll-m-20 text-xl font-extrabold lg:text-3xl text-center">Start your own instance</h5>
        <br />
        <p>See the README on the <a class="link link-primary link-hover" href="https://github.com/letlovewin/lemma">Github Repo</a>. Once I have a minimum viable product, I'll try to make starting an instance as easy as possible. Right now it has a ton of steps, sorry! :P</p>
        <p>In this case, there is supposed to be one instance for one area— so one instance for the Inland Empire, another instance for San Francisco, etc.</p>
    </div>
    
</div>