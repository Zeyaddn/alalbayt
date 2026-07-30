import NewsDetailClient from "./news-detail-client";

import { api } from "@/lib/api-client";

export async function generateStaticParams() {
  try {
    const res = await api.getNews();

    if (!res?.data || res.data.length === 0) {
      return [{ id: '1' }];
    }

    return res.data.map((item: any) => ({
      id: String(item.slug || item.id),
    }));
  } catch (error) {
    // Return a fallback so static export doesn't fail when API is down
    return [{ id: '1' }];
  }
}

export const dynamicParams = false;


export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <NewsDetailClient id={id} />;
}