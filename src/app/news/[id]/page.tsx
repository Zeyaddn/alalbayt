import { api } from "@/lib/api-client";
import NewsDetailClient from "./news-detail-client";

export async function generateStaticParams() {
  try {
    const res = await api.getNews();

    return res.data.map((item: any) => ({
      id: String(item.slug || item.id),
    }));
  } catch {
    return [];
  }
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <NewsDetailClient id={id} />;
}