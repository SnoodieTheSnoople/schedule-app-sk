<script>
	import NAvailabilityCard from '$lib/components/NAvailabilityCard.svelte';
	import NAvailabilityModal from '$lib/components/NAvailabilityModal.svelte';
	import { getAvailabilityWhereMALStatusIsZero } from '$lib/supabaseCommands.js';

	export let data;

	let uuid = data.session?.user.id;

	/** @type {string[]} */
	const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

	/** @type {boolean} */
	let showModal = false;

	let availabilityData = {};

	let combinedDataAndDays = {};

	let modalData = {title: ''};

	function toggleModal(event) {
		showModal = !showModal;
		modalData = event.detail;
	}

	function combineDaysAndAvailability(days, availability) {
		let combined = {};
		for (let i = 0; i < days.length; i++) {
			// combined[days[i]] = availability[i] !== undefined ? availability[i] : undefined;
			combined[days[i]] = availability.find((element) => element.day === days[i]);
		}
		return combined;
	}

	function update()
	{
		getAvailabilityWhereMALStatusIsZero(uuid).then((data) => {
			availabilityData = data;
			// console.log(availabilityData);
			combinedDataAndDays = combineDaysAndAvailability(days, availabilityData);
			// console.log(combinedDataAndDays);
		});

	}

	getAvailabilityWhereMALStatusIsZero(uuid).then((data) => {
		availabilityData = data;
		// console.log(availabilityData);
		combinedDataAndDays = combineDaysAndAvailability(days, availabilityData);
		// console.log(combinedDataAndDays);
	});

// 	TODO: Fetch request after submitting availability.
// 	TODO: Selection validation.

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">

	<div>
		<h1 class="h1 font-bold">NEW AVAILABILITY</h1>

		{#if showModal}
			<NAvailabilityModal toggleModal={toggleModal} modalData={modalData} uuid={uuid}
													updateContent={update}/>
		{/if}
	</div>

	<!--{#each days as day}-->
	<!--	<NAvailabilityCard title="{day.toUpperCase()}" left_content="" right_content=""-->
	<!--										 bottom_content="" on:click={toggleModal}/>-->
	<!--{/each}-->

	{#key availabilityData}
		{#each Object.keys(combinedDataAndDays) as day}
			{#if combinedDataAndDays[day] !== undefined}
				<NAvailabilityCard title={day.toUpperCase()} left_content={combinedDataAndDays[day].available_time_from}
													 right_content={combinedDataAndDays[day].available_time_to}
													 bottom_content={combinedDataAndDays[day].preferred_time_from !== null ?
													 combinedDataAndDays[day].preferred_time_from + " - " + combinedDataAndDays[day].preferred_time_to
													 : "N/A"}
													 on:click={toggleModal}/>

			{:else}
				<NAvailabilityCard title={day.toUpperCase()} left_content="" right_content=""
													 bottom_content="Not set" on:click={toggleModal}/>
			{/if}
		{/each}
	{/key}
</div>