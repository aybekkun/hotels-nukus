import { cookies } from "next/headers";
import { jwtVerify } from "jose";
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
		// Создаем TextEncoder для преобразования секретного ключа в Uint8Array
		const encoder = new TextEncoder();
		const secretKey = encoder.encode(JWT_SECRET);
		
		// Верифицируем токен с помощью jose
		const { payload } = await jwtVerify(token, secretKey);
		
		// Получаем ID из верифицированного токена
		const id = payload.id as string;

		// Находим пользователя в базе данных
		const user = await prisma.user.findUnique({
			where: { id: Number(id) },
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
		console.log(error);
		return null;
	}
}

// Проверка прав доступа на основе ролей
export function hasRole(user: User, requiredRoles: string[]) {
	if (!user) return false;
	return requiredRoles.includes(user.role);
}