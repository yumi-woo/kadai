// 예시: app/api/login/route.ts
import { NextResponse } from "next/server";
import sql from "app/lib/db";

export async function POST(req: Request) {
  try {
    const { shain_code, password } = await req.json();

    const result = await sql`
      SELECT * FROM eigyo
      WHERE shain_code = ${shain_code} AND password = ${password}
    `;

    if (result.length > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        success: false,
        message: "社員コードまたはパスワードが間違っています。",
      });
    }
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
