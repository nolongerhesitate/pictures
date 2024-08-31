"use server";

import pg from "pg";

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
    throw new Error("Failed to fetch user.");
  }
}



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

