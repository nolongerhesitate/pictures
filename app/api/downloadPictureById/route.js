import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import fs from "fs";
import { DataResult } from "@/app/lib/definitions";
import logger from "@/app/lib/log";

export async function GET(request, response) {
  try {
    const pictureId = request.nextUrl.searchParams.get("pictureId");
    const picture = (await querySql(`select * from pictures where id = $1`, [pictureId]))[0];

    if (!picture) {
      return NextResponse.json(new DataResult("failed", "Picture not found"));
    }

    const picturePath = picture.path;

    if (!fs.existsSync(picturePath)) {
      return NextResponse.json(new DataResult("failed", "Picture file not found"));
    }

    const file = fs.readFileSync(picturePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": `application/${picture.type}`,
        "Content-Disposition": `attachment; filename="${picture.displayName}"`,
      }
    });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(new DataResult("failed", "Failed to get pictures!"));
  }
}
