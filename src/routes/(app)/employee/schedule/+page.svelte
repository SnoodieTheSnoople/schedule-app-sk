<script>
	import Card from '$lib/components/Card.svelte';
	import { endOfWeek, format, startOfWeek } from 'date-fns';
	import { getScheduleDateRange } from '$lib/supabaseCommands.js';

	export let data;

	/** @type {Object[]} */
	let schedule = {};

	let d = new Date();
	let start = format(startOfWeek(d, {weekStartsOn: 1}), "dd MMMM yyyy");
	let end = format(endOfWeek(d, {weekStartsOn: 1}), "dd MMMM yyyy");

	async function getEmployeeSchedule() {
		//schedules = await getScheduleOnUUID(data.session?.user.id);
		console.log(data.session?.user.id);
		//return await getScheduleOnUUID(data.session?.user.id);
		return await getScheduleDateRange(data.session?.user.id, format(start, 'yyyy-MM-dd'), format(end, 'yyyy-MM-dd'));
		//return await getScheduleDateRange(data.session?.user.id, '2024-01-15', '2024-01-22');
	}

	function nextWeek() {
		start = format(startOfWeek(d.setDate(d.getDate() + 7), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
		outputSchedule();
	}

	function lastWeek() {
		start = format(startOfWeek(d.setDate(d.getDate() - 7), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
		outputSchedule();
	}

	function currentWeek() {
		d = new Date();
		start = format(startOfWeek(new Date(), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(new Date(), {weekStartsOn: 1}), "dd MMMM yyyy");
		outputSchedule();
	}

	function outputSchedule() {
		schedule = getEmployeeSchedule().then((schedules) => {
			console.log(schedules)
		});
	}

	// Upon page load.
	if (data.session) {
		schedule = getEmployeeSchedule().then((schedules) => {
			console.log(schedules);
		});
	}
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">SCHEDULE</h1>
	<div class="grid grid-cols-3">
		<button class="btn text-end" on:click={lastWeek}>L</button>
		<p class="text-center">{start} - {end}</p>
		<button class="btn text-start" on:click={nextWeek}>R</button>
	</div>
	<button class="btn text-center" on:click={currentWeek}>Current Date</button>

	<!-- TODO: Iterate through collection of schedule and generate card data.
	For title use date format(date, 'dddd' or 'EEEE').toUpperCase() -->
	<Card title="MONDAY"/>
	<Card title="TUESDAY"/>
	<Card title="WEDNESDAY"/>
	<Card title="THURSDAY" left_content="13:00" right_content="20:00"/>
	<Card title="FRIDAY" left_content="13:00" right_content="20:00"/>
	<Card title="SATURDAY" left_content="13:00" right_content="20:00"/>
	<Card title="SUNDAY" left_content="13:00" right_content="20:00"/>
</div>
