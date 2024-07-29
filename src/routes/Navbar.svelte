<script>
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import ThemeSelector from "./ThemeSelector.svelte";


</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">
            lemma
        </a>
    </div>
    <div class="flex-none">
        <button class="btn btn-primary btn-sm" on:click={()=>{if(browser){goto("/signin")}}}> Sign in </button>
        
    </div>
</div>
