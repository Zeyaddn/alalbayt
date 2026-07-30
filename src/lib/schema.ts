import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number must be at least 7 digits').max(20),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const donateFormSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least $1').max(1000000),
  type: z.enum(['one-time', 'monthly']),
  campaignId: z.string().optional(),
  donorName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number must be at least 7 digits').max(20).optional(),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  zakat: z.boolean().optional(),
});

export const volunteerFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number must be at least 7 digits').max(20),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  availability: z.string().min(1, 'Please specify your availability'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const newsletterFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().max(100).optional(),
});

export const zakatCalculatorSchema = z.object({
  cash: z.number().min(0).default(0),
  gold: z.number().min(0).default(0),
  silver: z.number().min(0).default(0),
  investments: z.number().min(0).default(0),
  businessAssets: z.number().min(0).default(0),
  debts: z.number().min(0).default(0),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type DonateFormData = z.infer<typeof donateFormSchema>;
export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
export type ZakatCalculatorData = z.infer<typeof zakatCalculatorSchema>;
