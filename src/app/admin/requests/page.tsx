"use client"

import { useEffect, useState } from "react"
import { ClipboardList, CheckCircle2, XCircle, Clock, Trash2, Eye, X, Phone, User, Home, Hash, FileText } from "lucide-react"
import { api } from "@/lib/api-client"

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [selectedReq, setSelectedReq] = useState<any | null>(null)
  const [adminNotes, setAdminNotes] = useState("")

  const loadRequests = async () => {
    setLoading(true)
    try {
      const data = await api.getHelpRequests()
      if (data.data) setRequests(data.data)
    } catch (err) {
      console.error("Failed to load requests:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  const handleUpdateStatus = async (id: string, status: string, notes?: string) => {
    try {
      const data = await api.updateHelpRequest(id, { status, notes: notes !== undefined ? notes : adminNotes })
        if (selectedReq && selectedReq.id === id) {
          setSelectedReq(data)
        }
        loadRequests()
    } catch (err) {
      alert("حدث خطأ أثناء التحديث")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت تأكد من حذف هذا الطلب؟")) return
    try {
      await api.deleteHelpRequest(id)
      if (selectedReq?.id === id) setSelectedReq(null)
      loadRequests()
    } catch (err) {
      alert("فشل حذف الطلب")
    }
  }

  const filtered = requests.filter((r) => (filterStatus === "all" ? true : r.status === filterStatus))

  return (
    <div className="space-y-6 dir-rtl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ClipboardList className="w-7 h-7 text-amber-400" />
            <span>إدارة طلبات المساعدة</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            مراجعة طلبات الدعم المالي والصحي والغذائي المقدمة من المواطنين
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterStatus === "all" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            الكل ({requests.length})
          </button>
            <button
              onClick={() => setFilterStatus("قيد_المراجعة")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === "قيد_المراجعة" ? "bg-amber-500 text-slate-950" : "text-amber-400 hover:text-amber-300"
              }`}
            >
              قيد المراجعة ({requests.filter((r) => r.status === "قيد_المراجعة").length})
            </button>
            <button
              onClick={() => setFilterStatus("تمت_الموافقة")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === "تمت_الموافقة" ? "bg-emerald-600 text-white" : "text-emerald-400 hover:text-emerald-300"
              }`}
            >
              المقبولة ({requests.filter((r) => r.status === "تمت_الموافقة").length})
            </button>
            <button
              onClick={() => setFilterStatus("مرفوض")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === "مرفوض" ? "bg-red-600 text-white" : "text-red-400 hover:text-red-300"
              }`}
            >
              المرفوضة ({requests.filter((r) => r.status === "مرفوض").length})
            </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl">
          <ClipboardList className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">لا يوجد طلبات في هذه الحالة حالياً</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-700 transition"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <h3 className="text-lg font-bold text-white">{req.name}</h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold border ${
                      req.status === "قيد_المراجعة"
                        ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                        : req.status === "تمت_الموافقة"
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : "bg-red-500/10 text-red-300 border-red-500/30"
                    }`}
                  >
                    {req.status === "قيد_المراجعة"
                      ? "قيد المراجعة"
                      : req.status === "تمت_الموافقة"
                      ? "تم القبول والدعم"
                      : "مرفوض"}
                  </span>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg">{req.type}</span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{req.description}</p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>الهاتف: {req.phone}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-slate-500" />
                    <span>العنوان: {req.address || "غير محدد"}</span>
                  </span>
                  <span>تاريخ التقديم: {req.created_at}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 space-x-reverse shrink-0">
                <button
                  onClick={() => {
                    setSelectedReq(req)
                    setAdminNotes(req.notes || "")
                  }}
                  className="flex items-center space-x-1.5 space-x-reverse px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition border border-slate-700"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>معاينة التفاصيل</span>
                </button>

                {req.status !== "تمت_الموافقة" && (
                  <button
                    onClick={() => handleUpdateStatus(req.id, "تمت_الموافقة")}
                    className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition"
                    title="موافقة وقبول الطلب"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                )}

                {req.status !== "مرفوض" && (
                  <button
                    onClick={() => handleUpdateStatus(req.id, "مرفوض")}
                    className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition"
                    title="رفض الطلب"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(req.id)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 transition"
                  title="حذف"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details View Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-white">تفاصيل طلب المساعدة المقدم</h3>
              <button onClick={() => setSelectedReq(null)} className="text-slate-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                <div>
                  <span className="text-xs text-slate-400 block">اسم المتقدم</span>
                  <span className="font-bold text-white">{selectedReq.name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">رقم الهاتف</span>
                  <span className="font-bold text-emerald-400">{selectedReq.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">الإيميل</span>
                  <span className="font-mono text-slate-200">{selectedReq.email || "—"}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">المبلغ المطلوب</span>
                  <span className="font-bold text-amber-400">
                    {selectedReq.amount ? `${selectedReq.amount} ج.م` : "غير محدد"}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">العنوان السكني</span>
                <p className="p-3 bg-slate-800 rounded-xl text-slate-200 text-xs">{selectedReq.address}</p>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-1">شرح ومبررات الطلب</span>
                <p className="p-4 bg-slate-800 rounded-2xl text-slate-100 text-xs leading-relaxed">
                  {selectedReq.description}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  ملاحظات الإدارة الداخلية (تظهر للمسؤولين فقط)
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="مثال: تم تسليم المساعدة المالية بتاريخ..."
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleUpdateStatus(selectedReq.id, "تمت_الموافقة")}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
                  >
                    قبول الطلب
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedReq.id, "مرفوض")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl"
                  >
                    رفض الطلب
                  </button>
                </div>

                <button
                  onClick={() => setSelectedReq(null)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
