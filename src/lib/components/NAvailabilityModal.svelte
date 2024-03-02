<script>
	import { createAvailability, getManagers, createMAL } from '$lib/supabaseCommands.js';
	import { addHours, format, startOfDay } from 'date-fns';

	/** @type {function(): void}*/
	export let toggleModal;

	/** @type {{title: string}} */
	export let modalData;

	/** @type {string} */
	export let uuid;

	/** @type {function(): void}*/
	export let updateContent;

	/** @type {boolean} */
	let isOpen = true;

	/** @type {string} */
	let hours = generateHoursArray();

	/** @type {string} */
	let availableTimeFrom= "";

	/** @type {string} */
	let availableTimeTo= "";

	/** @type {string} */
	let preferredShiftFrom = null;

	/** @type {string} */
	let preferredShiftTo = null;


	function generateHoursArray() {
		const date = startOfDay(new Date());
		let hoursArray = [];

		for (let i = 0; i < 24; i++) {
			const hour = addHours(date, i);
			hoursArray.push(hour);
		}
		return hoursArray;
	}

	async function handleSubmit() {
		/*console.log('submit');
		console.log(availableTimeFrom);
		console.log(availableTimeTo);
		console.log(preferredShiftFrom);
		console.log(preferredShiftTo);*/
		/*createAvailability(uuid, modalData.title.toLowerCase(), availableTimeFrom, availableTimeTo,
			preferredShiftFrom, preferredShiftTo).then((availabilityData) => {
				console.log(availabilityData);

				getManagers().then((managerData) => {
					console.log(managerData);

					managerData.forEach((manager) => {
						createMAL(manager.id, availabilityData[0].id, 0).then((data) => {
							console.log(data);
							update();
						});
					});
				});
		});*/

		const availabilityData = await createAvailability(uuid, modalData.title.toLowerCase(), availableTimeFrom, availableTimeTo,
			preferredShiftFrom, preferredShiftTo);

		console.log(availabilityData);

		const managerData = await getManagers();
		console.log(managerData);

		for (const manager of managerData) {
			const data = await createMAL(manager.id, availabilityData[0].id, 0);
			console.log(data);
		}

		updateContent();
	}

</script>

<dialog id="addUserModal" class="modal" class:modal-open={isOpen}>

	<!-- Modal body -->
	<div class="modal-box">
		<h3 class="font-bold text-2xl">{modalData.title}</h3>

		<br>
		<p>For full-day availability, please leave the start time as 00:00 and end time as 23:00.</p>

		<div class="divider"></div>

		<form id="modalForm" on:submit={handleSubmit}>
			<div class="grid grid-cols-3 gap-1">
				<p class="flex items-center justify-center">Time Available</p>

				<select class="select select-bordered w-full max-w-xs" bind:value={availableTimeFrom}>
					{#each hours as hour}
						<option>{format(hour, "HH:mm")}</option>
					{/each}
				</select>

				<select class="select select-bordered w-full max-w-xs" bind:value={availableTimeTo}>
					{#each hours as hour}
						<option>{format(hour, "HH:mm")}</option>
					{/each}
				</select>
			</div>

			<br>

			<div class="grid grid-cols-3 gap-1">
				<p class="flex items-center justify-center">Preferred Shift</p>

				<select class="select select-bordered w-full max-w-xs" bind:value={preferredShiftFrom}>
					{#each hours as hour}
						<option>{format(hour, "HH:mm")}</option>
					{/each}
				</select>

				<select class="select select-bordered w-full max-w-xs" bind:value={preferredShiftTo}>
					{#each hours as hour}
						<option>{format(hour, "HH:mm")}</option>
					{/each}
				</select>
			</div>
		</form>


		<div class="divider"></div>

		<div class="modal-action">
			<button class="btn btn-error" on:click={toggleModal}>Close</button>
			<button class="btn btn-success text-white" type="submit" form="modalForm"
							on:submit={handleSubmit}>Submit</button>
		</div>

	</div>
</dialog>