import type { NextConfig } from "next";

// ======================================================
//  next.config.production.ts
//  يُستخدم من ملف prepare-deploy.ps1 و GitHub Actions
//  Static Export → يخرج في مجلد out/
// ======================================================

const nextConfig: NextConfig = {
  // Static HTML export (GitHub Pages)
  output: "export",

  // ضروري لـ GitHub Pages إذا الـ repo اسمه مش الـ username
  // مثال: https://username.github.io/repo-name/
  // basePath: "/repo-name",
  // assetPrefix: "/repo-name/",

  images: {
    unoptimized: true,
  },

  // rewrites لا تعمل مع static export — الـ API URL يجي من env
  // NEXT_PUBLIC_API_URL=https://albaytcharity.kesug.com/api
};

export default nextConfig;
