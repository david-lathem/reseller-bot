import db from "./index.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uniqid TEXT NOT NULL,
    service TEXT NOT NULL,
    guildId TEXT NOT NULL,
    createdAt INTEGER NOT NULL
  )
`);
