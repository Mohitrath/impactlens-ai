import { NextResponse } from "next/server";
import { analysisText, analyzeCloudinaryAsset } from "@/lib/cloudinary-data";

export async function POST(req: Request) {
  const { assetId, question } = await req.json().catch(() => ({}));
  if (!assetId || !String(question || "").trim()) {
    return NextResponse.json({ error: "assetId and question are required." }, { status: 400 });
  }
  try {
    const answer = await analyzeCloudinaryAsset(
      String(assetId),
      [String(question).slice(0, 1000)],
      "ai_vision_general"
    );
    return NextResponse.json({
      success: true,
      answer: analysisText(answer),
      raw: answer,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "AI evidence question failed." },
      { status: 500 }
    );
  }
}