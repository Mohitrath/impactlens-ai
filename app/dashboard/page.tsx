import { Image as ImageIcon, FolderKanban, Sparkles, FileCheck2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { media } from "@/lib/demo-data";

export default function Dashboard(){
 return <><div className="topbar"><div><div className="eyebrow">Impact intelligence</div><h1>Good morning, impact team.</h1><p className="muted">Your evidence workspace is ready.</p></div><Link className="btn primary" href="/upload">Upload media</Link></div>
 <div className="grid4">
  {[
   ["Assets analyzed","1,284", "+18.4%",ImageIcon],
   ["Active projects","24","+3 this month",FolderKanban],
   ["AI insights","397","+12.1%",Sparkles],
   ["Traceability","98.7%","verified assets",FileCheck2]
  ].map(([a,b,c,I])=><div className="card stat" key={a as string}><I size={18} color="#63e6a3"/><div className="statValue">{b as string}</div><div className="muted">{a as string}</div><div className="statDelta">{c as string}</div></div>)}
 </div>
 <section className="section"><div className="sectionHead"><h2>Recent evidence</h2><Link className="btn" href="/media">View library <ArrowUpRight size={14} style={{verticalAlign:"middle"}}/></Link></div>
 <div className="mediaGrid">{media.slice(0,3).map(m=><div className="card mediaCard" key={m.id}><div className="mediaThumb"><img src={m.src} alt={m.title}/></div><div className="mediaInfo"><span className="badge">{m.project}</span><h3 style={{marginTop:10}}>{m.title}</h3><p className="muted">{m.location} · {m.date}</p><div className="pillRow">{m.tags.map(t=><span className="badge" key={t}>{t}</span>)}</div></div></div>)}</div></section>
 </>;
}