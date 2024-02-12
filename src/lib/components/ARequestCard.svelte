<script>

	/** @type {string} */
	export let username

	/** @type {Object[]} */
	export let empDataRequest;

	/** @type {string[]} */
	let availableDays = [];
	
	function handleBtnClick() {
		console.log('Button clicked');
	}

	empDataRequest.forEach(request => {
		console.log(request.day);
		availableDays.push(request.day.charAt(0).toUpperCase() + request.day.slice(1));
	});

	console.log(availableDays);

</script>

<div class="card w-full h-24 grid grid-cols-10 grid-rows-2 border-2 border-accent bg-base-100">
	<div class="col-span-9 row-span-1 grid grid-cols-9">
		<div class="card-title col-span-9 place-items-start pl-4 pt-2">
			<h3 class="h3 text-black">{username.toUpperCase()}</h3>
		</div>
		<div class="col-span-9 pl-4 pt-2 w-full">
			<span class="">
				<b>Available Days: </b> {availableDays.join(', ')}
			</span>
		</div>
	</div>
	<div class="col-span-1 row-span-2 flex items-center justify-center">
		<button class="btn btn-primary" on:click={handleBtnClick}>VIEW</button>
	</div>
</div>