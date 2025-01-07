import { NextResponse } from "next/server";
import logger from "@/app/lib/log";
import { DataResult, Picture } from "@/app/lib/definitions";
import * as fs from "node:fs/promises";
import path from "node:path";
import { Buffer } from 'node:buffer';
import imghash from "imghash";
import { querySql } from "@/app/lib/actions";
import sharp from "sharp";
import dayjs from "dayjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const formData = await request.formData();
    const files = formData.getAll("file");

    if (!files || files.length <= 0) {
      return NextResponse.json(new DataResult("failed", "No file provided"));
    }

    // Actually just one file once upload
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(new DataResult("failed", "Only images are allowed!"));
      }

      const cacheFileName = file.name;
      const cacheFilePath = path.join(process.cwd(), "public/cache", cacheFileName);

      try {
        await fs.access(path.dirname(cacheFilePath));
      } catch (error) {
        await fs.mkdir(path.dirname(cacheFilePath), { recursive: true });
      }

      await fs.writeFile(cacheFilePath, Buffer.from(new Uint8Array(await file.arrayBuffer())));

      const hash = await imghash.hash(cacheFilePath);

      let sql = `select hash from pictures`;
      const allImgHash = await querySql(sql);
      if (allImgHash && allImgHash.some(item => item === hash)) {
        return NextResponse.json(new DataResult("success", "File has been existed!"));
      }

      const originalFileName = `${hash}${path.extname(cacheFileName).toLowerCase()}`;
      const originalFolderName = hash.substring(0, 3);
      const originalFolderPath = path.join(process.cwd(), `public/storage/${originalFolderName}`);
      const originalFilePath = path.join(originalFolderPath, originalFileName);

      try {
        await fs.access(originalFolderPath);
      } catch (error) {
        await fs.mkdir(originalFolderPath, { recursive: true });
      }

      try {
        await fs.access(originalFilePath, fs.constants.F_OK);
        return NextResponse.json(new DataResult("success", "File has been existed!"));
      } catch (error) {
      }

      const metadata = await sharp(cacheFilePath).metadata();

      const imgInfo = new Picture(
        originalFilePath,
        cacheFileName,
        dayjs().unix(),
        file.size,
        null,
        file.type,
        metadata.width,
        metadata.height,
        hash);
      sql = `insert into pictures 
              (path, display_name,  size,  type, width, height, hash) values 
              ('${imgInfo.path}', '${imgInfo.displayName}', ${imgInfo.size}, '${imgInfo.type}', ${imgInfo.width}, ${imgInfo.height}, '${imgInfo.hash}')
              returning id`;
      const id = (await querySql(sql))[0].id;

      sql = `insert into picture_users_relationship 
              (user_id, picture_id) values
              ('${session.user.id}','${id}')`;
      await querySql(sql);

      await fs.copyFile(cacheFilePath, originalFilePath);

      try {
        await fs.rm(cacheFilePath);
      } catch (error) {
        logger.error("Error removing cache file", err);
      }
    }

    return NextResponse.json(new DataResult("success", "File uploaded successfully!"));
  } catch (err) {
    logger.error(err);
    return NextResponse.json(new DataResult("failed", err.message));
  }
}
