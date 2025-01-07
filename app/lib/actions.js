"use server";

import pg from "pg";
import logger from "@/app/lib/log";

const db = new pg.Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
});

await db.connect();

// for next-auth to authenticate
export async function getUser(username) {
  try {
    const user = await db.query(`select * from users where username = '${username}'`);
    return user.rows[0];
  } catch (error) {
    logger.error("Error getting user", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function querySql(sql) {
  try {
    const result = await db.query(sql);
    return result.rows;
  } catch (error) {
    logger.error(`Error running query: ${sql}; \n`, error);
    throw new Error(`Failed to running query: ${sql}`);
  }
}

