import { NextResponse } from "next/server";
import {
  analysisText,
  analyzeCloudinaryAsset,
  updateCloudinaryContext,
} from "@/lib/cloudinary-data";

export async function POST(req: Request) {
  const {
    assetId,
    uri,
    model,
    project,
    location,
    activity,
    prompts = [],
  } = await req.json().catch(() => ({}));

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const analysisModel =
    model || process.env.CLOUDINARY_ANALYSIS_MODEL || "captioning";

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary environment variables are missing." },
      { status: 500 }
    );
  }

  if (!assetId && !uri) {
    return NextResponse.json(
      { error: "assetId or uri is required." },
      { status: 400 }
    );
  }

  try {
    const source = assetId ? { asset_id: assetId } : { uri };
    const endpoint = `https://api.cloudinary.com/v2/analysis/${cloudName}/analyze/${analysisModel}`;
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source,
        ...(prompts.length ? { prompts: prompts.slice(0, 10) } : {}),
      }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Cloudinary analysis failed. Enable the selected analysis add-on if required.",
          cloudinary: data,
          fallback: true,
        },
        { status: response.status }
      );
    }

    const text = analysisText(data);
    if (assetId) {
      try {
        await updateCloudinaryContext(assetId, {
          project: project || "Unassigned",
          location: location || "",
          activity: activity || "Field evidence",
          ai_model: analysisModel,
          ai_analysis: JSON.stringify(data).slice(0, 8000),
          ai_summary: text.slice(0, 1000),
          analyzed_at: new Date().toISOString(),
        });
      } catch {
        // Analysis still succeeded even if metadata persistence fails.
      }
    }

    return NextResponse.json({
      success: true,
      model: analysisModel,
      text,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "AI analysis failed.", fallback: true },
      { status: 500 }
    );
  }
}
