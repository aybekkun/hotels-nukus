import { EditHotelForm } from "@/components/admin";

const HotelSinglePage = async ({ params }: { params: { [key: string]: string | undefined } }) => {
	const { id } = params;
	return (
		<div className="max-w-xl mx-auto">
			<EditHotelForm id={Number(id)} />
		</div>
	);
};

export default HotelSinglePage;
