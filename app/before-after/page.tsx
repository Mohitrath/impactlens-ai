import { getCloudinaryMedia } from "@/lib/cloudinary-data";
import { media as demo } from "@/lib/demo-data";
import BeforeAfterClient from "@/components/before-after-client";
export default async function BeforeAfter(){const live=await getCloudinaryMedia(100);const items=live.length?live:demo;return <><div className="topbar"><div><div className="eyebrow">Visual change detection</div><h1>Before / After</h1><p className="muted">{live.length?"Compare live Cloudinary evidence across project phases.":"Demo comparison — upload live evidence to activate real comparisons."}</p></div></div><BeforeAfterClient items={items}/></>;}
