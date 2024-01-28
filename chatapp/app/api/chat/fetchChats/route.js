import Chat from "@/app/models/chat";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await Chat.find().sort({ createdAt: -1 });
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
