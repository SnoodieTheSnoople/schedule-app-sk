<script>
	import { getMALByStatusAndUUID, getUserByUUID, acceptMAL, getActiveMALStatus, removeAvailability } from '$lib/supabaseCommands.js';
	import SecondaryCard from '$lib/components/SecondaryCard.svelte';
	import { goto } from '$app/navigation';

	export let data;

	/** @type {Object[]} */
	let availabilityRequest = {};

	/** @type {string} */
	let name = "";

	let activeAvailability = {};


	async function handleClick(event) {
		if (event.target.value === "1") {
			try {
				console.log("accepted");
				// Get current active request.

				/*getActiveMALStatus(data.username).then((res) => {
					activeAvailability = res;
					console.log("Active MAL Status");
					console.log(activeAvailability);

					// Iterate through all requests and change status to 1.
					availabilityRequest.forEach((request) => {
						console.log(request);
						console.log(request.availability_id);

						acceptMAL(request.availability_id).then((res) => {
							console.log(res);
						});
					});

					// Iterate through active and remove MAL by MAL_ID.
					// Remove availability with availability_id.
					activeAvailability.forEach((active) => {
						console.log(active);
						console.log(active.availability_id);
						removeAvailability(active.availability_id).then((res) => {
							goto("/manager/availability")
						});
					});

					// Redirect to manager/availability page.
				});*/

				activeAvailability = await getActiveMALStatus(data.username);
				console.log("Active MAL Status");
				console.log(activeAvailability);

				for (const request of availabilityRequest) {
					console.log("Availability Request:");
					console.log(request);
					console.log(request.availability_id);

					console.log(await acceptMAL(request.availability_id));
				}

				for (const active of activeAvailability) {
					console.log("Active Availability:");
					console.log(active);
					console.log(active.availability_id);
					await removeAvailability(active.availability_id);
				}

				goto("/manager/availability");
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log("denied");
			// Iterate and remove all requests.
			// Iterate and remove all availabilities.
			// Redirect to manager/availability page.
		}
	}

	getMALByStatusAndUUID(data.username).then((res) => {
		availabilityRequest = res;

		getUserByUUID(data.username).then((user) => {
			console.log("User data:")
			console.log(user);
			console.log("Availability Request:")
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