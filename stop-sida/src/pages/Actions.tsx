import React, { useState, useEffect } from 'react';
import { Shield, Heart, Users, Megaphone, Building, Stethoscope } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';

const Actions: React.FC = () => {
  const { t, language } = useLanguage();

  const mainActions = [
    {
      icon: Shield,
      title: t('actions.prevention.title'),
      description: t('actions.prevention.description'),
      image: '/events/activitéfemmeavecElles1.jpg',
      details: [
        t('actions.prevention.details.schools'),
        t('actions.prevention.details.peers'),
        t('actions.prevention.details.campaigns'),
        t('actions.prevention.details.listening'),
        t('actions.prevention.details.distribution')
      ]
    },
    {
      icon: Heart,
      title: t('actions.care.title'),
      description: t('actions.care.description'),
      image: '/events/consultation1.jpg',
      details: [
        t('actions.care.details.medical'),
        t('actions.care.details.nutrition'),
        t('actions.care.details.psychological'),
        t('actions.care.details.income'),
        t('actions.care.details.mediation')
      ]
    },
    {
      icon: Users,
      title: t('actions.health.title'),
      description: t('actions.health.description'),
      image: '/events/activitéfemmeavecElles2.jpg',
      details: [
        t('actions.health.details.family'),
        t('actions.health.details.prenatal'),
        t('actions.health.details.vaccination'),
        t('actions.health.details.water'),
        t('actions.health.details.training')
      ]
    },
    {
      icon: Megaphone,
      title: t('actions.advocacy.title'),
      description: t('actions.advocacy.description'),
      image: '/events/visite_du_ministre_de_la_culture.jpg',
      details: [
        t('actions.advocacy.details.policies'),
        t('actions.advocacy.details.religious'),
        t('actions.advocacy.details.media'),
        t('actions.advocacy.details.forums'),
        t('actions.advocacy.details.legislation')
      ]
    }
  ];

  // Images supplémentaires pour la galerie
  const additionalImages = [
    '/events/centre_sante.jpg',
    '/events/centre_sante1.jpg',
    '/events/centre_sante2.jpg',
    '/events/centre_sante3.jpg',
    '/events/centre_sante4.jpg',
    '/events/consultation2.jpg',
    '/events/consultation3.jpg',
    '/events/consultation4.jpg',
    '/events/consultation5.jpg',
    '/events/consultation6.jpg',
    '/events/consultation7.jpg',
    '/events/activitéfemmeavecElles3.jpg',
    '/events/activitéfemmeavecElles4.jpg',
    '/events/activitéfemmeavecElles5.jpg',
    '/events/activitéfemmeavecElles6.jpg',
    '/events/activitéfemmeavecElles7.jpg',
    '/events/visite_du_ministre_de_la_culture1.jpg',
    '/events/imam1.jpg',
    '/events/imam2.jpg',
    '/events/imam3.jpg',
    '/events/imam4.jpg',
    '/events/imam5.jpg',
    '/events/imam6.jpg',
  ];

  const infrastructure = [
    {
      icon: Building,
      title: t('actions.infrastructure.center.title'),
      description: t('actions.infrastructure.center.desc'),
      features: [
        t('actions.infrastructure.center.maternity'),
        t('actions.infrastructure.center.dental'),
        t('actions.infrastructure.center.ophthalmology'),
        t('actions.infrastructure.center.pharmacy'),
        t('actions.infrastructure.center.staff')
      ]
    },
    {
      icon: Stethoscope,
      title: t('actions.infrastructure.services.title'),
      description: t('actions.infrastructure.services.desc'),
      features: [
        t('actions.infrastructure.services.doctor'),
        t('actions.infrastructure.services.midwives'),
        t('actions.infrastructure.services.nurses'),
        t('actions.infrastructure.services.specialized'),
        t('actions.infrastructure.services.emergency'),
        t('actions.infrastructure.services.ambulance')
      ]
    }
  ];

  const achievements = [
    {
      number: t('actions.achievements.pvvih.number'),
      label: t('actions.achievements.pvvih.label'),
      description: t('actions.achievements.pvvih.desc')
    },
    {
      number: t('actions.achievements.schools.number'),
      label: t('actions.achievements.schools.label'),
      description: t('actions.achievements.schools.desc')
    },
    {
      number: t('actions.achievements.peers.number'),
      label: t('actions.achievements.peers.label'),
      description: t('actions.achievements.peers.desc')
    },
    {
      number: t('actions.achievements.beneficiaries.number'),
      label: t('actions.achievements.beneficiaries.label'),
      description: t('actions.achievements.beneficiaries.desc')
    }
  ];

  // Images pour le carousel de l'inauguration
  const inaugurationImages = [
    '/events/centre_sante.jpg',
    '/events/centre_sante1.jpg',
    '/events/centre_sante2.jpg',
    '/events/centre_sante3.jpg',
    '/events/centre_sante4.jpg',
  ];
  const [currentInauguration, setCurrentInauguration] = useState(0);
  const handlePrev = () => setCurrentInauguration((prev) => (prev === 0 ? inaugurationImages.length - 1 : prev - 1));
  const handleNext = () => setCurrentInauguration((prev) => (prev === inaugurationImages.length - 1 ? 0 : prev + 1));
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInauguration((prev) => (prev === inaugurationImages.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 secondes
    return () => clearInterval(interval);
  }, [inaugurationImages.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('actions.title')}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            {t('actions.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Actions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('actions.interventions.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {mainActions.map((action, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64">
                  <img
                    src={action.image}
                    alt={action.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{action.title}</h3>
                    </div>
                    <p className="text-red-100 text-lg">{action.description}</p>
                  </div>
                </div>
                <div className="p-8">
                  <ul className="space-y-3">
                      {action.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
            ))}
            
            {/* Image du poste de santé remplacée par un carousel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative w-full h-96 flex items-center justify-center bg-gray-100">
                  <button onClick={handlePrev} className="absolute left-2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white"><span className="text-2xl">&#8592;</span></button>
                  <img
                    src={inaugurationImages[currentInauguration]}
                    alt={t('actions.inauguration.image.alt')}
                    className="w-full h-96 object-contain transition-all duration-500 cursor-pointer max-w-full max-h-full"
                    onClick={() => setShowModal(true)}
                  />
                  <button onClick={handleNext} className="absolute right-2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white"><span className="text-2xl">&#8594;</span></button>
                </div>
                {showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setShowModal(false)}>
                    <img
                      src={inaugurationImages[currentInauguration]}
                      alt={t('actions.inauguration.image.alt')}
                      className="max-w-full max-h-full rounded shadow-lg"
                    />
                    <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white text-3xl font-bold">&times;</button>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {t('actions.inauguration.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('actions.inauguration.desc')}
                  </p>
                  {/* Ajout du lecteur vidéo */}
                  <div className="mt-6">
                    <video controls className="w-full max-w-full max-h-[400px] rounded shadow-lg object-contain">
                      <source src="/events/film_centre.mp4" type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('actions.achievements.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('actions.achievements.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-3">
                  {achievement.label}
                </div>
                <p className="text-gray-600 text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('actions.infrastructure.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('actions.infrastructure.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {infrastructure.map((infra, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                    <infra.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {infra.title}
                    </h3>
                    <p className="text-gray-600">
                      {infra.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {t('actions.infrastructure.equipment.title')}
                  </h4>
                  <ul className="space-y-2">
                    {infra.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            
            {/* Image du poste de santé remplacée par un carousel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative w-full h-96 flex items-center justify-center bg-gray-100">
                  <button onClick={handlePrev} className="absolute left-2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white"><span className="text-2xl">&#8592;</span></button>
                  <img
                    src={inaugurationImages[currentInauguration]}
                    alt={t('actions.inauguration.image.alt')}
                    className="w-full h-96 object-contain transition-all duration-500 cursor-pointer max-w-full max-h-full"
                    onClick={() => setShowModal(true)}
                  />
                  <button onClick={handleNext} className="absolute right-2 z-10 bg-white/80 rounded-full p-2 shadow hover:bg-white"><span className="text-2xl">&#8594;</span></button>
                </div>
                {showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setShowModal(false)}>
                    <img
                      src={inaugurationImages[currentInauguration]}
                  alt={t('actions.inauguration.image.alt')}
                      className="max-w-full max-h-full rounded shadow-lg"
                />
                    <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white text-3xl font-bold">&times;</button>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {t('actions.inauguration.title')}
                  </h3>
                  <p className="text-gray-600">
                    {t('actions.inauguration.desc')}
                  </p>
                  {/* Ajout du lecteur vidéo */}
                  <div className="mt-6">
                    <video controls className="w-full max-w-full max-h-[400px] rounded shadow-lg object-contain">
                      <source src="/events/film_centre.mp4" type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie d'images */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('actions.gallery.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('actions.gallery.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {additionalImages.map((image, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={image}
                    alt={`Action ${index + 1}`}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
                      {index < 5 && (
                        <span className="text-base font-semibold text-gray-800">
                          {language === 'fr' ? 'Inauguration du poste de santé' : 
                           language === 'en' ? 'Health Center Inauguration' : 
                           'افتتاح مركز الصحة'}
                        </span>
                      )}
                      {index >= 5 && index < 10 && (
                        <span className="text-base font-semibold text-gray-800">
                          {language === 'fr' ? 'Consultations gratuites' : 
                           language === 'en' ? 'Free Consultations' : 
                           'استشارات مجانية'}
                        </span>
                      )}
                      {index === 10 && (
                        <span className="text-base font-semibold text-gray-800">
                          {language === 'fr' ? 'Inauguration du poste de santé' : 
                           language === 'en' ? 'Health Center Inauguration' : 
                           'افتتاح مركز الصحة'}
                        </span>
                      )}
                      {index >= 11 && index < 16 && (
                        <span className="text-base font-semibold text-gray-800">
                          {language === 'fr' ? 'Activité femme' : 
                           language === 'en' ? 'Women Activity' : 
                           'نشاط المرأة'}
                        </span>
                      )}
                      {index === 16 && (
                        <span className="text-base font-semibold text-gray-800">
                          {language === 'fr' ? 'Visite du ministre de la culture' : 
                           language === 'en' ? 'Visit of the Minister of Culture' : 
                           'زيارة وزير الثقافة'}
                        </span>
                      )}
                      {index >= 17 && (
                        <span className="text-base font-semibold text-gray-800">
                          {language === 'fr' ? 'Formation des imams' : 
                           language === 'en' ? 'Imam Training' : 
                           'تدريب الأئمة'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-500">{t('actions.gallery.activity')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('actions.cta.title')}
          </h2>
          <p className="text-xl text-red-100 mb-8">
            {t('actions.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/volunteer"
              className="inline-flex items-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              {t('actions.cta.volunteer')}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              {t('actions.cta.contact')}
            </a>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Actions;