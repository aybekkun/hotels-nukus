import { Room } from "@prisma/client";

export interface CategoryWithAvailableRooms {
	id: number;
	name: string;
	rooms: Room[]; // список комнат с информацией о категории
}
