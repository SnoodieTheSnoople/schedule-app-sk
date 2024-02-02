<script>

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

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

	let cardData = {
		title: title,
		left_content: left_content,
		right_content: right_content
	}

	function handleClick() {
		console.log("clicked");
		dispatch('open', cardData);
	}
</script>

<div class="card w-full h-20 grid grid-cols-10 border-2 border-accent bg-base-100">
	<div class="rounded-tl-lg rounded-bl-lg border-r-2 border-black col-span-2 bg-accent flex items-center justify-center">
		<div class="card-title">
			<h2 class="text-white">{title}</h2>
		</div>
	</div>
	<div class="col-span-7 grid grid-cols-2 justify-center items-center">
		{#if left_content !== "" && right_content !== ""}
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
	{#if left_content && right_content}
	<div class="col-span-1 flex items-center justify-center">
		<button class="btn bg-accent text-white" on:click={handleClick}>VIEW</button>
	</div>
	{/if}
</div>