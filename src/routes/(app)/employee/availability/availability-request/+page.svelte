<script>

	import NAvailabilityCard from '$lib/components/NAvailabilityCard.svelte';
	import NAvailabilityModal from '$lib/components/NAvailabilityModal.svelte';

	export let data;

	let uuid = data.session?.user.id;

	/** @type {string[]} */
	const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	/** @type {boolean} */
	let showModal = false;

	let modalData = {title: ''};

	function toggleModal(event) {
		showModal = !showModal;
		modalData = event.detail;
	}

// 	TODO: Fetch request after submitting availability.
// 	TODO: Selection validation.

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">

	<div>
		<h1 class="h1 font-bold">NEW AVAILABILITY</h1>

		{#if showModal}
			<NAvailabilityModal toggleModal={toggleModal} modalData={modalData} uuid={uuid}/>
		{/if}
	</div>

	{#each days as day}
		<NAvailabilityCard title="{day.toUpperCase()}" left_content="" right_content="" bottom_content="" on:click={toggleModal}/>
	{/each}
</div>