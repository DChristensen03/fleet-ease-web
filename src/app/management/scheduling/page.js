"use client";
import { Label, Select, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { request } from "@/utils/universal";

export default function Scheduling() {
	const [vehicles, setVehicles] = useState([]);
	const [drivers, setDrivers] = useState([]);
	const [formValues, setFormValues] = useState({
		carId: null,
		driverId: null,
	});

	useEffect(() => {
		getVehicles();
		getDrivers();
	}, []);

	useEffect(() => {
		getSchedules();
	}, [formValues]);

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

	const getSchedules = async () => {
		if (formValues.carId !== null && formValues.driverId !== null) {
			const response = await request(
				`/schedules/${formValues.carId}/${formValues.driverId}`
			);
			const results = await response.json();
			console.log(results);
		}
	};

	return (
		<main className="grid auto-rows-auto mx-5">
			<div className="inline-flex w-full">
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
			</div>
			<div className="sm:w-full md:w-4/5 lg:w-3/5 place-self-center my-5">
				<Table className="table-auto text-black">
					<Table.Body>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time) => (
							<Table.Row key={time}>
								<Table.Cell className="bg-slate-200">{time}:00</Table.Cell>
								<Table.Cell
									className={`w-2/5 ${
										time % 2 == 0
											? "bg-slate-50 hover:bg-slate-300 hover:border"
											: "bg-slate-100 hover:bg-slate-300 hover:border"
									}`}
								></Table.Cell>
								<Table.Cell className="bg-slate-200">{time + 12}:00</Table.Cell>
								<Table.Cell
									className={`w-2/5 ${
										time % 2 == 1
											? "bg-slate-50 hover:bg-slate-300 hover:border"
											: "bg-slate-100 hover:bg-slate-300 hover:border"
									}`}
								></Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</div>
		</main>
	);
}
