
export async function getHotels() {
	const response = await fetch("/api/hotels");
	if (!response.ok) {
		throw new Error("Failed to fetch hotels");
	}
	return response.json();
}

export async function getHotel(id: number) {
	const response = await fetch(`/api/hotels/${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch hotel");
	}
	return response.json();
}

export async function createHotel(hotelData: any) {
	const response = await fetch("/api/hotels", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(hotelData),
	});

	if (!response.ok) {
		throw new Error("Failed to create hotel");
	}

	return response.json();
}

export async function updateHotel(id: number, hotelData: any) {
	const response = await fetch(`/api/hotels/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(hotelData),
	});

	if (!response.ok) {
		throw new Error("Failed to update hotel");
	}

	return response.json();
}

export async function deleteHotel(id: number) {
	const response = await fetch(`/api/hotels/${id}`, {
		method: "DELETE",
	});

	if (!response.ok) {
		throw new Error("Failed to delete hotel");
	}

	return response.json();
}
export type CreateRoomDTO = {
	name: string;
	roomNumber: number;
	capacity: number;
	price: number;
	hotelId?: number | null;
	categoryId?: number | null;
};

// Type for updating a room
export type UpdateRoomDTO = Partial<CreateRoomDTO>;

// Function to fetch all rooms
export async function getRooms() {
	const response = await fetch("/api/rooms", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch rooms");
	}

	return response.json();
}

// Function to fetch a single room
export async function getRoom(id: number) {
	const response = await fetch(`/api/rooms/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch room");
	}

	return response.json();
}

// Function to create a room
export async function createRoom(roomData: CreateRoomDTO) {
	const response = await fetch("/api/rooms", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(roomData),
	});

	if (!response.ok) {
		throw new Error("Failed to create room");
	}

	return response.json();
}

// Function to update a room
export async function updateRoom(id: number, roomData: UpdateRoomDTO) {
	const response = await fetch(`/api/rooms/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(roomData),
	});

	if (!response.ok) {
		throw new Error("Failed to update room");
	}

	return response.json();
}

// Function to delete a room
export async function deleteRoom(id: number) {
	const response = await fetch(`/api/rooms/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to delete room");
	}

	return response.json();
}
