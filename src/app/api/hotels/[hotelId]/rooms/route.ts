import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../prisma/prisma-client";

export async function GET(req: NextRequest, { params }: { params: { hotelId: string } }) {
	try {
		const { searchParams } = new URL(req.url);
		const startDate = searchParams.get("from");
		const endDate = searchParams.get("to");
		const hotelId = params.hotelId; // Берем из динамического маршрута

		if (!startDate || !endDate) {
			return NextResponse.json({ error: "startDate and endDate are required" }, { status: 400 });
		}

		const start = new Date(startDate);
		const end = new Date(endDate);
		const hotelIdNum = parseInt(hotelId, 10);

		if (isNaN(start.getTime()) || isNaN(end.getTime()) || isNaN(hotelIdNum)) {
			return NextResponse.json({ error: "Invalid date format or hotelId" }, { status: 400 });
		}

		const categoriesWithAvailableRooms = await prisma.roomCategory.findMany({
			where: {
				rooms: {
					some: {
						hotelId: hotelIdNum,
						bookings: {
							none: {
								OR: [{ startDate: { lte: end }, endDate: { gte: start } }],
							},
						},
					},
				},
			},
			include: {
				rooms: {
					where: {
						hotelId: hotelIdNum,
						bookings: {
							none: {
								OR: [{ startDate: { lte: end }, endDate: { gte: start } }],
							},
						},
					},
				},
			},
			orderBy: {
				id: "asc",
			},
		});

		return NextResponse.json({ rooms: categoriesWithAvailableRooms });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { userId, roomId, startDate, endDate } = body;

		// Валидация данных
		const existingBooking = await prisma.booking.findFirst({
			where: {
				roomId,
				AND: [
					{
						OR: [{ startDate: { lte: new Date(startDate) }, endDate: { gte: new Date(endDate) } }],
					},
				],
			},
		});

		if (existingBooking) {
			throw new Error("This room is already booked for the selected dates.");
		}

		if (!userId || !roomId || !startDate || !endDate) {
			return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
		}

		// Создание бронирования
		await prisma.booking.create({
			data: {
				userId,
				roomId,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
			},
		});

		return NextResponse.json({ status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
