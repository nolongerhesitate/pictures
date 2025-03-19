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
    let sql = `select t1.id from picture_users_relationship as t1 left join pictures as t2 on t1.picture_id = t2.id where t1.user_id = $1 and t2.is_deleted = true and t1.picture_id in (${idStr})`;
    let result = await querySql(sql, [session.user.id]);

    if (result.length !== param.ids.length) {
      return NextResponse.json(new DataResult("failed", "You don't have permission to delete the selected pictures")); ``
    }

    // sql = `update pictures set is_deleted = true where id in (${idStr})`;
    sql = ` select path from pictures where id in (${idStr})`;
    result = await querySql(sql);

    // delete pictures
    for (const item of result) {
      try {
        await fs.rm(item.path);
      } catch (error) {
        logger.error(error);
      }
    }

    sql = `delete from pictures where id in (${idStr})`;
    await querySql(sql);

    sql = `delete from picture_users_relationship where picture_id in (${idStr}) and user_id= $1`;
    await querySql(sql, [session.user.id]);

    // delete thumbnail files
    sql = `select thumbnail_path from thumbnails where picture_id in (${idStr})`;
    result = await querySql(sql);
    for (const path of result) {
      try {
        await fs.rm(path.thumbnail_path);
      } catch {
        logger.error(error);
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
