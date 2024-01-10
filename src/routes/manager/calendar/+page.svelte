<script>
	import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';
	import ManagerCard from '$lib/components/ManagerCard.svelte';

	let d = new Date();
	let start = format(startOfWeek(d, {weekStartsOn: 1}), "dd MMMM yyyy");
	let end = format(endOfWeek(d, {weekStartsOn: 1}), "dd MMMM yyyy");
	let dates = [];

	function nextWeek() {
		start = format(startOfWeek(d.setDate(d.getDate() + 7), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
	}

	function lastWeek() {
		start = format(startOfWeek(d.setDate(d.getDate() - 7), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
	}

	function currentWeek() {
		d = new Date();
		start = format(startOfWeek(new Date(), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(new Date(), {weekStartsOn: 1}), "dd MMMM yyyy");
	}

	function generateDays() {
		let day = start;
		for (let i = 0; i < 7; i++) {
			dates.push(format(addDays(day, i), "dd MMMM yyyy"));
		}
		getDays();
	}

	function getDays() {
		console.log(dates)
	}
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">CALENDAR</h1>
	<div class="grid grid-cols-3">
		<button class="btn text-end" on:click={lastWeek}>L</button>
		<p class="text-center"><b>{start} - {end}</b></p>
		<button class="btn text-start" on:click={nextWeek}>R</button>
	</div>
	<button class="btn text-center" on:click={currentWeek}>Current Date</button>
	<button on:click={generateDays}>Press To Generate Days</button>
	<div id="daysOfWeek">
		{#if dates}
			{#each dates as day}
				<p>{day}</p>
			{/each}
		{/if}
	</div>


	<ManagerCard title="MONDAY" total_employeess="7"/>
	<ManagerCard title="TUESDAY" total_employeess="6"/>
	<ManagerCard title="WEDNESDAY" total_employeess="7"/>
	<ManagerCard title="THURSDAY" total_employeess="7"/>
	<ManagerCard title="FRIDAY" total_employeess="8"/>
	<ManagerCard title="SATURDAY" total_employeess="8"/>
	<ManagerCard title="SUNDAY" total_employeess="8"/>
</div>
