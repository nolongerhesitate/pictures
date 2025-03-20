import { NextResponse } from "next/server";
import logger from "@/app/lib/log";
import { DataResult, DataResultStatus, Picture } from "@/app/lib/types";
import * as fs from "node:fs/promises";
import path from "node:path";
import { Buffer } from 'node:buffer';
import imghash from "imghash";
import { querySql } from "@/app/lib/actions";
import sharp from "sharp";
import dayjs from "dayjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";


export async function POST(request: Request) {
  let dataResult:DataResult<null> = {status: DataResultStatus.Failed,message: "", data: null, pagination: null} ;
  try {
    const session = await getServerSession(authOptions);
    const formData = await request.formData();
    const files = formData.getAll("file") as File[];

    if (!files || files.length <= 0) {
      dataResult.message = "No file provided";
      return NextResponse.json(dataResult);
    }

    const publicFolderPath = path.join(process.cwd(), "public");

    try {
      await fs.access(publicFolderPath);
    } catch (error) {
      await fs.mkdir(publicFolderPath, { recursive: true });
    }

    // Actually just one file once upload
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        dataResult.message = "Only images are allowed!";
        return NextResponse.json(dataResult);
      }

      const cacheFileName: string = file.name;
      const cacheFolderName: string = path.join(process.cwd(), "public/cache");
      const cacheFilePath = path.join(cacheFolderName, cacheFileName);

      try {
        await fs.access(cacheFolderName);
      } catch (error) {
        await fs.mkdir(cacheFolderName, { recursive: true });
      }

      await fs.writeFile(cacheFilePath, Buffer.from(new Uint8Array(await file.arrayBuffer())));

      const hash = await imghash.hash(cacheFilePath);

      let sql = `select id, is_deleted from pictures where hash = '${hash}'`;
      const hadPicture = await querySql(sql);
      if (hadPicture.length > 0 && !hadPicture[0].is_deleted) {
        dataResult.message = "File has been existed!";
        return NextResponse.json(dataResult);
      }


      const originalFileName: string = `${hash}${path.extname(cacheFileName).toLowerCase()}`;
      const originalFolderName: string = hash.substring(0, 3);
      const originalFolderPath: string = path.join(process.cwd(), `public/storage/${originalFolderName}`);
      const originalFilePath: string = path.join(originalFolderPath, originalFileName);

      try {
        await fs.access(originalFolderPath);
      } catch (error) {
        await fs.mkdir(originalFolderPath, { recursive: true });
      }


      const metadata: sharp.Metadata = await sharp(cacheFilePath).metadata();
      const imgInfo:Picture = {
        id: null,
        path: originalFilePath,
        displayName: cacheFileName,
        uploadTime: dayjs().unix(),
        size: file.size,
        lastModified: null,
        type: file.type,
        width: metadata.width,
        height: metadata.height,
        hash: hash,
        isDeleted: false
      };
      
      let insertPicId:string | null = hadPicture?.length > 0 ? hadPicture[0].id : null;

      if (insertPicId !== null) {
        sql = `update pictures set is_deleted = false where id = '${insertPicId}'`;
        await querySql(sql);
      } else {
        sql = `insert into pictures 
              (path, display_name, size, type, width, height, hash) values 
              ('${imgInfo.path}', '${imgInfo.displayName}', ${imgInfo.size}, '${imgInfo.type}', ${imgInfo.width}, ${imgInfo.height}, '${imgInfo.hash}')
              returning id;`;
        insertPicId = (await querySql(sql))[0].id;

        sql = `insert into picture_users_relationship 
              (user_id, picture_id) values
              ('${session.user.id}','${insertPicId}')`;
        await querySql(sql);
      }

      imgInfo.id = insertPicId;

      // generate thumbnail
      try {
        const thumbHeight:number = 300;
        const thumbWidth:number = Math.floor(thumbHeight * (imgInfo.width / imgInfo.height));
        const thumbFolderPath:string = path.join(process.cwd(), `public/thumbnails/`);
        const thumbPath:string = path.join(thumbFolderPath, originalFileName);

        try {
          await fs.access(thumbFolderPath);
        } catch (error) {
          await fs.mkdir(thumbFolderPath, { recursive: true });
        }

        await sharp(cacheFilePath).resize(thumbWidth, thumbHeight, {
          fit: "inside", // Ensures the image is resized to fit within the specified dimensions while maintaining its aspect ratio
          withoutEnlargement: true, // Prevents the image from being enlarged if it's smaller than the specified dimensions
        }).toFile(thumbPath);

        sql = `insert into thumbnails 
                (picture_id, thumbnail_path, width, height) 
                values 
                ($1, $2, $3, $4)`;
        await querySql(sql, [insertPicId, thumbPath, thumbWidth, thumbHeight]);
      } catch (error) {
        logger.error("Error generating thumbnail", error);
      }

      try {
        await fs.access(originalFilePath, fs.constants.F_OK);
        // return NextResponse.json(new DataResult("success", "File has been existed!"));
      } catch (error) {
        await fs.copyFile(cacheFilePath, originalFilePath);
      }

      try {
        await fs.rm(cacheFilePath);
      } catch (error) {
        logger.error("Error removing cache file", error);
      }
    }

    dataResult.status = DataResultStatus.Success;
    dataResult.message = "File uploaded successfully!";
    return NextResponse.json(dataResult);
  } catch (err) {
    logger.error(err);
    dataResult.status = DataResultStatus.Failed;
    dataResult.message = err.message;
    return NextResponse.json(dataResult);
  }
}
