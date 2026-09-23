"use client";
import { useState } from "react";
import { Loader2, MessageCircle, Sparkles } from "lucide-react";

export default function EvidenceAsk({ assetId }: { assetId: string }) {
  const [question, setQuestion] = useState("What project-relevant evidence is visibly present in this asset?");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function ask() {
    if (!question.trim()) return;
    setBusy(true); setError(""); setAnswer("");
    try {
      const r = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assetId, question }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Question failed.");
      setAnswer(d.answer || "No answer returned.");
    } catch (e: any) {
      setError(e.message || "Question failed.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="card" style={{ marginTop: 18 }}>
    <div className="sectionHead">
      <h2><MessageCircle size={18} style={{ verticalAlign: "middle" }} /> Ask this evidence</h2>
      <span className="badge"><Sparkles size={12}/> AI Vision</span>
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
      <input className="search" value={question} onChange={e => setQuestion(e.target.value)} onKeyDown={e => { if (e.key === "Enter") ask(); }} />
      <button className="btn primary" onClick={ask} disabled={busy}>{busy ? <Loader2 className="spin" size={15}/> : <Sparkles size={15}/>} Ask</button>
    </div>
    {error && <p style={{ color: "#ff9b9b", marginTop: 12 }}>{error}</p>}
    {answer && <div className="card" style={{ marginTop: 14, background: "#10261a" }}><div className="eyebrow">Traceable AI answer</div><p style={{ lineHeight: 1.7, whiteSpace: "pre-wrap", marginTop: 8 }}>{answer}</p><p className="muted" style={{ marginTop: 10 }}>Answer generated from this Cloudinary asset ID: {assetId}</p></div>}
  </div>;
}