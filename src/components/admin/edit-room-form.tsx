// app/rooms/edit/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Hotel, RoomCategory } from "@prisma/client";
import { getHotels, getRoom, updateRoom } from "@/lib/api";
import { CATEGORIES } from "../../../prisma/constants";

export const EditRoomForm = ({ id }: { id: number }) => {
	const router = useRouter();

	const roomId = id;

	const [formData, setFormData] = useState({
		name: "",
		roomNumber: "",
		capacity: "",
		price: "",
		hotelId: "",
		categoryId: "",
	});
	const [hotels, setHotels] = useState<Hotel[]>([]);
    const [categories, setCategories] = useState<RoomCategory[]>(CATEGORIES as RoomCategory[]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	useEffect(() => {
		// Fetch hotels and room categories for the dropdowns
		const fetchOptions = async () => {
			try {
				const hotelsResponse = await getHotels();

				if (hotelsResponse) {
					setHotels(hotelsResponse);
				}
			} catch (err) {
				console.error("Error fetching options:", err);
			}
		};

		fetchOptions();
	}, []);
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch room data
				const room = await getRoom(roomId);
				setFormData({
					name: room.name,
					roomNumber: String(room.roomNumber),
					capacity: String(room.capacity),
					price: String(room.price),
					hotelId: room.hotelId ? String(room.hotelId) : "",
					categoryId: room.categoryId ? String(room.categoryId) : "",
				});

				// Fetch hotels and categories for dropdowns
				const hotelsResponse = await fetch("/api/hotels");
				const categoriesResponse = await fetch("/api/room-categories");

				if (hotelsResponse.ok && categoriesResponse.ok) {
					const hotelsData = await hotelsResponse.json();
					const categoriesData = await categoriesResponse.json();

					setHotels(hotelsData);
					setCategories(categoriesData);
				}

				setLoading(false);
			} catch (err) {
				console.error("Error fetching data:", err);
				setError("Failed to load room data");
				setLoading(false);
			}
		};

		if (roomId) {
			fetchData();
		}
	}, [roomId]);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setSaving(true);
		setError("");

		try {
			// Convert string values to numbers where needed
			const roomData = {
				name: formData.name,
				roomNumber: parseInt(formData.roomNumber),
				capacity: parseInt(formData.capacity),
				price: parseInt(formData.price),
				hotelId: formData.hotelId ? parseInt(formData.hotelId) : null,
				categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
			};

			await updateRoom(roomId, roomData);
			router.push("/admin/rooms");
			router.refresh(); // Revalidate the rooms list page
		} catch (err) {
			console.error("Error updating room:", err);
			setError("Failed to update room");
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <div className="p-4">ma’lumotlari yuklanmoqda...</div>;

	return (
		<div className="p-4 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Xonani tahrirlash</h1>

			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-2">Nomi</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>

				<div>
					<label className="block mb-2">Xona raqami</label>
					<input
						type="number"
						name="roomNumber"
						value={formData.roomNumber}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>

				<div>
					<label className="block mb-2">Sig‘im</label>
					<input
						type="number"
						name="capacity"
						value={formData.capacity}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>

				<div>
					<label className="block mb-2">Narxi (bir kecha uchun)</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>

				<div>
					<label className="block mb-2">Mehmonxona</label>
					<select
						name="hotelId"
						value={formData.hotelId}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded"
					>
						<option value="">Mehmonxonani tanlang</option>
						{hotels.map((hotel) => (
							<option key={hotel.id} value={hotel.id}>
								{hotel.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block mb-2">Xona turkumi</label>
					<select
						name="categoryId"
						value={formData.categoryId}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded"
					>
						<option value="">Turkumni tanlang</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<div className="flex gap-4">
					<button
						type="submit"
						disabled={saving}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
					>
						{saving ? "Saqlash..." : "O‘zgarishlarni saqlash"}
					</button>

					<button
						type="button"
						onClick={() => router.push("/rooms")}
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
					>
						Bekor qilish
					</button>
				</div>
			</form>
		</div>
	);
};
