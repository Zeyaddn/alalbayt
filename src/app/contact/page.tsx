"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react"
import { api } from "@/lib/api-client"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 dir-rtl font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          تواصل مع إدارة جمعية آل البيت
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          نسعد باستقبال استفساراتكم، مقترحاتكم، وتنسيق التبرعات العينية والمباشرة على مدار الأسبوع.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">أرسل لنا رسالة</h2>

          {sent ? (
            <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-center rounded-2xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">تم إرسال رسالتكم بنجاح</h3>
              <p className="text-xs">سيتواصل معكم ممثل العلاقات العامة في أقرب وقت.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">الاسم *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">رقم الهاتف *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01062989564"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">نص الرسالة *</label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب استفسارك هنا..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl p-4 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الرسالة</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Column */}
        <div className="lg:col-span-5 bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold border-b border-slate-800 pb-3">معلومات الاتصال المباشرة</h2>

          <div className="space-y-5 text-xs text-slate-300">
            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm mb-1">المقر الرئيسي</span>
                <p>اويش الحجر - حي الشيخ ابوغنيم - آل البيت</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm mb-1">أرقام التليفون والواتساب</span>
                <p className="font-mono text-emerald-400 font-bold">01062989564</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm mb-1">البريد الإلكتروني</span>
                <p className="font-mono">info@alalbayt-charity.org</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 space-x-reverse">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm mb-1">مواعيد العمل بالمقر</span>
                <p>يومياً من السبت إلى الخميس: 9:00 صباحاً - 5:00 مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
