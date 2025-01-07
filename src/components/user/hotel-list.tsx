import { FC } from "react";
import { HotelCard } from "./hotel-card";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
}

export const HotelList: FC<Props> = ({ className = `` }) => {
	return (
		<div className={cn(" grid grid-cols-3 gap-4", className)}>
			<HotelCard />
			<HotelCard />
			<HotelCard />
			<HotelCard />
			<HotelCard />
			<HotelCard />
		</div>
	);
};
