import { Prisma } from "@prisma/client";
import { prisma } from "../../../../../prisma/prisma-client";
import { ServerPagination, DataTable } from "@/components/common";
import { Button, TableCell, TableRow } from "@/components/ui";
import { getUser } from "@/lib/auth";
import { ActionButtons } from "@/components/admin";
import Link from "next/link";

const HotelPage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
	const user = await getUser();
	const { page, ...queryParams } = searchParams;
	const query: Prisma.HotelWhereInput = {};
	const p = page ? parseInt(page) : 1;
	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.name = { contains: value, mode: "insensitive" };
						break;
					default:
						break;
				}
			}
		}
	}

	const [data, count] = await prisma.$transaction([
		prisma.hotel.findMany({
			where: query,
			take: 10,
			skip: 10 * (p - 1),
			orderBy: { createdAt: "desc" },
		}),
		prisma.hotel.count({ where: query }),
	]);

	const columns = [
		{
			header: "Название",
			accessor: "name",
		},
		{
			header: "Адрес",
			accessor: "address",
		},
		{
			header: "Описание",
			accessor: "description",
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
				<TableCell>{item.address}</TableCell>
				<TableCell>{item.description}</TableCell>
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
			<Button asChild variant="outline" className="mb-4">
				<Link href="/admin/hotels/new">Добавить отель</Link>
			</Button>
			<DataTable columns={columns} renderRow={renderRow} data={data} />
			<ServerPagination count={count} />
		</div>
	);
};

export default HotelPage;
