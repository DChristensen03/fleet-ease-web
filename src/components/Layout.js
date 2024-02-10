"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";

export default function Component() {
	const pathname = usePathname();

	return (
		<Navbar fluid rounded>
			<Navbar.Brand as={Link} href="/">
				<Image
					src="/favicon.svg"
					className="mr-3 h-6 sm:h-9 dark:fill-white"
					alt="Fleet Ease Logo"
					width={32}
					height={32}
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold italic">
					<span>Fleet</span>
					<span className="underline text-primary-600">Ease</span>
				</span>
			</Navbar.Brand>
			<div className="flex md:order-2">
				<DarkThemeToggle />
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link as={Link} href="/" active={pathname === "/"}>
					Home
				</Navbar.Link>
				<Navbar.Link as={Link} href="/about" active={pathname === "/about"}>
					About
				</Navbar.Link>
				<Dropdown
					arrowIcon
					inline
					label={
						<span
							className={`${
								pathname.includes("management") ? "text-primary-700" : ""
							} hover:text-primary-600`}
						>
							Management
						</span>
					}
				>
					<Dropdown.Item as={Link} href="/management/vehicles">
						<span
							className={`${
								pathname === "/management/vehicles" ? "text-primary-700" : ""
							} hover:text-primary-600`}
						>
							Vehicles
						</span>
					</Dropdown.Item>
					<Dropdown.Item as={Link} href="/management/maintenance">
						<span
							className={`${
								pathname === "/management/maintenance" ? "text-primary-700" : ""
							} hover:text-primary-600`}
						>
							Maintenance
						</span>
					</Dropdown.Item>
					<Dropdown.Item as={Link} href="/management/scheduling">
						<span
							className={`${
								pathname === "/management/scheduling" ? "text-primary-700" : ""
							} hover:text-primary-600`}
						>
							Scheduling
						</span>
					</Dropdown.Item>
				</Dropdown>
			</Navbar.Collapse>
		</Navbar>
	);
}
