"use client";
import { useRef, useState } from "react";
import { CheckCircle2, Loader2, UploadCloud, Sparkles, AlertCircle } from "lucide-react";

type UploadResult = { secure_url:string; public_id:string; asset_id:string; original_filename:string; resource_type:string };

export default function Uploader(){
  const inputRef=useRef<HTMLInputElement>(null);
  const [busy,setBusy]=useState(false);
  const [status,setStatus]=useState("");
  const [error,setError]=useState("");
  const [result,setResult]=useState<UploadResult|null>(null);
  const [analysis,setAnalysis]=useState<any>(null);

  async function upload(file:File){
    setBusy(true); setError(""); setAnalysis(null); setResult(null); setStatus("Preparing secure Cloudinary upload…");
    try{
      const sign=await fetch("/api/cloudinary/sign",{method:"POST"}).then(r=>r.json());
      if(!sign.signature) throw new Error(sign.error||"Could not create upload signature.");
      setStatus("Uploading to Cloudinary…");
      const form=new FormData();
      form.append("file",file); form.append("api_key",sign.apiKey); form.append("timestamp",String(sign.timestamp));
      form.append("folder",sign.folder); form.append("signature",sign.signature);
      const up=await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/auto/upload`,{method:"POST",body:form});
      const data=await up.json();
      if(!up.ok) throw new Error(data.error?.message||"Cloudinary upload failed.");
      setResult(data); setStatus("Uploaded. Running AI analysis…");
      const ar=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({assetId:data.asset_id,uri:data.secure_url})});
      const ad=await ar.json();
      if(ad.success){ setAnalysis(ad); setStatus("AI analysis complete."); }
      else { setStatus("Upload complete; AI analysis needs a Cloudinary analysis add-on."); setAnalysis(ad); }
    }catch(e:any){ setError(e.message||"Something went wrong."); setStatus(""); }
    finally{setBusy(false)}
  }

  return <>
    <div className="uploadZone">
      <div className="uploadIcon">{busy?<Loader2 className="spin"/>:<UploadCloud/>}</div>
      <h2>{busy?"Processing evidence…":"Drop images or videos here"}</h2>
      <p className="muted">Signed upload → Cloudinary → AI analysis</p>
      <button className="btn primary" disabled={busy} onClick={()=>inputRef.current?.click()}>Choose file</button>
      <input ref={inputRef} hidden type="file" accept="image/*,video/*" onChange={e=>e.target.files?.[0]&&upload(e.target.files[0])}/>
    </div>
    {status&&<div className="card" style={{marginTop:14}}><span className="badge"><Sparkles size={12}/>{status}</span></div>}
    {error&&<div className="card" style={{marginTop:14,borderColor:"#663333"}}><span style={{color:"#ff9b9b"}}><AlertCircle size={15} style={{verticalAlign:"middle"}}/> {error}</span></div>}
    {result&&<div className="card" style={{marginTop:14}}><div className="eyebrow">Cloudinary asset</div><h3 style={{marginTop:8}}>{result.original_filename}</h3><p className="muted">{result.resource_type} · {result.public_id}</p><a className="btn" href={result.secure_url} target="_blank">Open original</a></div>}
    {analysis?.data&&<div className="card" style={{marginTop:14}}><div className="eyebrow">AI analysis</div><h2 style={{marginTop:8}}>Cloudinary result</h2><pre style={{whiteSpace:"pre-wrap",color:"#b9d1c1",fontSize:12,marginTop:12}}>{JSON.stringify(analysis.data,null,2)}</pre></div>}
    {analysis?.fallback&&<div className="card" style={{marginTop:14}}><p className="muted">The upload is real and complete. Enable the Cloudinary analysis add-on configured by <code>CLOUDINARY_ANALYSIS_MODEL</code> to activate AI analysis.</p></div>}
  </>
}