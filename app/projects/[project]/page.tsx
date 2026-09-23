import Link from "next/link";
import { ArrowLeft, MapPin, CalendarDays, Image as ImageIcon, Search } from "lucide-react";
import { media } from "@/lib/demo-data";

const projectMeta: Record<string,{status:string, description:string, assets:number}> = {
  "Water Access — Kheri": {status:"Active", description:"Community water-access evidence, infrastructure progress, and field documentation.", assets:128},
  "Wetland Restoration": {status:"Active", description:"Restoration evidence tracking habitat recovery, field activity, and environmental progress.", assets:342},
  "Solar Schools Initiative": {status:"Reporting", description:"Solar infrastructure deployment across schools with visual evidence of installation progress.", assets:219},
  "Green Corridor": {status:"Active", description:"Urban greening and tree-planting evidence across the corridor.", assets:187}
};

export default async function ProjectDetail({params}:{params:Promise<{project:string}>}){
  const {project: encodedProject} = await params;
  const project = decodeURIComponent(encodedProject);
  const meta = projectMeta[project] ?? {status:"Active", description:"Impact evidence workspace.", assets:0};
  const assets = media.filter(m => m.project === project);

  return <>
    <div className="topbar">
      <div>
        <Link href="/projects" className="backLink"><ArrowLeft size={15}/> Back to projects</Link>
        <div className="eyebrow" style={{marginTop:18}}>Project workspace</div>
        <h1>{project}</h1>
        <p className="muted">{meta.description}</p>
      </div>
      <span className="badge">{meta.status}</span>
    </div>

    <div className="statsGrid section">
      <div className="stat"><span className="muted">Project assets</span><strong>{meta.assets}</strong></div>
      <div className="stat"><span className="muted">Evidence shown</span><strong>{assets.length}</strong></div>
      <div className="stat"><span className="muted">AI coverage</span><strong>94%</strong></div>
      <div className="stat"><span className="muted">Traceability</span><strong>98.7%</strong></div>
    </div>

    <div className="card section">
      <div className="sectionHeader">
        <div>
          <div className="eyebrow">Evidence library</div>
          <h2>Project media</h2>
        </div>
        <Link href="/search" className="btn"><Search size={15}/> Search evidence</Link>
      </div>

      {assets.length === 0 ? (
        <div className="emptyState">
          <ImageIcon size={28}/>
          <h3>No demo assets yet</h3>
          <p className="muted">Upload evidence to connect it with this project.</p>
        </div>
      ) : (
        <div className="mediaGrid">
          {assets.map(asset => (
            <div className="card mediaCard" key={asset.id}>
              <div className="mediaThumb"><img src={asset.src} alt={asset.title}/></div>
              <div className="mediaInfo">
                <span className="badge">{asset.score}% semantic match</span>
                <h3 style={{marginTop:10}}>{asset.title}</h3>
                <p className="muted"><MapPin size={13} style={{verticalAlign:"-2px"}}/> {asset.location}</p>
                <p className="muted"><CalendarDays size={13} style={{verticalAlign:"-2px"}}/> {asset.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </>;
}
