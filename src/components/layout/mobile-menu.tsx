"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Menu } from "lucide-react"
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-white transition hover:bg-white/10" aria-label="القائمة">
        <Menu size={22} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-[70] flex w-full max-w-xs flex-col bg-white shadow-xl dark:bg-gray-950">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">آل</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{SITE_NAME}</span>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800" aria-label="إغلاق">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link key={item.titleAr} href={item.href || "#"} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300">
                    {item.titleAr}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-800">
              <Link href="/contact" onClick={() => setOpen(false)} className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700">
                تواصل معنا
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
