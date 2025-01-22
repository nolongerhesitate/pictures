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
    const page = request.nextUrl.searchParams.get("page") || 1;
    const limit = request.nextUrl.searchParams.get("limit") || 10;
    const offset = (page - 1) * limit;
    let sql = `select picture_id from picture_users_relationship where user_id = $1 LIMIT $2 OFFSET $3`;
    const pictureIds = await querySql(sql, [session.user.id, limit, offset]);

    const pictures = await Promise.all(pictureIds.map(async item => {
      let sql = `select * from pictures where id = $1 `;
      const result = await querySql(sql, [item.picture_id]);
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


    sql = `select count(*) from picture_users_relationship where user_id = $1`;
    const totalCount = await querySql(sql, [session.user.id]);

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
