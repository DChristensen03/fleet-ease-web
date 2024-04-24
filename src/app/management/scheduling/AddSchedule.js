import { request } from "@/utils/universal";
import { Button, Select, Table, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiChevronDown, HiChevronRight, HiPlus } from "react-icons/hi";
import dayjs from "dayjs";

export default function AddSchedule({
	getSchedules,
	vehicleId,
	driverId,
	dateSchedules,
	date,
}) {
	const [addRowOpen, setAddRowOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		startTime: "1:00",
		endTime: "1:30",
	});
	const [validTime, setValidTime] = useState(false);

	useEffect(() => {
		validateTime();
	});

	useEffect(() => {
		validateTime();
	}, [formValues.startTime, formValues.endTime]);

	const addRecord = async () => {
		const startTime = dayjs(date)
			.hour(formValues.startTime.split(":")[0])
			.minute(formValues.startTime.split(":")[1]);
		const endTime = dayjs(
			dayjs(date)
				.hour(formValues.endTime.split(":")[0])
				.minute(formValues.endTime.split(":")[1])
		);

		const response = await request(`/schedules/${vehicleId}/${driverId}`, {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				startTime,
				endTime,
			}),
		});

		if (response.ok) {
			getSchedules();
			setFormValues({
				startTime: "1:00",
				endTime: "1:30",
			});
			validateTime();
		}
	};

	const validateTime = () => {
		let result = true;
		const startDateTime = dayjs(date)
			.hour(formValues.startTime.split(":")[0])
			.minute(formValues.startTime.split(":")[1]);
		const endDateTime = dayjs(
			dayjs(date)
				.hour(formValues.endTime.split(":")[0])
				.minute(formValues.endTime.split(":")[1])
		);

		dateSchedules.forEach((dateSchedule) => {
			const startScheduleTime = dayjs(dateSchedule.startTime);
			const endScheduleTime = dayjs(dateSchedule.endTime);
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
									id="timeFirst"
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
									id="timeSecond"
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
											driverId && vehicleId && validTime ? "hidden" : ""
										}`}
										content="A car, driver, and a start and end time not falling between any other scheduled times are all required."
									>
										<Button
											color="red"
											className="float-right bg-red-600 text-white border-red-600 enabled:hover:bg-red-700 enabled:hover:border-red-700 focus:ring-red-700 font-bold"
											onClick={addRecord}
											disabled={!(driverId && vehicleId && validTime)}
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
