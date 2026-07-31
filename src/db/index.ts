import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL 환경변수가 설정되지 않았습니다.");
}

// Transaction pool mode (Supabase pooler) does not support prepared statements.
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client);
