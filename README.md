# 🌱 ImpactLens AI

> **AI-Powered Impact & Sustainability Media Intelligence Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media%20Intelligence-3448C5?logo=cloudinary)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://vercel.com/)

ImpactLens AI transforms field photos and videos into **searchable, traceable, AI-analyzed evidence** for NGOs, governments, sustainability teams, and impact-driven organizations.

Built for **Code Cubicle 6.0 — Cloudinary Problem Statement 02**.

---

## 🖥️ Product Screenshots

### Impact Intelligence Dashboard

<p align="center">
  <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80" alt="Sustainability and renewable-energy evidence" width="900"/>
</p>

### Project & Evidence Workspace

<p align="center">
  <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80" alt="Environmental restoration evidence" width="900"/>
</p>

> The repository's UI is designed around the same visual evidence workflow shown in the dashboard and project screens: projects, media, locations, timelines, AI insights, and impact reporting.

---

## 🌍 Visual Evidence Gallery

ImpactLens is designed for real-world sustainability evidence such as renewable energy, environmental restoration, water access, infrastructure, and community programs.

<p align="center">
  <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=700&q=80" width="31%" alt="Solar energy"/>
  <img src="https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=700&q=80" width="31%" alt="Water and flood evidence"/>
  <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80" width="31%" alt="Environmental restoration"/>
</p>


---

## 🧭 Quick Navigation

**[Overview](#-impactlens-ai)** · **[Experience](#-product-experience)** · **[Features](#-core-features)** · **[Architecture](#-architecture)** · **[Setup](#️-getting-started)** · **[Demo](#-recommended-demo)** · **[Roadmap](#-roadmap)**

---

## 🎨 Product Experience

ImpactLens is designed as an **evidence command center**, not a traditional file manager.

| Experience | What it does |
|---|---|
| 🟢 **Live Dashboard** | Gives teams an at-a-glance view of evidence volume, projects, AI insights, and traceability |
| 🗂️ **Project Workspaces** | Groups media around real initiatives instead of isolated files |
| 🧠 **AI Evidence Layer** | Turns visual content into searchable signals and metadata |
| 🗺️ **Context View** | Connects evidence to location, activity, and timeline |
| 🔍 **Semantic Discovery** | Finds relevant evidence from natural-language intent |
| 🆚 **Change Studio** | Makes before/after comparisons easy to understand |
| 📑 **Story Builder** | Converts evidence into impact-ready narratives and reports |

### Signature UI Pattern

```text
┌──────────────────────────────────────────────────────────────┐
│  IMPACTLENS                              AI EVIDENCE CENTER  │
├───────────────┬──────────────────────────────────────────────┤
│ Dashboard     │  PROJECT IMPACT                               │
│ Projects      │  ┌────────┐ ┌────────┐ ┌────────┐            │
│ Media         │  │ 1,284  │ │   24   │ │  397   │            │
│ Upload        │  │ Assets │ │Projects│ │Insights│            │
│ AI Search     │  └────────┘ └────────┘ └────────┘            │
│ Before/After  │                                               │
│ Reports       │  Recent Evidence  →  AI Signals →  Actions   │
│ Activity      │                                               │
└───────────────┴──────────────────────────────────────────────┘
```

---

## ⚡ What Makes ImpactLens Different?

### 01 — Evidence-First AI

Instead of generating isolated AI text, the product keeps the **original media asset at the center of the workflow**.

### 02 — Storytelling + Intelligence

The same evidence can move from:

**raw upload → AI understanding → project context → comparison → report**

without leaving the platform.

### 03 — Traceability by Design

Every insight is intended to remain connected to its source media so teams can inspect the evidence behind a conclusion.

### 04 — Built for Visual Programs

The experience is optimized around image/video-heavy programs such as restoration, infrastructure, water access, renewable energy, and community development.

---

## 📡 End-to-End Intelligence Pipeline

```text
┌─────────────┐
│ FIELD TEAM  │
└──────┬──────┘
       │ photos / videos
       ▼
┌─────────────┐
│ CLOUDINARY  │──────► original asset + delivery URL
└──────┬──────┘
       ▼
┌─────────────┐
│ AI ANALYSIS │──────► captions / tags / visual signals
└──────┬──────┘
       ▼
┌─────────────┐
│ EVIDENCE DB │──────► project / activity / location / time
└──────┬──────┘
       ▼
┌─────────────────────┐
│ IMPACT WORKSPACE    │
│ search • compare    │
│ review • report     │
└──────┬──────────────┘
       ▼
┌─────────────────────┐
│ DECISION-READY      │
│ IMPACT STORY        │
└─────────────────────┘
```

---

## 🧩 Feature Modules

### 🟩 Evidence Inbox
A focused landing zone for newly uploaded field media, processing status, and AI enrichment.

### 🟦 Project Intelligence
Project-level views combine media, milestones, locations, activities, and generated insights.

### 🟪 Semantic Search
Natural-language discovery helps users ask for evidence by **meaning**, not just filename.

### 🟨 Change Detection Workspace
A visual comparison surface for understanding how a site, project, or activity changes over time.

### 🟥 Impact Story Builder
A reporting layer designed to turn evidence into concise, presentation-ready impact narratives.

---

## 📊 Impact Metrics

The interface is structured around metrics that matter to evidence teams:

| Metric | Meaning |
|---|---|
| **Assets Analyzed** | Volume of media processed by the platform |
| **Active Projects** | Current initiatives represented in the workspace |
| **AI Insights** | Generated observations, tags, captions, or signals |
| **Traceability** | Share of insights that remain linked to source evidence |
| **Evidence Coverage** | Media available across projects, locations, and timelines |
| **Change Signals** | Detected visual differences between project stages |

> These are product concepts for the dashboard; production values should come from the application's persistent data layer.

---

## 🔐 Security & Trust

ImpactLens follows a security-conscious media workflow:

- 🔒 Cloudinary API secrets stay on the server.
- 🪪 Upload signatures are generated by a Next.js server route.
- 🌐 Browser uploads go directly to Cloudinary after signing.
- 🧾 Original asset identifiers can be retained for traceability.
- 🚫 Secrets should never be committed to GitHub.
- 🧱 Production deployments should add authentication, authorization, rate limiting, and persistent audit logs.

---

## 🧪 Demo Storyline

For a strong hackathon presentation, tell one continuous story:

```text
PROBLEM
  ↓
"Teams have thousands of field photos but cannot quickly find
the evidence they need."
  ↓
UPLOAD
  ↓
"Upload a project photo/video."
  ↓
UNDERSTAND
  ↓
"AI extracts useful visual context."
  ↓
ORGANIZE
  ↓
"Evidence is connected to a project and timeline."
  ↓
DISCOVER
  ↓
"Ask for the evidence you need in natural language."
  ↓
COMPARE
  ↓
"Show how the project changed."
  ↓
REPORT
  ↓
"Turn the evidence into an impact story."
```

---

## 💡 Example AI Queries

Try queries such as:

- `Show solar infrastructure installed after the baseline survey.`
- `Find water-access evidence from the Kheri project.`
- `Show restoration activity near wetlands.`
- `Find before-and-after images for this project.`
- `Show community infrastructure completed this quarter.`
- `Find images containing visible construction progress.`

---

## 🏗️ Production-Ready Expansion

The current prototype can evolve into a larger platform by adding:

**Data Layer**
- PostgreSQL + Prisma
- Asset/project relationships
- Persistent AI-analysis records
- Audit history

**Intelligence Layer**
- Embeddings + vector retrieval
- Project clustering
- Automatic activity classification
- Timeline inference
- Multi-modal search

**Operations Layer**
- Organizations and teams
- Role-based permissions
- Processing queues
- Batch ingestion
- Observability and failure recovery

**Reporting Layer**
- PDF generation
- Branded reports
- Executive dashboards
- Shareable evidence links
- Campaign-ready content generation

---

## 🧱 Design Principles

> **Evidence before narrative.**  
> **Context before conclusions.**  
> **Traceability before automation.**  
> **Visual clarity before complexity.**

These principles shape the product's interface and data workflow.


---

## ✨ Why ImpactLens?

Field teams continuously capture photos and videos, but raw media is difficult to organize, search, compare, and convert into meaningful impact evidence.

**ImpactLens creates a complete workflow:**

```
Field Media
    ↓
Cloudinary Upload
    ↓
AI Media Analysis
    ↓
Metadata & Visual Signals
    ↓
Projects / Locations / Timeline
    ↓
Semantic Discovery
    ↓
Before ↔ After Comparison
    ↓
Impact Reports & Stories
```

---

## 🚀 Core Features

### 📤 Intelligent Media Ingestion
Upload project photos and videos through a Cloudinary-backed pipeline with secure server-generated signatures.

### 🤖 AI-Powered Media Analysis
Analyze uploaded assets using Cloudinary's analysis capabilities to extract useful visual information and generate AI-assisted metadata.

### 🏷️ Smart Metadata & Organization
Organize evidence around projects, activities, locations, timelines, visual signals, and AI-generated metadata.

### 🔎 AI-Powered Search
Search the media library using natural-language concepts instead of relying only on filenames or folders.

Example:

> **"Show environmental restoration activities near the river."**

### 🆚 Before / After Impact Analyzer
Compare project evidence across time and surface measurable visual changes.

### 📊 Impact Reports
Turn analyzed media into presentation-ready impact summaries containing observations, visual evidence, project metrics, before/after comparisons, and source traceability.

### 🔗 Traceable Evidence
Maintain a connection between generated insights and original media assets.

### 📈 Impact Dashboard
A centralized dashboard provides visibility into assets analyzed, active projects, AI insights, evidence traceability, and recent activity.

---

## 🧠 Architecture

```mermaid
flowchart LR
    U[Field User] --> UI[ImpactLens Web App]
    UI --> UP[Secure Upload API]
    UP --> C[Cloudinary]
    C --> A[AI Analysis]
    A --> M[Metadata & Visual Signals]
    M --> D[ImpactLens Dashboard]

    D --> S[Semantic Search]
    D --> B[Before / After Analyzer]
    D --> R[Impact Reports]

    C -. original asset .-> T[Traceability]
    A -. analysis result .-> T
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 |
| Language | TypeScript |
| UI | React + Custom CSS |
| Media Platform | Cloudinary |
| AI Analysis | Cloudinary Analyze API |
| API | Next.js Route Handlers |
| Deployment | Vercel |
| Source Control | GitHub |

---

## 📁 Project Structure

```
impactlens-ai/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts
│   │   ├── cloudinary/sign/route.ts
│   │   └── search/route.ts
│   ├── dashboard/
│   ├── media/
│   ├── projects/
│   ├── upload/
│   ├── search/
│   ├── before-after/
│   ├── reports/
│   ├── activity/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── uploader.tsx
├── lib/
│   └── demo-data.ts
├── .env.example
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🔴 Live Data Mode

ImpactLens is now wired to use **Cloudinary as the live media data source** instead of relying only on hard-coded demo cards.

When the Cloudinary credentials are configured, the application can:

- Load real image/video assets from Cloudinary
- Derive projects from uploaded asset context
- Search live evidence, including Cloudinary visual search when enabled
- Open individual real assets by Cloudinary asset ID
- Persist project/location/activity/tags during upload
- Persist AI analysis metadata back to Cloudinary context
- Build before/after comparisons from real assets
- Generate downloadable project reports from live evidence
- Build the activity feed from real asset creation timestamps

Without credentials, the UI intentionally falls back to demo data so the interface remains usable.

### Required Vercel environment variables

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_ANALYSIS_MODEL=captioning
```

> Never commit `CLOUDINARY_API_SECRET` to GitHub. Add it through Vercel Project Settings → Environment Variables.

---

## 🔐 Cloudinary Integration

ImpactLens uses a **server-generated signed upload flow**:

```text
Browser
  │
  │ 1. Request signature
  ▼
Next.js /api/cloudinary/sign
  │
  │ 2. Generate secure signature
  ▼
Browser
  │
  │ 3. Signed upload
  ▼
Cloudinary
  │
  │ 4. Asset URL + asset ID
  ▼
Next.js /api/analyze
  │
  │ 5. AI analysis
  ▼
ImpactLens
```

The Cloudinary API secret remains server-side and is never exposed to the browser.

---

## 🧩 Live Feature Map

| Feature | Live data source | Action |
|---|---|---|
| Dashboard | Cloudinary resources | Metrics + recent evidence |
| Projects | Asset context | Open project workspace |
| Media Library | Cloudinary resources | Search + open asset |
| Upload | Cloudinary signed upload | Store project metadata |
| AI Search | Cloudinary visual search / metadata fallback | Natural-language discovery |
| Before / After | Cloudinary assets | Select real evidence pair |
| Impact Reports | Cloudinary asset metadata | Generate/download Markdown report |
| Activity | Cloudinary creation timestamps | Live evidence timeline |
| Evidence Detail | Cloudinary asset ID | Inspect original + context |

---

## ⚙️ Getting Started

### 1. Clone

```bash
git clone https://github.com/Mohitrath/impactlens-ai.git
cd impactlens-ai
```

### 2. Install

```bash
npm install
```

### 3. Configure Cloudinary

Create `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_ANALYSIS_MODEL=captioning
```

### 4. Run

```bash
npm run dev
```

Open `http://localhost:3000`.

### 5. Production

```bash
npm run build
npm start
```

---

## ☁️ Vercel Deployment

1. Import the GitHub repository into Vercel.
2. Select **Next.js**.
3. Add the Cloudinary environment variables.
4. Deploy.
5. Test **Upload → Analyze**.

### Required variables

| Variable | Required |
|---|:---:|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ |
| `CLOUDINARY_API_KEY` | ✅ |
| `CLOUDINARY_API_SECRET` | ✅ |
| `CLOUDINARY_ANALYSIS_MODEL` | ✅ |

> **Security:** Never commit `.env.local`, API keys, or API secrets to GitHub.

---

## 🎯 Code Cubicle 6.0 Alignment

ImpactLens addresses the Cloudinary challenge through:

- Large image/video collection analysis
- Project and activity identification
- Location and timeline organization
- AI-powered metadata
- Semantic media discovery
- Before/after comparison
- Visual impact reporting
- Original-asset traceability

### Expected Outcome

```
Raw Field Media
      ↓
Structured Evidence
      ↓
Searchable Intelligence
      ↓
Visual Impact Analysis
      ↓
Compelling Impact Stories
```

---

## 🧪 Recommended Demo

**01 — Dashboard** → Show the impact overview.

**02 — Upload** → Upload field evidence.

**03 — Cloudinary** → Show the asset being stored.

**04 — AI Analysis** → Display generated analysis and metadata.

**05 — Search** → Search for a visual concept.

**06 — Before / After** → Compare project stages.

**07 — Impact Report** → Present an evidence-backed summary.

**08 — Traceability** → Connect the insight to the original asset.

---

## 🌍 Example Use Cases

| Domain | Example |
|---|---|
| 🌳 Environmental Restoration | Track vegetation and restoration progress |
| 🏗️ Infrastructure | Document construction and project stages |
| 💧 Water & Sanitation | Organize field evidence |
| 🏘️ Community Development | Structure community-project media |
| 🏛️ Government Programs | Build visual evidence for initiatives |
| 🤝 NGO Reporting | Convert field media into impact stories |

---

## 🔮 Roadmap

- [ ] PostgreSQL + Prisma persistence
- [ ] Multi-tenant organizations
- [ ] Role-based access control
- [ ] Advanced semantic vector search
- [ ] Automatic project clustering
- [ ] Geospatial media maps
- [ ] Timeline reconstruction
- [ ] Automated video summarization
- [ ] PDF impact-report generation
- [ ] Campaign/social-media content generation
- [ ] Batch media processing
- [ ] Advanced impact KPIs

---

## 🏆 Hackathon Value Proposition

**ImpactLens AI is not just a media library.**

It turns:

> **Media → Evidence → Intelligence → Impact Story**

The platform combines Cloudinary's media infrastructure with AI-assisted analysis and a purpose-built impact intelligence interface to make field evidence easier to organize, discover, compare, and communicate.

---

## 🔗 Links

- **GitHub:** https://github.com/Mohitrath/impactlens-ai
- **Cloudinary:** https://cloudinary.com/
- **Vercel:** https://vercel.com/

---

## 👥 Team

Built for **Code Cubicle 6.0**.

> Turning field evidence into measurable impact with AI + Cloudinary.

---

## 📄 License

This project is provided for hackathon and educational purposes.

<div align="center">

### 🌱 ImpactLens AI

**AI-powered media intelligence for real-world impact**

⭐ Star the repository if you like the project!

</div>
