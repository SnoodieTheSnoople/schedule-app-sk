<script>
	import ARequestCard from '$lib/components/ARequestCard.svelte';
	import { getMALByStatus } from '$lib/supabaseCommands.js';

	// TODO: Get requests with status 0.
	let availableDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

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

	<ARequestCard username="USERNAME" availableDays={availableDays}/>
</div>