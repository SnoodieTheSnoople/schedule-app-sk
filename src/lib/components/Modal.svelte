<script>
	import { format } from 'date-fns';
	import * as commands from '$lib/supabaseCommands.js';

	/** @type {Date[]} */
	export let hours;

	/** @type {Date} */
	export let date;

	/** @type {Object} */
	export let employees;
	export let schedule;

	export let availabilities;

	/** @type {function(): void} */
	export let toggleModal;

	/** @type {number} */
	export let modalType;

	/** @type {function(): void} */
	export let updateTable;

	/** @type {string} */
	let title = createTitle();


	/** @type {boolean} */
	let isOpen = true;

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

	let employeeSchedule = {};

	/*function toggleModal() {
		isOpen = !isOpen;
	}*/

	function createTitle() {
		if (modalType === 1) return "Add";
		else if (modalType === 2) return "Edit";
		else if (modalType === 0) return "Remove";
	}

	function fillReadonlyFields(event) {
		selectedEmployee = event.target.value;
		fillEmployeeAvailability();
		fillEmployeeCurrentSchedule();
	}

	function fillEmployeeAvailability() {
		// selectedEmployee = event.target.value;
		employeeAvailability = availabilities.find(x => x.employees.id === selectedEmployee ? x : null);
		console.log(employeeAvailability)
	}

	function fillEmployeeCurrentSchedule() {
		// selectedEmployee = event.target.value;
		employeeSchedule = schedule.find(x => x.emp_id === selectedEmployee);
	}

	function handleSubmit() {
		if (modalType === 1 || modalType === 2) {
			insertNewSchedule();
		} else if (modalType === 0) {
			removeEmployee();
		}
		/*try {
			commands.createSchedule(selectedEmployee, date, newShiftTimeFrom, newShiftTimeTo).then( data => {
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
		}*/

	}

	function insertNewSchedule() {
		commands.createSchedule(selectedEmployee, date, newShiftTimeFrom, newShiftTimeTo).then( data => {
			if (data !== null) {
				console.log("Success!", data);
				updateTable();
				toggleModal();
				showSuccessAlert = !showSuccessAlert;
			} else {
				console.log("Error. Unable to insert data.");
				showErrorAlert = !showErrorAlert;
			}
		}).catch(error => {
			console.error("Error!", error);
		});
	}

	function removeEmployee() {
		try {
			console.log(selectedEmployee.toString());
			commands.removeSchedule(selectedEmployee.toString(), date)
			updateTable();
			toggleModal();
		} catch (error) {
			console.error(error);
		}
		updateTable;
	}

	function editEmployee() {

	}

	function handleChange() {
		console.log(newShiftTimeFrom);
		console.log(newShiftTimeTo);
	}

	console.log(availabilities);
</script>

<dialog id="addUserModal" class="modal" class:modal-open={isOpen}>

<!-- Alert -->
	<div role="alert" class="alert alert-error absolute top-0 left-0 w-full p-4 bg-red-500 text-white" class:hidden={!showErrorAlert}>
		<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
		<span>Error! Failed to insert data.</span>
	</div>

	<div role="alert" class="alert alert-success absolute top-0 left-0 w-full p-4 bg-red-500 text-white" class:hidden={!showSuccessAlert} >
		<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
		<span>Successfully inserted data!</span>
	</div>

	<!-- Modal body -->
	<div class="modal-box">
		<h3 class="font-bold text-lg">{title} Employee</h3>
<!--		<p>{date.toString()}</p>-->

		<form id="modalForm" on:submit={handleSubmit}>

			{#if modalType === 1 || modalType === 2}
				<div class="grid grid-cols-3">
					<p class="flex items-center justify-center">Employee</p>
					<select id="employeeSelection" class="select select-accent w-full max-w-xs col-span-2" bind:value={selectedEmployee} on:change={fillReadonlyFields}>
						{#each employees as employee}
							{#if !schedule.find(emp => emp.emp_id === employee.id)}
								<option value="{employee.id}">{employee.users.firstname} {employee.users.surname}</option>
							{/if}
						{/each}
					</select>
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Availability</p>
					{#if employeeAvailability === undefined}
						<input type="text" value="Not Available" class="input input-bordered w-full max-w-xs" disabled />
						<input type="text" value="Not Available" class="input input-bordered w-full max-w-xs" disabled />
					{:else}
						<input type="text" value="{employeeAvailability.available_time_from}" class="input input-bordered w-full max-w-xs" disabled />
						<input type="text" value="{employeeAvailability.available_time_to}" class="input input-bordered w-full max-w-xs" disabled />
					{/if}
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Preferred Shift</p>
					{#if employeeAvailability === undefined}
						<input type="text" value="Not Available" class="input input-bordered w-full max-w-xs" disabled />
						<input type="text" value="Not Available" class="input input-bordered w-full max-w-xs" disabled />
					{:else}
						<input type="text" value="{employeeAvailability.preferred_time_from}" class="input input-bordered w-full max-w-xs" disabled />
						<input type="text" value="{employeeAvailability.preferred_time_to}" class="input input-bordered w-full max-w-xs" disabled />
					{/if}
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

			{/if}


			{#if modalType === 0}

				<div class="grid grid-cols-3">
					<p class="flex items-center justify-center">Employee</p>
					<select id="employeeSelection" class="select select-accent w-full max-w-xs col-span-2" bind:value={selectedEmployee} on:change={fillReadonlyFields}>
						<!--					<option>Select Employee</option>	Will throw TypeError.-->
						{#each employees as employee}
							{#if schedule.find(emp => emp.emp_id === employee.id)}
								<option value="{employee.id}">{employee.users.firstname} {employee.users.surname}</option>
							{/if}
						{/each}
					</select>
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Shift From</p>
					<input type="text" value="{employeeSchedule.time_from}" class="input input-bordered w-full max-w-xs" disabled />
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Shift To</p>
					<input type="text" value="{employeeSchedule.time_to}" class="input input-bordered w-full max-w-xs" disabled />
				</div>
			{/if}
		</form>

		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-error" on:click={toggleModal}>Close</button>
				<button class="btn btn-success" type="submit" form="modalForm" on:submit={handleSubmit}>Submit</button>
			</form>
		</div>

	</div>
</dialog>