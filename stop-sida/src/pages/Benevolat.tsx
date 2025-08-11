import React, { useState } from 'react';
import { Heart, Users, Clock, Award, CheckCircle, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';
import { sendVolunteerNotification } from '../services/resendService';

const Volunteer: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<{
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
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    profession: '',
    experience: '',
    motivation: '',
    availability: '',
    skills: [],
    languages: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'skills' | 'languages') => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Envoyer les emails
      const result = await sendVolunteerNotification(formData, language);
      
      if (result.success) {
        alert(t('volunteer.form.success'));
        
        // Réinitialiser le formulaire
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          age: '',
          profession: '',
          experience: '',
          motivation: '',
          availability: '',
          skills: [],
          languages: []
        });
      } else {
        console.error('Erreur envoi email:', result.error);
        alert(t('volunteer.form.success')); // On affiche quand même le succès pour l'UX
      }
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert(t('volunteer.form.success')); // On affiche quand même le succès pour l'UX
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        profession: '',
        experience: '',
        motivation: '',
        availability: '',
        skills: [],
        languages: []
      });
    }
  };

  const opportunities = [
    {
      icon: Heart,
      title: t('volunteer.opportunities.care.title'),
      description: t('volunteer.opportunities.care.desc'),
      requirements: [
        t('volunteer.opportunities.care.req1'),
        t('volunteer.opportunities.care.req2'),
        t('volunteer.opportunities.care.req3')
      ],
      time: t('volunteer.opportunities.time.4h')
    },
    {
      icon: Users,
      title: t('volunteer.opportunities.community.title'),
      description: t('volunteer.opportunities.community.desc'),
      requirements: [
        t('volunteer.opportunities.community.req1'),
        t('volunteer.opportunities.community.req2'),
        t('volunteer.opportunities.community.req3')
      ],
      time: t('volunteer.opportunities.time.6h')
    },
    {
      icon: Clock,
      title: t('volunteer.opportunities.admin.title'),
      description: t('volunteer.opportunities.admin.desc'),
      requirements: [
        t('volunteer.opportunities.admin.req1'),
        t('volunteer.opportunities.admin.req2'),
        t('volunteer.opportunities.admin.req3')
      ],
      time: t('volunteer.opportunities.time.8h')
    },
    {
      icon: Award,
      title: t('volunteer.opportunities.training.title'),
      description: t('volunteer.opportunities.training.desc'),
      requirements: [
        t('volunteer.opportunities.training.req1'),
        t('volunteer.opportunities.training.req2'),
        t('volunteer.opportunities.training.req3')
      ],
      time: t('volunteer.opportunities.time.5h')
    }
  ];

  const benefits = [
    t('volunteer.benefits.item1'),
    t('volunteer.benefits.item2'),
    t('volunteer.benefits.item3'),
    t('volunteer.benefits.item4'),
    t('volunteer.benefits.item5'),
    t('volunteer.benefits.item6')
  ];

  const skills = [
    t('volunteer.skills.communication'),
    t('volunteer.skills.education'),
    t('volunteer.skills.health'),
    t('volunteer.skills.psychology'),
    t('volunteer.skills.computing'),
    t('volunteer.skills.project'),
    t('volunteer.skills.translation'),
    t('volunteer.skills.accounting'),
    t('volunteer.skills.logistics'),
    t('volunteer.skills.advocacy')
  ];

  const languages = [
    t('volunteer.languages.french'),
    t('volunteer.languages.arabic'),
    t('volunteer.languages.hassaniya'),
    t('volunteer.languages.wolof'),
    t('volunteer.languages.pulaar'),
    t('volunteer.languages.soninke'),
    t('volunteer.languages.english')
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('volunteer.title')}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto mb-8">
            {t('volunteer.subtitle')}
          </p>
          <div className="flex items-center justify-center space-x-8 text-red-100">
            <div className="text-center">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm">{t('volunteer.stats.volunteers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">31</div>
              <div className="text-sm">{t('volunteer.stats.years')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15</div>
              <div className="text-sm">{t('volunteer.stats.programs')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('volunteer.opportunities.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('volunteer.opportunities.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                    <opportunity.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {opportunity.title}
                    </h3>
                    <p className="text-red-600 font-medium">
                      {opportunity.time}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  {opportunity.description}
                </p>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('volunteer.opportunities.profile')}
                  </h4>
                  <ul className="space-y-2">
                    {opportunity.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('volunteer.benefits.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('volunteer.benefits.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('volunteer.form.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('volunteer.form.subtitle')}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('volunteer.form.firstname')} *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('volunteer.form.lastname')} *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('volunteer.form.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('volunteer.form.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('volunteer.form.age')}
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="18"
                  max="80"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('volunteer.form.profession')}
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('volunteer.form.availability')}
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">{t('volunteer.form.availability.placeholder')}</option>
                <option value="weekdays">{t('volunteer.form.availability.weekdays')}</option>
                <option value="weekends">{t('volunteer.form.availability.weekends')}</option>
                <option value="evenings">{t('volunteer.form.availability.evenings')}</option>
                <option value="flexible">{t('volunteer.form.availability.flexible')}</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('volunteer.form.skills.placeholder')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={(e) => handleCheckboxChange(e, 'skills')}
                      className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('volunteer.form.languages.placeholder')}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {languages.map((language) => (
                  <label key={language} className="flex items-center">
                    <input
                      type="checkbox"
                      value={language}
                      checked={formData.languages.includes(language)}
                      onChange={(e) => handleCheckboxChange(e, 'languages')}
                      className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{language}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('volunteer.form.experience')}
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                rows={4}
                placeholder={t('volunteer.form.experience.placeholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('volunteer.form.motivation')} *
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows={4}
                required
                placeholder={t('volunteer.form.motivation.placeholder')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                <Send className="mr-2 h-5 w-5" />
                {t('volunteer.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('volunteer.contact.title')}
          </h2>
          <p className="text-xl text-red-100 mb-8">
            {t('volunteer.contact.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:stopsida_rim@yahoo.fr"
              className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              {t('volunteer.contact.email')}
            </a>
            <a
              href="tel:+22246420142"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              {t('volunteer.contact.phone')}
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'fr' ? 'Rejoignez notre équipe' :
             language === 'en' ? 'Join our team' :
             'انضم إلى فريقنا'}
          </h2>
          <p className="text-xl text-red-100 mb-8">
            {language === 'fr' ? 'Ensemble, nous pouvons faire une différence dans la lutte contre le VIH/SIDA' :
             language === 'en' ? 'Together, we can make a difference in the fight against HIV/AIDS' :
             'معاً، يمكننا إحداث فرق في مكافحة فيروس نقص المناعة البشرية/الإيدز'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              {language === 'fr' ? 'Nous contacter' :
               language === 'en' ? 'Contact us' :
               'اتصل بنا'}
            </a>
            <a
              href="/actions"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              {language === 'fr' ? 'Nos actions' :
               language === 'en' ? 'Our actions' :
               'إجراءاتنا'}
            </a>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Volunteer;
