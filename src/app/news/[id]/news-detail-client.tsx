"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Newspaper, Calendar, Eye, User, ArrowRight, Share2, Heart, ChevronLeft } from "lucide-react"
import { api, resolveImageUrl } from "@/lib/api-client"

export default function NewsDetailClient({ id }: { id: string }) {
  const [article, setArticle] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getNewsItem(id)
      .then((data) => setArticle(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 dir-rtl font-sans">
        <div className="text-center space-y-4">
          <Newspaper className="w-16 h-16 text-slate-400 mx-auto" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">الخبر المطلوب غير موجود</h1>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لقائمة الأخبار</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-16 dir-rtl font-sans">
      {/* Hero Image Section - Full Width */}
      <div className="relative w-full h-[50vh] min-h-[350px] max-h-[600px] overflow-hidden bg-slate-900">
        <img
          src={resolveImageUrl(article.image)}
          alt={article.title}
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 right-0 left-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white/70 hover:text-white transition mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>العودة لجميع الأخبار</span>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-6">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.published_at || article.created_at}</span>
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{article.views || 0} مشاهدة</span>
            </span>
            {article.author && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>الناشر: {article.author}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="text-base text-emerald-700 dark:text-emerald-300 font-semibold leading-relaxed border-r-4 border-emerald-500 pr-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              {article.summary}
            </p>
          )}

          {/* Share Button */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div />
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href })
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert("تم نسخ رابط الخبر")
                }
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs transition"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة الخبر</span>
            </button>
          </div>

          {/* Full Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-loose whitespace-pre-line">
            {article.content}
          </div>

          {/* Back Link */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لجميع الأخبار</span>
            </Link>
          </div>
        </div>

        {/* Donate CTA */}
        <div className="mt-8 p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-bold">ساهم معنا في دعم مشاريع الجمعية</h3>
            <p className="text-xs text-slate-300 mt-1">تبرعك يصنع فارقاً حقيقياً في حياة أسرة متعففة</p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>تواصل معنا</span>
          </Link>
        </div>
      </div>
    </div>
  )
}