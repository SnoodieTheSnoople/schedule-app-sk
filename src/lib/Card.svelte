<script>
	/**
	 * @type {string}
	 */
	export let title;

	/**
	 * @type {string}
	 */
	export let left_content;

	/**
	 * @type {string}
	 */
	export let right_content;
</script>

<div class="card h-20 flex items-stretch">
	<div class="grid grid-cols-10 w-full">

		<div id="left-card-title" class="rounded-l-3xl bg-primary-500 col-span-1 flex items-center justify-center">
		{#if title}
			<h1 class="text-center text-white p-4">{title}</h1>
			{:else}
				<h1 class="text-center text-white p-4">Default</h1>
		{/if}
		</div>

		{#if left_content && right_content}
		<div class="col-span-8 grid grid-cols-2 p-2 flex items-center">
			<div class="col-span-1 p-2">
				<span class="text-center">Time From: {left_content}</span>
			</div>

			<div class="col-span-1 p-2">
				<span class="text-center">Time To: {right_content}</span>
			</div>
		</div>

			<div class="col-span-1 p-2 flex items-center justify-center">
				<button class="btn variant-filled-primary">View</button>
			</div>

		{:else}
			<div class="col-span-9 p-2 flex items-center justify-center">
				<span class="text-center">No schedule for this day.</span>
			</div>
		{/if}



	</div>
</div>