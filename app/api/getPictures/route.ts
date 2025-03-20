import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { DataResult,DataResultStatus, Pagination, Picture } from "@/app/lib/types";
import logger from "@/app/lib/log";
import path from "node:path";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const feed:string = request.nextUrl.searchParams.get("feed");
    const page:number = Number(request.nextUrl.searchParams.get("page")) || 1;
    const limit:number = Number(request.nextUrl.searchParams.get("limit")) || 10;
    const deleted:string = request.nextUrl.searchParams.get("deleted");
    const delete_param:boolean = (deleted === null ? undefined : deleted === "true");
    const offset = (page - 1) * limit;

    let sql = `select t2.* from picture_users_relationship as t1 left join pictures as t2 on t1.picture_id = t2.id where t2.display_name like $1`;
    delete_param !== undefined && (sql += ` and t2.is_deleted = $2`);
    sql += ` and t1.user_id = $3 order by t2.upload_time desc LIMIT $4 OFFSET $5`;
    const result = await querySql(sql, [`${feed}%`, delete_param, session.user.id, limit, offset]);
    let pictures: Picture[] = result.map(item => {
      return {
        id: item.id,
        path: item.path,
        displayName: item.display_name,
        uploadTime: item.upload_time,
        size: item.size,
        lastModified: item.last_modified,
        type: item.type,
        width: item.width,
        height: item.height,
        hash: item.hash,
        isDeleted: item.is_deleted,
      };
    });

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

    sql = `select count(*) from picture_users_relationship as t1 left join pictures as t2 on t1.picture_id = t2.id where t1.user_id = $1`;
    delete_param !== undefined && (sql += ` and t2.is_deleted = $2`);
    const totalCount = await querySql(sql, [session.user.id, delete_param]);
    
    const pagination:Pagination = {
      page,
      limit,
      totalCount: totalCount[0].count
    };
    const dataResult:DataResult<Picture[]> = {
      status: DataResultStatus.Success,
      message: "Success", 
      data: pictures, 
      pagination: pagination
    };

    return NextResponse.json(dataResult);
  } catch (error) {
    logger.error(error);
    return NextResponse.json({
      status: DataResultStatus.Failed,
      message: "Failed to get pictures!",
      data: null,
      pagination: null
    });
  }
}
