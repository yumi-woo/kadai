// app/alteration/page.tsx
"use client";

import styles from "./Alteration.module.css";
import { useRouter } from "next/navigation";

export default function AlterationPage() {
  const router = useRouter();

  const logout = () => {
    router.push("/login");
  };

  const addCareer = () => {
    window.open("/end", "subwin", "width=1600,height=800");
  };

  const save = () => {
    if (confirm("登録しますか？")) {
      alert("登録完了");
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
              <input type="text" />
            </td>
            <td></td>
            <td></td>
            <td className={styles.tdRight}>資格：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td className={styles.tdRight}>社員名称：</td>
            <td>
              <input type="text" />
            </td>
            <td></td>
            <td></td>
            <td className={styles.tdRight}>生年月日：</td>
            <td>
              <input type="text" /> (YYYY/MM/DD)
            </td>
          </tr>
          <tr>
            <td className={styles.tdRight}>住所：</td>
            <td>
              <input type="text" />
            </td>
            <td></td>
            <td></td>
            <td className={styles.tdRight}>学歴１：</td>
            <td>
              <input type="text" /> (YYYY/MM)卒業
            </td>
          </tr>
          <tr>
            <td className={styles.tdRight}>最寄駅：</td>
            <td>
              <input type="text" />線 <input type="text" />駅
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td className={styles.tdRight}>経験年数：</td>
            <td>
              <input type="text" />年 &nbsp;&nbsp;&nbsp; 性別:
              <input type="radio" name="gender" value="m" defaultChecked />男
              <input type="radio" name="gender" value="w" />女
            </td>
            <td></td>
            <td></td>
            <td className={styles.tdRight}>学歴２：</td>
            <td>
              <input type="text" /> (YYYY/MM)卒業
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
