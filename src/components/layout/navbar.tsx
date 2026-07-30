"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Heart,
  Phone,
  ShieldCheck,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
} from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (pathname.startsWith("/admin")) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  if (pathname.startsWith("/admin")) {
    return null
  }

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "عن الجمعية", href: "/about" },
    { name: "الأخبار", href: "/news" },
    { name: "طلب مساعدة", href: "/request-help" },
    { name: "حاسبة الزكاة", href: "/zakat" },
    { name: "اتصل بنا", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full font-sans">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <ShieldCheck className="w-3 h-3" />
              <span>مشهرة برقم 4582 لسنة 2012</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a href="tel:01062989564" className="hidden sm:flex items-center gap-1 hover:text-emerald-400">
              <Phone className="w-3 h-3" />
              <span>01062989564</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1 text-amber-400 font-medium">
              <Sparkles className="w-3 h-3" />
              <span>ساهم في كفالة 200 أسرة</span>
            </span>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 border border-slate-700 hover:text-white transition text-[11px]"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>لوحة التحكم</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 shadow-md py-2"
            : "bg-white dark:bg-slate-900 py-3 border-b border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-600/30 shadow-sm group-hover:shadow-md transition">
              <img src="/images/logo.jpg" alt="شعار الجمعية" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                جمعية آل البيت الخيرية
              </h1>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                عونٌ للإنسان وبناءٌ للمجتمع
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-emerald-600 text-white"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>لوحة التحكم</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
