"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Heart,
  ArrowLeft,
  ChevronLeft,
  Newspaper,
  HandHeart,
  Send,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react"

import { api, resolveImageUrl } from "@/lib/api-client"

export default function HomePage() {
  const [newsList, setNewsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Donation Modal State
  const [showQuickDonation, setShowQuickDonation] = useState(false)
  const [vodafoneDonorName, setVodafoneDonorName] = useState("")
  const [vodafoneAmount, setVodafoneAmount] = useState<number | string>(100)
  const [vodafoneSubmitting, setVodafoneSubmitting] = useState(false)
  useEffect(() => {
  async function loadData() {
    try {
      const newsRes = await api.getNews()

      console.log("NEWS RESPONSE:", newsRes)

      if (newsRes.data) {
        setNewsList(newsRes.data.slice(0, 3))
      }

    } catch (err) {
      console.error("Error loading home data:", err)
    } finally {
      setLoading(false)
    }
  }

  loadData()
}, [])

  const handleVodafoneDonate = async () => {
    const amount = Number(vodafoneAmount)
    if (!amount || amount <= 0) return

    setVodafoneSubmitting(true)

    const name = vodafoneDonorName || "فاعل خير"

    try {
      await api.submitDonation({ donor_name: name, amount, method: "فودافون_كاش" })
    } catch {}

    await new Promise((r) => setTimeout(r, 2500))

    const msg = encodeURIComponent(
      `اهلا استاذ عبد القادر\nاريد التبرع\nالاسم: ${name}\nالمبلغ: ${amount} ج.م`
    )
    window.open(`https://wa.me/201062989564?text=${msg}`, "_blank")
    setVodafoneSubmitting(false)
  }

  return (
    <div className="space-y-20 pb-20 font-sans dir-rtl">
      {/* SECTION 1: LUXURY HERO BANNER */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-10 pb-20">
        {/* Glow & Blur Background Accents */}
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left / Main Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center space-x-2 space-x-reverse px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs sm:text-sm font-bold shadow-inner">
              <Sparkles className="w-4 h-4" />
              <span>مؤسسة خيرية مشهرة برقم 4582 لسنة 2012</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
              معاً نزرع الخير ونبني <span className="text-emerald-400">مستقبلاً كريماً</span> للأسر المتعففة
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              تسعى جمعية آل البيت الخيرية إلى تقديم الدعم الشامل لكفالة الأيتام، توفير الرعاية الصحية، إطلاق القوافل الغذائية، وتوصيل المياه النقية للقرى والأسر الأكثر احتياجاً.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/request-help"
                className="flex items-center space-x-2 space-x-reverse px-7 py-4 bg-slate-800/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-base rounded-2xl backdrop-blur-md hover:scale-105 transition duration-200"
              >
                <HandHeart className="w-5 h-5 text-amber-400" />
                <span>تقديم طلب مساعدة</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 space-y-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center lg:text-right">
                  <span className="block text-2xl font-black text-white ">— ج.م</span>
                  <span className="text-xs text-slate-400 font-semibold">إجمالي التبرعات</span>
                </div>
                <div className="text-center lg:text-right">
                  <span className="block text-2xl font-black text-emerald-400 ">500+</span>
                  <span className="text-xs text-slate-400 font-semibold">طفل يتيم مكفول</span>
                </div>
                <div className="text-center lg:text-right">
                  <span className="block text-2xl font-black text-amber-400 ">100%</span>
                  <span className="text-xs text-slate-400 font-semibold">شفافية وأمان</span>
                </div>
              </div>


            </div>
          </div>

          {/* Right / Hero Card Display with Personal Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 group">
              <img
                src="/images/1.png"
                alt="رئيس مجلس إدارة جمعية آل البيت الخيرية"
                loading="lazy"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-6 flex flex-col justify-end">
                <span className="px-3 py-1 bg-amber-500/90 text-slate-950 font-bold text-xs rounded-full w-fit mb-2">
                  رئيس مجلس الإدارة
                </span>
                <h3 className="text-xl font-bold text-white mb-1">عبد القادر محمد محمد عبد الباسط</h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  نمد يد العون ونصون كرامة الإنسان — يداً بيد نحو مجتمع متكافل ومستدام.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VODAFONE CASH DONATION CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-red-950 via-red-900 to-rose-950 p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-red-700/60">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Vodafone Hash Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 25px 25px, white 1.5px, transparent 0)`, backgroundSize: '50px 50px' }} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Right Side: Info */}
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white font-bold text-xs">
                <img src="/images/vodafone-cash.png" alt="Vodafone Cash" className="h-5 w-auto object-contain" />
                <span>فودافون كاش</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                تبرع عبر فودافون كاش
              </h2>
              <p className="text-red-200/70 text-sm leading-relaxed">
                حول المبلغ الذي ترغب في التبرع به على الرقم التالي، وسجل بياناتك هنا ليصلك إشعار بالتبرع
              </p>
              <div className="flex items-center gap-4 p-4 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-sm">
                <img src="/images/vodafone-cash.png" alt="Vodafone Cash" className="h-7 w-auto object-contain shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">رقم فودافون كاش</p>
                  <p className="text-2xl sm:text-3xl font-bold font-mono text-red-400 tracking-wider dir-ltr">
                    01062989564
                  </p>
                </div>
              </div>
            </div>

            {/* Left Side: Form */}
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-2xl space-y-5">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-400" />
                <span>سجل بيانات تبرعك</span>
              </h3>
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 text-xs">الاسم بالكامل (اختياري)</label>
                <input
                  type="text"
                  value={vodafoneDonorName}
                  onChange={(e) => setVodafoneDonorName(e.target.value)}
                  placeholder="فاعل خير"
                  className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 text-xs">المبلغ (بالجنيه المصري) *</label>
                <div className="flex gap-2 flex-wrap">
                  {[50, 100, 200, 500, 5000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setVodafoneAmount(amt)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                        Number(vodafoneAmount) === amt
                          ? "bg-red-600 border-red-400 text-white"
                          : "bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      {amt} ج.م
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={vodafoneAmount}
                  onChange={(e) => setVodafoneAmount(e.target.value)}
                  placeholder="مبلغ آخر"
                  className="mt-2 w-full bg-slate-900/80 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition"
                />
              </div>
              <button
                type="button"
                onClick={handleVodafoneDonate}
                disabled={vodafoneSubmitting || !vodafoneAmount || Number(vodafoneAmount) <= 0}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/40 transition flex items-center justify-center gap-2"
              >
                {vodafoneSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>جاري تسجيل التبرع...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>تأكيد التبرع عبر واتساب</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LATEST NEWS & ACTIVITIES (DYNAMIC FROM DB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 space-x-reverse text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Newspaper className="w-5 h-5" />
              <span>متابعة أعمال الجمعية</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              أحدث الأخبار والفعاليات الميدانية
            </h2>
          </div>

          <Link
            href="/news"
            className="inline-flex items-center space-x-2 space-x-reverse text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            <span>عرض قسم الأخبار بالكامل</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        {newsList.length === 0 ? (
          <p className="text-slate-400 text-center py-8">لا يوجد أخبار حالياً</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsList.map((news) => (
              <article
                key={news.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={resolveImageUrl(news.image)}
                    alt={news.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded-full shadow-md">
                    {news.category}
                  </span>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block mb-1">{news.published_at || news.created_at}</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-2 leading-relaxed">
                      {news.summary || news.content}
                    </p>
                  </div>

              <button
                type="button"
                onClick={() => setShowQuickDonation(true)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>تبرع عبر فودافون كاش</span>
              </button>

              <Link
                    href={`/news/${news.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-2 border-t border-slate-100 dark:border-slate-800"
                  >
                    <span>قراءة الخبر بالكامل</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 5: REQUEST HELP BANNER FOR CITIZENS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
            <HandHeart className="w-8 h-8" />
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white ">هل تحتاج إلى مساعدة أو رعاية لأرتك؟</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              تستقبل جمعية آل البيت الخيرية طلبات الدعم المالي والصحي والسلال الغذائية وتكفل الأيتام بكل سرية واحترام لكرامة الإنسان.
            </p>
          </div>

          <div>
            <Link
              href="/request-help"
              className="inline-flex items-center space-x-2 space-x-reverse px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base rounded-2xl shadow-xl transition"
            >
              <Send className="w-5 h-5" />
              <span>تقديم طلب مساعدة الآن</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DONATION MODAL DIALOG */}
      {showQuickDonation ? (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 my-8 dir-rtl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <img src="/images/vodafone-cash.png" alt="Vodafone Cash" className="h-7 w-auto object-contain" />
                <h3 className="text-lg font-bold text-white ">تبرع عبر فودافون كاش</h3>
              </div>
              <button
                onClick={() => setShowQuickDonation(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleVodafoneDonate() }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">اسم المتبرع (اختياري)</label>
                  <input
                    type="text"
                    value={vodafoneDonorName}
                    onChange={(e) => setVodafoneDonorName(e.target.value)}
                    placeholder="فاعل خير"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">مبلغ التبرع (بالجنيه المصري) *</label>
                  <div className="flex gap-2 flex-wrap">
                    {[50, 100, 200, 500, 5000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setVodafoneAmount(amt)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                          Number(vodafoneAmount) === amt
                            ? "bg-emerald-600 border-emerald-400 text-white"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {amt} ج.م
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={vodafoneAmount}
                    onChange={(e) => setVodafoneAmount(e.target.value)}
                    placeholder="مبلغ آخر"
                    className="mt-2 w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl text-[11px] text-slate-400">
                  <p>رقم فودافون كاش للجمعية: <span className="text-emerald-400 font-bold">01062989564</span></p>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowQuickDonation(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-semibold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={vodafoneSubmitting || !vodafoneAmount || Number(vodafoneAmount) <= 0}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/30 disabled:opacity-50 flex items-center gap-2"
                  >
                    {vodafoneSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>جاري التسجيل...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>تأكيد التبرع عبر واتساب</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

