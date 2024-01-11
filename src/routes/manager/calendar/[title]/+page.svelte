<script>
	import { addHours, format, startOfDay } from 'date-fns';

	/**
	 * @type {Date[]}
	 */
	let hours = generateHoursArray();

	const tmp = [
		{ name: 'John', schedule: [{ start: 8, end: 16 }] },
		{ name: 'Mary', schedule: [{ start: 9, end: 17 }] },
		{ name: 'Chris', schedule: [{ start: 8, end: 16 }] },
	];

	/**
	 * @return {Date[]}
	 */
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
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">DAY</h1>

	<!-- Open the modal using ID.showModal() method -->
	<button class="btn" onclick="addUserModal.showModal()">Add</button>

	<dialog id="addUserModal" class="modal">
		<div class="modal-box">
			<h3 class="font-bold text-lg">Add Employee</h3>

			<form>
				<div class="grid grid-cols-3">
					<p class="flex items-center justify-center">Employee</p>
					<select class="select select-accent w-full max-w-xs col-span-2">
						<option>Select Employee</option>
						{#each tmp as { name }}
							<option>{name}</option>
						{/each}
					</select>
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Availability</p>
					<input type="text" placeholder="Placeholder" class="input input-bordered w-full max-w-xs" disabled />
					<input type="text" placeholder="Placeholder" class="input input-bordered w-full max-w-xs" disabled />
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Preferred Shift</p>
					<input type="text" placeholder="Placeholder" class="input input-bordered w-full max-w-xs" disabled />
					<input type="text" placeholder="Placeholder" class="input input-bordered w-full max-w-xs" disabled />
				</div>

				<div class="divider"></div>

				<div class="grid grid-cols-3 gap-1">
					<p class="flex items-center justify-center">Time Block</p>
					<select class="select select-accent w-full max-w-xs">
						<option>Time Start</option>
						{#each hours as hour}
							<option>{hour}</option>
						{/each}
					</select>

					<select class="select select-accent w-full max-w-xs">
						<option>Time End</option>
						{#each hours as hour}
							<option>{hour}</option>
						{/each}
					</select>
				</div>
			</form>

			<div class="modal-action">
				<form method="dialog">
					<!-- if there is a button in form, it will close the modal -->
					<button class="btn btn-error">Close</button>
					<button class="btn btn-success">Submit</button>
				</form>
			</div>
		</div>
	</dialog>

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
			{#each tmp as { name, schedule }}
				<tr>
					<td></td>
					<td class="w-10 border-r-2 border-black">{name}</td>
					{#each hours as hour}
						{#if getScheduleData(hour, schedule) === true}
							<td class="w-10 border-black bg-blue-300"></td>
							{:else}
							<td class="w-10 border-2 border-black"></td>
						{/if}
					{/each}
					<td></td>
				</tr>
			{/each}
		</table>
	</div>

</div>
