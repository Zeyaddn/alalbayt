export default function LoadingPage() {
  return (
    <div dir="rtl" className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
        <p className="text-sm text-gray-500 dark:text-gray-400">جاري التحميل...</p>
      </div>
    </div>
  )
}
