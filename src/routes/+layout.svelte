<script>
	import '../app.pcss';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import { invalidateAll } from '$app/navigation';

	onMount(() => {
		const { data: {subscription }} = supabase.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		}
	})
</script>

<slot />

