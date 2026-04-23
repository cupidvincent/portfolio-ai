import { NextRequest, NextResponse } from "next/server";
import { sendMessageToAI } from "../../../features/chat/services/chat.service";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    console.log("Received message:", message);
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const reply = await sendMessageToAI(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
