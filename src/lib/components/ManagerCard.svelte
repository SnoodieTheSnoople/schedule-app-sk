<script>
	import { goto } from '$app/navigation';

	/**
	 * @type {string}
	 */
	export let title;

	/**
	 * @type {string}
	 */
	export let total_employeess;

	/**
	 * @type {Date}
	 */
	export let date;

	function handleBtnClick() {
		goto('/calendar', )
	}

</script>

<div class="card w-full h-20 grid grid-cols-10 border-2 border-accent bg-base-100">
	<div class="rounded-tl-lg rounded-bl-lg border-r-2 border-black col-span-2 bg-accent flex items-center justify-center">
		<div class="card-title">
			<h2 class="text-white">{title}</h2>
		</div>
	</div>
	<div class="col-span-7 grid grid-cols-2 justify-center items-center">
		{#if total_employeess}
		<span class="pl-4">
			<b>Total Employees:</b> {total_employeess}
		</span>
		{:else}
			<span class="col-span-2 text-center">
				No schedule available for this day.
			</span>
		{/if}
	</div>
	{#if total_employeess}
		<div class="col-span-1 flex items-center justify-center">
			<button class="btn bg-accent text-white">VIEW</button>
		</div>
	{/if}
</div>