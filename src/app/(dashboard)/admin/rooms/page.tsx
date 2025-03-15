import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../prisma/prisma-client";
import { Button, TableCell, TableRow } from "@/components/ui";
import { getUser } from "@/lib/auth";
import { ActionButtons } from "@/components/admin";
import Link from "next/link";
import { DataTable, ServerPagination, SortPopup } from "@/components/common";

const RoomPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
	const user = await getUser();
	const { page, ...queryParams } = searchParams;
	const query: Prisma.RoomWhereInput = {};
	const p = page ? parseInt(page) : 1;
	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.name = { contains: value, mode: "insensitive" };
						break;
					case "sort":
						if (parseInt(value)) {
							query.categoryId = { equals: parseInt(value) };
						}

						break;
					case "hotel":
						if (parseInt(value)) {
							query.hotelId = { equals: parseInt(value) };
						}
					default:
						break;
				}
			}
		}
	}

	const [data, hotels, count] = await prisma.$transaction([
		prisma.room.findMany({
			where: query,
			include: {
				category: true,
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
		prisma.room.count({ where: query }),
	]);

	const hotelsData = hotels.map((item) => ({ value: String(item.id), text: item.name }));

	const columns = [
		{
			header: "Название",
			accessor: "name",
		},
		{
			header: "Категория",
			accessor: "category",
		},
		{
			header: "Отель",
			accessor: "hotel",
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
				<TableCell>{item.category.name}</TableCell>
				<TableCell>{item.hotel ? item.hotel.name : ""}</TableCell>
				{user?.role === "ADMIN" && (
					<TableCell>
						<ActionButtons id={item.id} type="hotel" />
					</TableCell>
				)}
			</TableRow>
		);
	};

	return (
		<div>
			<h2 className="text-3xl font-semibold mb-4">Список отелей</h2>
			<div className="flex items-center gap-4 mb-4">
				<Button asChild variant="outline">
					<Link href="/admin/rooms/new">Добавить номер</Link>
				</Button>
				<SortPopup
					items={[
						{ text: "Все", value: "0" },
						{ text: "Стандартный", value: "1" },
						{ text: "Люкс", value: "2" },
						{ text: "Семейный", value: "3" },
						{ text: "Президентский", value: "4" },
					]}
					name="sort"
				/>
				<SortPopup name="hotel" items={[{ text: "Все", value: "0" }, ...hotelsData]} />
			</div>

			<DataTable columns={columns} renderRow={renderRow} data={data} />
			<ServerPagination count={count} />
		</div>
	);
};

export default RoomPage;
