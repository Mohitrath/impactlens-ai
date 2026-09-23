import { media } from "@/lib/demo-data";
export default function Media(){
 return <><div className="topbar"><div><div className="eyebrow">Evidence repository</div><h1>Media Library</h1></div><a className="btn primary" href="/upload">+ Upload</a></div>
 <div className="card"><input className="search" placeholder="Search by project, location, activity, object or visual signal…"/></div>
 <div className="mediaGrid section">{media.map(m=><div className="card mediaCard" key={m.id}><div className="mediaThumb"><img src={m.src} alt={m.title}/></div><div className="mediaInfo"><div style={{display:"flex",justifyContent:"space-between"}}><span className="badge">{m.type}</span><span className="muted">{m.score}% match</span></div><h3 style={{marginTop:10}}>{m.title}</h3><p className="muted">{m.project} · {m.location}</p><div className="pillRow">{m.tags.map(t=><span className="badge" key={t}>{t}</span>)}</div></div></div>)}</div>
 </>;
}