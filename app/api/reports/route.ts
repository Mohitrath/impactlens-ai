import { NextResponse } from "next/server";
export async function POST(req:Request){
 const {project,items=[]}=await req.json().catch(()=>({}));
 const selected=(items||[]).filter((x:any)=>x.project===project);
 const lines=[`# Impact Report — ${project}`,"",`Generated: ${new Date().toISOString()}`,"",`## Executive Summary`,`This report contains ${selected.length} evidence assets associated with **${project}**.`,"",`## Evidence Highlights`];
 for(const x of selected.slice(0,50)) lines.push(`- **${x.title}** — ${x.location}; ${x.date}; tags: ${(x.tags||[]).join(", ")||"none"}; asset: ${x.asset_id||x.id}`);
 lines.push("", "## Traceability", "Each listed item retains its Cloudinary asset identifier and original delivery URL in the source workspace.");
 return NextResponse.json({project,markdown:lines.join("\n")});
}
