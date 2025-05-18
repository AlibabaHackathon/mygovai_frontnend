// app/api/ask/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const dashResponse = await fetch(
      "https://dashscope-intl.aliyuncs.com/api/v1/apps/223e1104f25841e6a1c1ced324b7d9d3/completion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DASHSCOPE_API_KEY}`,
        },
        body: JSON.stringify({
          input: { prompt },
          parameters: {},
          debug: {},
        }),
      }
    );

    const data = await dashResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
