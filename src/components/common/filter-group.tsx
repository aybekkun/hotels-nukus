import { FC } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui";

interface Props {
	title: string;
	name?: string;
	items: FilterCheckboxProps[];
	className?: string;
}

export const FilterGroup: FC<Props> = ({ title, items, name, className = `` }) => {
	return (
		<Card className={cn("", className)}>
			<CardHeader>
				<h2 className="text-sm font-semibold">{title}</h2>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{items.map((item) => (
					<FilterCheckbox key={item.value} name={name} value={item.value} text={item.text} />
				))}
			</CardContent>
		</Card>
	);
};