"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function RegisterForm() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Ошибка при регистрации");
			}

			router.push("/sign-in");
		} catch (err: any) {
			setError(err.message);
			toast({ title: "Ошибка", description: err.message, variant: "destructive" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-6">Регистрация</h1>

			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label htmlFor="name" className="block text-gray-700 mb-2">
						Имя
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded"
						required
					/>
				</div>

				<div className="mb-4">
					<label htmlFor="phone" className="block text-gray-700 mb-2">
						Телефон
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded"
						required
						placeholder="+7XXXXXXXXXX"
					/>
				</div>

				<div className="mb-6">
					<label htmlFor="password" className="block text-gray-700 mb-2">
						Пароль
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded"
						required
						minLength={5}
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
					disabled={isLoading}
				>
					{isLoading ? "Регистрация..." : "Зарегистрироваться"}
				</button>
			</form>
		</div>
	);
}
