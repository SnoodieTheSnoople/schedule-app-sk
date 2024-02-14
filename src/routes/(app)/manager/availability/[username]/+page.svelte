<script>
	import { getMALByStatusAndUUID, getUserByUUID } from '$lib/supabaseCommands.js';
	import SecondaryCard from '$lib/components/SecondaryCard.svelte';

	export let data;

	let availabilityRequest = {};

	/** @type {string} */
	let name = "";


	function handleClick(event) {
		if (event.target.value === "1") {
			console.log("accepted");
		} else {
			console.log("denied");
		}
	}

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

	<div class="flex justify-end gap-1">
		<button class="btn btn-success text-white" value="1" on:click={handleClick}>ACCEPT</button>
		<button class="btn btn-error text-white" value="0" on:click={handleClick}>DENY</button>
	</div>

	{#each Object.entries(availabilityRequest) as [tmp, request]}
		<SecondaryCard title={request.availabilities.day.toUpperCase()}
									 left_content={request.availabilities.available_time_from}
									 right_content={request.availabilities.available_time_to}
		bottom_content="{request.availabilities.preferred_time_from} - {request.availabilities.preferred_time_to}"/>
	{/each}
</div>