<script>
	import { enhance } from '$app/forms';
	export let form;

/*	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);*/

	/**
	 * @type {string}
	 */
	let email;

	/**
	 * @type {string}
	 */
	let password;


	/*async function handleSignIn() {
		await supabase.auth.signInWithPassword({email, password})
	}*/

</script>

<div class="mx-auto p-8 space-y-8 w-full h-full bg-white">
	<h1 class="h1 font-bold">LOGIN</h1>
	<form method="POST" use:enhance>
		<div class="">
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Email Address</span>
				</div>
				<input type="text" name="email" placeholder="Email" class="input bg-base-100 border-2 border-accent" bind:value={email}/>
			</label>


			<div class="divider w-full max-w-xs"></div>

			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">Password</span>
				</div>
				<input type="password" name="password" placeholder="Password" class="input bg-base-100 border-2 border-accent" bind:value={password}/>
			</label>

			<br><br>

			<button class="btn btn-primary">SIGN IN</button>
		</div>
	</form>
</div>