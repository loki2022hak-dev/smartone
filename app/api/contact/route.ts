import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // ЛОГІКА ОБРОБКИ (Наприклад, вивід у консоль або відправка в БД)
    console.log("Contact form data received:", data);

    if (!data.email || !data.message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Data received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
