<script>
	import { addHours, format, startOfDay } from 'date-fns';

	/**
	 * @type {Date[]}
	 */
	let hours = generateHoursArray();

	const tmp = [
		{ name: 'John', schedule: [{ start: 8, end: 16 }] }
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
						{#if hour.getHours() >= 8 && hour.getHours() <= 16}
							<td class="w-10 border-r-2 border-black">{getScheduleData(hour, schedule)}</td>
						{:else}
							<td class="w-10 border-r-2 border-black"></td>
						{/if}
					{/each}
					<td></td>
				</tr>
			{/each}
		</table>
	</div>
</div>
