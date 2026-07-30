"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Newspaper,
  ClipboardList,
  PlusCircle,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react"
import { api, resolveImageUrl } from "@/lib/api-client"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    newsCount: 0,
    pendingRequestsCount: 0,
    totalDonationsAmount: 0,
  })
  const [recentNews, setRecentNews] = useState<any[]>([])
  const [recentRequests, setRecentRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [newsRes, reqRes, donRes] = await Promise.all([
          api.getNews(),
          api.getHelpRequests(),
          api.getDonations(),
        ])

        const news: any[] = newsRes.data || []
        const requests: any[] = reqRes.data || []
        const donations: any[] = donRes.data || []

        const pending = requests.filter((r: any) => r.status === "pending").length
        const totalAmount = donations.reduce((sum: number, d: any) => sum + Number(d.amount), 0)

        setStats({
          newsCount: news.length,
          pendingRequestsCount: pending,
          totalDonationsAmount: totalAmount,
        })

        setRecentNews(news.slice(0, 3))
        setRecentRequests(requests.slice(0, 4))
      } catch (err) {
        console.error("Error loading dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 dir-rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white">لوحة التحكم</h2>
        <p className="text-sm text-slate-400 mt-1">متابعة الأخبار والمشاريع وطلبات المساعدة</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <Newspaper className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">الأخبار</span>
            <h3 className="text-xl font-bold text-white mt-0.5">{stats.newsCount}</h3>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">بانتظار المراجعة</span>
            <h3 className="text-xl font-bold text-amber-400 mt-0.5">{stats.pendingRequestsCount}</h3>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400">التبرعات</span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {stats.totalDonationsAmount.toLocaleString("en-US")} ج.م
            </h3>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/news"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>إضافة خبر</span>
        </Link>
        <Link
          href="/admin/requests"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-medium text-sm transition"
        >
          <ClipboardList className="w-4 h-4" />
          <span>مراجعة الطلبات</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white">أحدث الأخبار</h3>
            </div>
            <Link href="/admin/news" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
              <span>عرض الكل</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentNews.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">لا يوجد أخبار</p>
            ) : (
              recentNews.map((news: any) => (
                <div
                  key={news.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition"
                >
                  <img src={resolveImageUrl(news.image)} alt={news.title} loading="lazy" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-white truncate">{news.title}</h4>
                    <span className="text-xs text-slate-400">{news.category} · {news.published_at}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white">أحدث طلبات المساعدة</h3>
            </div>
            <Link href="/admin/requests" className="text-xs text-amber-400 hover:underline flex items-center gap-1">
              <span>إدارة الطلبات</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentRequests.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">لا يوجد طلبات</p>
            ) : (
              recentRequests.map((req: any) => (
                <div key={req.id} className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white text-sm">{req.name}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                        req.status === "pending"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : req.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {req.status === "pending" ? "قيد المراجعة" : req.status === "approved" ? "تم القبول" : "مرفوض"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">{req.description}</p>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>{req.phone}</span>
                    <span>{req.created_at}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
