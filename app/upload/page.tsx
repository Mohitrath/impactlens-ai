import { Sparkles, CheckCircle2 } from "lucide-react";
import Uploader from "@/components/uploader";

export default function Upload(){
 return <><div className="topbar"><div><div className="eyebrow">Evidence ingestion</div><h1>Upload media</h1><p className="muted">Real signed upload to Cloudinary with an AI analysis pipeline.</p></div></div>
 <div className="grid3">
  <div className="card" style={{gridColumn:"span 2"}}><Uploader/></div>
  <div className="card"><div className="eyebrow">Pipeline</div><h2 style={{marginTop:8}}>Processing stages</h2><div className="timeline">
   {["Secure signature","Cloudinary upload","AI analysis","Metadata + discovery"].map((t)=><div className="timelineItem" key={t}><b>{t}</b><div className="muted" style={{fontSize:12,marginTop:3}}><CheckCircle2 size={12} style={{verticalAlign:"middle"}}/> Connected</div></div>)}
  </div></div>
 </div>
 <div className="card section"><div className="sectionHead"><div><div className="eyebrow">Problem statement mapping</div><h2>Evidence intelligence</h2></div><Sparkles color="#63e6a3"/></div><div className="pillRow">{["Project","Location","Activity","Objects","Environment","Timeline","Impact signals","Traceability"].map(x=><span className="badge" key={x}>{x}</span>)}</div></div>
 </>;
}