<script>

	import { addHours, format, startOfDay } from 'date-fns';

	/** @type {function(): void}*/
	export let toggleModal;

	/** @type {{title: string}} */
	export let modalData;

	/** @type {boolean} */
	let isOpen = true;

	/** @type {string} */
	let hours = generateHoursArray();

	/** @type {string} */
	let availableTimeFrom= "";

	/** @type {string} */
	let availableTimeTo= "";

	/** @type {string} */
	let preferredShiftFrom= "";

	/** @type {string} */
	let preferredShiftTo= "";


	function generateHoursArray() {
		const date = startOfDay(new Date());
		let hoursArray = [];

		for (let i = 0; i < 24; i++) {
			const hour = addHours(date, i);
			hoursArray.push(hour);
		}
		return hoursArray;
	}

	function handleSubmit() {
		console.log('submit');
		console.log(availableTimeFrom);
		console.log(availableTimeTo);
		console.log(preferredShiftFrom);
		console.log(preferredShiftTo);
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