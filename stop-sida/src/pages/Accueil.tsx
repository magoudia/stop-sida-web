import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Shield, Calendar, ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';
import { sendNewsletterSubscription } from '../services/resendService';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Force re-render when language changes
  useEffect(() => {
    console.log('Language changed to:', language);
  }, [language]);

  const heroImages = [
    '/events/consultation1.jpg',
    '/events/activitéfemmeavecElles1.jpg',
    '/events/activitéfemmeavecElles2.jpg',
    '/events/activitéfemmeavecElles3.jpg',
    '/events/visite_du_ministre_de_la_culture.jpg',
  ];
  // const heroImage = '/events/photo_ouverture_postesante.jpg';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change d'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await sendNewsletterSubscription(email, language);
      
      if (result.success) {
        alert('Merci pour votre inscription à notre newsletter !');
        setEmail('');
      } else {
        console.error('Erreur envoi newsletter:', result.error);
        alert('Merci pour votre inscription à notre newsletter !'); // On affiche quand même le succès pour l'UX
        setEmail('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Merci pour votre inscription à notre newsletter !'); // On affiche quand même le succès pour l'UX
      setEmail('');
    }
  };

  const stats = [
    { number: '+31', label: t('home.stats.years') },
    { number: '100+', label: t('home.stats.volunteers') },
    { number: '15', label: t('home.stats.programs') },
    { number: '10K+', label: t('home.stats.beneficiaries') },
    { number: '50+', label: t('home.stats.partners') },
  ];

  const actions = [
    {
      icon: Shield,
      title: t('home.actions.prevention'),
      description: t('home.actions.prevention.desc'),
      color: 'bg-blue-500',
    },
    {
      icon: Heart,
      title: t('home.actions.care'),
      description: t('home.actions.care.desc'),
      color: 'bg-red-500',
    },
    {
      icon: Users,
      title: t('home.actions.health'),
      description: t('home.actions.health.desc'),
      color: 'bg-green-500',
    },
  ];

  const news = [
    {
      id: 1,
      title: t('home.news.article1.title'),
      excerpt: t('home.news.article1.excerpt'),
      date: '15 Janvier 2025',
      image: '/actualités/formation.jpg',
    },
    {
      id: 2,
      title: t('home.news.article2.title'),
      excerpt: t('home.news.article2.excerpt'),
      date: '10 Janvier 2025',
      image: '/actualités/jeune4.png',
    },
    {
      id: 3,
      title: t('home.news.article3.title'),
      excerpt: t('home.news.article3.excerpt'),
      date: '5 Janvier 2025',
      image: '/actualités/moustic1.png',
    },
  ];

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (videoRef.current) {
        videoRef.current.muted = newMuted;
      }
      return newMuted;
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  {t('home.hero.title')}
                </h1>
                <p className="text-xl md:text-2xl text-red-100 font-light">
                  {t('home.hero.subtitle')}
                </p>
                <p className="text-lg text-red-100 leading-relaxed">
                  {t('home.hero.description')}
                </p>
                <p className="text-lg text-yellow-200 font-medium italic">
                  Association pour la Santé et le Développement Communautaire
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/actions"
                  className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {t('home.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/benevolat"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-all duration-300"
                >
                  {t('nav.volunteer')}
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full p-8 overflow-hidden">
                <img
                  src={heroImages[currentImageIndex]}
                  alt="Stop Sida Action"
                  className="w-full h-full object-cover rounded-full shadow-2xl transition-all duration-500"
                />
                {/* Navigation buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label={t('home.video.previous')}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label={t('home.video.next')}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`${t('home.video.goto')} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos des événements */}
      <section className="relative py-56 bg-black overflow-hidden">
        <video
          ref={videoRef}
          src="/events/video_ouverture_poste.mp4"
          poster="/events/activitéfemmeavecElles1.jpg"
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          controls
        />
        <button
          onClick={toggleMute}
          className="absolute top-6 right-6 z-30 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-full p-3 shadow-lg transition duration-200"
          aria-label={isMuted ? t('home.video.unmute') : t('home.video.mute')}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center animate-fadeInDown drop-shadow-lg">{t('home.video.title')}</h2>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/events/activitéfemmeavecElles3.jpg"
                alt="Notre Mission"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t('home.mission.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('home.mission.description')}
              </p>
              <Link
                to="/a-propos"
                className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                {t('home.learnmore')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.actions.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actions.map((action, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-16 h-16 ${action.color} rounded-lg flex items-center justify-center mb-6`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {action.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {action.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('home.news.title')}
            </h2>
            <Link
              to="/actualites"
              className="text-red-600 font-semibold hover:text-red-700 transition-colors"
            >
              {t('home.seeallnews')}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {article.excerpt}
                  </p>
                  <Link
                    to={`/news/${article.id}`}
                    className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
                  >
                    {t('home.news.readmore')}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.partners.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.partners.subtitle')}
            </p>
          </div>
          
          {/* International Partners */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t('home.partners.international')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/partners/international/oms.png" alt="OMS" className="w-full h-16 object-contain" />
                <p className="text-xs text-gray-600 text-center mt-2">OMS</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/partners/international/usaid.png" alt="USAID" className="w-full h-16 object-contain" />
                <p className="text-xs text-gray-600 text-center mt-2">USAID</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/partners/international/fond_mondial.png" alt="Banque Mondiale" className="w-full h-16 object-contain" />
                <p className="text-xs text-gray-600 text-center mt-2">Banque Mondiale</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/partners/international/iom.png" alt="OIM" className="w-full h-16 object-contain" />
                <p className="text-xs text-gray-600 text-center mt-2">OIM</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/partners/international/undp.png" alt="PNUD" className="w-full h-16 object-contain" />
                <p className="text-xs text-gray-600 text-center mt-2">PNUD</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/partners/international/unfpa.png" alt="UNFPA" className="w-full h-16 object-contain" />
                <p className="text-xs text-gray-600 text-center mt-2">UNFPA</p>
              </div>
            </div>
          </div>

          {/* National Partners */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {language === 'fr' ? 'Partenaires institutionnels nationaux' : 
               language === 'en' ? 'National Institutional Partners' : 
               'الشركاء المؤسسيون الوطنيون'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/partners/national/ministere_sante.png" alt="Ministère de la Santé" className="w-full h-16 object-contain" />
                <p className="text-sm text-gray-600 text-center mt-2">Ministère de la Santé</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                <img src="/partners/national/MS PNEPS.png" alt="PNEPS" className="w-full h-16 object-contain" />
                <p className="text-sm text-gray-600 text-center mt-2">PNEPS</p>
              </div>
            </div>
          </div>

          {/* Autres Partenaires techniques et de soutien */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {language === 'fr' ? 'Autres partenaires techniques et de soutien' : 
               language === 'en' ? 'Other Technical and Support Partners' : 
               'شركاء تقنيون وداعمون آخرون'}
            </h3>
            <div className="overflow-x-auto">
              <div className="flex space-x-6 min-w-max px-4">
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/bamis.png" alt="BAMIS" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">BAMIS</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/ELLES_DU_SAHEL.png" alt="ELLES DU SAHEL" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">ELLES DU SAHEL</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/palladium.png" alt="Palladium" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">Palladium</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/peace_corps.png" alt="Peace Corps" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">Peace Corps</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/pharma.png" alt="Pharma" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">Pharma</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/propel.png" alt="Propel" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">Propel</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/publiC Tech.png" alt="Public Tech" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">Public Tech</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/sircoma.png" alt="SIRCOMA" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">SIRCOMA</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/Societe Ciment Mauritanie.png" alt="Société Ciment Mauritanie" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">Ciment Mauritanie</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-32">
                  <img src="/partners/technical/taskhaf.png" alt="Tasghif" className="w-full h-16 object-contain" />
                  <p className="text-xs text-gray-600 text-center mt-2">Tasghif</p>
                </div>
              </div>
            </div>
          </div>



          <div className="text-center mt-12">
            <Link
              to="/partenaires"
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('home.partners.seeall')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages et Reconnaissance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('testimonials.example1.author')}</h4>
                  <p className="text-sm text-gray-600">{t('testimonials.example1.role')}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{t('testimonials.example1.text')}"</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  D
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('testimonials.example2.author')}</h4>
                  <p className="text-sm text-gray-600">{t('testimonials.example2.role')}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{t('testimonials.example2.text')}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('home.newsletter.title')}
          </h2>
          <p className="text-xl text-red-100 mb-8">
            {t('home.newsletter.description')}
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.newsletter.placeholder')}
              required
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              {t('home.newsletter.button')}
            </button>
          </form>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Home;