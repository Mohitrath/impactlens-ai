import { NextResponse } from "next/server";
import { searchCloudinaryMedia } from "@/lib/cloudinary-data";
export async function POST(req:Request){
 const {query=""}=await req.json().catch(()=>({}));
 try{
  const results=await searchCloudinaryMedia(String(query));
  return NextResponse.json({query,interpretedAs:"Cloudinary evidence search",results});
 }catch(error:any){return NextResponse.json({error:error.message||"Search failed"}, {status:500});}
}