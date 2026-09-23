import { NextResponse } from "next/server";
import { getCloudinaryMedia, searchCloudinaryMedia } from "@/lib/cloudinary-data";

export async function GET(req: Request) {
  try {
    const query = new URL(req.url).searchParams.get("q") || "";
    const media = query ? await searchCloudinaryMedia(query) : await getCloudinaryMedia(100);
    return NextResponse.json({ configured: media.length > 0 || Boolean(process.env.CLOUDINARY_API_KEY), media });
  } catch (error:any) {
    return NextResponse.json({ error:error.message || "Unable to load Cloudinary media" }, {status:500});
  }
}
