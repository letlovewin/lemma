<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";

    import Footer from "./Footer.svelte";
    import HomeNotAuthenticated from "./HomeNotAuthenticated.svelte";
    import Navbar from "./Navbar.svelte";

    const isSignedIn = 0;
    import {createClient} from "@supabase/supabase-js"
    
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

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
        <HomeNotAuthenticated />
    </main>
    <Footer></Footer>
</div>
