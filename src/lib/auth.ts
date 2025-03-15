import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/prisma-client";
import { User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function getUser() {
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

		return user;
	} catch (error) {
		return console.log(error);
	}
}

// Проверка прав доступа на основе ролей
export function hasRole(user: User, requiredRoles: string[]) {
	if (!user) return false;
	return requiredRoles.includes(user.role);
}
