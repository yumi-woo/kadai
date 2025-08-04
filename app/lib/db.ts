import postgres from "postgres";

// SSL 무조건 적용 (Neon 등 대부분의 클라우드 DB는 SSL 강제)
const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export default sql;
