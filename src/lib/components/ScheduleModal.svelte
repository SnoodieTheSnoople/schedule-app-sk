<script>

	/** @type {function(): void}*/
	export let toggleModal;

	/** @type {{title: string, left_content: string, right_content: string}} */
	export let modalData;

	/** @type {boolean} */
	let isOpen = true;

</script>

<dialog id="addUserModal" class="modal" class:modal-open={isOpen}>

	<!-- Modal body -->
	<div class="modal-box">
		<h3 class="font-bold text-lg">{modalData.title}</h3>

		<div class="divider"></div>

		<div class="grid grid-cols-3 gap-1">
			<p class="flex items-center justify-center">Time Block</p>

			<input type="text" value="{modalData.left_content}"
						 class="input input-bordered w-full max-w-xs" disabled/>

			<input type="text" value="{modalData.right_content}"
						 class="input input-bordered w-full max-w-xs" disabled/>
		</div>

		<div class="divider"></div>

		<div class="modal-action">
				<button class="btn btn-error" on:click={toggleModal}>Close</button>
		</div>

	</div>
</dialog>