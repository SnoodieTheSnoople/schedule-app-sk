<script>
	import '../app.pcss';
</script>

<div class="drawer md:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col items-center justify-center">
		<!-- Page content here -->
		<slot />
		<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu p-4 w-40 min-h-full bg-base-200 text-base-content">
			<!-- Sidebar content here -->
			<li><a>SCHEDULE</a></li>
			<li><a>REQUESTS</a></li>
			<li><a>AVAILABILITY</a></li>
		</ul>

	</div>
</div>
