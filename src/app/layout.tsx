import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { LayoutProviders } from "@/components/layout/layout-providers"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BackToTop } from "@/components/layout/back-to-top"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import "./globals.css"

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "جمعية آل البيت الخيرية | عونٌ للإنسان وبناءٌ للمجتمع",
    template: "%s | جمعية آل البيت الخيرية",
  },
  description:
    "موقع جمعية آل البيت الخيرية الرسمي - كفالة الأيتام، رعاية الأسر المتعففة، القوافل الطبية، وسقيا الماء. تبرع بسهولة وتابع أثر الخير معنا.",
  keywords: ["جمعية خيرية", "آل البيت", "تبرعات", "زكاة", "كفالة يتيم", "مساعدة أسر", "صدقة جارية"],
  authors: [{ name: "جمعية آل البيت الخيرية" }],
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-emerald-600 selection:text-white">
        <LayoutProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </LayoutProviders>
      </body>
    </html>
  )
}
