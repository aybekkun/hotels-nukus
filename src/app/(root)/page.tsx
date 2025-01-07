import { Container, SortPopup, Title } from "@/components/common";
import { HotelFilter, HotelList } from "@/components/user";

export default function Home() {
	return (
		<>
			<section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 pt-10 pb-[100px]">
				<Container>
					<h1 className="text-6xl font-bold text-white">Найдите идеальный отель</h1>
					<p className="text-white text-sm">От дешевых отелей до роскошных номеров и всего, что между ними.</p>
				</Container>
			</section>
			<Container className="flex pt-8 gap-4">
				<div className="w-[205px]">
					<HotelFilter />
				</div>
				<div className="w-full">
					<div className="flex items-center gap-2 justify-between">
						<Title text="Все отели" size="xl" />
						<SortPopup
							items={[
								{ text: "рейтингу", value: "rating" },
								{ text: "цене", value: "price" },
								{ text: "алфавиту", value: "alphabet" },
							]}
						/>
					</div>
					<HotelList />
				</div>
			</Container>
		</>
	);
}
