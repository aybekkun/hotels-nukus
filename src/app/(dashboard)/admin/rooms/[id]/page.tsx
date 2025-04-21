import { EditRoomForm } from "@/components/admin";

const RoomSinglePage = async ({ params }: { params: { [key: string]: string | undefined } }) => {
	const { id } = params;
	return (
		<div className="max-w-xl mx-auto">
			<EditRoomForm id={Number(id)} />
		</div>
	);
};

export default RoomSinglePage;
