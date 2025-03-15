"use client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface Props {
	count: number;
	onPageChange?: (page: number) => void;
	className?: string;
}

export const ServerPagination: FC<Props> = ({ count, onPageChange, className = `` }) => {
	const totalPages = Math.ceil(count / 10);

	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const page = searchParams.get("page");

	const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);

	useEffect(() => {
		if (page) {
			setCurrentPage(parseInt(page));
		}
	}, [page]);

	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", page.toString());
		router.push(`${pathname}?${params}`);
		if (onPageChange) {
			onPageChange(page);
		}
	};

	const generatePagination = () => {
		if (totalPages <= 7) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		if (currentPage <= 3) {
			return [1, 2, 3, 4, "...", totalPages];
		}

		if (currentPage >= totalPages - 2) {
			return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
		}

		return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
	};

	const pagination = generatePagination();
	return (
		<div className={cn(className)}>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
							onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
						/>
					</PaginationItem>

					{pagination.map((page, index) => (
						<React.Fragment key={index}>
							{typeof page === "number" ? (
								<PaginationItem>
									<PaginationLink
										className="cursor-pointer"
										isActive={page === currentPage}
										onClick={() => handlePageChange(page)}
									>
										{page}
									</PaginationLink>
								</PaginationItem>
							) : (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
						</React.Fragment>
					))}

					<PaginationItem>
						<PaginationNext
							className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
							onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
