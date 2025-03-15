import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST(request: NextRequest) {
	try {
		const { phone, password, name } = await request.json();

		// Проверка существования пользователя
		const existingUser = await prisma.user.findUnique({
			where: { phone },
		});

		if (existingUser) {
			return NextResponse.json({ error: "Пользователь с таким номером телефона уже существует" }, { status: 400 });
		}

		// Хеширование пароля
		const hashedPassword = await bcrypt.hash(password, 10);

		// Создание пользователя
		const user = await prisma.user.create({
			data: {
				phone,
				password: hashedPassword,
				name,
				// По умолчанию роль USER устанавливается в схеме
			},
		});

		// Не отправляем пароль в ответе
		const { password: _, ...userWithoutPassword } = user;

		return NextResponse.json({ user: userWithoutPassword, message: "Регистрация успешна" }, { status: 201 });
	} catch (error) {
		console.error("Ошибка регистрации:", error);
		return NextResponse.json({ error: "Ошибка при регистрации пользователя" }, { status: 500 });
	}
}
