import { NextResponse } from "next/server";
import sql from "app/lib/db";

export async function POST(req: Request) {
  try {
    const { shain_code } = await req.json();

    if (!shain_code) {
      return NextResponse.json({
        success: false,
        error: "社員コードが必要です。",
      });
    }

    await sql`DELETE FROM shain WHERE shain_code = ${shain_code}`;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("削除失敗:", err);
    return NextResponse.json({
      success: false,
      error: err.message ?? "未知のエラーが発生しました。",
    });
  }
}
