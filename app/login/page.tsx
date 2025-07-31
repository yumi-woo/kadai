// /app/login/page.tsx
"use client";

import styles from "./Login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 간단한 로직: 실제 로그인 로직은 서버 검증 필요
    if (employeeCode && password) {
      router.push("/logout"); // '/Logout.html' → '/logout' (Next.js 라우팅 기준)
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1>ログイン</h1>
      <div className={styles.hrWrapper}>
        <hr />
      </div>

      <table id="idTable">
        <tbody>
          <tr>
            <td>社員コード:</td>
            <td>
              <input
                type="text"
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
              />
            </td>
            <td></td>
          </tr>

          <tr>
            <td>パスワード：</td>
            <td>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </td>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td>
              <button id="loginbutton" onClick={handleLogin}>
                ログイン
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
