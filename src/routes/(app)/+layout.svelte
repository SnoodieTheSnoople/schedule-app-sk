<script>
	import '../../app.pcss';
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
		<ul class="menu p-4 w-40 min-h-full bg-accent text-base-content">
			<!-- Sidebar content here -->
<!--			<li class="text-white"><a href="/login"><b>LOGIN</b></a></li>-->
			<li class="text-white">
				<div>
					<form action="/logout" method="POST">
						<!--<li class="text-white"><a href="/logout"><b>SIGN OUT</b></a></li>-->
						<button type="submit"><b>SIGN OUT</b></button>
					</form>
				</div>
			</li>
			<li></li>
			<li class="text-white"><a href="/employee/schedule"><b>SCHEDULE</b></a></li>
			<li class="text-white"><a href="/employee/availability"><b>AVAILABILITY</b></a></li>
			<li></li>
<!--			<li class="text-white"><a href="/employee/requests"><b>REQUESTS</b></a></li>-->
<!--			<li class="text-white"><a href="/employee/shift-swap"><b>SHIFT SWAP</b></a></li>-->
			<li class="text-white"><a href="/manager/calendar"><b>CALENDAR</b></a></li>
			<li class="text-white"><a href="/manager/availability"><b>AVAILABILITY REQUESTS</b></a></li>
		</ul>

	</div>
</div>
