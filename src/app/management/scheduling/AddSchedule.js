import { request } from "@/utils/universal";
import { Button, Select, Table, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiChevronDown, HiChevronRight, HiPlus } from "react-icons/hi";
import dayjs from "dayjs";

export default function AddSchedule({
	getSchedules,
	vehicles,
	drivers,
	dateSchedules,
	date,
}) {
	const [addRowOpen, setAddRowOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		driverId: "0",
		carId: "0",
		startTime: "1:00",
		endTime: "1:30",
	});
	const [validTime, setValidTime] = useState(false);

	useEffect(() => {
		formValues.driverId = drivers?.[0]?.id;
		formValues.carId = vehicles?.[0]?.id;
	}, [vehicles, drivers]);

	useEffect(() => {
		validateTime();
	}, [formValues.startTime, formValues.endTime]);

	const addRecord = async () => {
		const splitDate = date.split("/");
		const formattedDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
		const startTime = new Date(
			`${formattedDate}T${
				formValues.startTime > 9 ? formValues.startTime : "0" + formValues.startTime
			}:00`
		);
		const endTime = new Date(
			`${formattedDate}T${
				formValues.endTime > 9 ? formValues.endTime : "0" + formValues.endTime
			}:00`
		);
		const response = await request(
			`/schedules/${formValues.carId}/${formValues.driverId}`,
			{
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					startTime,
					endTime,
				}),
			}
		);

		if (response.ok) {
			getSchedules();
			setFormValues({
				driverId: drivers?.[0]?.id,
				carId: vehicles?.[0]?.id,
				startTime: "1:00",
				endTime: "1:30",
			});
		}
	};

	const validateTime = () => {
		let result = true;
		const splitDate = date.split("/");
		const formattedDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
		// Format and create a JavaScript date
		const startDateTime = new Date(
			`${formattedDate}T${
				formValues.startTime > 9 ? formValues.startTime : "0" + formValues.startTime
			}:00`
		);
		const endDateTime = new Date(
			`${formattedDate}T${
				formValues.endTime > 9 ? formValues.endTime : "0" + formValues.endTime
			}:00`
		);

		dateSchedules.forEach((dateSchedule) => {
			const startScheduleTime = new Date(dateSchedule.startTime);
			const endScheduleTime = new Date(dateSchedule.endTime);
			if (startDateTime <= startScheduleTime && startScheduleTime <= endDateTime)
				result = false; // b starts in a
			if (startDateTime <= endScheduleTime && endScheduleTime <= endDateTime)
				result = false; // b ends in a
			if (startScheduleTime < startDateTime && endDateTime < endScheduleTime)
				result = false; // a in b
			if (startDateTime >= endDateTime) result = false; // start > end
		});
		setValidTime(result);
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
				<Table.HeadCell colSpan="5">Add a scheduled time...</Table.HeadCell>
			</Table.Head>
			{addRowOpen ? (
				<>
					<Table.Body>
						<Table.Row>
							<td className="w-5" />
							<Table.Cell className="px-2">
								<Select
									id="driver"
									placeholder="Select a driver..."
									value={formValues.driverId}
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
							</Table.Cell>
							<Table.Cell className="px-2">
								<Select
									id="car"
									placeholder="Select a car..."
									value={formValues.carId}
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
								<Select
									id="maintenanceType"
									value={formValues.startTime}
									onChange={(e) =>
										setFormValues({ ...formValues, startTime: e.target.value })
									}
								>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time) => (
										<React.Fragment key={time}>
											<option key={`${time}:00`} value={`${time}:00`}>
												{`${time}:00`}
											</option>
											<option key={`${time}:30`} value={`${time}:30`}>
												{`${time}:30`}
											</option>
										</React.Fragment>
									))}
									{[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((time) => (
										<React.Fragment key={time}>
											<option key={`${time}:00`} value={`${time}:00`}>
												{`${time}:00`}
											</option>
											<option key={`${time}:30`} value={`${time}:30`}>
												{`${time}:30`}
											</option>
										</React.Fragment>
									))}
								</Select>
							</Table.Cell>
							<Table.Cell className="px-2">
								<Select
									id="maintenanceType"
									value={formValues.endTime}
									onChange={(e) =>
										setFormValues({ ...formValues, endTime: e.target.value })
									}
								>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time) => (
										<React.Fragment key={time}>
											<option value={`${time}:00`}>{`${time}:00`}</option>
											<option value={`${time}:30`}>{`${time}:30`}</option>
										</React.Fragment>
									))}
									{[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].map((time) => (
										<React.Fragment key={time}>
											<option value={`${time}:00`}>{`${time}:00`}</option>
											<option value={`${time}:30`}>{`${time}:30`}</option>
										</React.Fragment>
									))}
								</Select>
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
										content="A car, driver, and a start and end time not falling between any other scheduled times are all required."
									>
										<Button
											color="red"
											className="float-right bg-red-600 text-white border-red-600 enabled:hover:bg-red-700 enabled:hover:border-red-700 focus:ring-red-700 font-bold"
											onClick={addRecord}
											disabled={!(formValues.driverId && formValues.carId && validTime)}
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
