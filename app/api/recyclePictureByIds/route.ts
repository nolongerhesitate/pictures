import logger from "@/app/lib/log";
import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import { DataResult, DataResultStatus } from "@/app/lib/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request: Request) {
  let dataResult:DataResult<null> = {status: DataResultStatus.Failed,message: "", data: null, pagination: null} ;
  try {
    const session = await getServerSession(authOptions);
    // type: 1 => restore(is_deleted -> false), 0 => move to recycle
    const { ids, type } = await request.json();
    if (!ids && ids.length < 1) {
      dataResult.message = "Please provide at least one picture id";
      return NextResponse.json(dataResult);
    }

    const idStr = ids.map((id: string) => `'${id}'`).join(", ");
    let sql = `select id from picture_users_relationship where user_id = $1 and picture_id in (${idStr})`;
    let result = await querySql(sql, [session.user.id]);

    if (result.length !== ids.length) {
      dataResult.message = "You don't have permission to delete the selected pictures";
      return NextResponse.json(dataResult);
    }

    sql = `update pictures set is_deleted = $1 where id in (${idStr})`;
    result = await querySql(sql, [type === 0]);

    dataResult.status = DataResultStatus.Success;
    dataResult.message = "Pictures had been moved to recycle successfully!";
    return NextResponse.json(dataResult);
  } catch (error) {
    logger.error(error);
    dataResult.message = "Failed to recycle pictures!";
    return NextResponse.json(dataResult);
  }
}
