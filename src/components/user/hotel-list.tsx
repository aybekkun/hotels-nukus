import { FC } from "react";
import { HotelCard } from "./hotel-card";
import { cn } from "@/lib/utils";
import { Hotel } from "@prisma/client";

interface Props {
	className?: string;
	data?: Hotel[];
}

export const HotelList: FC<Props> = ({ className = ``, data = [] }) => {
	return (
		<div className={cn(" grid  xl:grid-cols-3 lg:grid-cols-2 gap-4 sm:grid-cols-2", className)}>
			{data.map((hotel) => (
				<HotelCard {...hotel} key={hotel.id} />
			))}
		</div>
	);
};
