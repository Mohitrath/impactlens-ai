import { NextResponse } from "next/server";
import {
  analysisText,
  analyzeCloudinaryAsset,
  getCloudinaryAsset,
} from "@/lib/cloudinary-data";

export async function POST(req: Request) {
  const { beforeId, afterId } = await req.json().catch(() => ({}));
  if (!beforeId || !afterId || beforeId === afterId) {
    return NextResponse.json(
      { error: "Choose two different Cloudinary assets." },
      { status: 400 }
    );
  }

  try {
    const [before, after] = await Promise.all([
      getCloudinaryAsset(String(beforeId)),
      getCloudinaryAsset(String(afterId)),
    ]);

    if (!before || !after) {
      return NextResponse.json(
        { error: "One or both selected assets could not be found in Cloudinary." },
        { status: 404 }
      );
    }

    const prompts = [
      "Describe the visible intervention, infrastructure, people, environment, and project-relevant evidence in this image.",
      "Identify measurable-looking visual signals that could indicate project progress, such as structures, vegetation, water, equipment, roads, buildings, or community activity. Do not invent measurements.",
      "List the most important visible evidence as short factual bullet points.",
    ];

    const [beforeAI, afterAI] = await Promise.all([
      analyzeCloudinaryAsset(before.asset_id, prompts, "ai_vision_general"),
      analyzeCloudinaryAsset(after.asset_id, prompts, "ai_vision_general"),
    ]);

    const beforeText = analysisText(beforeAI);
    const afterText = analysisText(afterAI);

    return NextResponse.json({
      success: true,
      mode: "cloudinary-ai-vision",
      before: {
        id: before.asset_id,
        title: before.title,
        date: before.date,
        text: beforeText,
      },
      after: {
        id: after.asset_id,
        title: after.title,
        date: after.date,
        text: afterText,
      },
      comparison: {
        project: after.project || before.project,
        location: after.location !== "Unknown location" ? after.location : before.location,
        timeChanged: before.date !== after.date,
        dimensionChanged:
          before.width !== after.width || before.height !== after.height,
        beforeBytes: before.bytes || 0,
        afterBytes: after.bytes || 0,
        evidence:
          "AI descriptions are generated independently for each original Cloudinary asset. Differences should be interpreted from the visible evidence, not as measured field outcomes.",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          error?.message ||
          "AI comparison failed. Enable the Cloudinary AI Vision add-on.",
      },
      { status: 500 }
    );
  }
}
