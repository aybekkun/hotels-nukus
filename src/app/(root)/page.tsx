import { Container } from "@/components/common";
import { HotelFilter } from "@/components/user";

export default function Home() {
	return (
		<>
			<section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 pt-10 pb-[100px]">
				<Container>
					<h1 className="text-6xl font-bold text-white">Найдите идеальный отель</h1>
					<p className="text-white text-sm">От дешевых отелей до роскошных номеров и всего, что между ними.</p>
				</Container>
			</section>
			<Container>
				<div className="w-1/6 ">
					<HotelFilter />
				</div>
			</Container>
		</>
	);
}
