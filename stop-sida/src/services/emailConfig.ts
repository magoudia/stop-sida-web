import { NotificationRecipients, EmailTemplates } from '../types/email';

// Configuration des destinataires pour la production
export const NOTIFICATION_RECIPIENTS: NotificationRecipients = {
  admin: ['admin@stop-sida.org', 'directeur@stop-sida.org'],
  hr: ['rh@stop-sida.org', 'recrutement@stop-sida.org'],
  partnerships: ['partenariats@stop-sida.org', 'cooperation@stop-sida.org'],
  communications: ['communication@stop-sida.org', 'presse@stop-sida.org'],
  subscribers: ['newsletter@stop-sida.org'] // Liste des abonnés newsletter
};

// Configuration des destinataires pour le développement
export const DEV_NOTIFICATION_RECIPIENTS: NotificationRecipients = {
  admin: ['sambasine365@gmail.com'],
  hr: ['sambasine365@gmail.com'],
  partnerships: ['sambasine365@gmail.com'],
  communications: ['sambasine365@gmail.com'],
  subscribers: ['sambasine365@gmail.com']
};

// Templates d'emails pour tous les formulaires
export const EMAIL_TEMPLATES: EmailTemplates = {
  contact: {
    notification: {
      subject: {
        fr: 'Nouveau message de contact - {{name}}',
        en: 'New contact message - {{name}}',
        ar: 'رسالة اتصال جديدة - {{name}}'
      },
      body: {
        fr: `
          <h2>Nouveau message de contact reçu</h2>
          <p><strong>Nom:</strong> {{name}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Téléphone:</strong> {{phone}}</p>
          <p><strong>Type:</strong> {{type}}</p>
          <p><strong>Sujet:</strong> {{subject}}</p>
          <p><strong>Message:</strong></p>
          <p>{{message}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        en: `
          <h2>New contact message received</h2>
          <p><strong>Name:</strong> {{name}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Phone:</strong> {{phone}}</p>
          <p><strong>Type:</strong> {{type}}</p>
          <p><strong>Subject:</strong> {{subject}}</p>
          <p><strong>Message:</strong></p>
          <p>{{message}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        ar: `
          <h2>تم استلام رسالة اتصال جديدة</h2>
          <p><strong>الاسم:</strong> {{name}}</p>
          <p><strong>البريد الإلكتروني:</strong> {{email}}</p>
          <p><strong>الهاتف:</strong> {{phone}}</p>
          <p><strong>النوع:</strong> {{type}}</p>
          <p><strong>الموضوع:</strong> {{subject}}</p>
          <p><strong>الرسالة:</strong></p>
          <p>{{message}}</p>
          <p><strong>التاريخ:</strong> {{date}}</p>
        `
      }
    },
    confirmation: {
      subject: {
        fr: 'Confirmation de votre message - Stop SIDA',
        en: 'Confirmation of your message - Stop SIDA',
        ar: 'تأكيد رسالتك - ستوب سيدا'
      },
      body: {
        fr: `
          <h2>Merci pour votre message, {{name}} !</h2>
          <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          <p><strong>Récapitulatif de votre message:</strong></p>
          <p><strong>Sujet:</strong> {{subject}}</p>
          <p><strong>Message:</strong> {{message}}</p>
          <p><strong>Date d'envoi:</strong> {{date}}</p>
          <p>Cordialement,<br>L'équipe Stop SIDA</p>
        `,
        en: `
          <h2>Thank you for your message, {{name}}!</h2>
          <p>We have received your message and will respond as soon as possible.</p>
          <p><strong>Summary of your message:</strong></p>
          <p><strong>Subject:</strong> {{subject}}</p>
          <p><strong>Message:</strong> {{message}}</p>
          <p><strong>Sent date:</strong> {{date}}</p>
          <p>Best regards,<br>The Stop SIDA team</p>
        `,
        ar: `
          <h2>شكراً لك على رسالتك، {{name}}!</h2>
          <p>لقد استلمنا رسالتك وسنرد عليك في أقرب وقت ممكن.</p>
          <p><strong>ملخص رسالتك:</strong></p>
          <p><strong>الموضوع:</strong> {{subject}}</p>
          <p><strong>الرسالة:</strong> {{message}}</p>
          <p><strong>تاريخ الإرسال:</strong> {{date}}</p>
          <p>مع أطيب التحيات،<br>فريق ستوب سيدا</p>
        `
      }
    }
  },
  volunteer: {
    notification: {
      subject: {
        fr: 'Nouvelle candidature bénévole - {{firstName}} {{lastName}}',
        en: 'New volunteer application - {{firstName}} {{lastName}}',
        ar: 'طلب تطوع جديد - {{firstName}} {{lastName}}'
      },
      body: {
        fr: `
          <h2>Nouvelle candidature bénévole reçue</h2>
          <p><strong>Nom complet:</strong> {{firstName}} {{lastName}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Téléphone:</strong> {{phone}}</p>
          <p><strong>Âge:</strong> {{age}}</p>
          <p><strong>Profession:</strong> {{profession}}</p>
          <p><strong>Expérience:</strong> {{experience}}</p>
          <p><strong>Motivation:</strong> {{motivation}}</p>
          <p><strong>Disponibilité:</strong> {{availability}}</p>
          <p><strong>Compétences:</strong> {{skills}}</p>
          <p><strong>Langues:</strong> {{languages}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        en: `
          <h2>New volunteer application received</h2>
          <p><strong>Full name:</strong> {{firstName}} {{lastName}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Phone:</strong> {{phone}}</p>
          <p><strong>Age:</strong> {{age}}</p>
          <p><strong>Profession:</strong> {{profession}}</p>
          <p><strong>Experience:</strong> {{experience}}</p>
          <p><strong>Motivation:</strong> {{motivation}}</p>
          <p><strong>Availability:</strong> {{availability}}</p>
          <p><strong>Skills:</strong> {{skills}}</p>
          <p><strong>Languages:</strong> {{languages}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        ar: `
          <h2>تم استلام طلب تطوع جديد</h2>
          <p><strong>الاسم الكامل:</strong> {{firstName}} {{lastName}}</p>
          <p><strong>البريد الإلكتروني:</strong> {{email}}</p>
          <p><strong>الهاتف:</strong> {{phone}}</p>
          <p><strong>العمر:</strong> {{age}}</p>
          <p><strong>المهنة:</strong> {{profession}}</p>
          <p><strong>الخبرة:</strong> {{experience}}</p>
          <p><strong>الدافع:</strong> {{motivation}}</p>
          <p><strong>التوفر:</strong> {{availability}}</p>
          <p><strong>المهارات:</strong> {{skills}}</p>
          <p><strong>اللغات:</strong> {{languages}}</p>
          <p><strong>التاريخ:</strong> {{date}}</p>
        `
      }
    },
    confirmation: {
      subject: {
        fr: 'Confirmation de votre candidature bénévole - Stop SIDA',
        en: 'Confirmation of your volunteer application - Stop SIDA',
        ar: 'تأكيد طلب التطوع - ستوب سيدا'
      },
      body: {
        fr: `
          <h2>Merci pour votre candidature, {{firstName}} !</h2>
          <p>Nous avons bien reçu votre candidature pour rejoindre notre équipe de bénévoles.</p>
          <p>Notre équipe RH étudiera votre profil et vous contactera dans les prochains jours pour la suite du processus.</p>
          <p><strong>Récapitulatif de votre candidature:</strong></p>
          <p><strong>Nom:</strong> {{firstName}} {{lastName}}</p>
          <p><strong>Profession:</strong> {{profession}}</p>
          <p><strong>Compétences:</strong> {{skills}}</p>
          <p><strong>Date de candidature:</strong> {{date}}</p>
          <p>Cordialement,<br>L'équipe Stop SIDA</p>
        `,
        en: `
          <h2>Thank you for your application, {{firstName}}!</h2>
          <p>We have received your application to join our volunteer team.</p>
          <p>Our HR team will review your profile and contact you in the coming days for the next steps.</p>
          <p><strong>Summary of your application:</strong></p>
          <p><strong>Name:</strong> {{firstName}} {{lastName}}</p>
          <p><strong>Profession:</strong> {{profession}}</p>
          <p><strong>Skills:</strong> {{skills}}</p>
          <p><strong>Application date:</strong> {{date}}</p>
          <p>Best regards,<br>The Stop SIDA team</p>
        `,
        ar: `
          <h2>شكراً لك على طلبك، {{firstName}}!</h2>
          <p>لقد استلمنا طلبك للانضمام إلى فريق المتطوعين لدينا.</p>
          <p>سيراجع فريق الموارد البشرية ملفك الشخصي ويتصل بك في الأيام القادمة للخطوات التالية.</p>
          <p><strong>ملخص طلبك:</strong></p>
          <p><strong>الاسم:</strong> {{firstName}} {{lastName}}</p>
          <p><strong>المهنة:</strong> {{profession}}</p>
          <p><strong>المهارات:</strong> {{skills}}</p>
          <p><strong>تاريخ الطلب:</strong> {{date}}</p>
          <p>مع أطيب التحيات،<br>فريق ستوب سيدا</p>
        `
      }
    }
  },
  report: {
    notification: {
      subject: {
        fr: 'Nouveau rapport soumis - {{title}}',
        en: 'New report submitted - {{title}}',
        ar: 'تقرير جديد مقدم - {{title}}'
      },
      body: {
        fr: `
          <h2>Nouveau rapport soumis</h2>
          <p><strong>Titre:</strong> {{title}}</p>
          <p><strong>Description:</strong> {{description}}</p>
          <p><strong>Année:</strong> {{year}}</p>
          <p><strong>Catégorie:</strong> {{category}}</p>
          <p><strong>Fichier:</strong> {{fileName}}</p>
          <p><strong>Taille:</strong> {{fileSize}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        en: `
          <h2>New report submitted</h2>
          <p><strong>Title:</strong> {{title}}</p>
          <p><strong>Description:</strong> {{description}}</p>
          <p><strong>Year:</strong> {{year}}</p>
          <p><strong>Category:</strong> {{category}}</p>
          <p><strong>File:</strong> {{fileName}}</p>
          <p><strong>Size:</strong> {{fileSize}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        ar: `
          <h2>تم تقديم تقرير جديد</h2>
          <p><strong>العنوان:</strong> {{title}}</p>
          <p><strong>الوصف:</strong> {{description}}</p>
          <p><strong>السنة:</strong> {{year}}</p>
          <p><strong>الفئة:</strong> {{category}}</p>
          <p><strong>الملف:</strong> {{fileName}}</p>
          <p><strong>الحجم:</strong> {{fileSize}}</p>
          <p><strong>التاريخ:</strong> {{date}}</p>
        `
      }
    }
  },
  news: {
    notification: {
      subject: {
        fr: 'Nouvelle actualité créée - {{title}}',
        en: 'New news article created - {{title}}',
        ar: 'خبر جديد تم إنشاؤه - {{title}}'
      },
      body: {
        fr: `
          <h2>Nouvelle actualité créée</h2>
          <p><strong>Titre:</strong> {{title}}</p>
          <p><strong>Description:</strong> {{description}}</p>
          <p><strong>Contenu:</strong> {{content}}</p>
          <p><strong>Publié:</strong> {{#if published}}Oui{{else}}Non{{/if}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        en: `
          <h2>New news article created</h2>
          <p><strong>Title:</strong> {{title}}</p>
          <p><strong>Description:</strong> {{description}}</p>
          <p><strong>Content:</strong> {{content}}</p>
          <p><strong>Published:</strong> {{#if published}}Yes{{else}}No{{/if}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        ar: `
          <h2>تم إنشاء خبر جديد</h2>
          <p><strong>العنوان:</strong> {{title}}</p>
          <p><strong>الوصف:</strong> {{description}}</p>
          <p><strong>المحتوى:</strong> {{content}}</p>
          <p><strong>منشور:</strong> {{#if published}}نعم{{else}}لا{{/if}}</p>
          <p><strong>التاريخ:</strong> {{date}}</p>
        `
      }
    },
    publication: {
      subject: {
        fr: 'Nouvelle actualité : {{title}}',
        en: 'New news: {{title}}',
        ar: 'خبر جديد: {{title}}'
      },
      body: {
        fr: `
          <h2>{{title}}</h2>
          <p>{{description}}</p>
          <p>{{content}}</p>
          <p><a href="https://stop-sida.org/actualites">Lire plus sur notre site</a></p>
          <p>Cordialement,<br>L'équipe Stop SIDA</p>
        `,
        en: `
          <h2>{{title}}</h2>
          <p>{{description}}</p>
          <p>{{content}}</p>
          <p><a href="https://stop-sida.org/actualites">Read more on our website</a></p>
          <p>Best regards,<br>The Stop SIDA team</p>
        `,
        ar: `
          <h2>{{title}}</h2>
          <p>{{description}}</p>
          <p>{{content}}</p>
          <p><a href="https://stop-sida.org/actualites">اقرأ المزيد على موقعنا</a></p>
          <p>مع أطيب التحيات،<br>فريق ستوب سيدا</p>
        `
      }
    }
  },
  partner: {
    notification: {
      subject: {
        fr: 'Nouveau partenaire ajouté - {{name}}',
        en: 'New partner added - {{name}}',
        ar: 'شريك جديد تمت إضافته - {{name}}'
      },
      body: {
        fr: `
          <h2>Nouveau partenaire ajouté</h2>
          <p><strong>Nom:</strong> {{name}}</p>
          <p><strong>Acronyme:</strong> {{acronym}}</p>
          <p><strong>Description:</strong> {{description}}</p>
          <p><strong>Site web:</strong> {{website}}</p>
          <p><strong>Catégorie:</strong> {{category}}</p>
          <p><strong>Collaboration:</strong> {{collaboration}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        en: `
          <h2>New partner added</h2>
          <p><strong>Name:</strong> {{name}}</p>
          <p><strong>Acronym:</strong> {{acronym}}</p>
          <p><strong>Description:</strong> {{description}}</p>
          <p><strong>Website:</strong> {{website}}</p>
          <p><strong>Category:</strong> {{category}}</p>
          <p><strong>Collaboration:</strong> {{collaboration}}</p>
          <p><strong>Date:</strong> {{date}}</p>
        `,
        ar: `
          <h2>تمت إضافة شريك جديد</h2>
          <p><strong>الاسم:</strong> {{name}}</p>
          <p><strong>الاختصار:</strong> {{acronym}}</p>
          <p><strong>الوصف:</strong> {{description}}</p>
          <p><strong>الموقع الإلكتروني:</strong> {{website}}</p>
          <p><strong>الفئة:</strong> {{category}}</p>
          <p><strong>التعاون:</strong> {{collaboration}}</p>
          <p><strong>التاريخ:</strong> {{date}}</p>
        `
      }
    }
  }
};

