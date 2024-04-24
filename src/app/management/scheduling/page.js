"use client";
import { Button, Datepicker, Label, Select, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { areDatesEqual, getFormattedDate, request } from "@/utils/universal";
import { HiTrash } from "react-icons/hi";
import AddSchedule from "./AddSchedule";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function Scheduling() {
	const [vehicles, setVehicles] = useState([]);
	const [drivers, setDrivers] = useState([]);
	const [formValues, setFormValues] = useState({
		carId: null,
		driverId: null,
		date: getFormattedDate(new Date()),
	});
	const [modalOpen, setModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(0);

	const [schedules, setSchedules] = useState([]);
	const [dateSchedules, setDateSchedules] = useState([]);

	useEffect(() => {
		if (vehicles.length === 0) getVehicles();
		if (drivers.length === 0) getDrivers();
	});

	useEffect(() => {
		getSchedules();
	}, [formValues.carId, formValues.driverId]);

	useEffect(() => {
		setDateSchedules(
			schedules.filter(
				(schedule) =>
					areDatesEqual(schedule.startTime, formValues.date) ||
					areDatesEqual(schedule.endTime, formValues.date)
			)
		);
	}, [formValues.date, schedules]);

	const getSchedules = async () => {
		if (formValues.carId !== null && formValues.driverId !== null) {
			const response = await request(
				`/schedules/${formValues.carId}/${formValues.driverId}`
			);
			const results = await response.json();
			setSchedules(results);
			console.log(results);
		}
	};

	const getVehicles = async () => {
		const response = await request(`/cars`);
		const results = await response.json();
		setFormValues({ ...formValues, carId: results[0].id });
		setVehicles(results);
	};

	const getDrivers = async () => {
		const response = await request(`/drivers`);
		const results = await response.json();
		setFormValues({ ...formValues, driverId: results[0].id });
		setDrivers(results);
	};

	const deleteSchedule = async (id) => {
		setDeleteId(id);
		setModalOpen(true);
	};

	return (
		<main className="grid auto-rows-auto mx-5">
			<div className="inline-flex w-full mb-1">
				<h1 className="text-5xl text-center w-full font-bold italic">Scheduling</h1>
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center">
				<div className="inline-block">
					<div className="mb-2 ms-1 block">
						<Label htmlFor="drivers" value="Select driver" />
					</div>
					<Select
						className="w-52"
						id="drivers"
						onChange={(e) =>
							setFormValues({ ...formValues, driverId: e.target.value })
						}
					>
						{drivers.map((driver) => (
							<option
								key={driver.id}
								value={driver.id}
							>{`${driver.firstName} ${driver.lastName}`}</option>
						))}
					</Select>
				</div>
				<div className="inline-block ms-3">
					<div className="mb-2 ms-1 block">
						<Label htmlFor="vehicles" value="Select vehicle" />
					</div>
					<Select
						className="w-52"
						id="vehicles"
						onChange={(e) => setFormValues({ ...formValues, carId: e.target.value })}
					>
						{vehicles.map((vehicle) => (
							<option
								key={vehicle.id}
								value={vehicle.id}
							>{`${vehicle.make} ${vehicle.model} ${vehicle.trim}`}</option>
						))}
					</Select>
				</div>
				<div className="inline-block ms-3">
					<div className="mb-2 ms-1 block">
						<Label htmlFor="vehicles" value="Select date" />
					</div>
					<Datepicker
						id="date"
						value={formValues.date}
						onSelectedDateChanged={(e) =>
							setFormValues({ ...formValues, date: getFormattedDate(e) })
						}
					/>
				</div>
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center my-5">
				<Table className="w-full mb-4">
					<Table.Head>
						<Table.HeadCell>Vehicle</Table.HeadCell>
						<Table.HeadCell>Driver</Table.HeadCell>
						<Table.HeadCell>Start Time</Table.HeadCell>
						<Table.HeadCell>End Time</Table.HeadCell>
						<Table.HeadCell />
					</Table.Head>
					<Table.Body>
						{dateSchedules.map((date) => (
							<Table.Row key={date.id} className="text-center">
								<Table.Cell>{`${date.car.make} ${date.car.model} ${date.car.trim}`}</Table.Cell>
								<Table.Cell>{`${date.driver.firstName} ${date.driver.lastName}`}</Table.Cell>
								<Table.Cell>
									{new Date(date.startTime).getHours()}:
									{new Date(date.startTime).getMinutes() === 0 ? "00" : "30"}
								</Table.Cell>
								<Table.Cell>
									{new Date(date.endTime).getHours()}:
									{new Date(date.endTime).getMinutes() === 0 ? "00" : "30"}
								</Table.Cell>
								<Table.Cell className="px-1">
									<div className="inline-flex justify-center space-x-0.5 w-full">
										<Button
											color="red"
											className="px-0 mx-0"
											onClick={() => deleteSchedule(date.id)}
										>
											<HiTrash />
										</Button>
									</div>
								</Table.Cell>
							</Table.Row>
						))}
						<Table.Row>
							<Table.Cell colSpan="6">
								<AddSchedule
									getSchedules={getSchedules}
									vehicleId={formValues.carId}
									driverId={formValues.driverId}
									dateSchedules={dateSchedules}
									date={formValues.date}
								/>
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
					getSchedules={getSchedules}
				/>
			) : (
				""
			)}
		</main>
	);
}
