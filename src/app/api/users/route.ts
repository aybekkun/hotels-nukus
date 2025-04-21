import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "../../../../prisma/prisma-client";

// Получить всех пользователей
export async function GET() {
	try {
		const users = await prisma.user.findMany({
			select: { id: true, name: true, phone: true, role: true, createdAt: true },
		});
		return NextResponse.json(users);
	} catch (error) {
		return NextResponse.json({ error: "Ошибка при получении пользователей" }, { status: 500 });
	}
}

// Создать нового пользователя
export async function POST(request: Request) {
	try {
		const { name, phone, password, role } = await request.json();

		// Проверка уникальности телефона
		const existingUser = await prisma.user.findUnique({ where: { phone } });
		if (existingUser) {
			return NextResponse.json({ error: "Пользователь с этим телефоном уже существует" }, { status: 400 });
		}

		// Хэширование пароля
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: { name, phone, password: hashedPassword, role },
			select: { id: true, name: true, phone: true, role: true },
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "Ошибка при создании пользователя" }, { status: 500 });
	}
}
