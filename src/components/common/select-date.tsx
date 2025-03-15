"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "../ui";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Props {
	text?: string;
	name?: string;
	className?: string;
}

export const SelectDate: FC<Props> = ({ name = "date", className = ``, text = "" }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedDate, setSelectedDate] = useState<Date>();
	const date = searchParams.get(name) || "";
	useEffect(() => {
		if (date) {
			const newDate = new Date(date); // Convert the string to a Date object
			setSelectedDate(newDate);
		}
	}, [date]);

	const onDateChange = (date: Date | undefined) => {
		if (!date) return;
		const params = new URLSearchParams(window.location.search);
		params.set(name, format(date, "yyyy-MM-dd"));
		router.push(`${window.location.pathname}?${params}`);
	};
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!selectedDate && "text-muted-foreground",
						className
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{selectedDate ? format(selectedDate, "dd-MM-yyyy") : <span>{text}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar mode="single" selected={selectedDate} onSelect={onDateChange} initialFocus />
			</PopoverContent>
		</Popover>
	);
};
