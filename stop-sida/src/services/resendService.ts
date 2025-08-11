import { 
  ContactFormData, 
  VolunteerFormData, 
  ReportFormData, 
  NewsFormData, 
  PartnerFormData,
  EmailTemplate 
} from '../types/email';
import { NOTIFICATION_RECIPIENTS, DEV_NOTIFICATION_RECIPIENTS, EMAIL_TEMPLATES } from './emailConfig';

// Configuration API backend
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:3001' : '');

// Email expéditeur selon l'environnement
const FROM_EMAIL = import.meta.env.MODE === 'development' 
  ? 'noreplyong@noriseapp.com'  // Email de test pour dev
  : import.meta.env.VITE_FROM_EMAIL || 'notifications@stop-sida.org';

// Destinataires selon l'environnement
const getRecipients = () => {
  return import.meta.env.MODE === 'development' 
    ? DEV_NOTIFICATION_RECIPIENTS 
    : NOTIFICATION_RECIPIENTS;
};

// Utilitaire pour remplacer les variables dans un template
function processTemplate(template: string, data: Record<string, any>): string {
  let processed = template;
  
  // Remplacer les variables simples {{variable}}
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    processed = processed.replace(regex, data[key] || '');
  });
  
  // Traiter les conditions simples {{#if condition}}...{{/if}}
  processed = processed.replace(/{{#if\s+(\w+)}}(.*?){{\/if}}/gs, (match, condition, content) => {
    return data[condition] ? content : '';
  });
  
  // Traiter les conditions else {{#if condition}}...{{else}}...{{/if}}
  processed = processed.replace(/{{#if\s+(\w+)}}(.*?){{else}}(.*?){{\/if}}/gs, (match, condition, ifContent, elseContent) => {
    return data[condition] ? ifContent : elseContent;
  });
  
  return processed;
}

// Fonction générique d'envoi d'email
async function sendEmail(
  to: string[],
  subject: string,
  html: string,
  cc?: string[],
  bcc?: string[]
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log(`📧 Envoi d'email vers: ${to.join(', ')}`);
    console.log(`📝 Sujet: ${subject}`);
    console.log(`📤 Expéditeur: ${FROM_EMAIL}`);
    
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        cc,
        bcc,
        subject,
        html,
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('❌ Erreur API:', result.error);
      return { success: false, error: result.error };
    }
    
    console.log('✅ Email envoyé avec succès:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}

// Fonction pour obtenir le bon template selon la langue
function getTemplate(template: EmailTemplate, language: 'fr' | 'en' | 'ar' = 'fr') {
  return {
    subject: template.subject[language],
    body: template.body[language]
  };
}

// === FONCTIONS D'ENVOI PAR TYPE DE FORMULAIRE ===

export async function sendContactNotification(
  formData: ContactFormData, 
  language: 'fr' | 'en' | 'ar' = 'fr'
): Promise<{ success: boolean; error?: string }> {
  try {
    const recipients = getRecipients();
    const template = getTemplate(EMAIL_TEMPLATES.contact.notification, language);
    const confirmationTemplate = getTemplate(EMAIL_TEMPLATES.contact.confirmation, language);
    
    const emailData = {
      ...formData,
      date: new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'ar-MA'),
    };
    
    // Email de notification à l'équipe
    const notificationHtml = processTemplate(template.body, emailData);
    const notificationResult = await sendEmail(
      recipients.admin,
      template.subject,
      notificationHtml,
      formData.type === 'partnership' ? recipients.partnerships : undefined
    );
    
    // Email de confirmation à l'utilisateur
    const confirmationHtml = processTemplate(confirmationTemplate.body, emailData);
    const confirmationResult = await sendEmail(
      [formData.email],
      confirmationTemplate.subject,
      confirmationHtml
    );
    
    return {
      success: notificationResult.success && confirmationResult.success,
      error: notificationResult.error || confirmationResult.error
    };
    
  } catch (error) {
    console.error('❌ Erreur envoi contact:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}

export async function sendVolunteerNotification(
  formData: VolunteerFormData, 
  language: 'fr' | 'en' | 'ar' = 'fr'
): Promise<{ success: boolean; error?: string }> {
  try {
    const recipients = getRecipients();
    const template = getTemplate(EMAIL_TEMPLATES.volunteer.notification, language);
    const confirmationTemplate = getTemplate(EMAIL_TEMPLATES.volunteer.confirmation, language);
    
    const emailData = {
      ...formData,
      skills: formData.skills.join(', '),
      languages: formData.languages.join(', '),
      date: new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'ar-MA'),
    };
    
    // Email de notification à l'équipe RH
    const notificationHtml = processTemplate(template.body, emailData);
    const notificationResult = await sendEmail(
      recipients.hr,
      template.subject,
      notificationHtml,
      undefined,
      recipients.admin
    );
    
    // Email de confirmation au candidat
    const confirmationHtml = processTemplate(confirmationTemplate.body, emailData);
    const confirmationResult = await sendEmail(
      [formData.email],
      confirmationTemplate.subject,
      confirmationHtml
    );
    
    return {
      success: notificationResult.success && confirmationResult.success,
      error: notificationResult.error || confirmationResult.error
    };
    
  } catch (error) {
    console.error('❌ Erreur envoi bénévolat:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}

export async function sendReportNotification(
  formData: ReportFormData, 
  language: 'fr' | 'en' | 'ar' = 'fr'
): Promise<{ success: boolean; error?: string }> {
  try {
    const recipients = getRecipients();
    const template = getTemplate(EMAIL_TEMPLATES.report.notification, language);
    
    const emailData = {
      ...formData,
      date: new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'ar-MA'),
      fileSize: formData.fileSize ? `${Math.round(formData.fileSize / 1024)} KB` : undefined
    };
    
    const notificationHtml = processTemplate(template.body, emailData);
    const result = await sendEmail(
      recipients.admin,
      template.subject,
      notificationHtml,
      recipients.communications
    );
    
    return result;
    
  } catch (error) {
    console.error('❌ Erreur envoi rapport:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}

export async function sendNewsNotification(
  formData: NewsFormData, 
  language: 'fr' | 'en' | 'ar' = 'fr',
  sendToSubscribers: boolean = false
): Promise<{ success: boolean; error?: string }> {
  try {
    const recipients = getRecipients();
    const results = [];
    
    // Email de notification interne
    const notificationTemplate = getTemplate(EMAIL_TEMPLATES.news.notification, language);
    const emailData = {
      ...formData,
      date: new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'ar-MA'),
    };
    
    const notificationHtml = processTemplate(notificationTemplate.body, emailData);
    const notificationResult = await sendEmail(
      recipients.communications,
      notificationTemplate.subject,
      notificationHtml,
      recipients.admin
    );
    results.push(notificationResult);
    
    // Si publié et demandé, envoyer aux abonnés
    if (formData.published && sendToSubscribers) {
      const publicationTemplate = getTemplate(EMAIL_TEMPLATES.news.publication, language);
      const publicationSubject = processTemplate(publicationTemplate.subject, emailData);
      const publicationHtml = processTemplate(publicationTemplate.body, emailData);
      
      const publicationResult = await sendEmail(
        recipients.subscribers,
        publicationSubject,
        publicationHtml
      );
      results.push(publicationResult);
    }
    
    const allSuccess = results.every(r => r.success);
    const errors = results.filter(r => r.error).map(r => r.error).join(', ');
    
    return {
      success: allSuccess,
      error: errors || undefined
    };
    
  } catch (error) {
    console.error('❌ Erreur envoi actualité:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}

export async function sendPartnerNotification(
  formData: PartnerFormData, 
  language: 'fr' | 'en' | 'ar' = 'fr'
): Promise<{ success: boolean; error?: string }> {
  try {
    const recipients = getRecipients();
    const template = getTemplate(EMAIL_TEMPLATES.partner.notification, language);
    
    const emailData = {
      ...formData,
      date: new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'ar-MA'),
    };
    
    const notificationHtml = processTemplate(template.body, emailData);
    const result = await sendEmail(
      recipients.partnerships,
      template.subject,
      notificationHtml,
      recipients.admin
    );
    
    return result;
    
  } catch (error) {
    console.error('❌ Erreur envoi partenaire:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}

export async function sendNewsletterSubscription(
  email: string,
  language: 'fr' | 'en' | 'ar' = 'fr'
): Promise<{ success: boolean; error?: string }> {
  try {
    const recipients = getRecipients();
    
    // Email de confirmation à l'abonné
    const confirmationSubject = language === 'fr' 
      ? 'Confirmation d\'inscription à la newsletter - Stop SIDA'
      : language === 'en' 
      ? 'Newsletter subscription confirmation - Stop SIDA'
      : 'تأكيد الاشتراك في النشرة الإخبارية - ستوب سيدا';
    
    const confirmationHtml = language === 'fr'
      ? `
        <h2>Merci pour votre inscription à notre newsletter !</h2>
        <p>Votre adresse email <strong>${email}</strong> a été ajoutée à notre liste de diffusion.</p>
        <p>Vous recevrez désormais nos dernières actualités, événements et initiatives directement dans votre boîte mail.</p>
        <p>Si vous souhaitez vous désinscrire, vous pouvez le faire à tout moment en cliquant sur le lien de désinscription présent dans nos emails.</p>
        <p>Cordialement,<br>L'équipe Stop SIDA</p>
      `
      : language === 'en'
      ? `
        <h2>Thank you for subscribing to our newsletter!</h2>
        <p>Your email address <strong>${email}</strong> has been added to our mailing list.</p>
        <p>You will now receive our latest news, events and initiatives directly in your inbox.</p>
        <p>If you wish to unsubscribe, you can do so at any time by clicking the unsubscribe link in our emails.</p>
        <p>Best regards,<br>The Stop SIDA team</p>
      `
      : `
        <h2>شكراً لك على الاشتراك في نشرتنا الإخبارية!</h2>
        <p>تمت إضافة عنوان بريدك الإلكتروني <strong>${email}</strong> إلى قائمة المراسلة لدينا.</p>
        <p>ستتلقى الآن آخر أخبارنا وأحداثنا ومبادراتنا مباشرة في صندوق الوارد الخاص بك.</p>
        <p>إذا كنت ترغب في إلغاء الاشتراك، يمكنك القيام بذلك في أي وقت بالنقر على رابط إلغاء الاشتراك الموجود في رسائلنا الإلكترونية.</p>
        <p>مع أطيب التحيات،<br>فريق ستوب سيدا</p>
      `;
    
    const confirmationResult = await sendEmail(
      [email],
      confirmationSubject,
      confirmationHtml
    );
    
    // Email de notification à l'équipe communication
    const notificationSubject = language === 'fr'
      ? 'Nouvel abonné newsletter'
      : language === 'en'
      ? 'New newsletter subscriber'
      : 'مشترك جديد في النشرة الإخبارية';
    
    const notificationHtml = language === 'fr'
      ? `
        <h2>Nouvel abonné à la newsletter</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date d'inscription:</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
      `
      : language === 'en'
      ? `
        <h2>New newsletter subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscription date:</strong> ${new Date().toLocaleDateString('en-US')}</p>
      `
      : `
        <h2>مشترك جديد في النشرة الإخبارية</h2>
        <p><strong>البريد الإلكتروني:</strong> ${email}</p>
        <p><strong>تاريخ الاشتراك:</strong> ${new Date().toLocaleDateString('ar-MA')}</p>
      `;
    
    const notificationResult = await sendEmail(
      recipients.communications,
      notificationSubject,
      notificationHtml,
      recipients.admin
    );
    
    return {
      success: confirmationResult.success && notificationResult.success,
      error: confirmationResult.error || notificationResult.error
    };
    
  } catch (error) {
    console.error('❌ Erreur envoi newsletter:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    };
  }
}

// Fonction utilitaire pour tester la configuration
export async function testEmailConfiguration(): Promise<{ success: boolean; error?: string }> {
  try {
    const testResult = await sendEmail(
      ['sambasine365@gmail.com'],
      'Test Configuration Stop SIDA',
      '<h2>Test de configuration réussi !</h2><p>Le système d\'email fonctionne correctement.</p>'
    );
    
    return testResult;
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur de test' 
    };
  }
}