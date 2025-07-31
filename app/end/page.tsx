"use client";

import styles from "./End.module.css";
import { useRouter } from "next/navigation";

export default function CareerEntryPage() {
  const router = useRouter();

  const handleCancel = () => {
    window.close();
  };

  const handleSave = () => {
    const confirmSave = confirm("登録しますか？");
    const msg = confirmSave ? "登録完了" : "取り消し";
    alert(msg);
  };

  return (
    <div className={styles.container}>
      <h1>経歴追加</h1>
      <hr className={styles.hr} />
      <div className={styles.spacer} />

      <table className={styles.syuryouT}>
        <tbody>
          <tr>
            <td>期間：</td>
            <td></td>
            <td className={styles.tdr}></td>
            <td></td>
          </tr>
          <tr>
            <td>開始：</td>
            <td>
              <input type="text" /> (YYYY/MM)
            </td>
            <td>機種１：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>終了：</td>
            <td>
              <input type="text" /> (YYYY/MM)
            </td>
            <td>機種２：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>職種：</td>
            <td>
              <input type="text" />
            </td>
            <td>機種３：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>業務内容：</td>
            <td rowSpan={6}>
              <input type="text" className={styles.textwider} />
            </td>
            <td>OS・DB/DC１：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>OS・DB/DC２：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>OS・DB/DC３：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>言語１：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>言語２：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>言語３：</td>
            <td>
              <input type="text" />
            </td>
          </tr>
        </tbody>
      </table>

      <table className={styles.lastbotton}>
        <tbody>
          <tr>
            <td>
              <button className={styles.savebotton} onClick={handleSave}>
                登録
              </button>
            </td>
            <td>
              <button className={styles.cancelbotton} onClick={handleCancel}>
                キャンセル
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
