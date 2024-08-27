"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { redirect } from "next/navigation";

const db = new pg.Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
});

await db.connect();

export async function TestConnect() {
  try {
    const data = await db.query(`
      select * from test;
    `);
    console.log("Test Data:", data.rows);
  } catch (error) {
    console.log("error: ", error);
  }
}

