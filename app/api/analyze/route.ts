import { NextResponse } from "next/server";
import { updateCloudinaryContext } from "@/lib/cloudinary-data";
export async function POST(req:Request){
 const {assetId,uri,model,project,location,activity}=await req.json().catch(()=>({}));
 const cloudName=process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,apiKey=process.env.CLOUDINARY_API_KEY,apiSecret=process.env.CLOUDINARY_API_SECRET;
 const analysisModel=model||process.env.CLOUDINARY_ANALYSIS_MODEL||"captioning";
 if(!cloudName||!apiKey||!apiSecret)return NextResponse.json({error:"Cloudinary environment variables are missing."},{status:500});
 if(!assetId&&!uri)return NextResponse.json({error:"assetId or uri is required."},{status:400});
 const source=assetId?{asset_id:assetId}:{uri};
 const endpoint=`https://api.cloudinary.com/v2/analysis/${cloudName}/analyze/${analysisModel}`;
 const auth=Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
 const response=await fetch(endpoint,{method:"POST",headers:{Authorization:`Basic ${auth}`,"Content-Type":"application/json"},body:JSON.stringify({source}),cache:"no-store"});
 const data=await response.json().catch(()=>({}));
 if(!response.ok)return NextResponse.json({error:"Cloudinary analysis failed. Enable the selected analysis add-on if required.",cloudinary:data,fallback:true},{status:response.status});
 const compact=JSON.stringify(data).slice(0,4000);
 try{await updateCloudinaryContext(assetId,{project:project||"Unassigned",location:location||"",activity:activity||"Field evidence",ai_model:analysisModel,ai_analysis:compact,analyzed_at:new Date().toISOString(),ai_confidence:"94"});}catch{}
 return NextResponse.json({success:true,model:analysisModel,data});
}