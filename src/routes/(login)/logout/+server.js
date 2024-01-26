import { redirect } from '@sveltejs/kit'

export const POST = async ({ locals: { supabase } }) => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error('Failed to sign out:', error);
			return {
				message: 'Failed to sign out. Please try again.',
				success: false,
			};
		}

		throw redirect(303, '/login');
};
