<script>
	/** @type {string} */
	export let username

	/** @type {string[]} */
	export let availableDays;

</script>

<div class="card w-full h-24 grid grid-cols-10 grid-rows-2 border-2 border-accent bg-base-100">
	<div class="col-span-9 row-span-1 grid grid-cols-9">
		<div class="card-title col-span-9 place-items-start pl-4 pt-2">
			<h3 class="h3 text-black">{username.toUpperCase()}</h3>
		</div>
		<div class="col-span-9 pl-4 pt-2 w-full">
			<span class="">
				<b>Available Days: </b> {availableDays}
			</span>
		</div>
	</div>
	<div class="col-span-1 row-span-2 flex items-center justify-center">
		<button class="btn btn-primary">VIEW</button>
	</div>
</div>