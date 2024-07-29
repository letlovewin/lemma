<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import Footer from "../Footer.svelte";
    import Navbar from "../Navbar.svelte";
</script>

<svelte:head>
    <title>lemma</title>
    <meta
        name="description"
        content="A federated alternative to Facebook Marketplace."
    />
</svelte:head>

<div class="flex flex-col h-screen justify-between">
    <header>
        <Navbar />
    </header>
    <main>
        <div class="flex flex-col items-center p-5">
            <div class="max-w-lg">
                <h3 class="scroll-m-20 text-xl font-extrabold lg:text-5xl text-center">
                    About
                </h3>
                <br />
                <p>
                    This is a federated alternative to Facebook Marketplace— I wasn't comfortable having my purchases be visible to a platform that's known for having issues with privacy, especially amidst its crappy moderation and the fact that it's festering with bigotry, so I started developing this platform.
                </p>
            </div>
            
        </div>
    </main>
    <Footer></Footer>
</div>
