import { FC } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui";
import { Title } from "./title";

interface Props {
	title: string;
	name?: string;
	items: FilterCheckboxProps[];
	className?: string;
	onClickCheckbox?: (id: string) => void;
	selected?: Set<string>;
}

export const FilterGroup: FC<Props> = ({
	title,
	items,
	name,
	className = ``,
	onClickCheckbox = () => undefined,
	selected = new Set([]),
}) => {
	return (
		<Card className={cn("", className)}>
			<CardHeader>
				<Title text={title} size="xs" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{items.map((item) => (
					<FilterCheckbox
						key={item.value}
						name={name}
						value={item.value}
						text={item.text}
						onCheckedChange={() => onClickCheckbox(item.value)}
						checked={selected.has(item.value)}
					/>
				))}
			</CardContent>
		</Card>
	);
};
