<script>
	import { getMALByStatusAndUUID, getUserByUUID } from '$lib/supabaseCommands.js';

	export let data;

	getMALByStatusAndUUID(data.username).then((res) => {
		console.log(res);
		getUserByUUID(data.username).then((res) => {
			console.log(res);
		});
	});
</script>

<h1>{data.username}</h1>
<h1>{data.session?.user.id}</h1>