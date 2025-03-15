import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

// GET - Fetch all rooms
export async function GET() {
	try {
		const rooms = await prisma.room.findMany({
			include: {
				hotel: true,
				category: true,
			},
		});

		return NextResponse.json(rooms, { status: 200 });
	} catch (error) {
		console.error("Error fetching rooms:", error);
		return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
	}
}

// POST - Create a new room
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, roomNumber, capacity, price, hotelId, categoryId } = body;

		const room = await prisma.room.create({
			data: {
				name,
				roomNumber,
				capacity,
				price,
				hotelId: hotelId,
				categoryId: categoryId,
			},
		});

		return NextResponse.json(room, { status: 201 });
	} catch (error) {
		console.error("Error creating room:", error);
		return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
	}
}
