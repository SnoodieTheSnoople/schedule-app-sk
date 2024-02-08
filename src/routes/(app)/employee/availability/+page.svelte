<script>
	import SecondaryCard from '$lib/components/SecondaryCard.svelte';
	import { getAvailabilityOnUUID } from '$lib/supabaseCommands.js';
	import { goto } from '$app/navigation';

	export let data;


	/** @type {Object[]} */
	let availability = [];

	/** @type {string[]} */
	let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

	/** @type {Object[]} */
	let daysWithAvailability = new Map();

	async function getAvailability() {
		return await getAvailabilityOnUUID(data.session?.user.id);
		// Had to modify getAvailabilityOnUUID to return the object where the
		// status is equal to 1 which means it is active and accepted.
	}

	function combineAvailabilityAndDays() {
		daysWithAvailability = days.map((day) => {
			let availabilityDay = availability.find((a) => a.day === day);
			return {day: day, availability: availabilityDay || null};
		});
	}

	function handleClick() {
		goto('./availability/availability-request');
	}

	if (data.session) {
		getAvailability().then((a) => {
			availability = Array.isArray(a) ? a : Object.values(a);
			console.log(availability);
			combineAvailabilityAndDays();
		});
		console.log(daysWithAvailability);
	}

// 	TODO: Create manager view for availability.

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">AVAILABILITY</h1>
	<!-- TODO: Button to redirect. -->
	<button class="btn btn-primary" on:click={handleClick}>New Availability</button>


	{#each daysWithAvailability as dwa}
		{#if dwa.availability !== null}
			<SecondaryCard title={dwa.day.toUpperCase()} left_content={dwa.availability.available_time_from} right_content={dwa.availability.available_time_to}
			bottom_content="{dwa.availability.preferred_time_from} - {dwa.availability.preferred_time_to}"/>
		{:else}
			<SecondaryCard title={dwa.day.toUpperCase()} left_content="" right_content="" bottom_content=""/>
		{/if}
	{/each}

	<!--<SecondaryCard title="MONDAY"/>
	<SecondaryCard title="TUESDAY"/>
	<SecondaryCard title="WEDNESDAY"/>
	<SecondaryCard title="THURSDAY" left_content="13:00" right_content="20:00"/>
	<SecondaryCard title="FRIDAY" left_content="13:00" right_content="20:00"/>
	<SecondaryCard title="SATURDAY" left_content="13:00" right_content="20:00"/>
	<SecondaryCard title="SUNDAY" left_content="13:00" right_content="20:00"/>-->
</div>
