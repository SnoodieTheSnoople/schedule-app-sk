<script>

	import TertiaryCard from '$lib/components/TertiaryCard.svelte';
	import ARequestCard from '$lib/components/ARequestCard.svelte';

	// TODO: Get requests with status 0.
	let availableDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

	function getRequests() {
	}

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">AVAILABILITY REQUESTS</h1>

	<TertiaryCard title="H" dateFrom="111" dateTo="111" status="ACCEPTED" totalHours="11"/>

	<ARequestCard username="USERNAME" availableDays={availableDays}/>
</div>