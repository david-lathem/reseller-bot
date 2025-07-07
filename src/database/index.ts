import dbConstructor from "better-sqlite3";
import path from "path";

const db = new dbConstructor(
  path.join(import.meta.dirname, "..", "..", "database.db")
);

export default db;
