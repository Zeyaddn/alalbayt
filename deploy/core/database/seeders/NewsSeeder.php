<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::create([
            'title' => 'حملة توزيع 100 وجبة في أويش الحجر',
            'slug' => '100-meal-distribution',
            'summary' => 'تم توزيع 100 وجبة ساخنة على الأسر المحتاجة في منطقة أويش الحجر.',
            'content' => 'في إطار جهود جمعية آل البيت الخيرية المستمرة، تم تنظيم حملة توزيع 100 وجبة ساخنة على الأسر المحتاجة في منطقة أويش الحجر والقرى المجاورة. وقد لاقت الحملة استحساناً كبيراً من الأهالي.',
            'category' => 'مساعدات غذائية',
            'published_at' => now(),
            'featured' => true,
        ]);

        News::create([
            'title' => 'ختام مشروع كسوة الشتاء بنجاح',
            'slug' => 'winter-clothing-success',
            'summary' => 'تم توزيع 30 كسوة شتوية على الأسر الأكثر احتياجاً.',
            'content' => 'اختتمت جمعية آل البيت الخيرية مشروع كسوة الشتاء لهذا العام، حيث تم توزيع 30 كسوة شتوية على الأسر الأكثر احتياجاً في المنطقة.',
            'category' => 'مساعدات موسمية',
            'published_at' => now()->subDays(7),
            'featured' => true,
        ]);
    }
}
