import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { DataResult, Pagination } from "@/app/lib/definitions";
import logger from "@/app/lib/log";
import path from "node:path";


export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const feed = request.nextUrl.searchParams.get("feed");
    const page = request.nextUrl.searchParams.get("page") || 1;
    const limit = request.nextUrl.searchParams.get("limit") || 10;
    const deleted = request.nextUrl.searchParams.get("deleted");
    const delete_param = (deleted === null ? undefined : deleted);
    const offset = (page - 1) * limit;

    let sql = `select t2.* from picture_users_relationship as t1 left join pictures as t2 on t1.picture_id = t2.id where t2.display_name like $1`;
    delete_param !== undefined && (sql += ` and t2.is_deleted = $2`);
    sql += ` and t1.user_id = $3 order by t2.display_name asc LIMIT $4 OFFSET $5`;
    let pictures = await querySql(sql, [`%${feed}%`, delete_param, session.user.id, limit, offset]);

    pictures.forEach(async item => {
      sql = `select thumbnail_path, width, height from thumbnails where picture_id = $1`;
      const thumb = (await querySql(sql, [item.id]))[0];
      if (thumb) {
        item.thumbFileName = path.basename(thumb.thumbnail_path);
        item.thumbWidth = thumb.width;
        item.thumbHeight = thumb.height;
      };
      return item;
    });

    // console.log("#pictures:", pictures);
    /*
    let pictures = await Promise.all(pictureIds.map(async item => {
      let sql = `select * from pictures where id = $1`;
      delete_param !== undefined && (sql += ` and is_deleted = $2`);
      const result = await querySql(sql, [item.picture_id, delete_param]);
      if (!result || result.length < 1) {
        return null;
      }

      sql = `select thumbnail_path, width, height from thumbnails where picture_id = $1`;
      const thumb = (await querySql(sql, [item.picture_id]))[0];
      if (thumb) {
        result[0].thumbFileName = path.basename(thumb.thumbnail_path);
        result[0].thumbWidth = thumb.width;
        result[0].thumbHeight = thumb.height;
      }

      return result[0];
    }));

    pictures = pictures.filter(item => item);
    */

    sql = `select count(*) from picture_users_relationship as t1 left join pictures as t2 on t1.picture_id = t2.id where t1.user_id = $1`;
    delete_param !== undefined && (sql += ` and t2.is_deleted = $2`);
    const totalCount = await querySql(sql, [session.user.id, delete_param]);

    return NextResponse.json(
      new DataResult(
        "success",
        "Success",
        pictures,
        new Pagination(
          page,
          limit,
          totalCount[0].count,
        )));
  } catch (error) {
    logger.error(error);
    return NextResponse.json(new DataResult("failed", "Failed to get pictures!"));
  }
}
