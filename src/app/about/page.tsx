import { ShieldCheck, HeartHandshake, Award, Users, Target, CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 dir-rtl font-sans">
      {/* Hero Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-600 dark:text-emerald-400 font-bold text-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>مشهرة برقم 4582 لسنة 2012</span>
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          عن جمعية آل البيت الخيرية
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
          مؤسسة خيرية أهلية تسعى لبناء مجتمع متكافل ومستدام من خلال رعاية الأيتام، تمكين الأسر المتعففة، وتقديم الخدمات التنموية والطبية في مختلف ربوع مصر.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">رؤيتنا</h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            أن نكون المؤسسة الخيرية الرائدة في تقديم الخدمات الاجتماعية والإنسانية ذات الأثر المستدام، وتحقيق الكفاية الذاتية للأسر الأكثر احتياجاً برحمة وكرامة.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">رسالتنا</h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
            تقديم برامج الدعم الاجتماعي والطبية والتنموية بشفافية كاملة، واستثمار التبرعات في المكان الأنسب بكفاءة وإشراف شرعي وقانوني محكم.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white">
          قيمنا الجوهرية
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-white text-base ">الشفافية المطلقة</h3>
            <p className="text-xs text-slate-400">تقارير دورية وحسابات موثقة لكل جنيه تبرع</p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-white text-base ">حفظ الكرامة</h3>
            <p className="text-xs text-slate-400">تقديم المساعدة للأسر المتعففة بكل سرية واحترام</p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-white text-base ">الأثر المستدام</h3>
            <p className="text-xs text-slate-400">التركيز على مشاريع السقيا والتعليم والتأهيل</p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-white text-base ">السرعة والاستجابة</h3>
            <p className="text-xs text-slate-400">تغطية الجراحات والقوافل الطبية العاجلة</p>
          </div>
        </div>
      </div>
    </div>
  )
}
