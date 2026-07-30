"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Newspaper,
  HeartHandshake,
  ClipboardList,
  DollarSign,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react"
import { api, removeToken, getToken } from "@/lib/api-client"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    if (pathname === "/admin/login") return

    const token = getToken()
    if (!token) {
      router.push("/admin/login")
      return
    }

    api.getMe()
      .then(() => {
        setIsAuth(true)
      })
      .catch(() => {
        removeToken()
        router.push("/admin/login")
      })
  }, [pathname, router])

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const handleLogout = async () => {
    try {
      await api.logout()
    } catch {}
    removeToken()
    router.push("/admin/login")
  }

  const navItems = [
    { name: "لوحة الأحصائيات", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "إدارة الأخبار", href: "/admin/news", icon: Newspaper },
    { name: "طلبات المساعدة", href: "/admin/requests", icon: ClipboardList },
    { name: "سجل التبرعات", href: "/admin/donations", icon: DollarSign },
  ]

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex dir-rtl">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 right-0 z-50 w-64 bg-slate-900 border-l border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30 shadow-lg shadow-emerald-600/30">
                <img src="/images/logo.jpg" alt="شعار الجمعية" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-white text-base">جمعية آل البيت</h2>
                <span className="text-xs text-emerald-400 font-medium">لوحة الإدارة</span>
              </div>
            </div>
            <button
              className="lg:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center space-x-2 space-x-reverse w-full py-2.5 px-4 text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition"
          >
            <span>زيارة الموقع العام</span>
            <ExternalLink className="w-4 h-4" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 space-x-reverse w-full py-2.5 px-4 text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              className="lg:hidden text-slate-300 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-white hidden sm:block">
              نظام إدارة جمعية آل البيت الخيرية
            </h1>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-slate-300">المسؤول متصل</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
