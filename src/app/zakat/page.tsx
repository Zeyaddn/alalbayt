"use client"

import { useState } from "react"
import Link from "next/link"
import { Calculator, Coins, DollarSign, Heart, ShieldCheck, Info } from "lucide-react"

export default function ZakatPage() {
  const [cashAmount, setCashAmount] = useState<number | string>("")
  const [goldGrams, setGoldGrams] = useState<number | string>("")
  const [silverGrams, setSilverGrams] = useState<number | string>("")
  const [businessAssets, setBusinessAssets] = useState<number | string>("")

  // Standard constants in EGP
  const goldPricePerGram = 3550 // 21k estimate
  const silverPricePerGram = 45
  const nisabGoldGrams = 85
  const nisabThreshold = nisabGoldGrams * goldPricePerGram // ~301,750 EGP

  const totalWealth =
    Number(cashAmount || 0) +
    Number(goldGrams || 0) * goldPricePerGram +
    Number(silverGrams || 0) * silverPricePerGram +
    Number(businessAssets || 0)

  const isNisabReached = totalWealth >= nisabThreshold
  const zakatDue = isNisabReached ? totalWealth * 0.025 : 0

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10 dir-rtl font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto shadow-lg">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          حاسبة الزكاة الشرعية الإلكترونية
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          «وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ» - احسب زكاة مالك والذهب والفضة وتجارتك بدقة وطهّر مالك بالخير.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            حساب مدخراتك وممتلكاتك
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                1. الأموال النقيدة والمدخرات البنكية (ج.م)
              </label>
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                placeholder="أدخل إجمالي المبالغ المدخرة"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                2. الذهب المعدّ للادخار والاستثمار (جرام)
              </label>
              <input
                type="number"
                value={goldGrams}
                onChange={(e) => setGoldGrams(e.target.value)}
                placeholder="عدد الجرامات (سعر الجرام ~ 3,550 ج.م)"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                3. الفضة الادخارية (جرام)
              </label>
              <input
                type="number"
                value={silverGrams}
                onChange={(e) => setSilverGrams(e.target.value)}
                placeholder="عدد جرامات الفضة"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                4. عروض التجارة والبضائع المعدة للبيع (ج.م)
              </label>
              <input
                type="number"
                value={businessAssets}
                onChange={(e) => setBusinessAssets(e.target.value)}
                placeholder="قيمة التجارة الحالية"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Calculation Result Column */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold border-b border-slate-800 pb-3">نتيجة الحساب</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">إجمالي الوعاء الزكوي:</span>
              <span className="font-bold text-white text-sm">
                {totalWealth.toLocaleString("ar-EG")} ج.م
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">نصاب الزكاة الحالي (85 جرام ذهب):</span>
              <span className="font-mono text-amber-400 text-xs">
                {nisabThreshold.toLocaleString("ar-EG")} ج.م
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 block">حالة النصاب والشرع:</span>
              {totalWealth === 0 ? (
                <p className="text-xs text-slate-400">أدخل قيم ممتلكاتك أعلاه لحساب الزكاة</p>
              ) : isNisabReached ? (
                <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>بلغ المال النصاب وتجب فيه الزكاة (2.5%)</span>
                </p>
              ) : (
                <p className="text-xs text-amber-400 font-bold flex items-center gap-1">
                  <Info className="w-4 h-4" />
                  <span>لم يبلغ النصاب بعد (أقل من قيمة 85 جرام ذهب)</span>
                </p>
              )}
            </div>

            {/* Total Zakat Output */}
            <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2">
              <span className="text-xs text-emerald-300 font-bold">مبلغ الزكاة الواجب إخراجه (2.5%)</span>
              <div className="text-3xl font-black text-emerald-400 ">
                {zakatDue.toLocaleString("ar-EG")} ج.م
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm rounded-xl shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>اخراج الزكاة والتبرع للجمعية</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
