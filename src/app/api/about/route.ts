import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET() {
  if (!API_URL) {
    return NextResponse.json({ error: "NEXT_PUBLIC_API_URL is not configured." }, { status: 500 });
  }

  try {
    const upstream = await fetch(`${API_URL}/about`, {
      method: "GET",
      cache: "no-store",
    });

    if (!upstream.ok) {
      const upstreamText = await upstream.text();
      return NextResponse.json(
        { error: "Failed to fetch about information.", details: upstreamText },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to fetch about information.", details: message }, { status: 500 });
  }
}
