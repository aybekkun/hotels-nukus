import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

// GET - Fetch a specific booking by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
		}

		const booking = await prisma.booking.findUnique({
			where: { id },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						phone: true,
					},
				},
				room: {
					include: {
						hotel: true,
					},
				},
			},
		});

		if (!booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 });
		}

		return NextResponse.json(booking);
	} catch (error) {
		console.error("Error fetching booking:", error);
		return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 });
	}
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseInt(params.id);

		if (isNaN(id)) {
			return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
		}

		// Check if booking exists
		const booking = await prisma.booking.findUnique({
			where: { id },
		});

		if (!booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 });
		}

		// Delete booking
		await prisma.booking.delete({
			where: { id },
		});

		return NextResponse.json({ message: "Booking deleted successfully" });
	} catch (error) {
		console.error("Error deleting booking:", error);
		return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
	}
}
