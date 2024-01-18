<script>
	import Modal from '$lib/components/Modal.svelte';
	import { addHours, format, parse, startOfDay } from 'date-fns';

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

	function toggleModal() {
		isOpen = !isOpen;
	}

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">

	<!-- Main Body -->
	<div class="grid grid-cols-2">
		<h1 class="h1 font-bold">{day.toUpperCase()}</h1>
		{#if isOpen}
			<Modal hours="{hours}" date="{date}" employees="{employees}" availabilities="{availabilities}" toggleModal="{toggleModal}"/>
		{/if}

	</div>

	<!-- Toggle Modal Button-->
	<button class="btn" on:click={() => isOpen = true}>Add</button>

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
