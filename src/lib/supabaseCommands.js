import { supabase } from '$lib/supabaseClient.js';

//TODO: Error handling.

export async function getUsersAndNames() {
	const { data, error } = await supabase.from("employees").select(`
	id,
	users(firstname, surname)|inner(id)`);

	if (error) {
		throw error;
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

export async function getSchedules(date) {
	const { data, error } = await supabase.from("schedules").select(`
	date,
	time_from,
	time_to`).eq('date', date);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}

	return data;
}

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