import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://demo.tasgip.eu";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();
    return [
        { url: BASE, lastModified, priority: 1.0, changeFrequency: "monthly" },
        { url: `${BASE}/backlogs`, lastModified, priority: 0.6, changeFrequency: "monthly" },
        { url: `${BASE}/backlogs/design`, lastModified, priority: 0.5, changeFrequency: "monthly" },
        { url: `${BASE}/backlogs/engineering`, lastModified, priority: 0.5, changeFrequency: "monthly" },
        { url: `${BASE}/backlogs/qa`, lastModified, priority: 0.5, changeFrequency: "monthly" },
    ];
}
