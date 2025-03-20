"use server";
import { neon } from '@neondatabase/serverless';
import logger from "@/app/lib/log";
import { User } from "@/app/lib/types";
/*
import pg from "pg";
import logger from "@/app/lib/log";
import { User } from "@/app/lib/types";

const db = new pg.Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
});

async function connect() {
  await db.connect();
}


connect().catch(console.error);
*/
const db = neon(`${process.env.DATABASE_URL}`);

// for next-auth to authenticate
export async function getUser(username: string) : Promise<User | null> {
  try {
    const user = await db(`select * from users where username = '${username}'`);
    return user[0] as User;
  } catch (error) {
    logger.error("Error getting user", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function querySql(sql: string, params = [] as any[]) : Promise<any[]> {
  try {
    const result = await db(sql, params);
    return result;
  } catch (error) {
    logger.error(`Error running query: ${sql}; \n`, error);
    throw new Error(`Failed to running query: ${sql}`);
  }
}

