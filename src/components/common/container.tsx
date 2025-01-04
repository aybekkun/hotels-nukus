import { cn } from "@/lib/utils";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
	className?: string;
};

export const Container: FC<Props> = ({ className = ``, children }) => {
	return <div className={cn("mx-auto px-5 max-w-[1280px]", className)}>{children}</div>;
};
