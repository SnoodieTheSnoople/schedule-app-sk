import { getAvailabilities, getSchedules, getUsersAndNames } from '$lib/supabaseCommands.js';

export async function load({ params }) {
	const { title, date } = params;
	console.log(title);
	let employeesData = await getUsersAndNames();
	let employeesSchedule = await getSchedules(date);
	let availabilitiesData = await getAvailabilities(title);

	console.log("Employee Names: ");
	console.log(employeesData);
	console.log("The schedule: ");
	console.log(employeesSchedule);
	// console.log("The availabilities: ");
	// console.log(availabilitiesData);

	return {
		employees: employeesData ?? [],
		schedules: employeesSchedule ?? [],
		availabilities: availabilitiesData ?? [],
		props: { title, date}
	};

}