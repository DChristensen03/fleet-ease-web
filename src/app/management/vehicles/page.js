"use client";

import { useEffect, useState } from "react";
import { Button, Table, TextInput, Spinner } from "flowbite-react";
import {
	HiChevronDown,
	HiChevronRight,
	HiPlus,
	HiOutlinePencilAlt,
} from "react-icons/hi";
import { IoSaveOutline } from "react-icons/io5";

export default function Vehicles() {
	const [vehicles, setVehicles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [addRowOpen, setAddRowOpen] = useState(false);

	useEffect(() => {
		getVehicles();
	}, []);

	const getVehicles = async () => {
		setLoading(true);
		const response = await fetch(`${process.env.NEXT_PUBLIC_APIpath}/cars`);
		const results = await response.json();
		let mappedResults = [];
		for (const vehicle of results) {
			vehicle.editing = false;
			mappedResults.push(vehicle);
		}
		setVehicles(mappedResults);
		setLoading(false);
	};

	const editVehicle = async (i) => {
		const updatedVehicles = [...vehicles];
		updatedVehicles[i].editing = !vehicles[i].editing;
		setVehicles(updatedVehicles);
	};

	const saveVehicle = async (index, id) => {
		const make = document.getElementById(`${index}-make`).value,
			model = document.getElementById(`${index}-model`).value,
			trim = document.getElementById(`${index}-trim`).value,
			modelYear = document.getElementById(`${index}-year`).value,
			color = document.getElementById(`${index}-color`).value;

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_APIpath}/cars/${id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					make,
					model,
					trim,
					modelYear,
					color,
				}),
			}
		);

		if (response.ok) {
			editVehicle(index);
			getVehicles();
		}
	};

	const addVehicle = async () => {
		console.log("adding vehicle");
	};

	return (
		<main className="grid auto-rows-auto mx-5 space-y-3">
			<div className="inline-flex w-full">
				<h1 className="text-5xl text-center w-full font-bold italic">Vehicles</h1>
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center">
				<Table hoverable>
					<Table.Head>
						<Table.HeadCell className="w-0 px-0" />
						<Table.HeadCell>Make</Table.HeadCell>
						<Table.HeadCell>Model</Table.HeadCell>
						<Table.HeadCell>Trim</Table.HeadCell>
						<Table.HeadCell>Year</Table.HeadCell>
						<Table.HeadCell>Color</Table.HeadCell>
						<Table.HeadCell />
					</Table.Head>
					<Table.Body>
						{loading ? (
							<Table.Row className="place-self-center">
								<Spinner />
							</Table.Row>
						) : (
							vehicles.map((vehicle, i) => (
								<Table.Row obj={vehicle} key={i}>
									<Table.Cell className="w-0 px-0" />
									<Table.Cell>
										{!vehicle.editing ? (
											vehicle.make
										) : (
											<TextInput id={`${i}-make`} defaultValue={vehicle.make} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!vehicle.editing ? (
											vehicle.model
										) : (
											<TextInput id={`${i}-model`} defaultValue={vehicle.model} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!vehicle.editing ? (
											vehicle.trim ?? "-"
										) : (
											<TextInput id={`${i}-trim`} defaultValue={vehicle.trim} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!vehicle.editing ? (
											vehicle.modelYear
										) : (
											<TextInput id={`${i}-year`} defaultValue={vehicle.modelYear} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!vehicle.editing ? (
											vehicle.color
										) : (
											<TextInput id={`${i}-color`} defaultValue={vehicle.color} />
										)}
									</Table.Cell>
									<Table.Cell>
										<Button
											color="red"
											size="sm"
											className="px-0.5 w-full"
											onClick={() =>
												!vehicle.editing ? editVehicle(i) : saveVehicle(i, vehicle.id)
											}
										>
											{!vehicle.editing ? (
												<>
													Edit <HiOutlinePencilAlt className="justify-self-end" />
												</>
											) : (
												<>
													Save <IoSaveOutline />
												</>
											)}
										</Button>
									</Table.Cell>
								</Table.Row>
							))
						)}
						<Table.Row>
							<Table.Cell className="w-0 px-0">
								<div class="flex justify-start h-full">
									<Button
										color="none"
										className="focus:ring-0 self-start"
										size={"xs"}
										onClick={() => setAddRowOpen(!addRowOpen)}
									>
										{addRowOpen ? (
											<HiChevronDown size="1.5em" />
										) : (
											<HiChevronRight size="1.5em" />
										)}
									</Button>
								</div>
							</Table.Cell>
							<Table.Cell colSpan="6">
								{!addRowOpen ? (
									"Add additional vehicles..."
								) : (
									<>
										<Table>
											<Table.Body>
												<Table.Row>
													<Table.Cell className="px-2">
														<TextInput id="make" placeholder="Make..."></TextInput>
													</Table.Cell>
													<Table.Cell className="px-2">
														<TextInput id="Model" placeholder="Model..."></TextInput>
													</Table.Cell>
													<Table.Cell className="px-2">
														<TextInput id="trim" placeholder="Trim..."></TextInput>
													</Table.Cell>
													<Table.Cell className="px-2">
														<TextInput id="year" placeholder="Year..."></TextInput>
													</Table.Cell>
													<Table.Cell className="px-2">
														<TextInput id="color" placeholder="Color..."></TextInput>
													</Table.Cell>
												</Table.Row>
											</Table.Body>
										</Table>
										<div className="flex items-end justify-end pr-4 mt-2">
											<Button
												color="red"
												className="align-right bg-red-600 text-white border-red-600 enabled:hover:bg-red-700 enabled:hover:border-red-700 focus:ring-red-700 font-bold"
												onClick={addVehicle}
											>
												Add&nbsp;
												<HiPlus className="stroke-1" size="1.2em" />
											</Button>
										</div>
									</>
								)}
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</div>
		</main>
	);
}
