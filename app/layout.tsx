import "./globals.css";
import type { Metadata } from "next";
import { LayoutDashboard, FolderKanban, Image as ImageIcon, Search, GitCompareArrows, FileText, Activity, UploadCloud, Microscope, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ImpactLens AI",
  description: "AI-powered impact and sustainability media intelligence platform"
};

const nav = [
  ["/dashboard","Dashboard",LayoutDashboard],
  ["/projects","Projects",FolderKanban],
  ["/media","Media Library",ImageIcon],
  ["/upload","Upload",UploadCloud],
  ["/search","AI Search",Search],
  ["/before-after","Before / After",GitCompareArrows],
  ["/reports","Impact Reports",FileText],
  ["/activity","Activity",Activity],
  ["/evidence-lab","Evidence Lab",Microscope]
] as const;

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <div className="shell">
    <aside className="sidebar">
      <div className="logo">
        <div className="logoMark">IL</div>
        <span>ImpactLens</span>
        <span className="logoMeta">AI</span>
      </div>
      <div className="navLabel">Workspace</div>
      <nav className="nav">
        {nav.map(([href,label,Icon]) => <Link key={href} href={href}><Icon size={16}/><span>{label}</span></Link>)}
      </nav>
      <div className="sidebarBottom">
        <div className="systemCard">
          <div className="systemTop"><span>Evidence engine</span><span className="liveDot"/></div>
          <div className="systemValue"><Sparkles size={13} style={{verticalAlign:"-2px",marginRight:5,color:"var(--accent)"}}/> AI-ready workspace</div>
          <div className="systemHint">Cloudinary intelligence layer</div>
        </div>
      </div>
    </aside>
    <main className="main">{children}</main>
  </div>;
}