import { NextResponse } from "next/server";

import bcrypt from "bcrypt";
import { prisma } from "../../../../../prisma/prisma-client";

// Получить пользователя по ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const user = await prisma.user.findUnique({
			where: { id: parseInt(params.id) },
			include: { bookings: true, hotel: true },
		});

		return user ? NextResponse.json(user) : NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
	} catch (error) {
		return NextResponse.json({ error: "Ошибка при получении пользователя" }, { status: 500 });
	}
}

// Обновить пользователя
export async function PUT(request: Request, { params }: { params: { id: string } }) {
	try {
		const { name, phone, password, role, hotelId } = await request.json();

		// Create update data without hotelId since it's not part of the User model
		const updateData: any = { name, phone, role };
		console.log(updateData);

		if (password) {
			updateData.password = await bcrypt.hash(password, 10);
		}

		const updatedUser = await prisma.user.update({
			where: { id: parseInt(params.id) },
			data: {
				...updateData,
			},
			select: { id: true, name: true, phone: true, role: true },
		});

		// If hotelId is provided, update the hotel to link it to this user
		if (hotelId) {
			await prisma.hotel.update({
				where: { id: parseInt(hotelId) },
				data: { hotelOwnerId: updatedUser.id },
			});
		}

		return NextResponse.json(updatedUser);
	} catch (error) {
		return NextResponse.json({ error: "Ошибка при обновлении пользователя" }, { status: 500 });
	}
}
// Удалить пользователя
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	try {
		await prisma.user.delete({ where: { id: parseInt(params.id) } });
		return new Response(null, { status: 204 });
	} catch (error) {
		return NextResponse.json({ error: "Ошибка при удалении пользователя" }, { status: 500 });
	}
}
