import { getCloudinaryMedia } from "@/lib/cloudinary-data";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Clock3, ShieldCheck, Sparkles } from "lucide-react";

export default async function EvidenceLab() {
  const items = await getCloudinaryMedia(500);
  const missingProject = items.filter(x => !x.project || x.project === "Unassigned");
  const missingLocation = items.filter(x => !x.location || x.location === "Unknown location");
  const missingActivity = items.filter(x => !x.activity || x.activity === "Field evidence");
  const untagged = items.filter(x => !(x.tags || []).length);
  const analyzed = items.filter(x => Boolean(x.metadata?.ai_analysis || x.metadata?.ai_summary));
  const projects = Array.from(new Set(items.map(x => x.project).filter(Boolean)));
  const completeness = items.length ? Math.round(((items.length * 4 - missingProject.length - missingLocation.length - missingActivity.length - untagged.length) / (items.length * 4)) * 100) : 0;
  const timeline = [...items].sort((a,b) => String(a.created_at).localeCompare(String(b.created_at)));
  return <>
    <div className="topbar"><div><div className="eyebrow">Evidence operations</div><h1>Evidence Lab</h1><p className="muted">Find documentation gaps, inspect project timelines, and prepare evidence for AI workflows.</p></div><Link className="btn primary" href="/upload"><Sparkles size={15}/> Add evidence</Link></div>
    <div className="grid4">{[[
      "Evidence completeness", `${completeness}%`, "project + location + activity + tags", ShieldCheck],
      ["AI analyzed", String(analyzed.length), `of ${items.length} live assets`, Sparkles],
      ["Documentation gaps", String(missingProject.length + missingLocation.length + missingActivity.length + untagged.length), "missing metadata fields", AlertTriangle],
      ["Projects covered", String(projects.length), "derived from Cloudinary", CheckCircle2],
    ].map(([label,value,detail,Icon]:any) => <div className="card stat" key={label}><Icon size={18} color="#63e6a3"/><div className="statValue">{value}</div><div className="muted">{label}</div><div className="statDelta">{detail}</div></div>)}</div>
    <div className="detailGrid section"><div className="card"><div className="sectionHead"><h2>Evidence gap radar</h2><span className="badge"><AlertTriangle size={12}/> Actionable</span></div><div className="detailList" style={{marginTop:16}}>{[[
      ["Missing project", missingProject.length],["Missing location", missingLocation.length],["Missing activity", missingActivity.length],["Untagged assets", untagged.length]
    ].map(([label,count]) => <div key={label}><AlertTriangle size={15}/><span><b>{label}</b><small>{count} asset(s) need attention</small></span></div>)}</div></div>
    <div className="card"><div className="sectionHead"><h2>Project coverage</h2><span className="badge">{projects.length} projects</span></div><div className="detailList" style={{marginTop:16}}>{projects.map(project => { const count = items.filter(x => x.project === project).length; return <div key={project}><CheckCircle2 size={15}/><span><b>{project}</b><small>{count} evidence asset(s)</small></span></div>; })}</div></div></div>
    <div className="card section"><div className="sectionHead"><h2>Evidence timeline</h2><span className="badge"><Clock3 size={12}/> Original upload dates</span></div><div className="detailList" style={{marginTop:16}}>{timeline.slice(0,40).map(x => <div key={x.asset_id}><Clock3 size={15}/><span><b><Link href={`/media/view?id=${encodeURIComponent(x.asset_id)}`}>{x.title}</Link></b><small>{x.date} · {x.project} · {x.location}</small></span></div>)}</div></div>
  </>;
}