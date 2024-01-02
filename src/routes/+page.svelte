<script>

import Card from '$lib/Card.svelte';
</script>

<div class="mx-auto p-8 space-y-8 bg-white">
	<h1 class="h1 font-bold">SCHEDULE</h1>
	<div class="grid grid-cols-3">
		<section>L</section>
		<section>Date</section>
		<section>R</section>
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
