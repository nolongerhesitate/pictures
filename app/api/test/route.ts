import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import { DataResultImpl, DataResultStatus } from "@/app/lib/types";


export async function GET() {
  try {
    let sql = `select * from test where is_deleted=$1`;
    const result = await querySql(sql, [false]);

    return NextResponse.json(new DataResultImpl(DataResultStatus.Success, "success", result));
  } catch (error) {
    return NextResponse.json(new DataResultImpl(DataResultStatus.Failed, "Failed to access!"));
  }
}
