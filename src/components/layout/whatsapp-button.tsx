"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "201062989564"

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:bg-green-600 hover:shadow-xl hover:-translate-y-0.5 hover:scale-110"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="h-7 w-7 fill-white" />
    </a>
  )
}
