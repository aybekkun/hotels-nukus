import type { Metadata } from "next";

import { Navbar } from "@/components/user";

//import { Toaster } from "@/components/ui";


export const metadata: Metadata = {
	title: "Nukus Hotels ",
	description: "NUKUS HOTELS LIST",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	
	return (
		<>
			<Navbar />
			<main className="bg-[#FBFBFB] min-h-screen">{children}</main>
			{/* 		<Toaster /> */}
		</>
	);
}
