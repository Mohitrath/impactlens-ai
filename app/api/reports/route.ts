import { NextResponse } from "next/server";
import {
  analysisText,
  analyzeCloudinaryAsset,
  getCloudinaryMedia,
} from "@/lib/cloudinary-data";

export async function POST(req: Request) {
  const { project } = await req.json().catch(() => ({}));
  if (!project) {
    return NextResponse.json({ error: "Project is required." }, { status: 400 });
  }

  try {
    const all = await getCloudinaryMedia(500);
    const selected = all.filter((x) => x.project === project);

    if (!selected.length) {
      return NextResponse.json(
        { error: "No live Cloudinary evidence exists for this project." },
        { status: 404 }
      );
    }

    const analyzed = [];
    for (const item of selected.slice(0, 8)) {
      let summary = item.metadata?.ai_summary || "";
      if (!summary && item.resource_type === "image") {
        try {
          const ai = await analyzeCloudinaryAsset(
            item.asset_id,
            [
              "Describe the project-relevant visual evidence in this image in one concise paragraph.",
              "List only visible, factual indicators of infrastructure, environmental restoration, community activity, or other project impact. Do not invent measurements.",
            ],
            "ai_vision_general"
          );
          summary = analysisText(ai);
        } catch {
          summary = "";
        }
      }
      analyzed.push({ ...item, summary });
    }

    const locations = Array.from(
      new Set(analyzed.map((x) => x.location).filter(Boolean))
    );
    const activities = Array.from(
      new Set(analyzed.map((x) => x.activity).filter(Boolean))
    );

    const lines = [
      `# Impact Report — ${project}`,
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Executive Summary",
      `This report is generated from ${selected.length} original Cloudinary evidence assets for **${project}**.`,
      `Evidence spans ${locations.length || 1} location(s) and ${activities.length || 1} recorded activity type(s).`,
      "",
      "## Evidence Highlights",
    ];

    for (const x of analyzed) {
      lines.push(
        `- **${x.title}** — ${x.location}; ${x.date}; activity: ${x.activity}; asset: ${x.asset_id}`
      );
      if (x.summary) lines.push(`  - AI observation: ${x.summary.replace(/\s+/g, " ").slice(0, 1200)}`);
    }

    lines.push(
      "",
      "## Campaign-Ready Story",
      `Our **${project}** evidence library contains ${selected.length} traceable field assets documenting work across ${locations.join(", ") || "recorded project locations"}. The evidence can be reviewed asset-by-asset through its original Cloudinary IDs and delivery URLs.`,
      "",
      "## Traceability",
      "Every evidence highlight above references the immutable Cloudinary asset ID used by the application. AI observations are descriptive and should not be treated as measured outcomes unless the source evidence contains measurements.",
      "",
      "## Source Assets"
    );

    for (const x of selected) {
      lines.push(`- ${x.asset_id} — ${x.src}`);
    }

    return NextResponse.json({
      project,
      assetCount: selected.length,
      markdown: lines.join("\n"),
      campaignCopy: `Our ${project} story is backed by ${selected.length} traceable field evidence assets. Explore the original media, review the AI observations, and connect every claim back to its Cloudinary source.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Report generation failed." },
      { status: 500 }
    );
  }
}
