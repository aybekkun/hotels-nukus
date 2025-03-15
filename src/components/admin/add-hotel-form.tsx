"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createHotel } from "@/lib/api";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "@/hooks/use-toast";
export const AddHotelForm = () => {
	const router = useRouter();
	const [formData, setFormData] = useState<any>({
		name: "",
		address: "",
		description: "",
		minPrice: 0,
		images: [],
		facilities: [],
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: name === "minPrice" ? parseInt(value) || 0 : value,
		});
	};

	const handleImageChange = (value: string) => {
		setFormData((prevState: any) => ({
			...prevState,
			images: [...prevState.images, value],
		}));
		console.log(value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!formData.name ||
			!formData.address ||
			!formData.description ||
			!formData.minPrice ||
			formData.images.length === 0
		) {
			toast({
				title: "Ошибка",
				description: "Заполните все поля",
			});
			return;
		}
		setLoading(true);
		try {
			// Filter out empty image URLs
			const filteredImages = formData.images.filter((img: any) => img.trim() !== "");

			await createHotel({
				...formData,
				images: filteredImages,
			});

			router.push("/admin/hotels");
		} catch (error) {
			console.error("Error creating hotel:", error);
			alert("Failed to create hotel");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Add New Hotel</h1>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						required
						rows={4}
						className="w-full px-3 py-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price per Night ($)</label>
					<input
						type="number"
						name="minPrice"
						value={formData.minPrice}
						onChange={handleChange}
						required
						min="0"
						className="w-full px-3 py-2 border rounded-md"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
					<CldUploadWidget
						uploadPreset="booking-app"
						onSuccess={(result: any) => {
							handleImageChange(result.info.secure_url);
							toast({
								title: "Загружены на сервер",
							});
						}}
					>
						{({ open }) => {
							return (
								<button
									className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
									onClick={() => open()}
								>
									Upload an Image
								</button>
							);
						}}
					</CldUploadWidget>
				</div>

				<div className="flex justify-end gap-4">
					<button
						type="button"
						onClick={() => router.back()}
						className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={loading}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
					>
						{loading ? "Creating..." : "Create Hotel"}
					</button>
				</div>
				
			</form>
		</div>
	);
};

//handleImageChange(result.info.secure_url as string)
