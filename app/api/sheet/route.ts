import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://docs.google.com/spreadsheets/d/12QSq3oBlcdhrnuQSpL1yqMiZRPKUM81u_kXvfuFltgo/export?format=csv", {
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch sheet" }, { status: 500 });
    }
    const csvText = await res.text();
    return new NextResponse(csvText, {
      headers: { "Content-Type": "text/csv; charset=utf-8" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
