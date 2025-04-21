// app/users/edit/[id]/page.tsx
"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Hotel } from "@prisma/client"
import { getHotels, getUser, updateUser } from "@/lib/api"

export const EditUserForm = ({ id }: { id: number }) => {
	const router = useRouter()

	const userId = id

	const [formData, setFormData] = useState<any>({
		name: "",
		phone: "",
		password: "",
		role: "",
		hotelId: "",
	})
	const [hotels, setHotels] = useState<Hotel[]>([])
	const [roles, setroles] = useState<string[]>(["ADMIN", "USER", "OWNER"])
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [error, setError] = useState("")
	useEffect(() => {
		// Fetch hotels and user roles for the dropdowns
		const fetchOptions = async () => {
			try {
				const hotelsResponse = await getHotels()

				if (hotelsResponse) {
					setHotels(hotelsResponse)
				}
			} catch (err) {
				console.error("Error fetching options:", err)
			}
		}

		fetchOptions()
	}, [])
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch user data
				const user = await getUser(userId)
				console.log(user)
				setFormData({
					name: user.name,
					phone: String(user.phone),
					role: user.role,
					hotelId: user.hotel ? String(user.hotel.id) : "",
				})

				setLoading(false)
			} catch (err) {
				console.error("Error fetching data:", err)
				setError("Failed to load user data")
				setLoading(false)
			}
		}

		if (userId) {
			fetchData()
		}
	}, [userId])

	const handleChange = (e: any) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		setSaving(true)
		setError("")

		try {
			// Convert string values to numbers where needed
			const userData = {
				name: formData.name,
				phone: formData.phone,
				password: formData.password,
				hotelId: Number(formData.hotelId),
			}

			await updateUser(userId, userData)
			router.push("/admin/users")
			router.refresh() // Revalidate the users list page
		} catch (err) {
			console.error("Error updating user:", err)
			setError("Failed to update user")
		} finally {
			setSaving(false)
		}
	}

	if (loading) return <div className="p-4">Foydalanuvchi ma’lumotlari yuklanmoqda...</div>

	return (
		<div className="p-4 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Foydalanuvchini tahrirlash</h1>

			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-2">Ism</label>
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
					<label className="block mb-2">Foydalanuvchi raqami</label>
					<input
						type="text"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded"
					/>
				</div>

				<div>
					<label className="block mb-2">parol</label>
					<input
						type="text"
						name="password"
						value={formData.password}
						onChange={handleChange}
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
						<option value="">Mehmonxonani tanlash</option>
						{hotels.map((hotel) => (
							<option key={hotel.id} value={hotel.id}>
								{hotel.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block mb-2">Foydalanuvchi roli</label>
					<select
						name="categoryId"
						value={formData.role}
						onChange={handleChange}
						className="w-full px-3 py-2 border rounded"
					>
						<option value="">Rol tanlash</option>
						{roles.map((role) => (
							<option key={role} value={role}>
								{role}
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
						{loading ? "Ozgartilmoqda..." : "Ozgartirish"}
					</button>

					<button
						type="button"
						onClick={() => router.push("/users")}
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
					>
						Bekor qilish
					</button>
				</div>
			</form>
		</div>
	)
}
