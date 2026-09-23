import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { getCloudinaryMedia } from "@/lib/cloudinary-data";
import { media as demoMedia } from "@/lib/demo-data";

export default async function Projects(){
 const live=await getCloudinaryMedia(500);
 const items=live.length?live:demoMedia;
 const grouped=Array.from(new Map(items.map(m=>[m.project,{project:m.project,location:m.location,count:0,status:"Active"}])).values());
 for(const p of grouped) p.count=items.filter(m=>m.project===p.project).length;
 return <><div className="topbar"><div><div className="eyebrow">{live.length?"Live programs":"Programs"}</div><h1>Projects</h1><p className="muted">{live.length?"Projects are derived directly from Cloudinary asset context.":"Demo projects — upload with project metadata for live project workspaces."}</p></div><Link className="btn primary" href="/upload">+ Upload evidence</Link></div>
 <div className="grid3">{grouped.map(p=><Link href={live.length?`/projects/view?project=${encodeURIComponent(p.project)}`:"/projects/view?project="+encodeURIComponent(p.project)} className="card projectCard" key={p.project} style={{textDecoration:"none",color:"inherit",display:"block"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span className="badge">{p.status}</span><ArrowUpRight size={17}/></div><h2 style={{marginTop:13}}>{p.project}</h2><p className="muted">{p.location}</p><div style={{marginTop:22,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span className="muted">{p.count} live assets</span><span className="badge"><FolderOpen size={12}/> Open project</span></div></Link>)}</div></>;
}
