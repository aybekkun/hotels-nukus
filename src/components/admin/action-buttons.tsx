"use client";
import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import { Button } from "../ui";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteHotel } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface Props {
	className?: string;
	id?: number;
	type: "hotel" | "room";
}

export const ActionButtons: FC<Props> = ({ id = 0, type, className = `` }) => {
	const router = useRouter();
	const [deleting, setDeleting] = useState(false);

	const handleDelete = async (id: number) => {
		setDeleting(true);

		try {
			await deleteHotel(id);
			toast({
				title: "Hotel deleted successfully",
			});
			router.push("/admin/hotels");
			router.refresh();
		} catch (error) {
			console.error("Error deleting hotel:", error);
			alert("Failed to delete hotel");
			setDeleting(false);
		} finally {
			setDeleting(false);
		}
	};
	return (
		<div className={cn("space-x-2", className)}>
			<Button asChild>
				<Link href={"/admin/hotels/" + id}>
					<Edit />
				</Link>
			</Button>
			<Button disabled={deleting} onClick={() => handleDelete(id)} variant={"destructive"}>
				<Trash2 />
			</Button>
		</div>
	);
};
