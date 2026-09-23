import Link from "next/link";
import { ArrowUpRight, FolderOpen } from "lucide-react";

const projects=[
  ["Water Access — Kheri","128 assets","Kheri, India","Active"],
  ["Wetland Restoration","342 assets","Odisha, India","Active"],
  ["Solar Schools Initiative","219 assets","Rajasthan, India","Reporting"],
  ["Green Corridor","187 assets","Pune, India","Active"]
];

export default function Projects(){
  return <>
    <div className="topbar">
      <div>
        <div className="eyebrow">Programs</div>
        <h1>Projects</h1>
        <p className="muted">Organize evidence by project, location and timeline.</p>
      </div>
      <button className="btn primary">+ New project</button>
    </div>

    <div className="grid3">
      {projects.map(p => (
        <Link
          href={`/projects/view?project=${encodeURIComponent(p[0])}`}
          className="card projectCard"
          key={p[0]}
          style={{textDecoration:"none",color:"inherit",display:"block"}}
        >
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span className="badge">{p[3]}</span>
            <ArrowUpRight size={17}/>
          </div>
          <h2 style={{marginTop:13}}>{p[0]}</h2>
          <p className="muted">{p[2]}</p>
          <div style={{marginTop:22,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span className="muted">{p[1]}</span>
            <span className="badge"><FolderOpen size={12}/> Open project</span>
          </div>
        </Link>
      ))}
    </div>
  </>;
}
