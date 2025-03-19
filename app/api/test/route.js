import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import { DataResult } from "@/app/lib/definitions";


export async function GET(request) {
  try {
    let sql = `select * from test where is_deleted=$1`;
    const result = await querySql(sql, [false]);

    return NextResponse.json(new DataResult("success", "success", result));
  } catch (error) {
    return NextResponse.json(new DataResult("failed", "Failed to access!"));
  }
}
