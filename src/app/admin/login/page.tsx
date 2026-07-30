"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, ArrowRight, Eye, EyeOff, HeartHandshake } from "lucide-react"
import { api, setToken } from "@/lib/api-client"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const data = await api.login(email, password)
      setToken(data.token)
      router.push("/admin/dashboard")
    } catch (err: any) {
      setError("الإيميل أو الباسورد غلط")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden dir-rtl">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 overflow-hidden">
            <img src="/images/logo.jpg" alt="شعار الجمعية" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">لوحة تحكم الجمعية</h1>
          <p className="text-slate-400 text-sm">تسجيل الدخول لإدارة الأخبار والأنشطة والطلبات</p>
        </div>

        <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
          <p className="font-semibold">بيانات الدخول مخصصة للمسؤول فقط</p>
          <p>يرجى استخدام بيانات الدخول المقدمة من إدارة الجمعية</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-slate-900/80 border border-slate-700 text-white text-sm rounded-xl pr-12 pl-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full bg-slate-900/80 border border-slate-700 text-white text-sm rounded-xl pr-12 pl-12 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/30 transition duration-200 flex items-center justify-center space-x-2 space-x-reverse disabled:opacity-50"
          >
            {loading ? (
              <span>جاري التحقق...</span>
            ) : (
              <>
                <span>دخول اللوحة</span>
                <ArrowRight className="w-5 h-5 rotate-180" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700/50 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <HeartHandshake className="w-4 h-4 text-emerald-400" />
          <span>جمعية آل البيت الخيرية - جميع الحقوق محفوظة</span>
        </div>
      </div>
    </div>
  )
}
