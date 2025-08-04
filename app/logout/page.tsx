"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Logout.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const [shains, setShains] = useState<any[]>([]);
  const [filteredShains, setFilteredShains] = useState<any[]>([]);
  const [selectedShainCode, setSelectedShainCode] = useState<string>("");

  // 검색 상태 변수들
  const [name, setName] = useState("");
  const [line, setLine] = useState("");
  const [station, setStation] = useState("");
  const [gender, setGender] = useState("all");
  const [keiken, setKeiken] = useState("");

  const logout = () => router.push("/login");
  const alteration = () => router.push("/alteration");

  useEffect(() => {
    async function fetchShains() {
      const res = await fetch("/api/shain");
      const data = await res.json();
      if (data.success) {
        setShains(data.data);
        setFilteredShains(data.data);
      } else {
        alert("社員データの取得に失敗しました。");
      }
    }
    fetchShains();
  }, []);

  const search = () => {
    const results = shains.filter((s) => {
      const genderMatch =
        gender === "all" ||
        (gender === "m" && s.seibetsu === "0") ||
        (gender === "w" && s.seibetsu === "1");

      const nameMatch =
        !name || s.shain_shimei?.toLowerCase().includes(name.toLowerCase());
      const lineMatch =
        !line || s.moyorieki_sen?.toLowerCase().includes(line.toLowerCase());
      const stationMatch =
        !station ||
        s.moyorieki_eki?.toLowerCase().includes(station.toLowerCase());
      const keikenMatch =
        !keiken || parseInt(s.keiken_nensu) === parseInt(keiken);

      return (
        genderMatch && nameMatch && lineMatch && stationMatch && keikenMatch
      );
    });

    setFilteredShains(results);
  };

  const handleDelete = async () => {
    if (!selectedShainCode) {
      alert("削除する社員を選択してください。");
      return;
    }

    if (!confirm("本当に削除しますか？")) return;

    const res = await fetch("/api/shain/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shain_code: selectedShainCode }),
    });

    const data = await res.json();
    if (data.success) {
      alert("削除完了しました。");
      setShains(shains.filter((s) => s.shain_code !== selectedShainCode));
      setFilteredShains(
        filteredShains.filter((s) => s.shain_code !== selectedShainCode)
      );
      setSelectedShainCode("");
    } else {
      alert("削除に失敗しました。\n" + data.error);
    }
  };

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
              <input
                type="text"
                className={styles.wideInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
            <td>最寄駅：</td>
            <td>
              <input
                type="text"
                className={styles.smallInput}
                value={line}
                onChange={(e) => setLine(e.target.value)}
              />
              線
              <input
                type="text"
                className={styles.smallInput}
                value={station}
                onChange={(e) => setStation(e.target.value)}
              />
              駅
            </td>
          </tr>
          <tr>
            <td>経験年数：</td>
            <td>
              <input
                type="text"
                className={styles.smallInput}
                value={keiken}
                onChange={(e) => setKeiken(e.target.value)}
              />
              年&nbsp;&nbsp;性別:
              <input
                type="radio"
                name="gender"
                value="m"
                checked={gender === "m"}
                onChange={() => setGender("m")}
              />
              男
              <input
                type="radio"
                name="gender"
                value="w"
                checked={gender === "w"}
                onChange={() => setGender("w")}
              />
              女
              <input
                type="radio"
                name="gender"
                value="all"
                checked={gender === "all"}
                onChange={() => setGender("all")}
              />
              指定なし
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
              <button className={styles.searchButton} onClick={search}>
                検索
              </button>
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
          {filteredShains.map((s) => {
            const birthDate = new Date(s.seinen_gappi);
            const age = new Date().getFullYear() - birthDate.getFullYear();
            const birthStr = s.seinen_gappi.substring(0, 10);
            return (
              <tr key={s.shain_code}>
                <td>
                  <input
                    type="radio"
                    name="choice"
                    checked={selectedShainCode === s.shain_code}
                    onChange={() => setSelectedShainCode(s.shain_code)}
                  />
                </td>
                <td>{s.shain_shimei}</td>
                <td>{birthStr}</td>
                <td>{age}</td>
                <td>{s.keiken_nensu}</td>
                <td>{s.seibetsu === "0" ? "男" : "女"}</td>
                <td>{s.jyusho}</td>
                <td>{s.moyorieki_sen}</td>
                <td>{s.moyorieki_eki}</td>
                <td>{s.shikaku}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className={styles.bottomButtons}>
        <tbody>
          <tr>
            <td>
              <button className={styles.buttonLarge} onClick={alteration}>
                社員追加
              </button>
            </td>
            <td>
              <button className={styles.buttonLarge} onClick={alteration}>
                社員変更
              </button>
            </td>
            <td>
              <button className={styles.buttonLarge} onClick={handleDelete}>
                社員削除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
