import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const { query = "" } = await req.json().catch(() => ({}));
  return NextResponse.json({query, interpretedAs: "semantic visual evidence search", results: []});
}