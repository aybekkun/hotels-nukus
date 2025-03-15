import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "../../../../../prisma/prisma-client";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Используйте .env для реальных проектов!

export async function POST(request: NextRequest) {
	try {
		const { phone, password } = await request.json();

		// Поиск пользователя
		const user = await prisma.user.findUnique({
			where: { phone },
		});

		if (!user) {
			return NextResponse.json({ error: "Неверные учетные данные" }, { status: 400 });
		}

		// Проверка пароля
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return NextResponse.json({ error: "Неверные учетные данные" }, { status: 400 });
		}

		// Создание JWT токена
		const token = jwt.sign(
			{
				id: user.id,
				phone: user.phone,
				role: user.role,
			},
			JWT_SECRET,
			{ expiresIn: "1d" }
		);

		// Установка cookie с токеном
		cookies().set({
			name: "auth-token",
			value: token,
		//	httpOnly: true,
			path: "/",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24*30, // 30 день
		});

		// Не отправляем пароль в ответе
		const { password: _, ...userWithoutPassword } = user;

		return NextResponse.json({
			user: userWithoutPassword,
			message: "Вход выполнен успешно",
		});
	} catch (error) {
		console.error("Ошибка входа:", error);
		return NextResponse.json({ error: "Ошибка при входе в систему" }, { status: 500 });
	}
}
