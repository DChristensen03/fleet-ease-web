import { request } from "@/utils/universal";
import { Button, Modal } from "flowbite-react";

export default function ConfirmDeleteModal({
	modalOpen,
	setModalOpen,
	id,
	getDrivers,
}) {
	const deleteDriver = async () => {
		const response = await request(`/drivers/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			getDrivers();
			setModalOpen(false);
		}
	};
	return (
		<Modal show={modalOpen} onClose={() => setModalOpen(false)}>
			<Modal.Header>
				<h3>Are you sure you want to delete the selected driver?</h3>
			</Modal.Header>
			<Modal.Body>
				<div className="flex justify-around">
					<Button color="red" onClick={deleteDriver}>
						Yes
					</Button>
					<Button color="red" outline onClick={() => setModalOpen(false)}>
						No
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}
