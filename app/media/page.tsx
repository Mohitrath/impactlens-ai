import Link from "next/link";
import { ArrowUpRight, Database, Search } from "lucide-react";
import { getCloudinaryMedia } from "@/lib/cloudinary-data";
import { media as demoMedia } from "@/lib/demo-data";

export default async function Media(){
  const live = await getCloudinaryMedia(100);
  const items = live.length ? live : demoMedia;
  return <><div className="topbar"><div><div className="eyebrow">{live.length ? "Live Cloudinary evidence" : "Evidence repository"}</div><h1>Media Library</h1><p className="muted">{live.length ? `${live.length} live assets from your Cloudinary account` : "Demo mode — add Cloudinary credentials for live assets."}</p></div><Link className="btn primary" href="/upload">+ Upload</Link></div>
    <div className="card"><div style={{display:"flex",gap:10,alignItems:"center"}}><Search size={17}/><input className="search" placeholder="Search by project, location, activity, object or visual signal…"/></div></div>
    <div className="section mediaGrid">{items.map(m=><Link href={live.length ? `/media/view?id=${encodeURIComponent(m.asset_id)}` : "/upload"} className="card mediaCard" key={m.id || m.asset_id} style={{textDecoration:"none",color:"inherit",display:"block"}}>
      <div className="mediaThumb"><img src={m.src} alt={m.title}/><span className="mediaOverlay"><ArrowUpRight size={18}/> Open evidence</span></div>
      <div className="mediaInfo"><div style={{display:"flex",justifyContent:"space-between"}}><span className="badge">{m.type || m.resource_type || "Media"}</span><span className="muted">{m.score}% match</span></div><h3 style={{marginTop:10}}>{m.title}</h3><p className="muted">{m.project} · {m.location}</p><div className="pillRow">{(m.tags||[]).map(t=><span className="badge" key={t}>{t}</span>)}</div></div>
    </Link>)}</div>
    {live.length>0 && <div className="card section"><Database size={15}/><span className="muted" style={{marginLeft:8}}>Source: Cloudinary Admin API · live account data</span></div>}
  </>;
}
