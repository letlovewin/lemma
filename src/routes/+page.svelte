<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import Footer from "./Footer.svelte";
    import HomeNotAuthenticated from "./HomeNotAuthenticated.svelte";
    import Navbar from "./Navbar.svelte";

    const isSignedIn = 0;
    import {createClient} from "@supabase/supabase-js"
    import {PUBLIC_SUPABASE_KEY} from '$env/static/public'

    const supabaseUrl = "https://uqrzveflwowlasogcpfv.supabase.co";
    const supabaseKey = PUBLIC_SUPABASE_KEY;
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
