import { supabase } from '$lib/supabaseClient.js';

export async function getScheduleOnUUID(uuid) {
	const { data, error } = await supabase.from("schedules").
	select('*').eq('emp_id', uuid);

	if(error) {
		console.error("Unable to fetch data: ", error);
	}

	return data;
}

export async function getUsersAndNames() {
	const { data, error } = await supabase.from("employees").select(`
	id,
	users(firstname, surname)|inner(id)`);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}

	return data;
}


export async function getAvailabilities(arg) {
	const { data, error } = await supabase.from("availabilities").select( `
	day,
	available_time_from,
	available_time_to,
	preferred_time_from,
	preferred_time_to,
	emp_id,
	employees(id)|inner(id)`).eq('day', arg);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}

	return data;
}

export async function getAvailabilityOnUUID(uuid) {
	const { data, error } = await supabase.from("availabilities").select(`
	day,
	available_time_from,
	available_time_to,
	preferred_time_from,
	preferred_time_to`).eq('emp_id', uuid);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}

	return data;

}

/**
 *
 * @param date {date}
 * @returns {Promise<{emp_id: string, date: string, time_from: string, time_to: string}[]>}
 */
export async function getSchedules(date) {
	const { data, error } = await supabase.from("schedules").select(`
	emp_id,
	date,
	time_from,
	time_to`).eq('date', date);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}

	return data;
}

/**
 *
 * @param employee_id {string}
 * @param schedule_date {string}
 * @param schedule_time_from {string}
 * @param schedule_time_to {string}
 * @return {Promise<{emp_id: string, date: string, time_from: string, time_to: string}[]>}
 */
export async function createSchedule(employee_id, schedule_date, schedule_time_from, schedule_time_to) {
	const { data, error } = await supabase.from("schedules").insert({
		emp_id: employee_id,
		date: schedule_date,
		time_from: schedule_time_from,
		time_to: schedule_time_to
	}).select();

	if (error) {
		console.error("Failed to insert data: ", error);
	}

	return data;
}

/**
 *
 * @param employee_id {string}
 * @param schedule_date {string}
 * @return {Promise<PostgrestError>}
 */
export async function removeSchedule(employee_id, schedule_date) {
	const { error } = await supabase.from("schedules").delete()
		.match({
			emp_id: employee_id,
			date: schedule_date
		});

	if (error) {
		return error;
	}
}


/**
 *
 * @param uuid {string}
 * @param start {string}
 * @param end {string}
 * @return {Promise<emp_id: string, date: string, time_from: string, time_to: string>[]}
 */
export async function getScheduleDateRange(uuid, start, end) {
	const { data, error } = await supabase.from("schedules").select(`
	emp_id,
	date,
	time_from,
	time_to`).eq('emp_id', uuid).filter('date', 'gte', start).filter('date', 'lte', end);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}

	return data;
}