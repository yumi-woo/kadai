"use client";

import styles from "./Login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [shain_code, setShain_code] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ 반드시 필요!
      },
      body: JSON.stringify({ shain_code, password }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/logout");
    } else {
      setError(data.message);
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
                value={shain_code}
                onChange={(e) => setShain_code(e.target.value)}
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

      {/* 🔻 에러 메시지 표시 */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}
