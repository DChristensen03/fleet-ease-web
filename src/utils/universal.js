export async function request(path, headers = {}) {
	return await fetch(`${process.env.NEXT_PUBLIC_APIpath}${path}`, headers);
}
