"use client";

import { useEffect, useState } from "react";
import { Button, Table, TextInput, Spinner, Pagination } from "flowbite-react";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";
import { IoSaveOutline, IoSearch } from "react-icons/io5";
// import AddVehicle from "./AddVehicle";
import { request } from "@/utils/universal";
// import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function Maintenance() {
	const [records, setRecords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	// const [deleteId, setDeleteId] = useState(0);\

	const [currentPage, setCurrentPage] = useState(1);
	const onPageChange = (page) => setCurrentPage(page);

	useEffect(() => {
		getMaintenanceRecords();
	}, []);

	const getMaintenanceRecords = async () => {
		// setLoading(true);
		// const response = await request(`/cars`);
		// const results = await response.json();
		// let mappedResults = [];
		// for (const vehicle of results) {
		// 	vehicle.editing = false;
		// 	mappedResults.push(vehicle);
		// }
		// setVehicles(mappedResults);
		// setLoading(false);
	};

	const editRecord = async (i) => {
		// const updatedVehicles = [...vehicles];
		// updatedVehicles[i].editing = !vehicles[i].editing;
		// setVehicles(updatedVehicles);
	};

	const saveRecord = async (index, id) => {
		// const make = document.getElementById(`${index}-make`).value,
		// 	model = document.getElementById(`${index}-model`).value,
		// 	trim = document.getElementById(`${index}-trim`).value,
		// 	modelYear = document.getElementById(`${index}-year`).value,
		// 	color = document.getElementById(`${index}-color`).value;
		// const response = await request(`/cars/${id}`, {
		// 	method: "PUT",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify({
		// 		make,
		// 		model,
		// 		trim,
		// 		modelYear,
		// 		color,
		// 	}),
		// });
		// if (response.ok) {
		// 	editRecord(index);
		// 	getMaintenanceRecords();
		// }
	};

	const deleteRecord = async (id) => {
		// setDeleteId(id);
		// setModalOpen(true);
	};

	return (
		<main className="grid auto-rows-auto mx-5 space-y-3">
			<div className="inline-flex w-full">
				<h1 className="text-5xl text-center w-full font-bold italic">
					Maintenance
				</h1>
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center">
				<TextInput
					className="w-52"
					placeholder="Search for a record..."
					icon={IoSearch}
				/>
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center">
				<Table className="w-full mb-4">
					<Table.Head>
						<Table.HeadCell>Vehicle</Table.HeadCell>
						<Table.HeadCell>Type</Table.HeadCell>
						<Table.HeadCell colSpan={3}>Notes</Table.HeadCell>
						<Table.HeadCell />
					</Table.Head>
					<Table.Body>
						{loading ? (
							<Table.Row className="place-self-center">
								<Spinner />
							</Table.Row>
						) : (
							records.map((record, i) => (
								<Table.Row obj={record} key={i} className="text-center">
									<Table.Cell>
										{!record.editing ? (
											record.make
										) : (
											<TextInput id={`${i}-make`} defaultValue={record.make} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!record.editing ? (
											record.model
										) : (
											<TextInput id={`${i}-model`} defaultValue={record.model} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!record.editing ? (
											record.trim ?? "-"
										) : (
											<TextInput id={`${i}-trim`} defaultValue={record.trim} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!record.editing ? (
											record.modelYear
										) : (
											<TextInput id={`${i}-year`} defaultValue={record.modelYear} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!record.editing ? (
											record.color
										) : (
											<TextInput id={`${i}-color`} defaultValue={record.color} />
										)}
									</Table.Cell>
									<Table.Cell className="px-1">
										<div class="inline-flex justify-center space-x-0.5 w-full">
											<Button
												color="red"
												size="sm"
												className="px-0.5 w-full"
												onClick={() =>
													!record.editing ? editRecord(i) : saveRecord(i, record.id)
												}
											>
												{!record.editing ? (
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
												onClick={() => deleteRecord(record.id)}
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
								{/* <AddVehicle getVehicles={getMaintenanceRecords} /> */}
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</div>
			<div className="flex overflow-x-auto sm:justify-center">
				{records.length <= 10 ? (
					""
				) : (
					<Pagination
						currentPage={currentPage}
						totalPages={(records.length % 10) + 1}
						onPageChange={onPageChange}
					/>
				)}
			</div>
			{/* {modalOpen ? (
				<ConfirmDeleteModal
					id={deleteId}
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					getVehicles={getMaintenanceRecords}
				/>
			) : (
				""
			)} */}
		</main>
	);
}
