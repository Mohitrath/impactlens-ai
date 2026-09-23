import "server-only";

type CloudinaryResource = {
  asset_id: string;
  public_id: string;
  resource_type: "image" | "video" | string;
  type?: string;
  format?: string;
  created_at?: string;
  width?: number;
  height?: number;
  bytes?: number;
  secure_url?: string;
  url?: string;
  tags?: string[];
  context?: Record<string, string> | { custom?: Record<string, string> };
  asset_folder?: string;
  display_name?: string;
};

export type ImpactMedia = CloudinaryResource & {
  title: string;
  project: string;
  location: string;
  activity: string;
  date: string;
  score: number;
  src: string;
  metadata: Record<string, string>;
};

const cloud = () => ({
  name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});

export function cloudinaryConfigured() {
  const c = cloud();
  return Boolean(c.name && c.key && c.secret);
}

function authHeader() {
  const c = cloud();
  return "Basic " + Buffer.from(`${c.key}:${c.secret}`).toString("base64");
}

function customContext(context: CloudinaryResource["context"]): Record<string, string> {
  if (!context) return {};
  if ("custom" in context && context.custom) return context.custom;
  return context as Record<string, string>;
}

function normalize(r: CloudinaryResource): ImpactMedia {
  const context = customContext(r.context);
  const tags = r.tags || [];
  const project = context.project || r.asset_folder?.split("/").pop() || "Unassigned";
  const location = context.location || "Unknown location";
  const activity = context.activity || tags[0] || "Field evidence";
  const date = r.created_at
    ? new Date(r.created_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown date";
  const score = Number(context.ai_confidence || 0);

  return {
    ...r,
    title: context.title || r.display_name || r.public_id.split("/").pop() || "Untitled evidence",
    project,
    location,
    activity,
    date,
    score,
    src: r.secure_url || r.url || "",
    metadata: context,
  };
}

async function admin(path: string, init?: RequestInit) {
  const c = cloud();
  if (!c.name || !c.key || !c.secret) return null;

  const response = await fetch(`https://api.cloudinary.com/v1_1/${c.name}${path}`, {
    ...init,
    headers: {
      Authorization: authHeader(),
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error?.message || "Cloudinary Admin API request failed");
  }
  return data;
}

export async function getCloudinaryMedia(limit = 100): Promise<ImpactMedia[]> {
  if (!cloudinaryConfigured()) return [];

  const params = new URLSearchParams({
    max_results: String(Math.min(limit, 500)),
    direction: "desc",
    tags: "true",
    context: "true",
    fields:
      "public_id,asset_id,resource_type,type,format,created_at,width,height,bytes,secure_url,url,tags,context,asset_folder,display_name",
  });

  const [images, videos] = await Promise.all([
    admin(`/resources/image/upload?${params}`),
    admin(`/resources/video/upload?${params}`),
  ]);

  return [...(images?.resources || []), ...(videos?.resources || [])]
    .sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)))
    .map(normalize);
}

export async function getCloudinaryAsset(assetId: string): Promise<ImpactMedia | null> {
  if (!cloudinaryConfigured()) return null;

  const data = await admin(
    `/resources/by_asset_ids?asset_ids[]=${encodeURIComponent(assetId)}&tags=true&context=true&metadata=true`
  );
  const resource = data?.resources?.[0];
  return resource ? normalize(resource) : null;
}

export async function visualSearchCloudinaryMedia(query: string): Promise<ImpactMedia[]> {
  if (!cloudinaryConfigured() || !query.trim()) return [];

  try {
    const data = await admin(
      `/resources/visual_search?text=${encodeURIComponent(query)}&max_results=30`
    );
    return (data?.resources || []).map(normalize);
  } catch {
    return [];
  }
}

export async function searchCloudinaryMedia(query: string): Promise<ImpactMedia[]> {
  const visual = await visualSearchCloudinaryMedia(query);
  if (visual.length) return visual;

  const all = await getCloudinaryMedia(500);
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return all.slice(0, 30);

  return all
    .map((item) => {
      const haystack = [
        item.title,
        item.project,
        item.location,
        item.activity,
        ...(item.tags || []),
        ...Object.values(item.metadata || {}),
      ]
        .join(" ")
        .toLowerCase();

      const hits = terms.filter((term) => haystack.includes(term)).length;
      return { item, hits };
    })
    .filter((x) => x.hits > 0)
    .sort((a, b) => b.hits - a.hits || b.item.score - a.item.score)
    .map((x) => ({
      ...x.item,
      score: Math.min(
        99,
        Math.max(60, Math.round((x.hits / terms.length) * 100))
      ),
    }))
    .slice(0, 30);
}

export async function analyzeCloudinaryAsset(
  assetId: string,
  prompts: string[] = [],
  model = "ai_vision_general"
) {
  const c = cloud();
  if (!c.name || !c.key || !c.secret || !assetId) {
    throw new Error("Cloudinary AI configuration or asset ID is missing.");
  }

  const endpoint = `https://api.cloudinary.com/v2/analysis/${c.name}/analyze/${model}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: { asset_id: assetId },
      ...(prompts.length ? { prompts: prompts.slice(0, 10) } : {}),
    }),
    cache: "no-store",
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        "Cloudinary AI analysis failed. Enable the required AI add-on."
    );
  }
  return data;
}

export function analysisText(data: any): string {
  const responses = data?.data?.analysis?.responses;
  if (Array.isArray(responses)) {
    return responses
      .map((item: any) => item?.value)
      .filter(Boolean)
      .join("\n");
  }
  return String(data?.data?.analysis?.caption || data?.data?.analysis?.description || "");
}

export async function updateCloudinaryContext(
  assetId: string,
  context: Record<string, string>
) {
  if (!cloudinaryConfigured()) return null;

  const data = new URLSearchParams();
  for (const [key, value] of Object.entries(context)) {
    data.append(`context[${key}]`, value);
  }

  return admin(`/resources/${encodeURIComponent(assetId)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data.toString(),
  });
}
