export async function request(path, headers = {}) {
	return await fetch(`${process.env.NEXT_PUBLIC_APIpath}${path}`, headers);
}

export const formatMaintenanceType = (type) => {
	type = type.replace("_", " ");
	return type
		.toLowerCase()
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ");
};

export function getFormattedDate(date) {
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, "0");
	let day = date.getDate().toString().padStart(2, "0");

	return month + "/" + day + "/" + year;
}
