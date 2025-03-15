import { FC } from "react";
import { Container } from "../common";
import { Hotel } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SearchHotel } from "./search-hotel";
import { UserButtonGroup } from "./user-button-group";

interface Props {
	className?: string;
}

export const Navbar: FC<Props> = ({ className = `` }) => {
	return (
		<div className={cn("border-b", className)}>
			<Container className="flex justify-between items-center h-16">
				<Link href={"/"} className="flex items-center gap-1">
					<Hotel className="w-9 h-9" />
					<div>
						<h2 className="text-2xl uppercase font-black">Hotel</h2>
						<p className="text-sm text-gray-400 leading-3">топ отели в городе</p>
					</div>
				</Link>
				<SearchHotel className="md:block hidden"/>
				<UserButtonGroup />
			</Container>
		</div>
	);
};
