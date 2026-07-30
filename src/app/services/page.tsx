"use client"

import { Gift, HandHelping, Scale, Shield, Home, Baby, Smile, Heart, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  { icon: Gift, title: "تجهيز العرائس", desc: "نشارك فرحة العرس بأدق التفاصيل لنضمن أن تكتمل فرحة كل عروسين" },
  { icon: HandHelping, title: "المساعدات الإنسانية", desc: "دعم شامل ومستدام للأسر المحتاجة في أويش الحجر والقرى المجاورة" },
  { icon: Scale, title: "سداد الديون", desc: "المساعدة في تخفيف الأعباء المالية عن الأسر المحتاجة" },
  { icon: Shield, title: "دعم العلاج", desc: "توفير الأدوية والمساعدة الطبية للحالات التي تحتاج دعماً" },
  { icon: Home, title: "توزيع المواد الغذائية", desc: "طرود غذائية شهري للأسر المحتاجة لضمان استمرارية الدعم" },
  { icon: Baby, title: "دعم التعليم", desc: "توفير المستلزمات المدرسية ودعم الطلاب المحتاجين" },
  { icon: Smile, title: "كفالة الأيتام", desc: "رعاية شاملة للأيتام من تعليم ومعيشة وصحة" },
  { icon: Heart, title: "رعاية كبار السن", desc: "زيارات دورية ودعم معنوي ومادي لحاجي كبار السن" },
  { icon: Home, title: "ترميم المنازل", desc: "إعادة تأهيل المنازل المتضررة وتوفير احتياجات السكن" },
  { icon: Shield, title: "المساعدات الطارئة", desc: "استجابة سريعة للكوارث والظروف الطارئة" },
  { icon: Smile, title: "دعم ذوي الهمم", desc: "توفير الأدوات الطبية والدعم اللازم لذوي الهمم" },
  { icon: Gift, title: "توزيع الملابس", desc: "توزيع ملابس مستعملة وجديدة على الأسر المحتاجة" },
]

export default function ServicesPage() {
  return (
    <div dir="rtl">
      <section className="bg-gradient-to-b from-emerald-800 to-emerald-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">خدماتنا</h1>
          <p className="mx-auto mt-4 max-w-xl text-emerald-100 text-lg">
            نقدم خدمات متنوعة تخدم فئات مختلفة من المجتمع باحترام وكرامة
          </p>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors dark:bg-emerald-900/30 dark:text-emerald-400">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50 dark:bg-emerald-950/20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">هل تحتاج مساعدة؟</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">تواصل معنا وسنساعدك بكل سرية واحترام</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700"
          >
            تواصل معنا
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
