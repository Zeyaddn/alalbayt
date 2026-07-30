"use client"

import { useState } from "react"
import { HandHeart, Send, CheckCircle2, ShieldCheck, User, Phone, Home, FileText, Hash, Mail } from "lucide-react"
import { api } from "@/lib/api-client"

export default function RequestHelpPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState("مالي")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState<number | string>("")
  const [address, setAddress] = useState("")

  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg("")
    setSuccessMsg("")

    try {
      await api.submitHelpRequest({
        name,
        phone,
        email,
        type,
        description,
        amount: Number(amount) || undefined,
        address,
      })
      setSuccessMsg("تم استلام طلبك بنجاح، سنتواصل معك قريباً")
      setName("")
      setPhone("")
      setEmail("")
      setDescription("")
      setAmount("")
      setAddress("")
    } catch (err) {
      setErrorMsg("فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 dir-rtl font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto shadow-lg">
          <HandHeart className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          تقديم طلب مساعدة أو دعم رعاية
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          تلتزم جمعية آل البيت الخيرية بدراسة طلبكم بكل أمانة وسرية، وتقديم الدعم الممكن وفق الضوابط الشرعية والاجتماعية.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        {successMsg ? (
          <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-center rounded-2xl space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">تم استلام طلبكم بنجاح</h3>
            <p className="text-sm leading-relaxed max-w-md mx-auto">{successMsg}</p>
            <button
              onClick={() => setSuccessMsg("")}
              className="px-6 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg"
            >
              تقديم طلب آخر
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs rounded-xl text-center">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  الاسم الرباعي *
                </label>
                <div className="relative">
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك كما بالبطاقة"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl pr-10 pl-4 py-3 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  رقم الهاتف *
                </label>
                <div className="relative">
                  <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01062989564"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl pr-10 pl-4 py-3 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl pr-10 pl-4 py-3 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  نوع المساعدة *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 font-bold"
                >
                  <option value="مالي">دعم مالي</option>
                  <option value="غذائي">سلة غذائية</option>
                  <option value="طبي">علاج وطبي</option>
                  <option value="تعليمي">دعم تعليمي</option>
                  <option value="إيجار">دعم إيجار</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                المبلغ المطلوب (ج.م) - اختياري
              </label>
              <input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="مثال: 5000"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                العنوان (اختياري)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="المحافظة - الحي / القرية - الشارع"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                شرح وتفاصيل الحالة *
              </label>
              <textarea
                rows={5}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="يرجى كتابة تفاصيل وضعك الاجتماعي والتحديات التي تواجهها لكي ندرس الطلب بدقة..."
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-4 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>بياناتكم محمية وسرية تماماً</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition disabled:opacity-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "جاري الإرسال..." : "إرسال طلب المساعدة"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
