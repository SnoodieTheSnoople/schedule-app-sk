<script>
import Card from '$lib/Card.svelte';
import { endOfWeek, format, startOfWeek } from 'date-fns';

// Temporary variables
const d = new Date();
const currentDate = d;
let changeDate = d;

let start = format(startOfWeek(changeDate, {weekStartsOn: 1}), "dd MMMM yyyy");
let end = format(endOfWeek(changeDate, {weekStartsOn: 1}), "dd MMMM yyyy");

function nextWeek() {
	start = format(startOfWeek(d.setDate(d.getDate() + 7), {weekStartsOn: 1}), "dd MMMM yyyy");
	end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
}

function lastWeek() {
	start = format(startOfWeek(d.setDate(d.getDate() - 7), {weekStartsOn: 1}), "dd MMMM yyyy");
	end = format(endOfWeek(d.setDate(d.getDate()), {weekStartsOn: 1}), "dd MMMM yyyy");
}
</script>

<div class="mx-auto p-8 space-y-8 w-full bg-white">
	<h1 class="h1 font-bold">SCHEDULE</h1>
	<div class="grid grid-cols-3">
		<button class="btn text-end" on:click={lastWeek}>L</button>
		<p class="text-center">{start} - {end}</p>
		<button class="btn text-start" on:click={nextWeek}>R</button>
	</div>

	<Card title="MONDAY"/>
	<Card title="TUESDAY"/>
	<Card title="WEDNESDAY"/>
	<Card title="THURSDAY" left_content="13:00" right_content="20:00"/>
	<Card title="FRIDAY" left_content="13:00" right_content="20:00"/>
	<Card title="SATURDAY" left_content="13:00" right_content="20:00"/>
	<Card title="SUNDAY" left_content="13:00" right_content="20:00"/>
	<Card />
</div>
