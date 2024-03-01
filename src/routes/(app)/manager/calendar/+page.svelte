<script>
	import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';
	import * as supabaseCommands from '$lib/supabaseCommands.js';
	import ManagerCard from '$lib/components/ManagerCard.svelte';
	import { getManagerOnUUID } from '$lib/supabaseCommands.js';

	export let data;

	let d = new Date();
	let start = format(startOfWeek(d, {weekStartsOn: 1}), "dd MMMM yyyy");
	let end = format(endOfWeek(d, {weekStartsOn: 1}), "dd MMMM yyyy");

	/** @type {string[]} */
	let dates = [];

	/** @type {number[]} */
	let totalEmployees = [];

	/** @type {{date: string, totalEmployees: number}[]} */
	let combinedDateEmployeeCount = {};

	let isManager = false;

	generateDays();
	getTotalEmployees();
	combineDateAndCount();

	function nextWeek() {
		start = format(startOfWeek(d.setDate(d.getDate() + 7), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
		dates = [];
		totalEmployees = [];
		generateDays();
		getTotalEmployees();
	}

	function lastWeek() {
		start = format(startOfWeek(d.setDate(d.getDate() - 7), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
		dates = [];
		totalEmployees = [];
		generateDays();
		getTotalEmployees();
	}

	function currentWeek() {
		d = new Date();
		start = format(startOfWeek(new Date(), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(new Date(), {weekStartsOn: 1}), "dd MMMM yyyy");
		dates = [];
		totalEmployees = [];
		generateDays();
		getTotalEmployees();
	}

	function checkManager() {
		// console.log(data.session?.user.id);
		getManagerOnUUID(data.session?.user.id).then((result) => {
			if (result.length === 0) {
				isManager = false;
			}
			else {
				isManager = true;
			}
		});
	}

	function generateDays() {
		for (let i = 0; i < 7; i++) {
			dates.push(format(addDays(start, i), "dd MMMM yyyy"));
		}
		// outputDates();
	}

	async function getTotalEmployees() {
		//Get schedules and count.
		for (let i = 0; i < dates.length; i++) {
			let schedule = await supabaseCommands.getSchedules(dates[i]);
			if (Object.entries(schedule).length === 0) {
				totalEmployees.push(0);
				// console.log(0);
			} else {
				// console.log(Object.entries(schedule).length);
				totalEmployees.push(Object.entries(schedule).length);
			}
			// console.log(i);
			// console.log(schedule);
		}
		combineDateAndCount();
	}

	function combineDateAndCount() {
		combinedDateEmployeeCount = dates.map((date, index) => ({
			date: date,
			totalEmployees: totalEmployees[index]
		}));
	}

	function outputDates() {
		console.log(dates);
	}

	checkManager();

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">CALENDAR</h1>
	{#if isManager}
		<div class="grid grid-cols-3">
			<button class="btn text-end" on:click={lastWeek}>Last Week</button>
			<p class="text-center"><b>{start} - {end}</b></p>
			<button class="btn text-start" on:click={nextWeek}>Next Week</button>
		</div>
		<button class="btn text-center" on:click={currentWeek}>Current Date</button>


		{#key combinedDateEmployeeCount}
			{#each combinedDateEmployeeCount as dateAndCount}
				<ManagerCard title="{format(dateAndCount.date, 'EEEE').toLowerCase()}"
										 total_employees={dateAndCount.totalEmployees}
										 date="{format(dateAndCount.date, 'yyyy-MM-dd')}"/>
		<!--		<p>{day}</p>
				<p>{format(day, "yyyy-MM-dd")}</p>-->
			{/each}
		{/key}

	{:else}
		<p class="text-center">You are not authorised to view the contents of this page.</p>
	{/if}
</div>
