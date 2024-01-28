import Chat from "@/app/models/chat";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        Chat.create(body);
        return NextResponse.json({ message: "Chat created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
