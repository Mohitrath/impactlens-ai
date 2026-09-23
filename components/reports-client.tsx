"use client";

import { useState } from "react";
import { Download, FileText, Sparkles, Loader2, Copy, Check } from "lucide-react";

export default function ReportsClient({ items }: { items: any[] }) {
  const projects = Array.from(new Set(items.map((x) => x.project))).filter(Boolean);
  const [project, setProject] = useState(projects[0] || "");
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState("");
  const [campaign, setCampaign] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function generate() {
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Report generation failed.");
      setReport(d.markdown || "");
      setCampaign(d.campaignCopy || "");
    } catch (e: any) {
      setError(e.message || "Report generation failed.");
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!report) return;
    const blob = new Blob([report], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-impact-report.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyCampaign() {
    if (!campaign) return;
    await navigator.clipboard.writeText(campaign);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <>
      <div className="card">
        <div className="formGrid">
          <label>
            Project
            <select
              className="search"
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
                setReport("");
                setCampaign("");
              }}
            >
              {projects.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </label>
          <div style={{ display: "flex", alignItems: "end", gap: 10 }}>
            <button className="btn primary" onClick={generate} disabled={busy || !project}>
              {busy ? <Loader2 className="spin" size={15} /> : <Sparkles size={15} />}
              Generate report
            </button>
            <button className="btn" onClick={download} disabled={!report}>
              <Download size={15} /> Download
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="card section" style={{ borderColor: "#663333" }}>
          <p style={{ color: "#ff9b9b" }}>{error}</p>
        </div>
      )}

      {report ? (
        <div className="detailGrid section">
          <div className="card">
            <div className="sectionHead">
              <div>
                <div className="eyebrow">Generated from live evidence</div>
                <h2>Impact report</h2>
              </div>
              <span className="badge"><FileText size={12} /> Traceable</span>
            </div>
            <pre style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#c9ddd0", marginTop: 18 }}>
              {report}
            </pre>
          </div>
          <div className="card">
            <div className="eyebrow">Campaign-ready copy</div>
            <h2 style={{ marginTop: 10 }}>Story draft</h2>
            <p style={{ lineHeight: 1.8, marginTop: 14 }}>{campaign}</p>
            <button className="btn" style={{ marginTop: 14 }} onClick={copyCampaign}>
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copied" : "Copy story"}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid3 section">
          {[
            ["Executive Summary", "Built from the selected project's live asset inventory."],
            ["Evidence Highlights", "Includes original Cloudinary asset IDs and AI observations when available."],
            ["Campaign Copy", "Creates reusable narrative copy without inventing measured impact."],
          ].map(([title, text]) => (
            <div className="card" key={title}>
              <FileText color="#63e6a3" />
              <h2 style={{ marginTop: 14 }}>{title}</h2>
              <p className="muted">{text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
