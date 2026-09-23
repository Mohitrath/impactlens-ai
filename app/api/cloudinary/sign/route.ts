import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET});
export async function POST(req:Request){
 const {project="Unassigned",location="",activity="",tags=""}=await req.json().catch(()=>({}));
 const cloudName=process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,apiKey=process.env.CLOUDINARY_API_KEY,apiSecret=process.env.CLOUDINARY_API_SECRET;
 if(!cloudName||!apiKey||!apiSecret)return NextResponse.json({error:"Cloudinary environment variables are missing."},{status:500});
 const timestamp=Math.floor(Date.now()/1000);
 const safeProject=String(project).trim().replace(/[^a-zA-Z0-9 _-]/g,"").replace(/\s+/g,"-").slice(0,80)||"Unassigned";
 const folder=`impactlens/evidence/${safeProject}`;
 const context=`project=${project}|location=${location}|activity=${activity}|title=${project} evidence`;
 const tagString=String(tags).split(",").map((x:string)=>x.trim()).filter(Boolean).join(",");
 const params:any={folder,timestamp,context}; if(tagString)params.tags=tagString;
 const signature=cloudinary.utils.api_sign_request(params,apiSecret);
 return NextResponse.json({cloudName,apiKey,timestamp,folder,context:params.context,tags:tagString,signature});
}