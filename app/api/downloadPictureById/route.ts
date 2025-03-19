import { NextResponse } from "next/server";
import { querySql } from "@/app/lib/actions";
import fs from "fs";
import { DataResult, DataResultStatus,Picture } from "@/app/lib/types";
import logger from "@/app/lib/log";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let dataResult:DataResult<null> = {status: DataResultStatus.Failed,message: "", data: null, pagination: null} 
  try {
    const pictureId = request.nextUrl.searchParams.get("pictureId");
    const picture = (await querySql(`select * from pictures where id = $1`, [pictureId]))[0];

    if (!picture) {
      dataResult.message = "Picture not found";
      return NextResponse.json(dataResult);
    }

    const picturePath = picture.path;

    if (!fs.existsSync(picturePath)) {
      dataResult.message = "Picture file not found";
      return NextResponse.json(dataResult);
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
    dataResult.message = "Failed to get picture!";
    return NextResponse.json(dataResult);
  }
}
