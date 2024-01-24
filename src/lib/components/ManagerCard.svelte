<script>
	import { goto } from '$app/navigation';

	/**
	 * @type {string}
	 */
	export let title;

	/**
	 * @type {number}
	 */
	export let total_employees;

	/**
	 * @type {String}
	 */
	export let date;

	function handleBtnClick() {
		goto(`calendar/${title}/${date}`)
	}

</script>

<div class="card w-full h-20 grid grid-cols-10 border-2 border-accent bg-base-100">
	<div class="rounded-tl-lg rounded-bl-lg border-r-2 border-black col-span-2 bg-accent flex items-center justify-center">
		<div class="card-title">
			<h2 class="text-white">{title.toUpperCase()}</h2>
		</div>
	</div>
	<div class="col-span-7 grid grid-cols-2 justify-center items-center">
		{#if total_employees}
		<span class="pl-4">
			<b>Total Employees:</b> {total_employees}
		</span>
		{:else}
			<span class="col-span-2 text-center">
				Nobody scheduled for this day.
			</span>
		{/if}
	</div>
		<div class="col-span-1 flex items-center justify-center">
			<button class="btn bg-accent text-white" on:click={() => handleBtnClick()}>VIEW</button>
		</div>
</div>