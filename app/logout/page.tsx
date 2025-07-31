"use client";

import { useRouter } from "next/navigation";
import styles from "./Logout.module.css"; // CSS Modules

export default function DashboardPage() {
  const router = useRouter();

  const logout = () => router.push("/login");
  const alteration = () => router.push("/alteration");
  const search = () => router.push("/logout2");

  return (
    <div className={styles.container}>
      <table className={styles.headerTable}>
        <tbody>
          <tr>
            <td>
              <h1>社員一覧</h1>
            </td>
            <td>
              <button className={styles.logoutButton} onClick={logout}>
                ログアウト
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <hr className={styles.hrLine} />

      <table className={styles.infoTable}>
        <tbody>
          <tr>
            <td>社員名称:</td>
            <td>
              <input type="text" className={styles.wideInput} />
            </td>
            <td></td>
            <td></td>
            <td>最寄駅：</td>
            <td>
              <input type="text" className={styles.smallInput} />線
              <input type="text" className={styles.smallInput} />駅
            </td>
          </tr>
          <tr>
            <td>経験年数：</td>
            <td>
              <input type="text" className={styles.smallInput} />年
              &nbsp;&nbsp;性別:
              <input type="radio" name="gender" value="m" defaultChecked />男
              <input type="radio" name="gender" value="w" />女
            </td>
            <td></td>
            <td></td>
            <td>機種：</td>
            <td>
              <input type="text" className={styles.wideInput} />
            </td>
          </tr>
          <tr>
            <td>年齢：</td>
            <td>
              <input type="text" className={styles.smallInput} />歳 ~
              <input type="text" className={styles.smallInput} />歳
            </td>
            <td></td>
            <td></td>
            <td>OS・DB/DC：</td>
            <td>
              <input type="text" className={styles.wideInput} />
            </td>
          </tr>
          <tr>
            <td>資格:</td>
            <td>
              <input type="text" className={styles.wideInput} />
            </td>
            <td></td>
            <td></td>
            <td>言語：</td>
            <td>
              <input type="text" className={styles.wideInput} />
            </td>
          </tr>
        </tbody>
      </table>

      <table className={styles.searchButtonTable}>
        <tbody>
          <tr>
            <td></td>
            <td>
              <button onClick={search}>検索</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>社員一覧</h2>
      <table className={styles.yellowTable}>
        <thead>
          <tr>
            <th className={styles.yellowHeader}></th>
            <th className={styles.yellowHeader}>社員名称</th>
            <th className={styles.yellowHeader}>生年月日</th>
            <th className={styles.yellowHeader}>年齢</th>
            <th className={styles.yellowHeader}>経験年数</th>
            <th className={styles.yellowHeader}>性別</th>
            <th className={styles.yellowHeader}>住所</th>
            <th className={styles.yellowHeader}>最寄駅：線</th>
            <th className={styles.yellowHeader}>最寄駅：駅</th>
            <th className={styles.yellowHeader}>資格</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={i}>
              <td>
                <input type="radio" name="choice" defaultChecked />
              </td>
              {Array.from({ length: 9 }).map((_, j) => (
                <td key={j}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <table className={styles.bottomButtons}>
        <tbody>
          <tr>
            <td>
              <button>社員追加</button>
            </td>
            <td>
              <button onClick={alteration}>社員変更</button>
            </td>
            <td>
              <button>社員削除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
