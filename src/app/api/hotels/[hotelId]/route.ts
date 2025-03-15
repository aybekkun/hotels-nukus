import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(request: NextRequest, { params }: { params: { hotelId: string } }) {
	try {
		const id = parseInt(params.hotelId);
		const hotel = await prisma.hotel.findUnique({
			where: { id },
			include: {
				hotelFacilities: {
					include: {
						facilitiesItem: true,
					},
				},
				rooms: true,
			},
		});

		if (!hotel) {
			return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
		}

		return NextResponse.json(hotel);
	} catch (error) {
		console.error("Error fetching hotel:", error);
		return NextResponse.json({ error: "Failed to fetch hotel" }, { status: 500 });
	}
}

export async function PUT(request: NextRequest, { params }: { params: { hotelId: string } }) {
	try {
		const id = parseInt(params.hotelId);
		const body = await request.json();
		const { name, address, description, images, minPrice, facilities } = body;

		// Check if hotel exists
		const existingHotel = await prisma.hotel.findUnique({
			where: { id },
		});

		if (!existingHotel) {
			return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
		}

		// Update hotel
		const hotel = await prisma.hotel.update({
			where: { id },
			data: {
				name,
				address,
				description,
				images,
				minPrice,
			},
		});

		// If facilities are provided, update hotel facilities
		if (facilities) {
			// Delete existing connections
			await prisma.hotelFacilities.deleteMany({
				where: { hotelId: id },
			});

			// Create new connections
			if (facilities.length > 0) {
				await prisma.hotelFacilities.createMany({
					data: facilities.map((facilityId: number) => ({
						hotelId: id,
						facilitiesItemId: facilityId,
					})),
				});
			}
		}

		return NextResponse.json(hotel);
	} catch (error) {
		console.error("Error updating hotel:", error);
		return NextResponse.json({ error: "Failed to update hotel" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { hotelId: string } }) {
	console.log(params);
	try {
		const id = parseInt(params.hotelId);

		// Check if hotel exists
		const existingHotel = await prisma.hotel.findUnique({
			where: { id },
		});

		if (!existingHotel) {
			return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
		}

		// Delete related hotel facilities first
		await prisma.hotelFacilities.deleteMany({
			where: { hotelId: id },
		});
		await prisma.room.deleteMany({
			where: { hotelId: id },
		});
		// Then delete the hotel
		await prisma.hotel.delete({
			where: { id },
		});

		return NextResponse.json({ message: "Hotel deleted successfully" });
	} catch (error) {
		console.error("Error deleting hotel:", error);
		return NextResponse.json({ error: "Failed to delete hotel" }, { status: 500 });
	}
}
