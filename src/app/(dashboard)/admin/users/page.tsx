import { Prisma, Role } from "@prisma/client";
import { prisma } from "../../../../../prisma/prisma-client";
import {  TableCell, TableRow } from "@/components/ui";
import { getUser } from "@/lib/auth";
import { ActionButtons } from "@/components/admin";

import { DataTable, ServerPagination, SortPopup } from "@/components/common";

const UsersPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
	const user = await getUser();
	const { page, ...queryParams } = searchParams;
	const query: Prisma.UserWhereInput = {};
	const p = page ? parseInt(page) : 1;
	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.name = { contains: value, mode: "insensitive" };
						break;
					case "role":
						if (value !== "0") {
							query.role = value as Role;
						}

						break;
					case "hotel":
						if (parseInt(value)) {
							query.hotel = { id: parseInt(value) };
						}
					default:
						break;
				}
			}
		}
	}

	const [data, hotels, count] = await prisma.$transaction([
		prisma.user.findMany({
			where: query,
			include: {
				hotel: true,
			},
			take: 10,
			skip: 10 * (p - 1),
			orderBy: { createdAt: "desc" },
		}),
		prisma.hotel.findMany({
			select: {
				id: true,
				name: true,
			},
		}),
		prisma.user.count({ where: query }),
	]);

	const hotelsData = hotels.map((item) => ({ value: String(item.id), text: item.name }));

	const columns = [
		{
			header: "Имя",
			accessor: "name",
		},
		{
			header: "Телефон",
			accessor: "phone",
		},
		{
			header: "Роль",
			accessor: "role",
		},

		...(user?.role === "ADMIN"
			? [
					{
						header: "Actions",
						accessor: "action",
					},
			  ]
			: []),
	];

	const renderRow = (item: any) => {
		return (
			<TableRow>
				<TableCell>{item.name}</TableCell>
				<TableCell>{item.phone}</TableCell>
				<TableCell>{item.role}</TableCell>
				{user?.role === "ADMIN" && (
					<TableCell>
						<ActionButtons id={item.id} type="user" />
					</TableCell>
				)}
			</TableRow>
		);
	};

	return (
		<div>
			<h2 className="text-3xl font-semibold mb-4">Список пользователей</h2>
			<div className="flex items-center gap-4 mb-4">
				<SortPopup name="hotel" items={[{ text: "Все", value: "0" }, ...hotelsData]} />
				<SortPopup
					name="role"
					items={[
						{ text: "Все", value: "0" },
						{
							text: "Администратор",
							value: Role.ADMIN,
						},
						{
							text: "Владельец",
							value: Role.OWNER,
						},
					]}
				/>
			</div>

			<DataTable columns={columns} renderRow={renderRow} data={data} />
			<ServerPagination count={count} />
		</div>
	);
};

export default UsersPage;
