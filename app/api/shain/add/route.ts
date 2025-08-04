import { NextResponse } from "next/server";
import sql from "app/lib/db";

export async function POST(req: Request) {
  try {
    const {
      shain_code,
      shain_shimei,
      seinen_gappi,
      jyusho,
      moyorieki_sen,
      moyorieki_eki,
      keiken_nensu,
      seibetsu,
      shikaku,
    } = await req.json();

    // 간단한 검증 (선택사항)
    if (!shain_code || !shain_shimei || !seinen_gappi) {
      return NextResponse.json({
        success: false,
        error: "必須項目が不足しています。",
      });
    }

    await sql`
      INSERT INTO shain (
        shain_code, shain_shimei, seinen_gappi,
        jyusho, moyorieki_sen, moyorieki_eki,
        keiken_nensu, seibetsu, shikaku
      ) VALUES (
        ${shain_code}, ${shain_shimei}, ${seinen_gappi},
        ${jyusho}, ${moyorieki_sen}, ${moyorieki_eki},
        ${Number(keiken_nensu)}, ${seibetsu}, ${shikaku}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("INSERT失敗:", err.message ?? err);
    return NextResponse.json({
      success: false,
      error: err.message ?? "未知のエラー",
    });
  }
}
