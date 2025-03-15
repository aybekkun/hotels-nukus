import { CATEGORIES, FACILITIES, FACILITIES_ITEMS, HOTEL_FACILITIES, HOTELS, ROOMS } from "./constants";
import { prisma } from "./prisma-client";

async function up() {
	// await prisma.user.create({
	// 	data: {
	// 		id: 1,
	// 		name: "admin",
	// 		phone: "+998913809626",
	// 		password: "12345678",
	// 	},
	// });
	for (const item of HOTELS) {
		await prisma.hotel.create({
			data: {
				...item,
			},
		});
	}
	for (const item of CATEGORIES) {
		await prisma.roomCategory.create({
			data: {
				name: item.name,
			},
		});
	}

	for (const item of ROOMS) {
		await prisma.room.create({
			data: {
				capacity: item.capacity,
				name: item.name,
				roomNumber: item.roomNumber,
				price: item.price,
				hotelId: item.hotelId,
				categoryId: item.categoryId,
			},
		});
	}
	for (const item of FACILITIES) {
		await prisma.facilities.create({
			data: {
				name: item.name,
			},
		});
	}

	for (const item of FACILITIES_ITEMS) {
		await prisma.facilitiesItem.create({
			data: {
				name: item.name,
				facilitiesId: item.facilitiesId,
			},
		});
	}

	await prisma.hotelFacilities.createMany({
		data: HOTEL_FACILITIES,
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "Facilities" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "FacilitiesItem" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Booking" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Room" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "RoomCategory" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Hotel" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "HotelFacilities" RESTART IDENTITY CASCADE;`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (error) {
		console.log(error);
	}
}

main()
	.then(() => prisma.$disconnect())
	.catch((e) => {
		console.error(e);
		prisma.$disconnect();
		process.exit(1);
	});
