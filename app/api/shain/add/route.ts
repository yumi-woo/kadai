// app/api/shain/add/route.ts
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

    // 쿠키에서 로그인한 사원코드 읽기
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader
        .split(";")
        .map((c) => c.trim().split("="))
        .filter(([, v]) => v !== undefined)
    );
    const update_shain_code = cookies["shain_code"];

    const today = new Date().toISOString().slice(0, 10);

    if (!shain_code || !shain_shimei || !seinen_gappi) {
      return NextResponse.json({
        success: false,
        error: "必須項目が不足しています。",
      });
    }

    if (!update_shain_code) {
      return NextResponse.json({
        success: false,
        error: "ログイン情報がありません。再ログインしてください。",
      });
    }

    console.log("INSERT INTO shain:", {
      shain_code,
      shain_shimei,
      seinen_gappi,
      jyusho,
      moyorieki_sen,
      moyorieki_eki,
      keiken_nensu: Number(keiken_nensu),
      seibetsu,
      shikaku,
      update_date: today,
      update_shain_code,
    });

    await sql`
      INSERT INTO shain (
        shain_code, shain_shimei, seinen_gappi,
        jyusho, moyorieki_sen, moyorieki_eki,
        keiken_nensu, seibetsu, shikaku,
        update_date, update_shain_code
      ) VALUES (
        ${shain_code}, ${shain_shimei}, ${seinen_gappi},
        ${jyusho}, ${moyorieki_sen}, ${moyorieki_eki},
        ${Number(keiken_nensu)}, ${seibetsu}, ${shikaku},
        ${today}, ${update_shain_code}
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
