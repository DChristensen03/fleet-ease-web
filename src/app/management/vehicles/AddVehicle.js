import { request } from "@/utils/universal";
import { Button, Table, TextInput, Tooltip } from "flowbite-react";
import { useState } from "react";
import { HiChevronDown, HiChevronRight, HiPlus } from "react-icons/hi";

export default function AddVehicle({ getVehicles }) {
	const [addRowOpen, setAddRowOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		make: "",
		model: "",
		trim: "",
		modelYear: "",
		color: "",
	});

	const addVehicle = async () => {
		const response = await request(`/cars`, {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formValues),
		});

		if (response.ok) {
			getVehicles();
			setFormValues({
				make: "",
				model: "",
				trim: "",
				modelYear: "",
				color: "",
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
				<Table.HeadCell colSpan="5">Add additional vehicles...</Table.HeadCell>
			</Table.Head>
			{addRowOpen ? (
				<>
					<Table.Body>
						<Table.Row>
							<td className="w-5" />
							<Table.Cell className="px-2">
								<TextInput
									id="make"
									placeholder="Make..."
									value={formValues.make}
									onChange={(e) =>
										setFormValues({ ...formValues, make: e.target.value })
									}
								></TextInput>
							</Table.Cell>
							<Table.Cell className="px-2">
								<TextInput
									id="Model"
									placeholder="Model..."
									value={formValues.model}
									onChange={(e) =>
										setFormValues({ ...formValues, model: e.target.value })
									}
								></TextInput>
							</Table.Cell>
							<Table.Cell className="px-2">
								<TextInput
									id="trim"
									placeholder="Trim..."
									value={formValues.trim}
									onChange={(e) =>
										setFormValues({ ...formValues, trim: e.target.value })
									}
								></TextInput>
							</Table.Cell>
							<Table.Cell className="px-2">
								<TextInput
									id="year"
									placeholder="Year..."
									value={formValues.year}
									onChange={(e) =>
										setFormValues({
											...formValues,
											modelYear: e.target.value.replace(/\D/, ""),
										})
									}
								></TextInput>
							</Table.Cell>
							<Table.Cell className="px-2">
								<TextInput
									id="color"
									placeholder="Color..."
									value={formValues.color}
									onChange={(e) =>
										setFormValues({ ...formValues, color: e.target.value })
									}
								></TextInput>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<td className="w-5" />
							<Table.Cell colSpan="5">
								<div className="float-right">
									<Tooltip
										className={`w-max ${
											formValues.color &&
											formValues.make &&
											formValues.model &&
											formValues.modelYear
												? "hidden"
												: ""
										}`}
										content="Make, model, year, and color are all required fields."
									>
										<Button
											color="red"
											className="float-right bg-red-600 text-white border-red-600 enabled:hover:bg-red-700 enabled:hover:border-red-700 focus:ring-red-700 font-bold"
											onClick={addVehicle}
											disabled={
												!(
													formValues.color &&
													formValues.make &&
													formValues.model &&
													formValues.modelYear
												)
											}
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
