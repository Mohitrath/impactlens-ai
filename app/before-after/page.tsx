import { GitCompareArrows, Sparkles } from "lucide-react";
import { media } from "@/lib/demo-data";
export default function BeforeAfter(){
 const a=media[0], b=media[4];
 return <><div className="topbar"><div><div className="eyebrow">Visual change detection</div><h1>Before / After</h1><p className="muted">Compare project evidence across phases.</p></div><span className="badge"><Sparkles size={12}/> AI analysis complete</span></div>
 <div className="card"><div className="beforeAfter"><div className="compare"><span className="badge">BEFORE · 12 Apr 2026</span><img src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80" alt="Before project"/></div><div className="compare"><span className="badge">AFTER · 12 Sep 2026</span><img src={a.src} alt="After project"/></div></div>
 <div className="section"><div className="sectionHead"><h2>AI impact analysis</h2><span className="badge"><GitCompareArrows size={12}/> 5-month comparison</span></div>
 {[["Infrastructure visibility",86],["Community activity",72],["Site improvement",81],["Evidence confidence",94]].map(([x,v])=><div key={x as string} style={{margin:"16px 0"}}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:7}}><span>{x as string}</span><b>{v as number}%</b></div><div className="bar"><span style={{width:`${v}%`}}/></div></div>)}
 <div className="card" style={{marginTop:18,background:"#10261a"}}><div className="eyebrow">Generated summary</div><p style={{lineHeight:1.7}}>Visible changes indicate improved infrastructure presence and increased evidence of community activity. The paired assets are linked to their original project records and preserve the comparison timeline.</p></div>
 </div></div></>;
}