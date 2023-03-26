<script>
    export let track;
</script>
<a href={track.link} class="p-4 group flex flex-row row-nowrap gap-x-4 md:gap-x-6 rounded-lg hover:bg-gray-100 mb-4 transition-colors duration-75">
    <img src={track.image} alt="Shows album cover associated with displayed track." class="w-32 h-32 rounded-lg" />
    <div>
        <span class="group-hover:underline">
            <span class="text-lg font-semibold mb-1 transition duration-200">{track.name}</span> by <span class="font-semibold">{track.artists}</span>
        </span>
        <p class="text-gray-800">From <span class="font-semibold">{track.album}</span></p>
        <ul class="flex flex-wrap">
            {#each Object.entries(track.features) as [key, value], i}
            <li class="text-sm text-gray-400 mr-4">{key}: {value}{#if i < Object.entries(track.features).length - 1},{/if}</li>
            {/each}
        </ul>
    </div>
</a>