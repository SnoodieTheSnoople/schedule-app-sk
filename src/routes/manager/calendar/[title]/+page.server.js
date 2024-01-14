import { supabase } from '$lib/supabaseClient.js';
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

/*
async function getUsersAndNames() {
	const { data, error } = await supabase.from("employees").select(`
	id,
	users(firstname, surname)|inner(id)`);

	if (error) {
		throw error;
	}

	return data;
}

async function getAvailabilities(arg) {
	const { data, error } = await supabase.from("availabilities").select( `
	day,
	available_time_from,
	available_time_to,
	preferred_time_from,
	preferred_time_to,
	emp_id,
	employees(id)|inner(id)`).eq('day', arg);

	if (error) {
		throw error;
	}

	return data;
}

 */