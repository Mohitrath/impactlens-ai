import { Search, Sparkles } from "lucide-react";
import { media } from "@/lib/demo-data";
export default function SearchPage(){
 return <><div className="topbar"><div><div className="eyebrow">Semantic discovery</div><h1>AI Search</h1><p className="muted">Ask for evidence in natural language.</p></div></div>
 <div className="card"><div style={{display:"flex",gap:10}}><input className="search" defaultValue="solar projects showing community infrastructure" /><button className="btn primary"><Search size={16}/></button></div><div className="pillRow"><span className="badge"><Sparkles size={12}/> AI interpreted query</span><span className="muted">3 relevant assets</span></div></div>
 <div className="mediaGrid section">{media.filter(m=>m.tags.includes("solar")||m.tags.includes("infrastructure")||m.tags.includes("community")).slice(0,3).map(m=><div className="card mediaCard" key={m.id}><div className="mediaThumb"><img src={m.src} alt={m.title}/></div><div className="mediaInfo"><span className="badge">{m.score}% semantic match</span><h3 style={{marginTop:10}}>{m.title}</h3><p className="muted">{m.project} · {m.location}</p></div></div>)}</div>
 </>;
}