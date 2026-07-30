# 🚀 Deploy — جمعية آل البيت

مجلد الـ Deploy يحتوي على قسمين:

```
deploy/
├── core/               ← Laravel backend  (InfinityFree)
├── frontend/           ← Next.js build    (GitHub Pages)
├── core/.env.production← إعدادات production للـ Laravel
└── prepare-deploy.ps1  ← Script التجهيز
```

---

## ⚡ الاستخدام السريع

### تجهيز الكل دفعة واحدة
```powershell
.\deploy\prepare-deploy.ps1
```

### تجهيز الباك إند فقط (بدون بناء الفرونت)
```powershell
.\deploy\prepare-deploy.ps1 -CoreOnly
```

### بناء الفرونت فقط (بدون نسخ الباك إند)
```powershell
.\deploy\prepare-deploy.ps1 -FrontOnly
```

---

## 🔧 قبل التشغيل — خطوة مهمة!

افتح الملف `deploy/core/.env.production` وعدل هذه القيم بمعلومات InfinityFree:

```env
DB_HOST=sql309.infinityfree.com   # من لوحة تحكم InfinityFree
DB_DATABASE=YOUR_DB_NAME           # اسم قاعدة البيانات
DB_USERNAME=YOUR_DB_USERNAME       # اسم المستخدم
DB_PASSWORD=YOUR_DB_PASSWORD       # كلمة المرور
```

---

## 📦 Part 1: رفع الباك إند (InfinityFree)

بعد تشغيل `prepare-deploy.ps1`، الملفات هتبقى في `deploy/core/`.

**خطوات الرفع عبر FTP:**
1. افتح برنامج FTP (مثلاً FileZilla)
2. اتصل بـ InfinityFree
3. ارفع كل محتوى `deploy/core/` إلى مجلد `htdocs/` أو `public_html/`

**بعد الرفع على السيرفر:**
```bash
# من SSH أو File Manager
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
```

---

## 🌐 Part 2: رفع الفرونت إند (GitHub Pages)

### طريقة 1 — GitHub Actions (أوتوماتيك ✅)
الـ workflow موجود في `.github/workflows/deploy-frontend.yml`

**إعداد Secrets في GitHub:**
اذهب إلى `Settings → Secrets and variables → Actions` وأضف:
- `NEXT_PUBLIC_API_URL` = `https://albaytcharity.kesug.com/api`
- `ADMIN_USERNAME` = كلمة مرور الأدمن
- `ADMIN_PASSWORD` = كلمة مرور الأدمن
- `ADMIN_SECRET` = الـ secret UUID
- `STRIPE_SECRET_KEY` = مفتاح Stripe

**تفعيل GitHub Pages:**
`Settings → Pages → Source → GitHub Actions`

### طريقة 2 — رفع يدوي من deploy/frontend/
```powershell
# بعد تشغيل prepare-deploy.ps1
cd deploy\frontend
git init
git remote add origin https://github.com/USERNAME/REPO.git
git checkout -b gh-pages
git add .
git commit -m "deploy frontend"
git push -f origin gh-pages
```

---

## ⚠️ ملاحظات مهمة

- **لا ترفع** ملف `.env` المحلي أو `vendor/` أو `node_modules/`
- **لا ترفع** `database.sqlite` — استخدم MySQL على السيرفر
- الـ `QUEUE_CONNECTION=sync` في production عشان InfinityFree ما بيدعم Queue workers
- الـ `CACHE_STORE=file` و `SESSION_DRIVER=file` لأن InfinityFree ما بيدعم Redis
