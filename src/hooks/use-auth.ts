"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useAuth() {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await fetch("/api/auth/me");
				if (response.ok) {
					const userData = await response.json();
					setUser(userData);
				}
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		}

		fetchUser();
	}, []);

	const handleLogout = async () => {
		await fetch("/api/auth/logout");
		setUser(null);
		router.push("/");
		router.refresh();
	};

	const hasRole = (requiredRoles: string[]) => {
		if (!user) return false;
		return requiredRoles.includes(user.role);
	};

	return { user, setUser, handleLogout, hasRole };
}
