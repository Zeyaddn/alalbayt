"use client"

import { type ReactNode } from "react"
import { ThemeProvider } from "@/hooks/useTheme"
import { ToastProvider } from "@/components/ui/toast"

export function LayoutProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark">
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  )
}
