import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/constants"

export const dynamic = "force-static"

const staticRoutes = [
  { url: "", priority: 1.0, changeFrequency: "daily" as const },
  { url: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { url: "/zakat", priority: 0.7, changeFrequency: "monthly" as const },
  { url: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { url: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
