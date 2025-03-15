import { Container } from "@/components/common";
import { HotelFilter, HotelList } from "@/components/user";
import { Prisma } from "@prisma/client";
import { prisma } from "../../../prisma/prisma-client";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
	const { ...queryParams } = searchParams;

	//const p = page ? parseInt(page) : 1;

	const query: Prisma.HotelWhereInput = {};

	if (queryParams) {
		for (const [key, value] of Object.entries(queryParams)) {
			if (value !== undefined) {
				switch (key) {
					case "search":
						query.name = { contains: value, mode: "insensitive" };
						break;
					case "filter":
						if (value.length) {
							query.AND = value.split(",").map((id) => ({
								hotelFacilities: {
									some: {
										facilitiesItemId: parseInt(id),
									},
								},
							}));
						}
						break;
					default:
						break;
				}
			}
		}
	}
	const [data] = await prisma.$transaction([
		prisma.hotel.findMany({
			where: query,
		}),
		prisma.hotel.count({ where: query }),
	]);

	return (
		<>
			<section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 pt-10 pb-[100px]">
				<Container>
					<h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white">Найдите идеальный отель</h1>
					<p className="text-white text-sm">От дешевых отелей до роскошных номеров и всего, что между ними.</p>
				</Container>
			</section>
			<Container className="flex pt-8 flex-col-reverse md:flex-row gap-4 pb-10">
				<div className="w-full md:w-[205px]">
					<HotelFilter />
				</div>
				<div className="w-full">
					<div className="flex items-center gap-2 justify-between pb-4">
						<h2 className="text-2xl">Все отели</h2>

						{/* 		<SortPopup
							name="sortBy"
							items={[
								{ text: "рейтингу", value: "rating" },
								{ text: "цене", value: "price" },
								{ text: "алфавиту", value: "alphabet" },
							]}
						/> */}
					</div>
					<HotelList data={data} />
				</div>
			</Container>
		</>
	);
}
