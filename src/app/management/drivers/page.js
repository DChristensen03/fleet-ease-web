"use client";

import { useEffect, useState } from "react";
import { Button, Table, TextInput, Spinner } from "flowbite-react";
import { HiOutlinePencilAlt, HiTrash } from "react-icons/hi";
import { IoSaveOutline } from "react-icons/io5";
import AddDriver from "./AddDriver";
import { request } from "@/utils/universal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function Drivers() {
	const [drivers, setDrivers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(0);

	useEffect(() => {
		getDrivers();
	}, []);

	const getDrivers = async () => {
		setLoading(true);
		const response = await request(`/drivers`);
		const results = await response.json();
		let mappedResults = [];
		for (const driver of results) {
			driver.editing = false;
			mappedResults.push(driver);
		}
		setDrivers(mappedResults);
		setLoading(false);
	};

	const editDriver = async (i) => {
		const updatedDrivers = [...drivers];
		updatedDrivers[i].editing = !drivers[i].editing;
		setDrivers(updatedDrivers);
	};

	const saveDriver = async (index, id) => {
		const firstName = document.getElementById(`${index}-first`).value,
			lastName = document.getElementById(`${index}-last`).value,
			age = document.getElementById(`${index}-age`).value;

		const response = await request(`/drivers/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				firstName,
				lastName,
				age,
			}),
		});

		if (response.ok) {
			editDriver(index);
			getDrivers();
		}
	};

	const deleteDriver = async (id) => {
		setDeleteId(id);
		setModalOpen(true);
	};

	return (
		<main className="grid auto-rows-auto mx-5 space-y-3">
			<div className="inline-flex w-full">
				<h1 className="text-5xl text-center w-full font-bold italic">Drivers</h1>
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center">
				<Table className="w-full mb-4">
					<Table.Head>
						<Table.HeadCell>ID</Table.HeadCell>
						<Table.HeadCell>First Name</Table.HeadCell>
						<Table.HeadCell>Last Name</Table.HeadCell>
						<Table.HeadCell>Age</Table.HeadCell>
						<Table.HeadCell />
					</Table.Head>
					<Table.Body>
						{loading ? (
							<Table.Row className="place-self-center">
								<Spinner />
							</Table.Row>
						) : (
							drivers.map((driver, i) => (
								<Table.Row obj={driver} key={i} className="text-center">
									<Table.Cell>{driver.id}</Table.Cell>
									<Table.Cell>
										{!driver.editing ? (
											driver.firstName
										) : (
											<TextInput id={`${i}-first`} defaultValue={driver.firstName} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!driver.editing ? (
											driver.lastName ?? "-"
										) : (
											<TextInput id={`${i}-last`} defaultValue={driver.lastName} />
										)}
									</Table.Cell>
									<Table.Cell>
										{!driver.editing ? (
											driver.age
										) : (
											<TextInput
												type="number"
												step="1"
												min="0"
												id={`${i}-age`}
												defaultValue={driver.age}
											/>
										)}
									</Table.Cell>
									<Table.Cell className="px-1">
										<div className="inline-flex justify-center space-x-0.5 w-full">
											<Button
												color="red"
												size="sm"
												className="px-0.5 w-full"
												onClick={() =>
													!driver.editing ? editDriver(i) : saveDriver(i, driver.id)
												}
											>
												{!driver.editing ? (
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
												onClick={() => deleteDriver(driver.id)}
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
								<AddDriver getDrivers={getDrivers} />
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
					getDrivers={getDrivers}
				/>
			) : (
				""
			)}
		</main>
	);
}
