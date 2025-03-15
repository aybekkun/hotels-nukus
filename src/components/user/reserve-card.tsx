"use client";
import { FC, useState } from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui";
import { SelectDate } from "../common/select-date";
import { cn } from "@/lib/utils";
import { AvailableRooms } from "./available-rooms";
import { useParams, useSearchParams } from "next/navigation";
import useAuth from "@/hooks/use-auth";

interface Props {
	className?: string;
	minPrice?: number;
}

export const ReserveCard: FC<Props> = ({ className = ``, minPrice = 0 }) => {
	const [open, setOpen] = useState(false);
	const params = useParams();
	const searchParams = useSearchParams();
	const id = params.id;
	const { user } = useAuth();


	
	return (
		<>
			<Card className={cn("", className)}>
				<CardHeader>
					<CardTitle>Бронирование отелей</CardTitle>
					<CardDescription>Забронируйте проживание в нашем отеле</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<label className="leading-none text-sm ">Дата прибытия</label>
						<SelectDate name="from" text="YYYY-MM-DD" />
					</div>
					<div>
						<label className="leading-none text-sm ">Дата выхода</label>
						<SelectDate name="to" text="YYYY-MM-DD" />
					</div>
					{/* 	<div>
						<label className="leading-none text-sm ">Количество гостей</label>
						<Input type="number" placeholder="количество" />
					</div> */}
				</CardContent>
				<CardFooter className="flex flex-col gap-4">
					<span className="text-sm block font-bold ml-auto">
						от {minPrice.toLocaleString("ru-RU")}{" "}
						<span className="text-sm font-normal text-muted-foreground">за ночь</span>
					</span>
					{!user && <p className="text-sm ">Авторизируйтесь чтобы забронировать</p>}
					<Button
						onClick={() => setOpen(true)}
						disabled={Boolean(!searchParams.get("from")) || Boolean(!searchParams.get("to")) || !user}
						className="w-full"
					>
						Забронировать
					</Button>
				</CardFooter>
			</Card>
			{open && <AvailableRooms userId={user?.id} hotelId={Number(id)} onClose={() => setOpen(false)} isOpen={open} />}
		</>
	);
};
