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

export async function getUserByUUID(uuid) {
	const { data, error } = await supabase.from("users").select('*').eq('id', uuid);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}

	return data;
}

export async function getManagers() {
	const { data, error } = await supabase.from("manager").select(`
	id`);

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
	/*const { data, error } = await supabase.from("availabilities").select(`
	day,
	available_time_from,
	available_time_to,
	preferred_time_from,
	preferred_time_to`).eq('emp_id', uuid);*/

	const { data, error } = await supabase.from("availabilities").select(`
	day,
	available_time_from,
	available_time_to,
	preferred_time_from,
	preferred_time_to,
	manager_availability_link!inner(status)`).eq('emp_id', uuid)
		.eq('manager_availability_link.status', '1');


	if (error) {
		console.error("Failed to fetch data: ", error);
	}

	return data;
}

export async function removeAvailability(availability_id) {
	const { error } = await supabase.from("availabilities").delete()
		.eq('id', availability_id);

	if (error) {
		console.error("Failed to delete data: ", error);
		return error;
	}
}

export async function createMAL(manager_id, availability_id, status) {
	const { data, error } = await supabase.from("manager_availability_link").insert({
		manager_id: manager_id,
		availability_id: availability_id,
		status: status
	}).select();

	if (error) {
		console.error("Failed to insert data: ", error);
	}

	return data;

}

export async function getMALByStatus() {
	const { data, error } = await supabase.from("manager_availability_link").select(`
	manager_id,
	availability_id,
	status,
	availabilities!inner(emp_id, day)`).eq('status', '0');

	if (error) {
		console.error("Failed to fetch data: ", error);
	} else {
		return data.reduce((employeeRequests, currentValue) => {
			const empId = currentValue.availabilities.emp_id;

			if (!employeeRequests[empId]) {
				employeeRequests[empId] = [];
			}

			employeeRequests[empId].push({
				manager_id: currentValue.manager_id,
				availability_id: currentValue.availability_id,
				status: currentValue.status,
				emp_id: empId,
				day: currentValue.availabilities.day
			});

			return employeeRequests;
		}, {});
	}
}

/**
 *
 * @param uuid {string}
 * @return {Promise<{manager_id: string, availabilitiy_id: string, status: string, availabilties: {emp_id: string, day: string, available_time_from: string,
 * available_time_to: string, preferred_time_from: string, preferred_time_to: string}}>}
 */
export async function getMALByStatusAndUUID(uuid) {
	const { data, error } = await supabase.from("manager_availability_link").select(`
	manager_id,
	availability_id,
	status,
	availabilities!inner(emp_id, day, available_time_from, available_time_to, preferred_time_from, preferred_time_to)`).eq('status', '0')
		.eq('availabilities.emp_id', uuid);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}
	return data;
}

export async function getActiveMALStatus(uuid) {
	const { data, error } = await supabase.from("manager_availability_link").select(`
	manager_id,
	availability_id,
	status,
	availabilities!inner(emp_id, day, available_time_from, available_time_to, preferred_time_from, preferred_time_to)`).eq('status', '1')
		.eq('availabilities.emp_id', uuid);

	if (error) {
		console.error("Failed to fetch data: ", error);
	}
	return data;
}

export async function acceptMAL(availability_id) {
	const { data, error } = await supabase.from("manager_availability_link").update({
		status: '1'
	}).eq('availability_id', availability_id);

	if (error) {
		console.error("Failed to update data: ", error);
	}

	return data;
}
// And then remove the existing availability in MAL. Query active availability with status = 1. Then delete the availability with the same availability_id.

export async function removeMAL(mal_id) {
	const { error } = await supabase.from("manager_availability_link").delete().eq('mal_id', mal_id);

	if (error) {
		console.error("Failed to delete data: ", error);
	}
}
// And then delete the availability with the same availability_id.

export async function createAvailability(employee_id, day, available_time_from, available_time_to, preferred_time_from, preferred_time_to) {
	const { data, error } = await supabase.from("availabilities").insert({
		emp_id: employee_id,
		day: day,
		available_time_from: available_time_from,
		available_time_to: available_time_to,
		preferred_time_from: preferred_time_from,
		preferred_time_to: preferred_time_to
	}).select();

	if (error) {
		console.error("Failed to insert data: ", error);
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
