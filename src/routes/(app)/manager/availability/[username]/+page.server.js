export async function load({ params }) {
	const { username } = params;
	return { username };
}