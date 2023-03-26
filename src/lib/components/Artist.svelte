<script>
    export let artist
</script>

<a href={artist.link} class="p-4 group flex flex-row row-nowrap gap-x-4 md:gap-x-6 rounded-lg hover:bg-gray-100 mb-4 transition-colors duration-75">
    <img src={artist.image} alt="Shows album cover associated with displayed track." class="w-32 h-32 rounded-lg" />
    <div>
        <span class="group-hover:underline">
            <span class="text-lg font-semibold mb-1 transition duration-200">{artist.name}</span>
        </span>
        <ul class="flex flex-wrap">
            {#if artist.genres.length > 0}
            {#each artist.genres as genre, i}
            <li class="text-sm text-gray-400 mr-4">{genre}{#if i < artist.genres.length - 1},&nbsp;{/if}</li>
            {/each}
            {/if}
        </ul>
    </div>
</a>