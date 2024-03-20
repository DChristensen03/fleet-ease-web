"use client";

import { useEffect, useState } from "react";
import { Button, Table, TextInput, Spinner } from "flowbite-react";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";
import { IoSaveOutline } from "react-icons/io5";
import AddVehicle from "./AddVehicle";
import { request } from "@/utils/universal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function Vehicles() {
	const [vehicles, setVehicles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(0);

	useEffect(() => {
		getVehicles();
	}, []);

	const getVehicles = async () => {
		setLoading(true);
		const response = await request(`/cars`);
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

		const response = await request(`/cars/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				make,
				model,
				trim,
				modelYear,
				color,
			}),
		});

		if (response.ok) {
			editVehicle(index);
			getVehicles();
		}
	};

	const deleteVehicle = async (id) => {
		setDeleteId(id);
		setModalOpen(true);
	};

	return (
		<main className="grid auto-rows-auto mx-5 space-y-3">
			<div className="inline-flex w-full">
				<h1 className="text-5xl text-center w-full font-bold italic">Vehicles</h1>
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center">
				<Table className="w-full mb-4">
					<Table.Head>
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
								<Table.Row obj={vehicle} key={i} className="text-center">
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
									<Table.Cell className="px-1">
										<div class="inline-flex justify-center space-x-0.5 w-full">
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
											<Button
												color="red"
												className="px-0 mx-0"
												onClick={() => deleteVehicle(vehicle.id)}
											>
												<HiTrash />
											</Button>
										</div>
									</Table.Cell>
								</Table.Row>
							))
						)}
						<Table.Row>
							<Table.Cell colSpan="6">
								<AddVehicle getVehicles={getVehicles} />
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</div>
			{modalOpen ? (
				<ConfirmDeleteModal
					id={deleteId}
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					getVehicles={getVehicles}
				/>
			) : (
				""
			)}
		</main>
	);
}
