"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui";
import Link from "next/link";

export default function LoginForm() {
	const router = useRouter();
	const [formData, setFormData] = useState({
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
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Ошибка при входе");
			}

			router.push("/");
			router.refresh(); // Обновляем кеш серверных компонентов
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-6">Вход в систему</h1>

			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

			<form onSubmit={handleSubmit}>
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
					/>
				</div>
				<Link className="text-sm text-muted-foreground mb-2 text-blue-500" href="/sign-up">Зарегистрироваться</Link>
				<Button type="submit" className="w-full " disabled={isLoading}>
					{isLoading ? "Вход..." : "Войти"}
				</Button>
			</form>
		</div>
	);
}
