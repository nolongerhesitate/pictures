import logger from "@/app/lib/log"
import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import { DataResult } from "@/app/lib/definitions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import fs from "node:fs/promises";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const param = await request.json();

    if (!param.ids && param.ids.length < 1) {
      return NextResponse.json(new DataResult("failed", "Please provide at least one picture id"));
    }

    const idStr = param.ids.map(id => `'${id}'`).join(", ");
    // check if the user has the permissions to delete the pictures 
    let sql = `select id from picture_users_relationship where user_id = $1 and picture_id in (${idStr})`;
    let result = await querySql(sql, [session.user.id]);

    if (result.length !== param.ids.length) {
      return NextResponse.json(new DataResult("failed", "You don't have permission to delete the selected pictures")); ``
    }

    // update is_deleted field to true
    sql = `update pictures set is_deleted = true where id in (${idStr})`;
    result = await querySql(sql);

    // delete thumbnail files
    sql = `select thumbnail_path from thumbnails where picture_id in (${idStr})`;
    result = await querySql(sql);
    for (const path of result) {
      try {
        await fs.rm(path.thumbnail_path);
      } catch {
        continue;
      }
    }

    // delete thumbnails database
    sql = `delete from thumbnails where picture_id in (${idStr})`;
    result = await querySql(sql);

    return NextResponse.json(new DataResult("success", "Delete picture success"));
  } catch (error) {
    logger.error(error);
    return NextResponse.json(new DataResult("failed", "Failed to delete picture!"));
  }
}
