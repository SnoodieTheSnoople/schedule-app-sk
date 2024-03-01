<script>
	import ARequestCard from '$lib/components/ARequestCard.svelte';
	import { getMALByStatus, getManagerOnUUID } from '$lib/supabaseCommands.js';

	export let data;

	let requests = {};
	let isManager = false;

	async function getRequests() {
		// console.log(data.session?.user.id)
		return getMALByStatus(data.session?.user.id);
	}

	function checkManager() {
		getManagerOnUUID(data.session?.user.id).then((result) => {
			if (result.length === 0) {
				isManager = false;
			}
			else {
				isManager = true;
			}
		});
	}

	checkManager();

	getRequests().then((req) => {
		requests = req;
		console.log(requests);
	});
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">AVAILABILITY REQUESTS</h1>

	{#if isManager}
		{#if Object.keys(requests).length === 0}
			<h2 class="h3 font-bold text-center">No requests available</h2>
		{:else}
			{#each Object.entries(requests) as [username, request]}
				<ARequestCard username={username} empDataRequest={request} name={request.name}/>
			{/each}
		{/if}
	{:else}
		<p class="text-center">You are not authorized to view this page</p>
	{/if}
</div>