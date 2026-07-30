"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Smartphone,
  Lock,
} from "lucide-react"

export function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800/80 relative overflow-hidden dir-rtl">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
              <img
                src="/images/logo.jpg"
                alt="جمعية آل البيت الخيرية"
                className="w-14 h-14 rounded-2xl object-cover shadow-lg shadow-emerald-600/20 border border-slate-700"
              />
              <div>
                <h3 className="font-extrabold text-white text-lg ">جمعية آل البيت الخيرية</h3>
                <p className="text-xs text-emerald-400 font-semibold">عونٌ للإنسان وبناءٌ للمجتمع</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              مؤسسة خيرية اجتماعية مشهرة برقم 4582 لسنة 2012، تسعى لتقديم الرعاية المتكاملة للأسر المتعففة وكفالة الأيتام وتنفيذ المشاريع التنموية والخدمات الطبية.
            </p>

            <div className="pt-2 flex items-center space-x-3 space-x-reverse text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مشهرة رسمياً بوزارة التضامن الاجتماعي</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-r-2 border-emerald-500 pr-3">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition">
                  عن الجمعية ورؤيتنا
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-emerald-400 transition">
                  أحدث الأخبار والفعاليات
                </Link>
              </li>
              <li>
                <Link href="/request-help" className="hover:text-emerald-400 transition">
                  تقديم طلب مساعدة للمواطنين
                </Link>
              </li>
              <li>
                <Link href="/zakat" className="hover:text-emerald-400 transition">
                  حاسبة الزكاة الإلكترونية
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Donation Accounts */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-r-2 border-amber-500 pr-3">
              حسابات التبرع الرسمية
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center space-x-3 space-x-reverse">
                <Smartphone className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">فودافون كاش (Vodafone Cash)</span>
                  <span className="font-mono font-bold text-white dir-ltr inline-block">01062989564</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-r-2 border-emerald-500 pr-3">
              تواصل معنا
            </h4>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>اويش الحجر - حي الشيخ ابوغنيم - آل البيت</span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>01062989564</span>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>info@alalbayt-charity.org</span>
              </div>

              <div className="pt-2">
                <Link
                  href="/request-help"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold rounded-xl border border-emerald-500/30 transition text-center"
                >
                  تقديم طلب مساعدة عاجل
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} جمعية آل البيت الخيرية - جميع الحقوق محفوظة.</p>

          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/admin/login" className="hover:text-emerald-400 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>لوحة التحكم الإدارية</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
