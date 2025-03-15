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
	name: string;
	items?: {
		text: string;
		value: string;
	}[];
}

export const SortPopup: FC<Props> = ({ items, name }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const [selectedSort, setSelectedSort] = useState<string>("");
	const sortBy = searchParams.get(name) || "";
	useEffect(() => {
		if (sortBy && items) {
			setSelectedSort(sortBy);
		}
	}, [sortBy]);

	const onSortChange = (sort: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, sort.toString());
		router.push(`${pathname}?${params}`);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="w-[200px] justify-between overflow-hidden">
					{selectedSort ? "По " + items?.find((item) => item.value === selectedSort)?.text : "Сортировать по"}
					<ChevronDown className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[200px] max-h-60 overflow-y-auto">
				<DropdownMenuLabel>Сортировать по</DropdownMenuLabel>
				{items?.map((item) => (
					<DropdownMenuItem key={item.value} onClick={() => onSortChange(item.value)}>
						{item.text}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
