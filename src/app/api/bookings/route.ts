import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

// GET - Fetch all bookings with optional filtering
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract filter parameters
		const userId = searchParams.get("userId") ? parseInt(searchParams.get("userId")!) : undefined;
		const roomId = searchParams.get("roomId") ? parseInt(searchParams.get("roomId")!) : undefined;
		const hotelId = searchParams.get("hotelId") ? parseInt(searchParams.get("hotelId")!) : undefined;
		const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined;
		const endDate = searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined;

		// Build filter object
		const filter: any = {};

		if (userId) filter.userId = userId;
		if (roomId) filter.roomId = roomId;

		// Date range filtering
		if (startDate) filter.startDate = { gte: startDate };
		if (endDate) filter.endDate = { lte: endDate };

		// Handle hotel filtering (requires join)
		const bookings = await prisma.booking.findMany({
			where: filter,
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
						hotel: hotelId
							? {
									where: { id: hotelId },
							  }
							: true,
					},
				},
			},
		});

		// If hotelId is provided, filter out bookings for other hotels
		const filteredBookings = hotelId ? bookings.filter((booking) => booking.room.hotel?.id === hotelId) : bookings;

		return NextResponse.json(filteredBookings);
	} catch (error) {
		console.error("Error fetching bookings:", error);
		return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
	}
}
