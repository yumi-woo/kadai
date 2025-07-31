// app/lib/auth.ts
"use server";

import bcrypt from "bcrypt";
import sql from "./db";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const [user] = await sql`
    SELECT * FROM users WHERE username = ${username}
  `;

  if (!user) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  // 로그인 성공 시 세션 생성 또는 쿠키 설정 가능
  redirect("/dashboard");
}
