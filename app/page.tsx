import Link from "next/link";
import { ArrowRight, Cloud, Sparkles, ShieldCheck, Search, GitCompareArrows } from "lucide-react";

export default function Home(){
  return <div>
    <div className="topbar"><div className="eyebrow">Code Cubicle 6.0 · Cloudinary</div><Link className="btn" href="/dashboard">Open dashboard</Link></div>
    <section className="hero">
      <div className="eyebrow">AI-Powered Impact & Sustainability Media Platform</div>
      <h1>Turn field media into evidence, impact and stories.</h1>
      <p>ImpactLens organizes photos and videos by project, location and timeline, adds AI-generated metadata, compares before/after evidence and produces traceable impact reports.</p>
      <div className="heroActions"><Link className="btn primary" href="/upload">Upload evidence <ArrowRight size={16} style={{verticalAlign:"middle"}}/></Link><Link className="btn" href="/search">Explore AI search</Link></div>
      <div className="pillRow">
        <span className="badge"><Cloud size={13}/> Cloudinary-ready</span>
        <span className="badge"><Sparkles size={13}/> AI metadata</span>
        <span className="badge"><ShieldCheck size={13}/> Traceable assets</span>
      </div>
    </section>
    <div className="grid3 section">
      {[
        ["AI Media Intelligence","Automatically turn raw visual evidence into structured metadata, tags and searchable context.",Sparkles],
        ["Before / After","Compare project phases and surface visible changes with an AI-generated impact summary.",GitCompareArrows],
        ["Semantic Discovery","Search your evidence by meaning, project, location, activity or visual signals.",Search]
      ].map(([t,d,I])=><div className="card" key={t as string}><I size={22} color="#63e6a3"/><h2 style={{marginTop:16}}>{t as string}</h2><p className="muted">{d as string}</p></div>)}
    </div>
  </div>
}