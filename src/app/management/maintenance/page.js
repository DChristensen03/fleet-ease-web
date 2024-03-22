"use client";

import { useEffect, useState } from "react";
import { Button, Table, TextInput, Spinner, Pagination } from "flowbite-react";
import AddRecord from "./AddRecord";
import {
	request,
	getFormattedDate,
	formatMaintenanceType,
} from "@/utils/universal";
import { IoSearch } from "react-icons/io5";
import { HiTrash } from "react-icons/hi";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function Maintenance() {
	const [records, setRecords] = useState([]);
	const [filteredRecords, setFilteredRecords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(0);

	const [searchText, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const onPageChange = (page) => setCurrentPage(page);

	useEffect(() => {
		getMaintenanceRecords();
	}, []);

	useEffect(() => {
		filterRecords();
	}, [records, searchText]);

	const getMaintenanceRecords = async () => {
		setLoading(true);
		const response = await request(`/maintenancerecords`);
		const results = await response.json();
		let mappedResults = [];
		for (const record of results) {
			record.date = getFormattedDate(new Date(record.date));
			record.vehicle = `${record.car.make} ${record.car.model} ${record.car.trim}`;
			mappedResults.push(record);
		}
		setRecords(mappedResults);
		setLoading(false);
	};

	const filterRecords = () => {
		const lowerSearch = searchText.toLowerCase();
		if (searchText === "" || searchText === undefined) {
			setFilteredRecords(records);
		} else {
			setFilteredRecords(
				records.filter(
					(record) =>
						record.vehicle.toLowerCase().includes(lowerSearch) ||
						record.date.toLowerCase().includes(lowerSearch) ||
						formatMaintenanceType(record.type).toLowerCase().includes(lowerSearch) ||
						record.note.toLowerCase().includes(lowerSearch)
				)
			);
		}
	};

	const deleteRecord = async (id) => {
		setDeleteId(id);
		setModalOpen(true);
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
					onChange={(e) => setSearchText(e.target.value ? e.target.value : "")}
					value={searchText}
				/>
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center">
				<Table className="w-full mb-4">
					<Table.Head>
						<Table.HeadCell>Vehicle</Table.HeadCell>
						<Table.HeadCell>Date</Table.HeadCell>
						<Table.HeadCell>Type</Table.HeadCell>
						<Table.HeadCell colSpan={2}>Notes</Table.HeadCell>
						<Table.HeadCell />
					</Table.Head>
					<Table.Body>
						{loading ? (
							<Table.Row className="place-self-center">
								<Spinner />
							</Table.Row>
						) : (
							filteredRecords.map((record, i) => (
								<Table.Row obj={record} key={i} className="text-center">
									<Table.Cell>{record.vehicle}</Table.Cell>
									<Table.Cell>{record.date}</Table.Cell>
									<Table.Cell>{formatMaintenanceType(record.type)}</Table.Cell>
									<Table.Cell colSpan={2}>{record.note}</Table.Cell>
									<Table.Cell className="px-1">
										<div className="inline-flex justify-center space-x-0.5 w-full">
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
								<AddRecord getMaintenanceRecords={getMaintenanceRecords} />
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
			{modalOpen ? (
				<ConfirmDeleteModal
					id={deleteId}
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					getMaintenanceRecords={getMaintenanceRecords}
				/>
			) : (
				""
			)}
		</main>
	);
}
