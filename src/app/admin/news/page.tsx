"use client"

import { useEffect, useState, useRef } from "react"
import {
  Newspaper,
  Plus,
  Trash2,
  Edit,
  Upload,
  X,
  Eye,
  Star,
  ImageIcon,
  FileImage,
  Loader2,
} from "lucide-react"
import { api, resolveImageUrl } from "@/lib/api-client"
import { compressImage, formatFileSize } from "@/lib/image-utils"

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("مشاريع جديدة")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [oldImageUrl, setOldImageUrl] = useState("")
  const [localPreview, setLocalPreview] = useState("")
  const [featured, setFeatured] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [message, setMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadNews = async () => {
    setLoading(true)
    try {
      const data = await api.getNews()
      if (data.data) setNewsList(data.data)
    } catch (error) {
      console.error("Failed to load news:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [])

  const openAddModal = () => {
    setEditingNewsId(null)
    setTitle("")
    setCategory("مشاريع جديدة")
    setSummary("")
    setContent("")
    setImageUrl("")
    setOldImageUrl("")
    setLocalPreview("")
    setFeatured(false)
    setUploadProgress(0)
    setIsModalOpen(true)
  }

  const openEditModal = (item: any) => {
    setEditingNewsId(item.id)
    setTitle(item.title)
    setCategory(item.category || "مشاريع جديدة")
    setSummary(item.summary || "")
    setContent(item.content)
    setImageUrl(item.image)
    setOldImageUrl(item.image)
    setFeatured(Boolean(item.featured))
    setUploadProgress(0)
    setIsModalOpen(true)
  }

  const processFile = async (file: File) => {
    if (!file) return

    const preview = URL.createObjectURL(file)
    setLocalPreview(preview)
    setUploadingImage(true)
    setUploadProgress(0)

    try {
      const originalSize = formatFileSize(file.size)
      const compressed = await compressImage(file)
      const compressedSize = formatFileSize(compressed.size)

      const data = await api.uploadWithProgress(
        compressed,
        (pct) => setUploadProgress(pct),
        editingNewsId ? oldImageUrl : undefined
      )

      if (data.url) {
        setImageUrl(data.url)
      }
    } catch (err) {
      alert("حدث خطأ أثناء رفع الصورة")
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    if (e.target) e.target.value = ""
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) processFile(file)
  }

  const removeImage = () => {
    setImageUrl("")
    setLocalPreview("")
    setUploadProgress(0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage("")

    const payload = {
      title,
      category,
      summary: summary || title,
      content,
      image: imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
      featured,
    }

    try {
      if (editingNewsId) {
        await api.updateNews(editingNewsId, payload)
      } else {
        await api.createNews(payload)
      }
      setIsModalOpen(false)
      loadNews()
    } catch (err: any) {
      setMessage(err.message || "فشل الاتصال بالسيرفر")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذا الخبر؟")) return

    try {
      await api.deleteNews(id)
      loadNews()
    } catch (err) {
      alert("حدث خطأ أثناء الحذف")
    }
  }

  return (
    <div className="space-y-6 dir-rtl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Newspaper className="w-7 h-7 text-emerald-400" />
            <span>إدارة الأخبار والأنشطة</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">إضافة وتحديث أخبار الجمعية والصور المصاحبة لها</p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center space-x-2 space-x-reverse px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-emerald-600/30"
        >
          <Plus className="w-5 h-5" />
          <span>إضافة خبر جديد</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : newsList.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl">
          <Newspaper className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">لا يوجد أخبار حالياً، قم بنشر الخبر الأول</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col group hover:border-slate-700 transition"
            >
              <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                <img src={resolveImageUrl(item.image)} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span className="absolute top-3 right-3 px-3 py-1 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold rounded-full">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>متميز</span>
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white line-clamp-2 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{item.summary || item.content}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>{item.published_at || item.created_at}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{item.views || 0}</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button onClick={() => openEditModal(item)} className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition" title="تعديل الخبر">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition" title="حذف الخبر">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">{editingNewsId ? "تعديل الخبر الحالي" : "إضافة خبر جديد"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            {message && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-xl text-center">{message}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">عنوان الخبر الرئيسي *</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثال: افتتاح الفرع الجديد وتوزيع السلال الغذائية..." className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">التصنيف</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500">
                    <option value="مشاريع جديدة">مشاريع جديدة</option>
                    <option value="خدمات طبية">خدمات طبية</option>
                    <option value="كفالة أيتام">كفالة أيتام</option>
                    <option value="أنشطة ترفيهية">أنشطة ترفيهية</option>
                    <option value="عام">عام</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-sm font-semibold text-slate-200">تثبيت كخبر متميز بالرئيسية</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">صورة الخبر</label>
                <div className="space-y-3">
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 w-full py-8 border-2 border-dashed rounded-xl cursor-pointer text-sm font-semibold transition ${
                      dragOver
                        ? 'bg-emerald-900/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700 hover:border-emerald-500/50 text-slate-200'
                    }`}
                  >
                    {uploadingImage ? (
                      <>
                        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                        <span>جاري ضغط ورفع الصورة... {uploadProgress}%</span>
                        {uploadProgress > 0 && (
                          <div className="w-48 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <FileImage className="w-8 h-8 text-emerald-400" />
                        <span>اختر صورة من جهازك أو اسحبها هنا</span>
                        <span className="text-xs text-slate-500">يدعم JPG, PNG, WebP, GIF — سيتم تحويلها تلقائياً إلى WebP</span>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} disabled={uploadingImage} className="hidden" />
                  </div>

                  {(localPreview || imageUrl) && (
                    <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group/preview">
                      <img src={localPreview || imageUrl} alt="معاينة" loading="lazy" className="w-full h-full object-cover" />
                      {!uploadingImage && (
                        <button type="button" onClick={removeImage} className="absolute top-2 left-2 p-1.5 bg-red-600/80 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover/preview:opacity-100 transition text-xs">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">ملخص قصير</label>
                <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="موجز سريع يظهر في الكروت بالصفحة الرئيسية" className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">تفاصيل المحتوى الكامل *</label>
                <textarea rows={5} required value={content} onChange={(e) => setContent(e.target.value)} placeholder="اكتب المحتوى التفصيلي للخبر هنا..." className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500" />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3 space-x-reverse">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl">إلغاء</button>
                <button type="submit" disabled={submitting} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-600/30 disabled:opacity-50">
                  {submitting ? "جاري الحفظ..." : "حفظ الخبر"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
