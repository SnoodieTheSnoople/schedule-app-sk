<script>
	import Modal from '$lib/components/Modal.svelte';
	import { addHours, format, parse, startOfDay } from 'date-fns';
	import * as supabaseCommands from '$lib/supabaseCommands.js';

	export let data;

	const employees = data.employees;

	let schedules = data.schedules;
	const availabilities = data.availabilities;

	/** @type {string} */
	const day = data.props.title;

	/** @type {string} */
	const date = data.props.date;

	/** @type {boolean} */
	let showModal = false;

	/** @type {number} */
	let action = -1;

	/** @type {Date[]} */
	let hours = generateHoursArray();

	let combinedEmployeeSchedule = {};
	combineEmployeeAndScheduleObjects();

	function combineEmployeeAndScheduleObjects() {
		if (Object.entries(schedules).length !== 0) {
			/*combinedEmployeeSchedule = employees.map((employee, index) => ({
				emp_id: employee.id,
				name: `${employee.users.firstname} ${employee.users.surname}`,
				// Doesn't render if empty or Internal Error 500.
				time_from: schedules[index].time_from,
				time_to: schedules[index].time_to
			}));*/

			combinedEmployeeSchedule = schedules.map((schedule, index) => ({
				emp_id: schedule.emp_id,
				time_from: schedule.time_from,
				time_to: schedule.time_to,
				name: schedule.emp_id === employees[index].id ?
					`${employees[index].users.firstname} ${employees[index].users.surname}` : ""
			}));
		} else {
			combinedEmployeeSchedule = {};
		}
	}

	async function updateTable() {
		schedules = await supabaseCommands.getSchedules(date);
		combineEmployeeAndScheduleObjects();
		// console.log(combinedEmployeeSchedule);
	}

	/**
	 * @param hour {Date}
	 * @param schedule {Object[]}
	 * @return {boolean}
	 */
	function populateScheduleTable(hour, schedule) {
		const timeFrom = schedule.time_from.split('+');
		const startHour = parse(timeFrom[0], 'HH:mm:ss', date).getHours();
		// console.log(date);
		// console.log(timeFrom);
		const timeTo = schedule.time_to.split('+');
		const endHour = parse(timeTo[0], 'HH:mm:ss', date).getHours();
		// console.log(timeTo);

		return hour.getHours() >= startHour && hour.getHours() <= endHour;

	}

	/** @return {Date[]} */
	function generateHoursArray() {
		const date = startOfDay(new Date());
		let hoursArray = [];

		for (let i = 0; i < 24; i++) {
			const hour = addHours(date, i);
			hoursArray.push(hour);
		}
		return hoursArray;
	}

	function toggleAddModal() {
		//addModalOpen = !addModalOpen;
		showModal = !showModal;
		action = 1;
	}

	function toggleRemoveModal() {
		//removeModalOpen = !removeModalOpen;
		showModal = !showModal;
		action = 0;
	}

	function toggleEditModal() {
		showModal = !showModal;
		action = 2;
	}

	function closeModal() {
		action = -1;
	}

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">

	<!-- Main Body -->
	<!-- Grid layout made due to the header moving down when the modal appears on the screen if the condition is met. -->
	<div class="grid grid-cols-2">
		<h1 class="h1 font-bold">{day.toUpperCase()}</h1>
		{#if action !== -1}
			<Modal hours="{hours}" date="{date}" employees="{employees}" schedule="{schedules}" availabilities="{availabilities}" toggleModal="{closeModal}" modalType="{action}" updateTable="{updateTable}"/>
		{/if}

	</div>

	<!-- Toggle Modal Button-->
	<div>
		<button class="btn btn-error text-white" on:click={ toggleRemoveModal }>Remove</button>
		<button class="btn btn-info text-white" on:click={ toggleEditModal }>Edit</button>
		<button class="btn btn-success text-white" on:click={ toggleAddModal }>Add</button>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="table table-pin-rows table-pin-cols">
			<thead>
				<tr>
					<th></th>
					<td class="w-10 border-r-2 border-gray-300">Name</td>
					{#each hours as hour}
						<td class="w-10 border-r-2 border-black">{format(hour, "HH:mm")}</td>
					{/each}
					<th></th>
				</tr>
			</thead>

			<tbody>
			{#key combinedEmployeeSchedule}
			{#if Object.entries(combinedEmployeeSchedule).length !== 0}
				{#each combinedEmployeeSchedule as empSchedule}
					<tr>
						<td></td>
						<td class="w-10 border-r-2 border-black">{empSchedule.name}</td>

						{#each hours as hour}
							{#if populateScheduleTable(hour, empSchedule) === true}
								<td class="w-10 border-black bg-blue-300"></td>
							{:else}
								<td class="w-10 border-2 border-black"></td>
							{/if}
						{/each}
					</tr>
				{/each}
				{:else if Object.entries(combinedEmployeeSchedule).length !== 0}
					<tr></tr>
			{/if}
			{/key}
		</table>
	</div>

</div>
