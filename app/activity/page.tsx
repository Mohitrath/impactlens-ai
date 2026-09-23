import { Activity, CheckCircle2, Database } from "lucide-react";
import { getCloudinaryMedia } from "@/lib/cloudinary-data";

export default async function ActivityPage(){
 const media=await getCloudinaryMedia(100);
 const events=media.slice(0,10).map(m=>["Media uploaded",`${m.title} · ${m.project}`,m.date]);
 return <><div className="topbar"><div><div className="eyebrow">{media.length?"Live Cloudinary activity":"System activity"}</div><h1>Activity</h1><p className="muted">{media.length?"Latest events derived from asset creation timestamps.":"Connect Cloudinary to see live activity."}</p></div><Activity color="#63e6a3"/></div><div className="card">{events.length?events.map(([a,b,c],i)=><div key={i} style={{padding:"17px 0",borderBottom:"1px solid var(--border)",display:"flex",gap:13}}><CheckCircle2 color="#63e6a3" size={18}/><div style={{flex:1}}><b>{a}</b><div className="muted">{b}</div></div><span className="muted" style={{fontSize:12}}>{c}</span></div>):<div className="emptyState"><Database size={28}/><h3>No live activity</h3><p className="muted">Upload media to Cloudinary to populate this timeline.</p></div>}</div></>;
}
