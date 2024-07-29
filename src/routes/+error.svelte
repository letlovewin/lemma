<script>
  import { page } from '$app/stores';
  import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import Footer from "./Footer.svelte";
import Navbar from "./Navbar.svelte";
</script>
<svelte:head>
    <title>lemma - 404</title>
    <meta name="description" content="A federated alternative to Facebook Marketplace.">
</svelte:head>
{#if $page.status == "404"}
<div class="flex flex-col h-screen justify-between">
    <header>
        <Navbar/>
    </header>
    <main>
        <div class="container mx-auto p-5">
            <div class="mt-10">
                <h1
                    class="scroll-m-20 text-4xl font-extrabold lg:text-5xl text-center"
                >
                    This page doesn't exist.
                </h1>
            </div>
            <div class="flex justify-center gap-5 mt-5">
                    <button class="btn btn-primary w-24" on:click={()=>{if(browser){goto("/")}}}>Home</button>
            </div>
            <br>

        </div>     
    </main>
    <Footer></Footer>
</div>

{/if}
