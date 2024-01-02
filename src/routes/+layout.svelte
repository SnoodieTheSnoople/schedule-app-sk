<script>
	import '../app.pcss';
	import { AppRail, AppRailAnchor, AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-20">
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<AppRailAnchor href="/">SCHEDULE</AppRailAnchor>
			<AppRailAnchor href="/">REQUESTS</AppRailAnchor>
		</AppRail>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>