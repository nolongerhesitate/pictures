import logger from "@/app/lib/log";
import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import { DataResult } from "@/app/lib/definitions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    // type: 1 => restore(is_deleted -> false), 0 => move to recycle
    const { ids, type } = await request.json();
    if (!ids && ids.length < 1) {
      return NextResponse.json(new DataResult("failed", "Please provide at least one picture id"));
    }

    const idStr = ids.map(id => `'${id}'`).join(", ");
    let sql = `select id from picture_users_relationship where user_id = $1 and picture_id in (${idStr})`;
    let result = await querySql(sql, [session.user.id]);

    if (result.length !== ids.length) {
      return NextResponse.json(new DataResult("failed", "You don't have permission to delete the selected pictures")); ``
    }

    sql = `update pictures set is_deleted = $1 where id in (${idStr})`;
    result = await querySql(sql, [type === 0]);

    return NextResponse.json(new DataResult("success", "Pictures had been moved to recycle successfully!"));

  } catch (error) {
    logger.error(error);
    return NextResponse.json(new DataResult("failed", "Failed to recycle pictures!"));
  }
}
