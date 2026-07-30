export interface NavItem {
  titleAr: string;
  href?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  addressAr: string;
  hoursAr: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface FooterColumn {
  titleAr: string;
  links: { labelAr: string; href: string }[];
}

export interface FooterSection {
  aboutAr: string;
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  copyrightAr: string;
}

export interface FAQ {
  id: string;
  questionAr: string;
  answerAr: string;
  category: string;
}

export interface NewsItem {
  id: string;
  titleAr: string;
  excerptAr: string;
  contentAr: string;
  image: string;
  date: string;
  slug: string;
}

export type Theme = 'light' | 'dark' | 'system';
