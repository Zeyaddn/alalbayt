"use client"

import Link from "next/link"
import { AlertTriangle } from "lucide-react"

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div dir="rtl" className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
        <AlertTriangle className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">عذراً، حدث خطأ</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">نأسف للخطأ غير المتوقع. حاول مرة أخرى.</p>
      <div className="mt-6 flex gap-4">
        <button onClick={reset} className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700">
          حاول مرة أخرى
        </button>
        <Link href="/" className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
          الصفحة الرئيسية
        </Link>
      </div>
    </div>
  )
}
