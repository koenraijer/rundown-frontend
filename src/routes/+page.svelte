<script>
    import { json } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
    import { spotifyData, userName, connect } from '$lib/websocket';
    import Header from '$lib/components/Header.svelte';
    import Track from '$lib/components/Track.svelte';
    import Artist from '$lib/components/Artist.svelte';
    import { fade } from 'svelte/transition';

    let ws;
    let showLogoutButton = false;

    async function fetchLogin() {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        goto(data['body']['auth_url']);
  
        // Initialize WebSocket connection
        ws = connect();
        return json({
          status: response.status,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async function logout() {
        console.log('LOGGING OUT');
        spotifyData.set(null);
        userName.set('');
        showLogoutButton = false;
        if (ws) {
            ws.close();
        }
    }

    $: if ($spotifyData) {
        setTimeout(() => {
            showLogoutButton = true;
        }, 300);
    }

  let activeTab = 'artists';
  let tabBgLeft = 0;

  $: {
    if (activeTab === 'artists') {
      tabBgLeft = 0;
    } else {
      tabBgLeft = 100;
    }
  }

  </script>

{#if !showLogoutButton}
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg h-fit w-fit flex flex-col justify-center items-center">
      <h1 class="text-xl mb-8">Spotify Playlist Generator</h1>
      <button
        on:click={fetchLogin}
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Login with Spotify
      </button>
    </div>
  </div>
{/if}


<main class="min-h-screen flex items-center justify-cente">
    <div class="mx-auto max-w-4xl mb-12">
        {#if showLogoutButton && $spotifyData}
            <Header
                showLogoutButton={showLogoutButton}
                logout={logout}
                fetchLogin={fetchLogin}
                userName={$userName}
            />
            <div class="mt-36">
                <div class="relative flex justify-center">
                    <button
                      on:click={() => (activeTab = 'artists')}
                      class="relative p-2 px-4 rounded-t-lg font-semibold hover:bg-gray-50 text-gray-700 hover:text-gray-900 focus:outline-none"
                      class:active={activeTab === 'artists'}
                    >
                    <div
                        class="absolute !z-0 top-0 left-0 h-full w-full bg-gray-100 rounded-t-lg transition-all duration-300 ease-in-out"
                        style={`transform: translateX(${tabBgLeft}%);`}
                    ></div>
                      <span class="relative !z-10">Artists</span>
                    </button>
                    <button
                      on:click={() => (activeTab = 'tracks')}
                      class="relative z-10 p-2 px-4 rounded-t-lg font-semibold hover:bg-gray-50 text-gray-700 hover:text-gray-900 focus:outline-none"
                      class:active={activeTab === 'tracks'}
                    >
                      Tracks
                    </button>
                </div>
                <div class="bgap-8">
                    {#if activeTab === 'artists'}
                        <div class="bg-white p-8 rounded-lg shadow-lg" in:fade="{{duration: 100}}" out:fade="{{duration: 100}}">
                        <h2 class="text-2xl font-bold mb-8">Artists</h2>
                        <ul>
                            {#each $spotifyData.spotify_data.artists as artist}
                            <Artist artist={artist} />
                            {/each}
                        </ul>
                        </div>
                    {:else}
                        <div class="bg-white p-8 rounded-lg shadow-lg" in:fade="{{duration: 100}}" out:fade="{{duration: 100}}">
                        <h2 class="text-2xl font-bold mb-8">Tracks</h2>
                        <ul>
                            {#each $spotifyData.spotify_data.tracks as track}
                            <Track track={track} />
                            {/each}
                        </ul>
                        </div>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</main>
  