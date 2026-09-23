import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: "Cloudinary environment variables are missing." }, { status: 500 });
  }
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "impactlens/evidence";
  const signature = cloudinary.utils.api_sign_request({ folder, timestamp }, apiSecret);
  return NextResponse.json({ cloudName, apiKey, timestamp, folder, signature });
}