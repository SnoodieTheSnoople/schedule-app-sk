<script>

	import NAvailabilityCard from '$lib/components/NAvailabilityCard.svelte';

	export let data;

	/** @type {string[]} */
	const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	/** @type {boolean} */
	let showModal = false;

	let modalData = {title: ''};

	function toggleModal(event) {
		showModal = !showModal;
		modalData = event.detail;
	}

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">NEW AVAILABILITY</h1>

	{#if showModal}
		
	{/if}

	{#each days as day}
		<NAvailabilityCard title="{day.toUpperCase()}" left_content="" right_content="" bottom_content=""/>
	{/each}
</div>