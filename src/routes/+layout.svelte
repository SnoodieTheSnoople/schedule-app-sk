<script>
	import '../app.pcss';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	})
</script>

<!--<p>{data.session}</p>-->
<p>{data.session?.user.email} | {data.session?.user.id}</p>
<slot />

