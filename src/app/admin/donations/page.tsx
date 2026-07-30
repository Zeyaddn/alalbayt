"use client"

import { useEffect, useState } from "react"
import { DollarSign, CheckCircle2, MessageCircle, Smartphone, XCircle, Trash2, ThumbsDown } from "lucide-react"
import { api } from "@/lib/api-client"

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadDonations = async () => {
    setLoading(true)
    try {
      const data = await api.getDonations()
      if (data.data) setDonations(data.data)
    } catch (err) {
      console.error("Error loading donations:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDonations()
  }, [])

  const totalSum = donations.reduce((acc, d) => acc + Number(d.amount || 0), 0)

  const handleConfirm = async (id: string) => {
    try {
      await api.updateDonation(id, { donor_name: "", phone: "", amount: 0 })
      loadDonations()
    } catch (err) {
      alert("فشل تأكيد التبرع")
    }
  }

  const handleReject = async (id: string) => {
    try {
      await api.updateDonation(id, { donor_name: "", phone: "", amount: 0 })
      loadDonations()
    } catch (err) {
      alert("فشل رفض التبرع")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا التبرع؟")) return
    try {
      await api.deleteDonation(id)
      loadDonations()
    } catch (err) {
      alert("فشل حذف التبرع")
    }
  }

  const methodBadge = (method: string) => (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
      {method || "غير محدد"}
    </span>
  )

  const actionButtons = (item: any) => (
    <button
      type="button"
      onClick={() => handleDelete(item.id)}
      className="p-1.5 text-slate-500 hover:text-red-400 transition"
      title="حذف"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )

  return (
    <div className="space-y-6 dir-rtl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <DollarSign className="w-7 h-7 text-emerald-400" />
            <span>سجل التبرعات الواردة</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            عرض وتتبع جميع مبالغ التبرعات المستلمة لمشاريع الجمعية
          </p>
        </div>

        <div className="bg-emerald-950/80 border border-emerald-500/30 px-6 py-3 rounded-2xl text-emerald-300 font-bold text-lg">
          إجمالي المحصل: {totalSum.toLocaleString("ar-EG")} ج.م
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : donations.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-3xl">
          <DollarSign className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-400 font-medium">لا يوجد تبرعات مسجلة حتى الآن</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm text-slate-300">
              <thead className="bg-slate-800/80 text-xs uppercase text-slate-400 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-bold">اسم المتبرع</th>
                  <th className="px-6 py-4 font-bold">المبلغ</th>
                  <th className="px-6 py-4 font-bold">طريقة الدفع</th>
                  <th className="px-6 py-4 font-bold">ملاحظات</th>
                  <th className="px-6 py-4 font-bold">التاريخ والتوقيت</th>
                  <th className="px-6 py-4 font-bold">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {donations.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 font-bold text-white">{item.donor_name || "متبرع"}</td>
                    <td className="px-6 py-4 font-extrabold text-emerald-400">
                      {item.amount.toLocaleString("ar-EG")} ج.م
                    </td>
                    <td className="px-6 py-4 text-xs">{methodBadge(item.method)}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{item.notes || "—"}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{item.created_at}</td>
                    <td className="px-6 py-4">{actionButtons(item)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
