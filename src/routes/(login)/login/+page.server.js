import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return fail(500, { message: 'Internal Error. Try again later.', success: false, email });
		}

		throw redirect(303, '/employee/schedule');
	},
}
