import { getAvailabilities, getUsersAndNames } from '$lib/supabaseCommands.js';

export async function load({ params }) {
	const { title } = params;
	console.log(title);
	let employeesData = await getUsersAndNames();
	let availabiltiiesData = await getAvailabilities(title);

	console.log(employeesData);
	console.log(availabiltiiesData);

	return {
		employees: employeesData ?? [],
		availabiltiies: availabiltiiesData ?? [],
		props: { title, }
	};

}