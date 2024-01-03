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

<div class="card w-full h-20 grid grid-cols-10 shadow-xl">
	<div class="rounded-tl-lg rounded-bl-lg border-r-2 border-black col-span-2 bg-red-200 flex items-center justify-center">
		<div class="card-title">
			<h2 class="">{title}</h2>
		</div>
	</div>
	<div class="col-span-7 grid grid-cols-2 justify-center items-center">
		{#if left_content && right_content}
		<span class="pl-4">
			<b>Time Start:</b> {left_content}
		</span>
		<span class="pl-4">
			<b>Time End:</b> {right_content}
		</span>

		{:else}
			<span class="col-span-2 text-center">
				No schedule available for this day.
			</span>
		{/if}
	</div>
	<div class="col-span-1 flex items-center justify-center">
		<button class="btn">VIEW</button>
	</div>
</div>