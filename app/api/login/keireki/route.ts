// route.ts 내용
import { NextResponse } from "next/server";
import sql from "@/app/lib/db";

export async function GET() {
  try {
    const result = await sql`
      SELECT shain_code, shain_shimei, jyusho, seinen_gappi, keiken_nensu,
             seibetsu, shikaku, moyorieki_sen, moyorieki_eki
      FROM shain
    `;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: "データ取得エラー", error },
      { status: 500 }
    );
  }
}
