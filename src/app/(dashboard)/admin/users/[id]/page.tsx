import { EditUserForm } from "@/components/admin";

const UserSinglePage = async ({ params }: { params: { [key: string]: string | undefined } }) => {
	const { id } = params;
	return (
		<div className="max-w-xl mx-auto">
			<EditUserForm id={Number(id)} />
		</div>
	);
};

export default UserSinglePage;
