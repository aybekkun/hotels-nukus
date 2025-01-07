"use client";
import { FC, useEffect, useState } from "react";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
interface Props {
	items?: {
		text: string;
		value: string;
	}[];
}

export const SortPopup: FC<Props> = ({ items }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [selectedSort, setSelectedSort] = useState("");
	const sortBy = searchParams.get("sortBy") || "";
	useEffect(() => {
		if (sortBy) {
			setSelectedSort(sortBy);
		}
	}, [sortBy]);

	const onSortChange = (sort: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("sortBy", sort.toString());
		router.push(`${pathname}?${params}`);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-[200px] justify-between overflow-hidden">
					{selectedSort ? "По" + selectedSort : "Сортировать по"}
					<ChevronDown className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px]">
				<DropdownMenuLabel>Сортировать по</DropdownMenuLabel>
				{items?.map((item) => (
					<DropdownMenuItem key={item.value} onClick={() => onSortChange(item.text)}>
						{item.text}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
