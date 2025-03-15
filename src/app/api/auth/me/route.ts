import { getUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
	const user = await getUser();

	if (!user) {
		return NextResponse.json({ error: "Не аутентифицирован" }, { status: 401 });
	}

	return NextResponse.json(user);
}
