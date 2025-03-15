import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET(request: NextRequest) {
	try {
		const hotels = await prisma.hotel.findMany({
			include: {
				hotelFacilities: {
					include: {
						facilitiesItem: true,
					},
				},
				rooms: true,
			},
		});

		return NextResponse.json(hotels);
	} catch (error) {
		console.error("Error fetching hotels:", error);
		return NextResponse.json({ error: "Failed to fetch hotels" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, address, description, images, minPrice, facilities } = body;

		const hotel = await prisma.hotel.create({
			data: {
				name,
				address,
				description,
				minPrice,
				images,
			},
		});

		if (facilities && facilities.length > 0) {
			await prisma.hotelFacilities.createMany({
				data: facilities.map((facilityId: number) => ({
					hotelId: hotel.id,
					facilitiesItemId: facilityId,
				})),
			});
		}

		return NextResponse.json(hotel, { status: 201 });
	} catch (error) {
		console.error("Error creating hotel:", error);
		return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
	}
}
