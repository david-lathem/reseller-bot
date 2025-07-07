import { DBOrder } from "../utils/typings/types.js";
import db from "./index.js";

export const createOrderInDb = db.prepare<DBOrder>(
  `INSERT INTO orders (uniqid, service, guildId, createdAt) VALUES (@uniqid, @service, @guildId, @createdAt)`
);

export const getLatestOrderByGuilId = db.prepare<{ guildId: string }, DBOrder>(
  `SELECT * FROM orders WHERE guildId = @guildId ORDER BY createdAt DESC LIMIT 1`
);
