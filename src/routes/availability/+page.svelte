<script>
import SecondaryCard from '$lib/components/SecondaryCard.svelte';
</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">AVAILABILITY</h1>
	<button class="btn btn-primary">New Availability</button>

	<SecondaryCard title="MONDAY"/>
	<SecondaryCard title="TUESDAY"/>
	<SecondaryCard title="WEDNESDAY"/>
	<SecondaryCard title="THURSDAY" left_content="13:00" right_content="20:00"/>
	<SecondaryCard title="FRIDAY" left_content="13:00" right_content="20:00"/>
	<SecondaryCard title="SATURDAY" left_content="13:00" right_content="20:00"/>
	<SecondaryCard title="SUNDAY" left_content="13:00" right_content="20:00"/>
</div>
