import { FC } from "react";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui";

interface Props {
	className?: string;
	// name?: string;
	// images?: string[];
	// price?: number;
	// description?: string;
}
const images = [
	"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export const HotelCard: FC<Props> = ({ className = `` }) => {
	return (
		<Card className={className}>
			<Carousel>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={index}>
							<img src={image} className="w-full h-48 object-cover rounded-lg" />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-0" variant={"ghost"} />
				<CarouselNext className="right-0" variant={"ghost"} />
			</Carousel>
			<CardHeader>
				<CardTitle>Zasma & co</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Очень удоьный отель всеми удобствами</CardDescription>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<span className="text-sm font-bold">
					1 300 000 <span className="text-sm font-normal text-muted-foreground">за ночь</span>
				</span>
				<Button>Бронирвать</Button>
			</CardFooter>
		</Card>
	);
};
