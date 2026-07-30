import type { NavItem, ContactInfo, FooterSection, SocialLink } from './types';

export const SITE_NAME = 'آل البيت';
export const SITE_NAME_AR = 'جمعية آل البيت الخيرية';
export const SITE_DESCRIPTION = 'جمعية آل البيت الخيرية في أويش الحجر';
export const SITE_DESCRIPTION_AR = 'جمعية آل البيت الخيرية - أويش الحجر - دعم المجتمع باحترام وكرامة';
export const SITE_URL = 'https://ahlalbayt-charity.org';

export const PHONE_NUMBER = '01062989564';
export const PHONE_DISPLAY = '01062989564';
export const WHATSAPP_NUMBER = '201062989564';

export const NAV_ITEMS: NavItem[] = [
  { titleAr: 'الرئيسية', href: '/' },
  { titleAr: 'من نحن', href: '/about' },
  { titleAr: 'الزكاة', href: '/zakat' },
  { titleAr: 'تواصل معنا', href: '/contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'فيسبوك', url: 'https://facebook.com', icon: 'Facebook' },
];

export const CONTACT_INFO: ContactInfo = {
  email: 'ahlalbayt@example.com',
  phone: PHONE_DISPLAY,
  addressAr: 'اويش الحجر - حي الشيخ ابوغنيم - آل البيت',
  hoursAr: 'يومياً من 9 صباحاً حتى 10 مساءً',
};

export const FOOTER_SECTION: FooterSection = {
  aboutAr: 'جمعية آل البيت الخيرية - أويش الحجر - دعم المجتمع باحترام وكرامة. نقدم خدمات متنوعة تشمل المساعدات الغذائية والصحية والتعليمية للأسر المحتاجة.',
  columns: [
    {
      titleAr: 'روابط سريعة',
      links: [
        { labelAr: 'الرئيسية', href: '/' },
        { labelAr: 'من نحن', href: '/about' },
        { labelAr: 'الزكاة', href: '/zakat' },
        { labelAr: 'تواصل معنا', href: '/contact' },
      ],
    },
  ],
  socialLinks: SOCIAL_LINKS,
  copyrightAr: `© ${new Date().getFullYear()} جمعية آل البيت الخيرية - جميع الحقوق محفوظة`,
};

export const THEME_STORAGE_KEY = 'ahlalbayt-theme';
export const ORGANIZATION_NAME = 'عبد القادر محمد محمد عبد الباسط';
export const ORGANIZATION_NAME_TITLE = 'عبد القادر محمد محمد عبد الباسط';
export const ORGANIZATION_OWNER = 'عبد القادر محمد محمد عبد الباسط';
export const LOCATION_NAME = 'اويش الحجر - حي الشيخ ابوغنيم - آل البيت';
export const MAP_LOCATION_URL = 'https://www.google.com/maps/@31.0065651,31.312658,20.75z?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D';

export const HERO_IMAGES = [
  '/images/1.png',
  '/images/2.jpg',
];

export const DONATION_METHODS = [
  {
    titleAr: 'فودافون كاش',
    descAr: 'يمكنك التبرع عبر فودافون كاش برقم',
    detailAr: PHONE_DISPLAY,
    icon: 'Phone',
  },
  {
    titleAr: 'التبرع داخل المقر',
    descAr: 'يمكنك التبرع شخصياً في مقر الجمعية',
    detailAr: 'اويش الحجر - حي الشيخ ابوغنيم - آل البيت',
    icon: 'MapPin',
  },
];