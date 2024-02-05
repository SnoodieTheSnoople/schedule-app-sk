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

	/**
	 * @type {string}
	 */
	export let bottom_content;
</script>

<div class="card w-full h-20 grid grid-cols-10 border-2 border-accent bg-base-100">
	<div class="rounded-tl-lg rounded-bl-lg border-r-2 border-black col-span-2 bg-accent flex items-center justify-center">
		<div class="card-title">
			<h2 class="text-white">{title}</h2>
		</div>
	</div>
	<div class="col-span-8 grid grid-cols-2 justify-center items-center">
		{#if left_content !== "" && right_content !== "" && bottom_content !== ""}
		<span class="pl-4 col-span-1">
			<b>Available From:</b> {left_content}
		</span>
		<span class="pl-4 col-span-1">
			<b>Available To:</b> {right_content}
		</span>

		<span class="pl-4 col-span-1">
			<b>Preferred Shift:</b> {bottom_content}
		</span>

		{:else}
		<span class="col-span-2 text-center">
			No availability for this day.
		</span>
		{/if}
	</div>
</div>