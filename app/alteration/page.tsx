"use client";

import styles from "./Alteration.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AlterationPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    shain_code: "",
    shain_shimei: "",
    seinen_gappi: "",
    jyusho: "",
    moyorieki_sen: "",
    moyorieki_eki: "",
    keiken_nensu: "",
    seibetsu: "0",
    shikaku: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const logout = () => {
    router.push("/login");
  };

  const addCareer = () => {
    window.open("/end", "subwin", "width=1600,height=800");
  };

  const save = async () => {
    if (confirm("登録しますか？")) {
      const res = await fetch("/api/shain/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        alert("登録完了");
        router.push("/logout"); // 등록 후 자동 이동
      } else {
        alert("登録失敗");
      }
    } else {
      alert("取り消し");
    }
  };

  return (
    <div className={styles.pageBackground}>
      <table>
        <tbody>
          <tr>
            <td>
              <h1>社員情報編集</h1>
            </td>
            <td>
              <button className={styles.logoutButton} onClick={logout}>
                ログアウト
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <hr className={styles.hr} />

      <table className={styles.hennkouTable}>
        <tbody>
          <tr>
            <td className={styles.tdRight}>社員コード：</td>
            <td>
              <input name="shain_code" onChange={handleChange} />
            </td>
            <td></td>
            <td></td>
            <td className={styles.tdRight}>資格：</td>
            <td>
              <input name="shikaku" onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td className={styles.tdRight}>社員名称：</td>
            <td>
              <input name="shain_shimei" onChange={handleChange} />
            </td>
            <td></td>
            <td></td>
            <td className={styles.tdRight}>生年月日：</td>
            <td>
              <input
                name="seinen_gappi"
                onChange={handleChange}
                placeholder="YYYY-MM-DD"
              />
            </td>
          </tr>
          <tr>
            <td className={styles.tdRight}>住所：</td>
            <td>
              <input name="jyusho" onChange={handleChange} />
            </td>
            <td></td>
            <td></td>
            <td className={styles.tdRight}>学歴１：</td>
            <td>
              <input />
            </td>
          </tr>
          <tr>
            <td className={styles.tdRight}>最寄駅：</td>
            <td>
              <input name="moyorieki_sen" onChange={handleChange} />線
              <input name="moyorieki_eki" onChange={handleChange} />駅
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <input />
            </td>
          </tr>
          <tr>
            <td className={styles.tdRight}>経験年数：</td>
            <td>
              <input name="keiken_nensu" onChange={handleChange} />
              年&nbsp;&nbsp;&nbsp;性別:
              <input
                type="radio"
                name="seibetsu"
                value="0"
                defaultChecked
                onChange={handleChange}
              />
              男
              <input
                type="radio"
                name="seibetsu"
                value="1"
                onChange={handleChange}
              />
              女
            </td>
            <td></td>
            <td></td>
            <td className={styles.tdRight}>学歴２：</td>
            <td>
              <input />
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className={styles.sectionTitle}>業務経歴一覧</h2>

      <table className={styles.lastTable}>
        <tbody>
          <tr>
            <td className={styles.tdYellow} colSpan={2}>
              期間
            </td>
            <td className={styles.tdYellow} rowSpan={2}>
              職種
            </td>
            <td className={styles.tdYellow} rowSpan={2}>
              業務内容
            </td>
            <td className={styles.tdYellow} rowSpan={2}>
              機種
            </td>
            <td className={styles.tdYellow} rowSpan={2}>
              OS・DB/DC
            </td>
            <td className={styles.tdYellow} rowSpan={2}>
              言語
            </td>
          </tr>
          <tr>
            <td className={styles.tdYellow}>開始</td>
            <td className={styles.tdYellow}>終了</td>
          </tr>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: 7 }).map((_, j) => (
                <td key={j} className={styles.tdLine}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.buttonWrapper}>
        <button className={styles.addCareer} onClick={addCareer}>
          経歴追加
        </button>
        <button className={styles.save} onClick={save}>
          登録
        </button>
        <button className={styles.back} onClick={() => router.back()}>
          戻る
        </button>
      </div>
    </div>
  );
}
