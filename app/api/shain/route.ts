// app/api/shain/route.ts
import { NextResponse } from "next/server";
import sql from "app/lib/db";

export async function GET() {
  try {
    const results = await sql`SELECT * FROM shain ORDER BY shain_code`;

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error("Shain fetch error:", error);
    return NextResponse.json(
      { success: false, message: "社員データの取得に失敗しました。" },
      { status: 500 }
    );
  }
}
