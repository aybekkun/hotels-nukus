import { Hotel, Room } from "@prisma/client";

export const FACILITIES_ITEMS = [
	{ id: 1, name: "Отель", facilitiesId: 1 },
	{ id: 2, name: "Хостел", facilitiesId: 1 },
	{ id: 3, name: "Апартаменты", facilitiesId: 1 },
	{ id: 4, name: "Вилла", facilitiesId: 1 },
	{ id: 5, name: "Курорт", facilitiesId: 1 },
	{ id: 6, name: "Гостевой дом", facilitiesId: 1 },
	{ id: 7, name: "5 ⭐", facilitiesId: 2 },
	{ id: 8, name: "4 ⭐", facilitiesId: 2 },
	{ id: 9, name: "3 ⭐", facilitiesId: 2 },
	{ id: 10, name: "Одноместный", facilitiesId: 3 },
	{ id: 11, name: "Двухместный", facilitiesId: 3 },
	{ id: 12, name: "Семейный", facilitiesId: 3 },
	{ id: 13, name: "Люкс", facilitiesId: 3 },
	{ id: 14, name: "Бесплатный Wi-Fi", facilitiesId: 4 },
	{ id: 15, name: "Телевизор", facilitiesId: 4 },
	{ id: 16, name: "Кондиционер", facilitiesId: 4 },
	{ id: 17, name: "Мини-бар", facilitiesId: 4 },
	{ id: 18, name: "Сейф", facilitiesId: 4 },
	{ id: 19, name: "Балкон", facilitiesId: 4 },
	{ id: 20, name: "Парковка", facilitiesId: 4 },
	{ id: 21, name: "Бассейн", facilitiesId: 4 },
	{ id: 22, name: "Спортзал", facilitiesId: 4 },
	{ id: 23, name: "Спа", facilitiesId: 4 },
	{ id: 24, name: "Завтрак включен", facilitiesId: 5 },
	{ id: 25, name: "Ресторан на территории", facilitiesId: 5 },
	{ id: 26, name: "Бар", facilitiesId: 5 },
	{ id: 27, name: "Размещение с животными", facilitiesId: 6 },
	{ id: 28, name: "Для людей с ограниченными возможностями", facilitiesId: 6 },
];

export const FACILITIES = [
	{
		id: 1,
		name: "Тип размещения",
	},
	{
		id: 2,
		name: "Звезды",
	},
	{
		id: 3,
		name: "Количество гостей",
	},
	{
		id: 4,
		name: "Удобства",
	},
	{
		id: 5,
		name: "Питание",
	},
	{
		id: 6,
		name: "Дополнительные услуги",
	},
];

export const CATEGORIES = [
	{ id: 1, name: "Стандартный" },
	{
		id: 2,
		name: "Люкс",
	},
	{
		id: 3,
		name: "Семейный",
	},
	{
		id: 4,
		name: "Президентский",
	},
];
export const IMAGES = [
	"https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	"https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/53577/hotel-architectural-tourism-travel-53577.jpeg?auto=compress&cs=tinysrgb&w=600",
	"https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg?auto=compress&cs=tinysrgb&w=600",
];

export const HOTELS: Omit<Hotel, "id" | "createdAt" | "updatedAt">[] = Array.from({ length: 46 }, (_, index) => ({
	name: `Hotel ${index + 1}`,
	address: `улица ${index + 1}`,
	images: shuffleArray(IMAGES),
	minPrice: Math.floor(Math.random() * (1000 - 1 + 1)),
	description: "Хороший отель в центре нукуса",
}));

export const ROOMS: Omit<Room, "id" | "createdAt" | "updatedAt">[] = Array.from({ length: 446 }, (_, index) => ({
	name: `Room ${index + 1}`,
	hotelId: Math.floor(Math.random() * (46 - 1 + 1) + 1),
	capacity: Math.floor(Math.random() * (5 - 1 + 1) + 1),
	price: Math.floor(Math.random() * (1000 - 1 + 1)),
	roomNumber: index + 1,
	categoryId: Math.floor(Math.random() * (4 - 1 + 1) + 1),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function shuffleArray<T>(array: T[]): T[] {
	const shuffledArray = [...array];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
}

export const HOTEL_FACILITIES = HOTELS.flatMap((hotel, index) =>
	shuffleArray(FACILITIES_ITEMS)
		.slice(0, 10)
		.map((facilitiesItem) => ({
			hotelId: index + 1,
			facilitiesItemId: facilitiesItem.id,
		}))
);
