import Link from "next/link"

export default function NotFoundPage() {
  return (
    <div dir="rtl" className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-bold text-emerald-600 dark:text-emerald-400">٤٠٤</div>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">الصفحة غير موجودة</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link href="/" className="mt-6 inline-block rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700">
        العودة للرئيسية
      </Link>
    </div>
  )
}
