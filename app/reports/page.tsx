import { getCloudinaryMedia } from "@/lib/cloudinary-data";
import { media as demo } from "@/lib/demo-data";
import ReportsClient from "@/components/reports-client";
export default async function Reports(){const live=await getCloudinaryMedia(100);return <><div className="topbar"><div><div className="eyebrow">Impact storytelling</div><h1>Impact Reports</h1><p className="muted">{live.length?"Generate reports from live Cloudinary evidence.":"Demo reports — connect Cloudinary to generate from live assets."}</p></div></div><ReportsClient items={live.length?live:demo}/></>;}
