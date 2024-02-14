<script>
	import { getMALByStatusAndUUID, getUserByUUID } from '$lib/supabaseCommands.js';
	import SecondaryCard from '$lib/components/SecondaryCard.svelte';

	export let data;

	let availabilityRequest = {};

	/** @type {string} */
	let name = "";

	getMALByStatusAndUUID(data.username).then((res) => {
		console.log(res);
		availabilityRequest = res;

		getUserByUUID(data.username).then((user) => {
			console.log(user);
			console.log(availabilityRequest);

			user.forEach((user) => {
				if (user.id === data.session?.user.id) {
					name = user.firstname + " " + user.surname;
				}
			});

		});
	});
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">{name}</h1>

	{#each Object.entries(availabilityRequest) as [tmp, request]}
		<SecondaryCard title={request.availabilities.day.toUpperCase()}
									 left_content={request.availabilities.available_time_from}
									 right_content={request.availabilities.available_time_to}
		bottom_content="{request.availabilities.preferred_time_from} - {request.availabilities.preferred_time_to}"/>
	{/each}
</div>