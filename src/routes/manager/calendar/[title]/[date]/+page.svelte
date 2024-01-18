<script>
	import { addHours, format, parse, startOfDay } from 'date-fns';
	import { createSchedule } from '$lib/supabaseCommands.js';

	export let data;

	const employees = data.employees;
	const schedules = data.schedules;
	const availabilities = data.availabilities;

	/** @type {string} */
	const day = data.props.title;

	/** @type {string} */
	const date = data.props.date;

	/** @type {boolean} */
	let isOpen = false;

	/** @type {boolean} */
	let showErrorAlert = false;

	/** @type {boolean} */
	let showSuccessAlert = false;

	/** @type {string} */
	let selectedEmployee = "";

	/** @type {object} */
	let employeeAvailability = {};

	/** @type {string} */
	let newShiftTimeFrom = "";

	/** @type {string} */
	let newShiftTimeTo = "";

	/** @type {Date[]} */
	let hours = generateHoursArray();


	let combinedEmployeeSchedule = employees.map((employee, index) => ({
		emp_id: employee.id,
		name: `${employee.users.firstname} ${employee.users.surname}`,
		time_from: schedules[index].time_from,
		time_to: schedules[index].time_to
	}));

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

		if (hour.getHours() >= startHour && hour.getHours() <= endHour) return true;
		return false;
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

	/**
	 * @param hour {Date}
 	 * @param schedule {{start: number, end: number}[]}
	 * @return {boolean}
	 */
	function getScheduleData(hour, schedule) {
		const cellEntry = schedule.find(
			x => hour.getHours() >= x.start && hour.getHours() <= x.end
		);
		return !!cellEntry;
	}

	function fillEmployeeAvailability(event) {
		selectedEmployee = event.target.value;
		employeeAvailability = availabilities.find(x => x.employees.id === selectedEmployee);
	}

	function toggleModal() {
		isOpen = !isOpen;
	}

	function handleSubmit() {
		try {
			createSchedule(selectedEmployee, date, newShiftTimeFrom, newShiftTimeTo).then( data => {
				if (data !== null) {
					console.log("Success!", data);
					toggleModal();
					showSuccessAlert = !showSuccessAlert;
				} else {
					console.log("Error. Unable to insert data.");
					showErrorAlert = !showErrorAlert;
				}
			}).catch(error => {
				console.error("Error!", error);
			});
		} catch (e) {
			console.error(e);
		}
	}

	function handleChange() {
		console.log(newShiftTimeFrom);
		console.log(newShiftTimeTo);
	}
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">

	<!-- Modal -->
	<dialog id="addUserModal" class="modal" class:modal-open={isOpen}>

		<!-- Alert -->
		<div role="alert" class="alert alert-error absolute top-0 left-0 w-full p-4 bg-red-500 text-white" class:hidden={!showErrorAlert}>
			<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			<span>Error! Failed to insert data.</span>
		</div>

		<div role="alert" class="alert alert-success absolute top-0 left-0 w-full p-4 bg-red-500 text-white" class:hidden={!showSuccessAlert} >
			<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
			<span>Your purchase has been confirmed!</span>
		</div>

		<!-- Modal body -->
		<div class="modal-box">
			<h3 class="font-bold text-lg">Add Employee</h3>

			<form id="modalForm" on:submit={handleSubmit}>
				<div class="grid grid-cols-3">
					<p class="flex items-center justify-center">Employee</p>
					<select id="employeeSelection" class="select select-accent w-full max-w-xs col-span-2" bind:value={selectedEmployee} on:change={fillEmployeeAvailability}>
						<option>Select Employee</option>
						{#each employees as employee}
							<option value="{employee.id}">{employee.users.firstname} {employee.users.surname}</option>
						{/each}
					</select>
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Availability</p>
					<input type="text" value="{employeeAvailability.available_time_from}" class="input input-bordered w-full max-w-xs" disabled />
					<input type="text" value="{employeeAvailability.available_time_to}" class="input input-bordered w-full max-w-xs" disabled />
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Preferred Shift</p>
					<input type="text" value="{employeeAvailability.preferred_time_from}" class="input input-bordered w-full max-w-xs" disabled />
					<input type="text" value="{employeeAvailability.preferred_time_to}" class="input input-bordered w-full max-w-xs" disabled />
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Time Block</p>
					<select class="select select-accent w-full max-w-xs" bind:value={newShiftTimeFrom}>
						<option>Time Start</option>
						{#each hours as hour}
							<option>{format(hour, "HH:mm")}</option>
						{/each}
					</select>

					<select class="select select-accent w-full max-w-xs" bind:value={newShiftTimeTo} on:change={handleChange}>
						<option>Time End</option>
						{#each hours as hour}
							<option>{format(hour, "HH:mm")}</option>
						{/each}
					</select>
				</div>
			</form>

			<div class="modal-action">
				<form method="dialog">
					<button class="btn btn-error" on:click={toggleModal}>Close</button>
					<button class="btn btn-success" type="submit" form="modalForm" on:submit={handleSubmit}>Submit</button>
				</form>
			</div>
		</div>
	</dialog>


	<!-- Main Body -->
	<h1 class="h1 font-bold">{day.toUpperCase()}</h1>

	<!-- Toggle Modal Button-->
	<button class="btn" on:click={toggleModal}>Add</button>

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
		</table>
	</div>

</div>
