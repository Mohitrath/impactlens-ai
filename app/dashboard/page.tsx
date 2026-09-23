import { Image as ImageIcon, FolderKanban, Sparkles, FileCheck2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getCloudinaryMedia } from "@/lib/cloudinary-data";
import { media as demoMedia } from "@/lib/demo-data";

export default async function Dashboard(){
 const live=await getCloudinaryMedia(100);
 const items=live.length?live:demoMedia;
 const projects=new Set(items.map(m=>m.project));
 const insights=items.filter(m=>(m.tags||[]).length>0).length;
 return <><div className="topbar"><div><div className="eyebrow">{live.length?"Live impact intelligence":"Impact intelligence"}</div><h1>Good morning, impact team.</h1><p className="muted">{live.length?"Connected to your Cloudinary evidence workspace.":"Demo workspace — connect Cloudinary for live metrics."}</p></div><Link className="btn primary" href="/upload">Upload media</Link></div>
 <div className="grid4">
  {[["Assets analyzed",String(items.length),live.length?"live assets":"demo assets",ImageIcon],["Active projects",String(projects.size),"derived from evidence",FolderKanban],["AI insights",String(insights),"tagged assets",Sparkles],["Traceability",live.length?"100%":"98.7%",live.length?"Cloudinary asset IDs":"demo evidence",FileCheck2]].map(([a,b,c,I])=><div className="card stat" key={a as string}><I size={18} color="#63e6a3"/><div className="statValue">{b as string}</div><div className="muted">{a as string}</div><div className="statDelta">{c as string}</div></div>)}
 </div>
 <section className="section"><div className="sectionHead"><h2>Recent evidence</h2><Link className="btn" href="/media">View library <ArrowUpRight size={14} style={{verticalAlign:"middle"}}/></div>
 <div className="mediaGrid">{items.slice(0,3).map(m=><Link href={live.length?`/media/view?id=${encodeURIComponent(m.asset_id)}`:"/media"} className="card mediaCard" key={m.id||m.asset_id} style={{textDecoration:"none",color:"inherit",display:"block"}}><div className="mediaThumb"><img src={m.src} alt={m.title}/><span className="mediaOverlay"><ArrowUpRight size={18}/> Open evidence</span></div><div className="mediaInfo"><span className="badge">{m.project}</span><h3 style={{marginTop:10}}>{m.title}</h3><p className="muted">{m.location} · {m.date}</p><div className="pillRow">{(m.tags||[]).map(t=><span className="badge" key={t}>{t}</span>)}</div></div></Link>)}</div></section>
 </>;
}
