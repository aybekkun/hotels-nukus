"use client";

import { FC, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui";

// Simulated search results
const searchResults = ["React", "Next.js", "Tailwind CSS", "TypeScript", "JavaScript", "Node.js", "GraphQL"];

interface Props {
	className?: string;
}

export const SearchHotel: FC<Props> = ({ className = `` }) => {
	const [query, setQuery] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const filteredResults = searchResults.filter((result) => result.toLowerCase().includes(query.toLowerCase()));

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setIsDropdownOpen(e.target.value.length > 0);
	};

	const clearInput = () => {
		setQuery("");
		setIsDropdownOpen(false);
	};
	return (
		<div className={cn("relative", className)}>
			<Input
				type="text"
				placeholder="Поиск..."
				value={query}
				onChange={handleInputChange}
				className="w-full py-2 pl-10 pr-10 text-gray-700 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white hover:bg-gray-200 transition-colors"
			/>
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<Search className="h-5 w-5 text-gray-400" />
			</div>
			{query && (
				<button onClick={clearInput} className="absolute inset-y-0 right-0 pr-3 flex items-center">
					<X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
				</button>
			)}
			{isDropdownOpen && filteredResults.length > 0 && (
				<div className="absolute mt-1 w-full z-30 bg-white rounded-md shadow-lg max-h-60 overflow-auto ">
					<ul className="py-1">
						{filteredResults.map((result, index) => (
							<li
								key={index}
								className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
								onClick={() => {
									setQuery(result);
									setIsDropdownOpen(false);
								}}
							>
								{result}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
