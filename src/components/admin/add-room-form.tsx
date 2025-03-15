"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createRoom, getHotels } from "@/lib/api";
import { Hotel, RoomCategory } from "@prisma/client";
import { CATEGORIES } from "../../../prisma/constants";
export const AddRoomForm = () => {
	const router = useRouter();
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
	const [loading, setLoading] = useState(false);
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

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			// Convert string values to numbers where needed
			const roomData = {
				name: formData.name,
				roomNumber: parseInt(formData.roomNumber),
				capacity: parseInt(formData.capacity),
				price: parseInt(formData.price),
				hotelId: parseInt(formData.hotelId),
				categoryId: parseInt(formData.categoryId),
			};

			await createRoom(roomData);
			router.push("/admin/rooms");
			router.refresh(); // Revalidate the rooms list page
		} catch (err) {
			console.error("Error creating room:", err);
			setError("Failed to create room");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-4 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Create New Room</h1>

			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-2">Name</label>
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
					<label className="block mb-2">Room Number</label>
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
					<label className="block mb-2">Capacity</label>
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
					<label className="block mb-2">Price (per night)</label>
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
					<label className="block mb-2">Hotel</label>
					<select
						name="hotelId"
						value={formData.hotelId}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded"
					>
						<option value="">Select Hotel (Optional)</option>
						{hotels.map((hotel) => (
							<option key={hotel.id} value={String(hotel.id)}>
								{hotel.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block mb-2">Room Category</label>
					<select
						name="categoryId"
						value={formData.categoryId}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded"
					>
						<option value="">Select Category (Optional)</option>
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
						disabled={loading}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
					>
						{loading ? "Creating..." : "Create Room"}
					</button>

					<button
						type="button"
						onClick={() => router.push("/rooms")}
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};
