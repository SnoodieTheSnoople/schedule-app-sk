<script>
	import ARequestCard from '$lib/components/ARequestCard.svelte';
	import { getMALByStatus } from '$lib/supabaseCommands.js';

	let requests = {};

	async function getRequests() {
		return getMALByStatus();
	}

	getRequests().then((req) => {
		requests = req;
		console.log(requests);
	});
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">AVAILABILITY REQUESTS</h1>

	{#if Object.keys(requests).length === 0}
		<h2 class="h3 font-bold text-center">No requests available</h2>
	{:else}
		{#each Object.entries(requests) as [username, request]}
			<ARequestCard username={username} empDataRequest={request}/>
		{/each}
	{/if}
</div>