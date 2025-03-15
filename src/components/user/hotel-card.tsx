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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface Props {
	className?: string;
	id: number;
	name: string;
	images?: string[];
	minPrice: number;
	description: string;
}

export const HotelCard: FC<Props> = ({ id, name, images = [], minPrice = 0, className = `` }) => {
	return (
		<Card className={cn("relative", className)}>
			<Button variant={"outline"} size={"icon"} className="absolute top-2  opacity-45 right-2 z-10 rounded-full">
				<Heart />
			</Button>
			<Carousel>
				<CarouselContent>
					{images.slice(0, 4).map((image, index) => (
						<CarouselItem key={index}>
							<img src={image} alt={name} className="w-full aspect-video h-48 object-cover rounded-lg" />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="left-0" variant={"ghost"} />
				<CarouselNext className="right-0" variant={"ghost"} />
			</Carousel>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>Очень удоьный отель всеми удобствами</CardDescription>
			</CardContent>
			<CardFooter className="flex items-center justify-between">
				<span className="text-sm font-bold">
					{minPrice.toLocaleString("ru-RU")} <span className="text-sm font-normal text-muted-foreground">за ночь</span>
				</span>
				<Button asChild>
					<Link href={`/hotel/${id}`}>Бронирвать</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};
