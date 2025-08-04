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
      // 로그인 성공 시 쿠키 설정
      const response = NextResponse.json({ success: true });
      response.cookies.set("shain_code", shain_code, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1일
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return response;
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
