"use client";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { Button } from "../ui";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteBooking, deleteHotel, deleteRoom, deleteUser } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface Props {
	className?: string;
	id?: number;
	type: "hotel" | "room" | "user" | "booking";
}
const HREF_MAP = {
	hotel: "/admin/hotels/",
	room: "/admin/rooms/",
	user: "/admin/users/",
	booking: "/admin/bookings/",
};
const DELETE_ACTION = {
	hotel: deleteHotel,
	room: deleteRoom,
	user: deleteUser,
	booking: deleteBooking,
} as {
	[key: string]: (id: number) => Promise<void>;
};

export const ActionButtons: FC<Props> = ({ id = 0, type, className = `` }) => {
	const router = useRouter();
	const [deleting, setDeleting] = useState(false);
	const handleDelete = async (id: number) => {
		setDeleting(true);

		try {
			await DELETE_ACTION[type](id);
			toast({
				title: "deleted successfully",
			});
			router.push(HREF_MAP[type]);
			router.refresh();
		} catch (error) {
			console.error("Error deleting:", error);
			alert("Failed to delete");
		} finally {
			setDeleting(false);
		}
	};
	return (
		<div className={cn("space-x-2", className)}>
			<Button asChild>
				<Link href={HREF_MAP[type] + id}>
					<Edit />
				</Link>
			</Button>
			<Button disabled={deleting} onClick={() => handleDelete(id)} variant={"destructive"}>
				<Trash2 />
			</Button>
		</div>
	);
};
