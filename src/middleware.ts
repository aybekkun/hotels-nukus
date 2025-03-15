import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { User } from "@prisma/client";
import { prisma } from "../prisma/prisma-client";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function middleware(req: NextRequest) {
	const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
	if (!isAdminRoute) {
		return NextResponse.next();
	}
	const cookieStore = cookies();
	const token = cookieStore.get("auth-token")?.value;

	if (!token) {
		return null;
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

		const user = await prisma.user.findUnique({
			where: { id: Number(decoded.id) },
			select: {
				id: true,
				phone: true,
				name: true,
				role: true,
				bookings: true,
			},
		});

		if (user?.role !== "ADMIN" && user?.role !== "OWNER") {
			return NextResponse.redirect(new URL("/sign-in", req.url));
		}

		return NextResponse.next();
	} catch (error) {
		console.error("Authentication error:", error);
		NextResponse.redirect(new URL("/sign-in", req.url));
	}
}

export const config = {
	matcher: ["/admin/:path*"],
};
