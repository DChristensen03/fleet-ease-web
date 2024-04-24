"use client";
import { Badge } from "flowbite-react";
import { useState } from "react";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
	const pages = ["Vehicles", "Drivers", "Maintenance", "Scheduling"];
	const [hoverState, setHoverState] = useState({
		Vehicles: false,
		Drivers: false,
		Maintenance: false,
		Scheduling: false,
	});

	const alterHoverState = (page, state) => {
		const newState = { ...hoverState };
		newState[page] = state;
		setHoverState(newState);
	};

	return (
		<main className="grid auto-rows-auto mx-5 space-y-3">
			<h1 className="text-7xl text-center w-full font-bold italic">
				<span>Fleet</span>
				<span className="underline text-primary-600">Ease</span>
			</h1>
			<div className="grid sm-grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-start">
				{pages.map((page) => (
					<Link key={page} href={`/management/${page.toLowerCase()}`}>
						<div
							className={`rounded relative border-2 p-1 ${
								hoverState[page] ? "m-2" : "m-4"
							}`}
							onMouseEnter={() => alterHoverState(page, true)}
							onMouseLeave={() => alterHoverState(page, false)}
						>
							<img
								src={`/${page}.jpg`}
								alt={page}
								width="100%"
								height="100%"
								className="rounded"
							/>
							<Badge
								className="absolute bottom-3 right-1 w-3/4 min-h-12 h-1/5 max-h-32 place-content-center rounded-none"
								size="lg"
								color={"dark"}
							>
								{page.toUpperCase()}
							</Badge>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
