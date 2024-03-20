import type { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
	navbar: {
		link: {
			active: {
				on: "text-primary-700",
				off: "hover:text-primary-600",
			},
			base: "hover:text-primary-600",
		},
	},
	table: {
		root: {
			base: "dark:bg-gray-800",
		},
	},
};

export default customTheme;
