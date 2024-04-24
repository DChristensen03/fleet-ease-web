import { request } from "@/utils/universal";
import { Button, Modal } from "flowbite-react";

export default function ConfirmDeleteModal({
	modalOpen,
	setModalOpen,
	id,
	getSchedules,
}) {
	const deleteSchedule = async () => {
		const response = await request(`/schedules/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			getSchedules();
			setModalOpen(false);
		}
	};
	return (
		<Modal show={modalOpen} onClose={() => setModalOpen(false)}>
			<Modal.Header>
				<h3>Are you sure you want to delete the selected schedule?</h3>
			</Modal.Header>
			<Modal.Body>
				<div className="flex justify-around">
					<Button color="red" onClick={deleteSchedule}>
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
