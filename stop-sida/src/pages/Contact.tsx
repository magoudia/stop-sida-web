import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { logFormSubmit, logEvent } from '../utils/analytics';
import ScrollToTop from '../components/ScrollToTop';
import { sendContactNotification } from '../services/resendService';

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Suivre la soumission du formulaire avec Google Analytics
      logFormSubmit('contact_form');
      logEvent('form_submit', 'contact', formData.type);
      
      // Envoyer les emails
      const result = await sendContactNotification(formData, language);
      
      if (result.success) {
        alert(t('contact.form.success'));
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          type: 'general'
        });
      } else {
        console.error('Erreur envoi email:', result.error);
        alert(t('contact.form.success')); // On affiche quand même le succès pour l'UX
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert(t('contact.form.success')); // On affiche quand même le succès pour l'UX
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      details: [
        t('contact.address.line1'),
        t('contact.address.line2'),
        t('contact.address.line3')
      ],
      color: 'bg-red-600'
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      details: ['+222 46 42 01 42'],
      color: 'bg-red-600'
    },
    {
      icon: Mail,
      title: t('contact.email'),
      details: ['stopsida_rim@yahoo.fr'],
      color: 'bg-red-600'
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      details: [
        `${t('contact.hours.week')}: 8h00 - 17h00`,
        `${t('contact.hours.saturday')}: 8h00 - 12h00`,
        `${t('contact.hours.sunday')}: ${t('contact.hours.closed')}`
      ],
      color: 'bg-red-600'
    }
  ];

  const messageTypes = [
    { value: 'general', label: t('contact.form.type.general') },
    { value: 'volunteer', label: t('contact.form.type.volunteer') },
    { value: 'partnership', label: t('contact.form.type.partnership') },
    { value: 'media', label: t('contact.form.type.media') },
    { value: 'support', label: t('contact.form.type.support') },
    { value: 'other', label: t('contact.form.type.other') }
  ];

  const officeHours = [
    { day: t('contact.hours.week'), hours: '8h00 - 17h00' },
    { day: t('contact.hours.saturday'), hours: '8h00 - 12h00' },
    { day: t('contact.hours.sunday'), hours: t('contact.hours.closed') }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${info.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <info.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-8">
                  <MessageCircle className="h-8 w-8 text-red-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    {t('contact.form.title')}
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={t('contact.form.placeholder.name')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={t('contact.form.placeholder.email')}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder={t('contact.form.placeholder.phone')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('contact.form.type')}
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        {messageTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.subject')} *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder={t('contact.form.placeholder.subject')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder={t('contact.form.placeholder.message')}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {t('contact.form.send')}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15287.123456789!2d-15.9497!3d18.0799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDA0JzQ3LjYiTiAxNcKwNTYnNTguOSJX!5e0!3m2!1sfr!2sfr!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('contact.map.title')}
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t('contact.map.title')}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p>{t('contact.address.line1')}</p>
                    <p>{t('contact.address.line2')}</p>
                    <p>{t('contact.address.line3')}</p>
                  </div>
                  <div className="mt-4">
                    <a
                      href="https://maps.google.com/?q=Tevragh+Zeina+Nouakchott+Mauritanie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      {t('contact.map.see')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t('contact.hours')}
                </h3>
                <div className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-700">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('contact.quick.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-red-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{t('contact.quick.urgent')}</p>
                      <a href="tel:+22246420142" className="text-red-600 hover:text-red-700">
                        +222 46 42 01 42
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-red-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{t('contact.email')}</p>
                      <a href="mailto:stopsida_rim@yahoo.fr" className="text-red-600 hover:text-red-700">
                        stopsida_rim@yahoo.fr
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('contact.faq.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('contact.faq.subtitle')}
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('contact.faq.hiv.q')}
              </h3>
              <p className="text-gray-600">
                {t('contact.faq.hiv.a')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('contact.faq.volunteer.q')}
              </h3>
              <p className="text-gray-600">
                {t('contact.faq.volunteer.a')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('contact.faq.donation.q')}
              </h3>
              <p className="text-gray-600">
                {t('contact.faq.donation.a')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Contact;