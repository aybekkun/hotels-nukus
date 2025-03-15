import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
		}

		const room = await prisma.room.findUnique({
			where: { id },
			include: {
				hotel: true,
				category: true,
				bookings: true,
			},
		});

		if (!room) {
			return NextResponse.json({ error: "Room not found" }, { status: 404 });
		}

		return NextResponse.json(room, { status: 200 });
	} catch (error) {
		console.error("Error fetching room:", error);
		return NextResponse.json({ error: "Failed to fetch room" }, { status: 500 });
	}
}

// PUT - Update a room
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
		}

		const body = await request.json();
		const { name, roomNumber, capacity, price, hotelId, categoryId } = body;

		const room = await prisma.room.update({
			where: { id },
			data: {
				name,
				roomNumber,
				capacity,
				price,
				hotelId,
				categoryId
			},
		});

		return NextResponse.json(room, { status: 200 });
	} catch (error) {
		console.error("Error updating room:", error);
		return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
	}
}

// DELETE - Delete a room
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
		}

		await prisma.room.delete({
			where: { id },
		});

		return NextResponse.json({ message: "Room deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("Error deleting room:", error);
		return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
	}
}
