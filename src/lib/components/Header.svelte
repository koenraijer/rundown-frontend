<script>
    import { onMount } from 'svelte';
    let scrolled = false;
  
    export let showLogoutButton = false;
    export let logout = () => {};
    export let fetchLogin = () => {};
    export let userName = '';
  
    onMount(() => {
      const handleScroll = () => {
        scrolled = window.scrollY > 10;
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    });
  </script>
  
  <style>
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background-color: rgba(255, 255, 255, 0);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }
  
    header.scrolled {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  </style>
  
  <header class="p-4 md:p-6 transition-all duration-300 {scrolled ? 'scrolled' : ''}">
    <div class="mx-auto flex items-center justify-between">
      <h1 class="text-xl">Spotify Playlist Generator</h1>
      {#if showLogoutButton}
        <div>
            <span class="mr-2 text-lg">@{userName}</span>
            <button
            on:click={logout}
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      {:else}
        <button
          on:click={fetchLogin}
          class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Login with Spotify
        </button>
      {/if}
    </div>
  </header>
  