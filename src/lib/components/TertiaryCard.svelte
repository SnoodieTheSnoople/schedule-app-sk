<script>
	/**
	 * @type {string}
	 */
	export let title;

	/**
	 * @type {string}
	 */
	export let dateFrom;

	/**
	 * @type {string}
	 */
	export let dateTo;

	/**
	 * @type {string}
	 */
	export let status;

	/**
	 * @type {number}
	 */
	export let totalHours;
</script>

<div class="card w-full h-24 grid grid-cols-10 grid-rows-2 border-2 border-accent bg-base-100">
	<div class="col-span-9 row-span-1 grid grid-cols-9">
		<div class="card-title place-items-start pl-4 pt-2">
			<h3 class="h3 text-black">{title.toUpperCase()}</h3>
		</div>
		<div class="col-span-9 row-span-1 grid grid-cols-2 pl-4 pt-2">
			<span class="">
				<b>Date:</b> {dateFrom} - {dateTo}
			</span>

			<span class="">
				{totalHours} <b>hours</b>
			</span>
		</div>
	</div>
	<div class="col-span-1 row-span-2 flex items-center justify-center">
		{#if status === "ACCEPTED"}
			<p class="h4 text-green-500"><b>{status}</b></p>
		{:else if status === "DENIED"}
			<p class="h4 text-red-500"><b>{status}</b></p>
		{:else if status === "PENDING"}
		<p class="h4 text-gray-400"><b>{status}</b></p>
		{/if}
	</div>
</div>