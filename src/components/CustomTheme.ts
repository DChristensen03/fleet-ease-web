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
};

export default customTheme;
