import "./globals.css";
import type { Metadata } from "next";
import { LayoutDashboard, FolderKanban, Image as ImageIcon, Search, GitCompareArrows, FileText, Activity, UploadCloud } from "lucide-react";
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
  ["/activity","Activity",Activity]
] as const;

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <div className="shell">
    <aside className="sidebar">
      <div className="logo"><div className="logoMark">IL</div><span>ImpactLens</span></div>
      <nav className="nav">
        {nav.map(([href,label,Icon]) => <Link key={href} href={href}><Icon size={17}/><span>{label}</span></Link>)}
      </nav>
    </aside>
    <main className="main">{children}</main>
  </div>;
}