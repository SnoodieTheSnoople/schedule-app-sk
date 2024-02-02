<script>
	import Card from '$lib/components/Card.svelte';
	import { endOfWeek, format, startOfWeek } from 'date-fns';
	import { getScheduleDateRange } from '$lib/supabaseCommands.js';
	import ScheduleModal from '$lib/components/ScheduleModal.svelte';

	export let data;

	/** @type {Object[]} */
	let schedule = [];

	/** @type {Date} */
	let d = new Date();
	/** @type {string} */
	let start = format(startOfWeek(d, {weekStartsOn: 1}), "dd MMMM yyyy");
	/** @type {string} */
	let end = format(endOfWeek(d, {weekStartsOn: 1}), "dd MMMM yyyy");

	/** @type {Map<string, Object>} */
	let combinedScheduleDates = new Map();

	/** @type {string[]} */
	let datesOfWeek = [];

	/** @type {boolean} */
	let showModal = false;

	/** @type {{title: string, left_content: string, right_content: string}} */
	let modalData = {title: '', left_content: '', right_content: ''}


	// PAGE FUNCTIONS

	function nextWeek() {
		start = format(startOfWeek(d.setDate(d.getDate() + 7), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
		generateDays();
		outputSchedule();
	}

	function lastWeek() {
		start = format(startOfWeek(d.setDate(d.getDate() - 7), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
		generateDays();
		outputSchedule();
	}

	function currentWeek() {
		d = new Date();
		start = format(startOfWeek(new Date(), {weekStartsOn: 1}), "dd MMMM yyyy");
		end = format(endOfWeek(new Date(), {weekStartsOn: 1}), "dd MMMM yyyy");
		generateDays();
		outputSchedule();
	}

	function outputSchedule() {
		getEmployeeSchedule().then((schedules) => {
			schedule = Array.isArray(schedules) ? schedules : Object.values(schedules);
			// console.log(schedules);

			combineScheduleAndDates();
			// console.log(combinedScheduleDates);

		});
	}

	/** @param {CustomEvent} event
	 * @return void
	 * */
	function toggleModal(event) {
		showModal = !showModal;
		// console.log(showModal);
		modalData = event.detail;
		// console.log(event.detail);
	}


	// DATA POPULATION

	async function getEmployeeSchedule() {
		//schedules = await getScheduleOnUUID(data.session?.user.id);
		console.log(data.session?.user.id);
		//return await getScheduleOnUUID(data.session?.user.id);
		return await getScheduleDateRange(data.session?.user.id, format(start, 'yyyy-MM-dd'), format(end, 'yyyy-MM-dd'));

	}

	function combineScheduleAndDates() {
		combinedScheduleDates = datesOfWeek.map((date) => {
			let scheduleDate = schedule.find((s) => s.date === date);
			return {date: date, schedule: scheduleDate || null};
		});
	}

	function generateDays() {
		datesOfWeek = [];
		for (let i = 0; i < 7; i++) {
			let tmpDate = new Date(start);
			datesOfWeek.push(format(tmpDate.setDate(tmpDate.getDate() + i), "yyyy-MM-dd"));
		}
		console.log(datesOfWeek);
	}


	generateDays();
	console.log(datesOfWeek);
	if (data.session) {
		getEmployeeSchedule().then((schedules) => {
			schedule = Array.isArray(schedules) ? schedules : Object.values(schedules);
			console.log(schedules);

			combineScheduleAndDates();
			console.log(combinedScheduleDates);
		});
	}
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<div class="grid grid-cols-2">
		<h1 class="h1 font-bold">SCHEDULE</h1>
		{#if showModal === true}
			<ScheduleModal toggleModal={toggleModal} modalData={modalData}/>
		{/if}
	</div>

	<div class="grid grid-cols-3">
		<button class="btn text-end" on:click={lastWeek}>L</button>
		<p class="text-center">{start} - {end}</p>
		<button class="btn text-start" on:click={nextWeek}>R</button>
	</div>
	<button class="btn text-center" on:click={currentWeek}>Current Date</button>

	{#key combinedScheduleDates}
		{#each combinedScheduleDates as csd}
			{#if csd.schedule !== null}
				<Card title={format(csd.date, "EEEE").toUpperCase()} left_content="{csd.schedule.time_from}"
							right_content="{csd.schedule.time_to}" on:open={toggleModal}/>
			{:else}
				<Card title={format(csd.date, "EEEE").toUpperCase()} left_content="" right_content=""/>
			{/if}
		{/each}
	{/key}
</div>
