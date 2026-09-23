import Link from "next/link";
import { ArrowLeft, CalendarDays, MapPin, Tag, ExternalLink, FileImage, Database } from "lucide-react";
import { getCloudinaryAsset } from "@/lib/cloudinary-data";
import EvidenceAsk from "@/components/evidence-ask";

export default async function MediaView({searchParams}:{searchParams:Promise<{id?:string}>}) {
  const params = await searchParams;
  const asset = params.id ? await getCloudinaryAsset(params.id) : null;
  if (!asset) return <div className="card"><Link href="/media" className="backLink"><ArrowLeft size={15}/> Back to media</Link><h1 style={{marginTop:20}}>Asset not found</h1><p className="muted">Connect Cloudinary credentials and open an asset that exists in your account.</p></div>;
  return <>
    <div className="topbar">
      <div><Link href="/media" className="backLink"><ArrowLeft size={15}/> Back to media</Link><div className="eyebrow" style={{marginTop:18}}>Evidence detail</div><h1>{asset.title}</h1><p className="muted">{asset.project} · {asset.location}</p></div>
      <a className="btn primary" href={asset.src} target="_blank" rel="noreferrer"><ExternalLink size={15}/> Open original</a>
    </div>
    <div className="detailGrid">
      <div className="card detailHero">{asset.resource_type==="video"?<video src={asset.src} controls playsInline style={{width:"100%",borderRadius:18}}/>:<img src={asset.src} alt={asset.title}/>}</div>
      <div className="card">
        <div className="eyebrow">Asset intelligence</div>
        <h2 style={{marginTop:8}}>{asset.score ? `${asset.score}% AI confidence` : "AI confidence not scored"}</h2>
        <div className="detailList">
          <div><CalendarDays size={15}/><span><b>Date</b><small>{asset.date}</small></span></div>
          <div><MapPin size={15}/><span><b>Location</b><small>{asset.location}</small></span></div>
          <div><FileImage size={15}/><span><b>Type</b><small>{asset.resource_type} · {asset.format || "unknown"}</small></span></div>
          <div><Database size={15}/><span><b>Asset ID</b><small>{asset.asset_id}</small></span></div>
        </div>
        <div className="eyebrow" style={{marginTop:22}}>Tags</div>
        <div className="pillRow">{(asset.tags||[]).map(t=><span className="badge" key={t}><Tag size={11}/>{t}</span>)}</div>
        <div className="eyebrow" style={{marginTop:22}}>Context</div>
        <pre className="jsonBox">{JSON.stringify(asset.metadata,null,2)}</pre>
      </div>
    </div>
    <EvidenceAsk assetId={asset.asset_id} />
  </>;
}
