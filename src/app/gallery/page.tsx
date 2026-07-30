import { Image as ImageIcon, Camera } from "lucide-react"

export default function GalleryPage() {
  const galleryItems = [
    {
      title: "توزيع السلال الغذائية للأسر المتعففة",
      category: "سلات غذائية",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    },
    {
      title: "القافلة الطبية المجانية للعيون والجراحة",
      category: "خدمات طبية",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80",
    },
    {
      title: "توزيع الحقائب والمستلزمات الدراسية للأيتام",
      category: "كفالة أيتام",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    },
    {
      title: "حفر وتوصيل آبار مياه الشرب النقية",
      category: "سقيا الماء",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=1200&q=80",
    },
    {
      title: "تجهيز الأجهزة الكهربائية للفتيات اليتيمات",
      category: "تيسير زواج",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80",
    },
    {
      title: "فحوصات مجانية للأطفال بالمركز الطبي",
      category: "رعاية طبية",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=1200&q=80",
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 dir-rtl font-sans">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-600 dark:text-emerald-400 font-bold text-xs">
          <Camera className="w-4 h-4" />
          <span>التوثيق الميداني للخير</span>
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          معرض الصور والأنشطة الميدانية
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          وثائق مصورة لعمليات التوزيع والأنشطة الإنسانية والميدانية لجمعية آل البيت الخيرية.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 relative"
          >
            <div className="h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="text-xs px-3 py-1 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-bold rounded-full border border-emerald-500/20 inline-block">
                {item.category}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base ">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
