import "./globals.css";
import Layout from "../components/Layout";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/components/CustomTheme";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
	title: "FleetEase",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ThemeModeScript />
				<SpeedInsights />
			</head>
			<body className="dark:border-gray-500 dark:bg-gray-600 text-black dark:text-white">
				<Layout />
				<Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
			</body>
		</html>
	);
}
