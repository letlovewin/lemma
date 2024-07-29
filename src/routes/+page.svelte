<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
import Navbar from "./Navbar.svelte";
</script>

<svelte:head>
    <title>lemma</title>
</svelte:head>


<div class="flex flex-col h-screen justify-between">
    <header>
        <Navbar/>
    </header>
    <main>
        <div class="grid justify-items-center">
            <div class="mt-10">
                <h1
                    class="scroll-m-20 text-4xl font-extrabold lg:text-5xl"
                >
                    A federated alternative to Facebook Marketplace.
                </h1>
            </div>
            <div class="mt-5">
                    <button class="btn btn-primary" on:click={()=>{if(browser){goto("/signup")}}}>Sign up</button>
                    <button class="btn btn-neutral">Learn more</button>
                
            </div>
        </div>     
    </main>
    <footer class="text-center mb-5">
        <a href="https://github.com/letlovewin/lemma">Github Repo</a>
    </footer>
</div>
