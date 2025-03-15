"use client";
import { FC, useEffect, useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	ScrollArea,
} from "../ui";
import { useSearchParams } from "next/navigation";
import { CategoryWithAvailableRooms } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

interface Props {
	userId?: number;
	isOpen: boolean;
	onClose: () => void;
	hotelName?: string;
	hotelId: number;
}

export const AvailableRooms: FC<Props> = ({ userId, isOpen, onClose, hotelName = "", hotelId }) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [selectedRoom, setSelectedRoom] = useState<any>(null);
	const searchParams = useSearchParams();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [rooms, setRooms] = useState<CategoryWithAvailableRooms[]>([]);

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const response = await fetch(
					`/api/hotels/${hotelId}/rooms?from=${searchParams.get("from")}&to=${searchParams.get("to")}`
				);
				const data = await response.json();

				setRooms(data.rooms);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			}
		};
		fetchRooms();
	}, [hotelId]);
	const handleBookRoom = async () => {
		if (selectedRoom) {
			await fetch(`/api/hotels/${hotelId}/rooms`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: userId,
					roomId: selectedRoom.id,
					startDate: searchParams.get("from"),
					endDate: searchParams.get("to"),
				}),
			})
				.then(() => {
					toast({
						title: "Success",
						description: "BOOKED",
					});
				})
				.catch(() => {
					toast({
						title: "Error",
						description: "Something went wrong",
						variant: "destructive",
					});
				});
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px] ">
				<DialogHeader>
					<DialogTitle>Available Rooms at {hotelName}</DialogTitle>
					<DialogDescription>Select a room to book your stay.</DialogDescription>
				</DialogHeader>
				<div className="mt-4">
					<ScrollArea className="h-[400px]">
						<Accordion type="single" collapsible className="w-full">
							{rooms.map((category, index) => (
								<AccordionItem value={`item-${index}`} key={index}>
									<AccordionTrigger>{category.name}</AccordionTrigger>
									<AccordionContent>
										<div className="grid gap-4 py-4">
											{category.rooms.map((room) => (
												<div
													key={room.id}
													className={`p-4 border rounded-lg cursor-pointer ${
														selectedRoom?.id === room.id ? "border-primary" : "border-gray-200"
													}`}
													onClick={() => setSelectedRoom(room)}
												>
													<h3 className="font-semibold">{room.name}</h3>
													<p>Вместимость: {room.capacity}</p>
													<p>Цена: ${room.price} за ночь</p>
												</div>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</ScrollArea>
				</div>
				<DialogFooter>
					<Button onClick={handleBookRoom} disabled={!selectedRoom}>
						Book Room
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
