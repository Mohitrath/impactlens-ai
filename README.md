# ImpactLens AI

AI-Powered Impact & Sustainability Media Platform for Code Cubicle 6.0 — Cloudinary Problem Statement.

## Features

- Cloudinary-ready media ingestion
- Signed Cloudinary uploads
- Cloudinary Analyze API integration
- AI metadata and tagging pipeline
- Project/location/timeline organization
- Semantic media search
- Before/after impact comparison
- AI-generated impact report interface
- Source and transformation traceability
- Responsive competition-ready dashboard

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Cloudinary setup

Add these values to `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_ANALYSIS_MODEL=captioning
```

The upload page uses a server-generated signature so the Cloudinary API secret remains server-side. The selected Cloudinary Analyze model must be enabled in your account.

## Vercel deployment

The repository includes all source files required by the Next.js production build, including `components/uploader.tsx` and `lib/demo-data.ts`.

Configure the Cloudinary variables in Vercel under Project Settings → Environment Variables, then redeploy from the `main` branch.

## Demo flow

1. Dashboard
2. Upload evidence
3. Cloudinary AI analysis
4. Semantic search
5. Before/after comparison
6. Impact report
7. Traceability/activity

## Problem statement alignment

ImpactLens is designed around the Code Cubicle 6.0 Cloudinary challenge: analyze and organize image/video collections, identify project/activity/location signals, compare before/after media, generate visual reports and summaries, support AI-powered metadata and semantic discovery, and preserve traceability to original assets and transformations.

## Security

Never commit `.env.local` or Cloudinary API secrets. Configure credentials through your local environment or Vercel project environment variables.
