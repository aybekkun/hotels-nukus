import { cn } from "@/lib/utils";
import { FC } from "react";
import { Button } from "../ui";
import { Heart, ShoppingBag } from "lucide-react";

interface Props {
	className?: string;
}

export const UserButtonGroup: FC<Props> = ({ className = `` }) => {
	return (
		<div className={cn("flex items-center gap-1", className)}>
			<Button variant="outline">Войти</Button>
			<div className="inline-flex " role="group">
				<Button variant="outline" className="rounded-r-none">
					<ShoppingBag className="mr-2 h-4 w-4" />
				</Button>
				<Button variant="outline" className="rounded-l-none border-l-0">
					<Heart className="mr-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
};
