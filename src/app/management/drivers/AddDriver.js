import { request } from "@/utils/universal";
import { Button, Table, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiChevronDown, HiChevronRight, HiPlus } from "react-icons/hi";

export default function AddDriver({ getDrivers }) {
	const [addRowOpen, setAddRowOpen] = useState(false);
	const [formValues, setFormValues] = useState({
		firstName: "",
		lastName: "",
		age: "",
	});

	const addDriver = async () => {
		const response = await request(`/drivers`, {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formValues),
		});

		if (response.ok) {
			getDrivers();
			setFormValues({
				firstName: "",
				lastName: "",
				age: "",
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
				<Table.HeadCell colSpan="5">Add additional drivers...</Table.HeadCell>
			</Table.Head>
			{addRowOpen ? (
				<>
					<Table.Body>
						<Table.Row>
							<td className="w-5" />
							<Table.Cell className="px-2">
								<TextInput
									id="firstName"
									placeholder="First Name..."
									value={formValues.firstName}
									onChange={(e) =>
										setFormValues({ ...formValues, firstName: e.target.value })
									}
								></TextInput>
							</Table.Cell>
							<Table.Cell className="px-2">
								<TextInput
									id="lastName"
									placeholder="Last Name..."
									value={formValues.lastName}
									onChange={(e) =>
										setFormValues({ ...formValues, lastName: e.target.value })
									}
								></TextInput>
							</Table.Cell>
							<Table.Cell className="px-2">
								<TextInput
									id="age"
									placeholder="Age..."
									value={formValues.age}
									onChange={(e) => setFormValues({ ...formValues, age: e.target.value })}
								></TextInput>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<td className="w-5" />
							<Table.Cell colSpan="5">
								<Button
									color="red"
									className="float-right bg-red-600 text-white border-red-600 enabled:hover:bg-red-700 enabled:hover:border-red-700 focus:ring-red-700 font-bold"
									onClick={addDriver}
								>
									Add&nbsp;
									<HiPlus className="stroke-1" size="1.2em" />
								</Button>
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
