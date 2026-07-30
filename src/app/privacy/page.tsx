import { Lock, Shield, Eye, FileText, Phone } from "lucide-react"
import { CONTACT_INFO, WHATSAPP_NUMBER } from "@/lib/constants"

export default function PrivacyPage() {
  return (
    <div dir="rtl">
      <section className="bg-gradient-to-b from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-5">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">سياسة الخصوصية</h1>
          <p className="mx-auto mt-3 max-w-xl text-emerald-100">خصوصيتكم مسؤوليتنا</p>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-10 shadow-sm dark:border-gray-800 dark:bg-gray-800">
            <div className="flex items-start gap-3 mb-6 rounded-xl bg-emerald-50 p-5 dark:bg-emerald-950/30">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                جميع البيانات المرسلة عبر موقعنا أو عبر قنوات التواصل تُعامل بسرية تامة ولا يتم مشاركتها مع أي طرف ثالث.
              </p>
            </div>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  التزامنا بالسرية
                </h3>
                <p className="leading-relaxed">
                  نؤمن بأن حفظ كرامة الإنسان جزء أساسي من رسالتنا، لذلك نتعامل مع جميع البيانات والمعلومات بسرية تامة، ولا يتم نشر أي صور أو أسماء أو معلومات شخصية إلا بعد الحصول على موافقة صريحة من أصحابها.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  كيفية استخدام بياناتك
                </h3>
                <p className="leading-relaxed">
                  تُستخدم بياناتك فقط لغرض معالجة طلبك أو تواصلك معنا. لا نبيع ولا نشارك ولا نؤجر بياناتك لأي جهة أخرى.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  حقوقك
                </h3>
                <p className="leading-relaxed">
                  لك الحق في طلب حذف أي بيانات تخزنها لدينا في أي وقت، وذلك بالتواصل معنا عبر البريد الإلكتروني أو الهاتف.
                </p>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  تواصل معنا بشأن الخصوصية
                </h3>
                <p className="leading-relaxed">
                  إذا كانت لديك أي استفسارات حول سياسة الخصوصية، لا تتردد في التواصل معنا عبر واتساب على العدد{" "}
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline hover:text-emerald-700 dark:text-emerald-400">
                    {CONTACT_INFO.phone}
                  </a>{" "}
                  أو عبر البريد الإلكتروني{" "}
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-emerald-600 underline hover:text-emerald-700 dark:text-emerald-400">
                    {CONTACT_INFO.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">خصوصيتكم مسؤوليتنا 🌿</p>
          </div>
        </div>
      </section>
    </div>
  )
}
