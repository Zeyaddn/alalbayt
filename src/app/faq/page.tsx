"use client"

import { useState } from "react"
import { ChevronDown, MessageCircle, Phone, HelpCircle } from "lucide-react"
import { CONTACT_INFO, WHATSAPP_NUMBER } from "@/lib/constants"

const faqs = [
  {
    question: "كيف أطلب المساعدة؟",
    answer: "يمكنك التواصل معنا عبر الهاتف أو الواتساب أو تعبئة نموذج طلب المساعدة على الموقع سيتم مراجعته من قبل الفريق المخاص.",
  },
  {
    question: "كيف يتم دراسة الحالات؟",
    answer: "يتم دراسة كل حالة من قبل الفريق المختص بالكامل، مع الحفاظ على السرية الكاملة وعدم الإفصاح عن أي تفاصيل لأطراف ثالثة.",
  },
  {
    question: "هل بياناتي آمنة؟",
    answer: "نعم، جميع بياناتك تُعامل بسرية تامة ولا يتم مشاركتها مع أي طرف ثالث بأي حال من الأحوال.",
  },
  {
    question: "هل يمكن التطوع معكم؟",
    answer: "نعم، نرحب بكل متطوع يرغب في المساهمة. يمكنك التواصل معنا عبر الموقع أو الواتساب للانضمام لفريق العمل.",
  },
  {
    question: "كيف أتواصل مع المؤسسة؟",
    answer: "يمكنك التواصل عبر الهاتف أو الواتساب أو البريد الإلكتروني أو من خلال زيارة مقر المؤسسة في أويش الحجر.",
  },
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <div dir="rtl">
      <section className="bg-gradient-to-b from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-5">
            <HelpCircle className="h-7 w-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">الأسئلة الشائعة</h1>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">إجابات لأكثر الأسئلة شيوعاً</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-gray-100 shadow-sm dark:border-gray-800">
                <button
                  onClick={() => setOpenId(openId === i ? null : i)}
                  className="flex w-full items-center justify-between bg-white px-5 py-4 text-right text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${openId === i ? "rotate-180" : ""}`} />
                </button>
                {openId === i && (
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 text-sm leading-relaxed text-gray-600 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-emerald-50 p-8 text-center dark:bg-emerald-950/30">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">لم تجد إجابتك؟</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">تواصل معنا وسنرد عليك</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a href={`tel:${CONTACT_INFO.phone}`} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700">
                <Phone className="h-4 w-4" />
                {CONTACT_INFO.phone}
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-emerald-600 px-6 py-2.5 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50 dark:hover:bg-emerald-950/30">
                <MessageCircle className="h-4 w-4" />
                واتساب
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
