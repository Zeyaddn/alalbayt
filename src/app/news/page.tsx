"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Newspaper, ArrowLeft, Search, Eye, Calendar, ChevronLeft, Sparkles } from "lucide-react"
import { api, resolveImageUrl } from "@/lib/api-client"

export default function NewsListPage() {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")

  useEffect(() => {
    api.getNews()
      .then((data) => {
        if (data.data) setNews(data.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const categories = ["الكل", "مشاريع جديدة", "خدمات طبية", "كفالة أيتام", "أنشطة ترفيهية", "عام"]

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === "الكل" || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.summary || "").toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 dir-rtl font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-600 dark:text-emerald-400 font-bold text-xs">
          <Sparkles className="w-4 h-4" />
          <span>المركز الإعلامي للجمعية</span>
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          أحدث الأخبار والفعاليات
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          تابع آخر أنشطة الجمعية الميدانية وإنجازاتها في خدمة المجتمع
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في الأخبار..."
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl pr-10 pl-4 py-2 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Newspaper className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">لم نجد أخبار تطابق البحث</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredNews.map((item, i) => (
            <article
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex flex-col md:flex-row group"
            >
              <div className={`relative w-full md:w-2/5 lg:w-1/2 min-h-[250px] md:min-h-[320px] overflow-hidden bg-slate-100 dark:bg-slate-800 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                <img
                  src={resolveImageUrl(item.image)}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full absolute inset-0 object-cover group-hover:scale-105 transition duration-700"
                />
                <span className="absolute top-4 right-4 px-3.5 py-1.5 bg-emerald-600/90 text-white font-bold text-xs rounded-full shadow-lg backdrop-blur-sm z-10">
                  {item.category}
                </span>
              </div>

              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.published_at || item.created_at}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{item.views || 0} مشاهدة</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {item.summary || item.content}
                </p>

                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition pt-2 w-fit"
                >
                  <span>اقرأ الخبر كامل</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
