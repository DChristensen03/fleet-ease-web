import {
	request,
	formatMaintenanceType,
	getFormattedDate,
} from "@/utils/universal";
import {
	Button,
	Datepicker,
	Select,
	Table,
	Textarea,
	Tooltip,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiChevronDown, HiChevronRight, HiPlus } from "react-icons/hi";
import { types } from "../../../data/maintenancetypes.js";

export default function AddRecord({ getMaintenanceRecords }) {
	const [addRowOpen, setAddRowOpen] = useState(false);
	const today = new Date();
	const [formValues, setFormValues] = useState({
		carId: "0",
		date: getFormattedDate(today),
		type: types[0],
		note: "",
	});
	const [vehicles, setVehicles] = useState([]);

	useEffect(() => {
		getVehicles();
	}, []);

	const getVehicles = async () => {
		const response = await request(`/cars`);
		const results = await response.json();
		formValues.carId = results[0].id;
		setVehicles(results);
	};

	const addRecord = async () => {
		console.log(formValues);
		const response = await request(`/maintenancerecords/${formValues.carId}`, {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				carId: formValues.carId,
				date: new Date(formValues.date),
				type: formValues.type,
				note: formValues.note,
			}),
		});

		if (response.ok) {
			getMaintenanceRecords();
			setFormValues({
				carId: 0,
				date: getFormattedDate(today),
				type: "TIRE_ROTATION",
				note: "",
			});
		}
	};

	return (
		<Table className="w-full">
			<Table.Head className="w-full">
				<Table.HeadCell className="w-5 px-0 max-w-0">
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
				</Table.HeadCell>
				<Table.HeadCell colSpan="4">Add a maintenance record...</Table.HeadCell>
			</Table.Head>
			{addRowOpen ? (
				<>
					<Table.Body>
						<Table.Row>
							<td className="w-5" />
							<Table.Cell className="px-2">
								<Select
									id="car"
									placeholder="Select a car..."
									onChange={(e) =>
										setFormValues({ ...formValues, carId: e.target.value })
									}
								>
									{vehicles.map((vehicle) => (
										<option
											key={vehicle.id}
											value={vehicle.id}
										>{`${vehicle.make} ${vehicle.model} ${vehicle.trim}`}</option>
									))}
								</Select>
							</Table.Cell>
							<Table.Cell className="px-2">
								<Datepicker
									id="date"
									value={formValues.date}
									onSelectedDateChanged={(e) =>
										setFormValues({ ...formValues, date: getFormattedDate(e) })
									}
								></Datepicker>
							</Table.Cell>
							<Table.Cell className="px-2">
								<Select
									id="maintenanceType"
									value={formValues.type}
									onChange={(e) =>
										setFormValues({ ...formValues, type: e.target.value })
									}
								>
									{types.map((type) => (
										<option key={type} value={type}>
											{formatMaintenanceType(type)}
										</option>
									))}
								</Select>
							</Table.Cell>
							<Table.Cell className="px-2">
								<Textarea
									id="note"
									placeholder="Add a note..."
									value={formValues.note}
									onChange={(e) =>
										setFormValues({ ...formValues, note: e.target.value })
									}
								></Textarea>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<td className="w-5" />
							<Table.Cell colSpan="5">
								<div className="float-right">
									<Tooltip
										className={`w-max ${
											formValues.carId && formValues.date && formValues.type
												? "hidden"
												: ""
										}`}
										content="A car, date, and maintenance type are all required fields."
									>
										<Button
											color="red"
											className="float-right bg-red-600 text-white border-red-600 enabled:hover:bg-red-700 enabled:hover:border-red-700 focus:ring-red-700 font-bold"
											onClick={addRecord}
											disabled={!(formValues.carId && formValues.date && formValues.type)}
										>
											Add&nbsp;
											<HiPlus className="stroke-1" size="1.2em" />
										</Button>
									</Tooltip>
								</div>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</>
			) : (
				""
			)}
		</Table>
	);
}
