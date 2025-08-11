// Types pour les données des formulaires
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'general' | 'volunteer' | 'partnership' | 'media' | 'support' | 'other';
}

export interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  profession: string;
  experience: string;
  motivation: string;
  availability: string;
  skills: string[];
  languages: string[];
}

export interface ReportFormData {
  title: string;
  description: string;
  year: string;
  category: string;
  file?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

export interface NewsFormData {
  title: string;
  description: string;
  content: string;
  image: string;
  published: boolean;
}

export interface PartnerFormData {
  name: string;
  acronym?: string;
  logo: string;
  description: string;
  website: string;
  category: 'international' | 'national' | 'technical' | 'other';
  collaboration?: string;
}

// Types pour les configurations d'emails
export interface EmailConfig {
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  template: string;
  data: any;
}

export interface NotificationRecipients {
  admin: string[];
  hr: string[];
  partnerships: string[];
  communications: string[];
  subscribers: string[];
}

// Types pour les templates d'emails
export interface EmailTemplate {
  subject: {
    fr: string;
    en: string;
    ar: string;
  };
  body: {
    fr: string;
    en: string;
    ar: string;
  };
}

export interface EmailTemplates {
  contact: {
    notification: EmailTemplate;
    confirmation: EmailTemplate;
  };
  volunteer: {
    notification: EmailTemplate;
    confirmation: EmailTemplate;
  };
  report: {
    notification: EmailTemplate;
  };
  news: {
    notification: EmailTemplate;
    publication: EmailTemplate;
  };
  partner: {
    notification: EmailTemplate;
  };
}