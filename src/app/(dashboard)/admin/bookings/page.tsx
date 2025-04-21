import { getUser } from "@/lib/auth";
import { Booking, Prisma } from "@prisma/client";
import { prisma } from "../../../../../prisma/prisma-client";
import { ActionButtons } from "@/components/admin";
import { TableCell, TableRow } from "@/components/ui";
import { DataTable, ServerPagination, SortPopup } from "@/components/common";

const BookingsSinglePage = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
	const user = await getUser();
	const { page, ...queryParams } = searchParams;
	const query: Prisma.BookingWhereInput = {};
	const p = page ? parseInt(page) : 1;
	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "hotel":
						if (parseInt(value)) {
							query.room = { hotelId: parseInt(value) };
						}
						break;
					default:
						break;
				}
			}
		}
	}
	const [data, hotels, count] = await prisma.$transaction([
		prisma.booking.findMany({
			where: query,
			include: {
				room: {
					select: {
						name: true,
					},
				},
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
		prisma.booking.count({ where: query }),
	]);

	const hotelsData = hotels.map((item) => ({ value: String(item.id), text: item.name }));

	const columns = [
		{
			header: "Nomi",
			accessor: "name",
		},
		{
			header: "Kategoriya",
			accessor: "category",
		},
		{
			header: "Mehmonxona",
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

	const renderRow = (item: Booking) => {
		return (
			<TableRow>
				<TableCell>{item.roomId}</TableCell>
				<TableCell>{item.startDate.toLocaleString("ru-Ru")}</TableCell>
				<TableCell>{item.endDate.toLocaleString("ru-Ru")}</TableCell>
				{user?.role === "ADMIN" && (
					<TableCell>
						<ActionButtons id={item.id} type="booking" />
					</TableCell>
				)}
			</TableRow>
		);
	};

	return (
		<div>
			<h2 className="text-3xl font-semibold mb-4">Band qilingan xonalar ro&apos;yxati</h2>
			<div className="flex items-center gap-4 mb-4">
				<SortPopup name="hotel" items={[{ text: "Hammasi", value: "0" }, ...hotelsData]} />
				{/* 		<div className="flex items-center gap-4">
					От:
					<SelectDate name="from" text="YYYY-MM-DD" />
					До:
					<SelectDate name="to" text="YYYY-MM-DD" />
				</div> */}
			</div>

			<DataTable columns={columns} renderRow={renderRow} data={data} />
			<ServerPagination count={count} />
		</div>
	);
};

export default BookingsSinglePage;
