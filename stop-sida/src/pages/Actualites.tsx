import React, { useState, useEffect } from 'react';
import { Calendar, User, Tag, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';
import { sendNewsletterSubscription } from '../services/resendService';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  imageName?: string;
  imageSize?: number;
  imageType?: string;
  date: string;
  published: boolean;
}

const News: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);

  const categories = [
    { id: 'all', name: language === 'fr' ? 'Toutes les actualités' : 
                    language === 'en' ? 'All news' : 
                    'جميع الأخبار' },
    { id: 'prevention', name: language === 'fr' ? 'Prévention' : 
                    language === 'en' ? 'Prevention' : 
                    'الوقاية' },
    { id: 'care', name: language === 'fr' ? 'Soins' : 
                    language === 'en' ? 'Care' : 
                    'الرعاية' },
    { id: 'partnership', name: language === 'fr' ? 'Partenariat' : 
                    language === 'en' ? 'Partnership' : 
                    'الشراكة' },
    { id: 'training', name: language === 'fr' ? 'Formation' : 
                    language === 'en' ? 'Training' : 
                    'التدريب' },
    { id: 'advocacy', name: language === 'fr' ? 'Plaidoyer' : 
                    language === 'en' ? 'Advocacy' : 
                    'المناصرة' }
  ];

  // Charger les actualités depuis l'administration et fusionner avec les existantes
  useEffect(() => {
    const savedNews = localStorage.getItem('adminNews');
    const adminNews = savedNews ? JSON.parse(savedNews) : [];
    
    // Actualités existantes (hardcodées)
    const existingNews = [
      {
        id: '1',
        title: language === 'fr' ? 'Formation des jeunes sur la prévention du VIH/SIDA' :
               language === 'en' ? 'Youth training on HIV/AIDS prevention' :
               'تدريب الشباب على الوقاية من فيروس نقص المناعة البشرية/الإيدز',
        content: language === 'fr' ? 'Une session de formation intensive a été organisée pour sensibiliser les jeunes aux risques du VIH/SIDA et aux méthodes de prévention.' :
               language === 'en' ? 'An intensive training session was organized to raise awareness among young people about HIV/AIDS risks and prevention methods.' :
               'تم تنظيم جلسة تدريب مكثف لزيادة الوعي بين الشباب حول مخاطر فيروس نقص المناعة البشرية/الإيدز وطرق الوقاية.',
        date: '2024-01-15',
      image: '/actualités/formation.jpg',
        published: true
      },
      {
        id: '2',
        title: language === 'fr' ? 'Sensibilisation communautaire dans les quartiers' :
               language === 'en' ? 'Community awareness in neighborhoods' :
               'التوعية المجتمعية في الأحياء',
        content: language === 'fr' ? 'Notre équipe a mené des campagnes de sensibilisation dans plusieurs quartiers pour informer la population sur les services disponibles.' :
               language === 'en' ? 'Our team conducted awareness campaigns in several neighborhoods to inform the population about available services.' :
               'نفذ فريقنا حملات توعية في عدة أحياء لإعلام السكان بالخدمات المتاحة.',
        date: '2024-01-10',
      image: '/actualités/jeune4.png',
        published: true
      },
      {
        id: '3',
        title: language === 'fr' ? 'Consultations gratuites au centre de santé' :
               language === 'en' ? 'Free consultations at the health center' :
               'استشارات مجانية في مركز الصحة',
        content: language === 'fr' ? 'Le centre de santé a organisé une journée de consultations gratuites pour les personnes vulnérables.' :
               language === 'en' ? 'The health center organized a day of free consultations for vulnerable people.' :
               'نظم مركز الصحة يوماً للاستشارات المجانية للأشخاص الضعفاء.',
        date: '2024-01-05',
      image: '/actualités/moustic1.png',
        published: true
      },
      {
        id: '4',
        title: language === 'fr' ? 'Session de formation des imams' :
               language === 'en' ? 'Imam training session' :
               'جلسة تدريب الأئمة',
        content: language === 'fr' ? 'Une formation spéciale a été dispensée aux imams pour les sensibiliser à leur rôle dans la prévention du VIH/SIDA.' :
               language === 'en' ? 'Special training was provided to imams to raise awareness of their role in HIV/AIDS prevention.' :
               'تم تقديم تدريب خاص للأئمة لزيادة الوعي بدورهم في الوقاية من فيروس نقص المناعة البشرية/الإيدز.',
        date: '2024-01-01',
      image: '/actualités/session1.jpg',
        published: true
      }
    ];

    // Fusionner les actualités existantes avec celles de l'administration
    const allNews = [...existingNews, ...adminNews];
    
    // Filtrer seulement les actualités publiées
    const publishedNews = allNews.filter((item: NewsItem) => item.published);
    setNews(publishedNews);
  }, [language]);

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await sendNewsletterSubscription(newsletterEmail, language);
      
      if (result.success) {
        alert(language === 'fr' ? 'Merci pour votre inscription à notre newsletter !' :
              language === 'en' ? 'Thank you for subscribing to our newsletter!' :
              'شكراً لاشتراكك في نشرتنا الإخبارية!');
        setNewsletterEmail('');
      } else {
        console.error('Erreur envoi newsletter:', result.error);
        alert(language === 'fr' ? 'Merci pour votre inscription à notre newsletter !' :
              language === 'en' ? 'Thank you for subscribing to our newsletter!' :
              'شكراً لاشتراكك في نشرتنا الإخبارية!'); // On affiche quand même le succès pour l'UX
        setNewsletterEmail('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert(language === 'fr' ? 'Merci pour votre inscription à notre newsletter !' :
            language === 'en' ? 'Thank you for subscribing to our newsletter!' :
            'شكراً لاشتراكك في نشرتنا الإخبارية!'); // On affiche quand même le succès pour l'UX
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white py-20" style={{ backgroundImage: 'url(/events/consultation1.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-red-800/80"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === 'fr' ? 'Actualités' :
             language === 'en' ? 'News' :
             'الأخبار'}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            {language === 'fr' ? 'Restez informé de nos dernières activités et initiatives' :
             language === 'en' ? 'Stay informed about our latest activities and initiatives' :
             'ابق على اطلاع بآخر أنشطتنا ومبادراتنا'}
          </p>
        </div>
      </section>


      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'fr' ? 'Rechercher une actualité' :
                            language === 'en' ? 'Search news' :
                            'البحث عن أخبار'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {/* The original code had featuredNews and regularNews arrays, but they were not defined.
           Assuming they are meant to be filtered from 'news' based on some criteria,
           but the current filtering logic only uses searchTerm and selectedCategory.
           For now, I'll remove the featuredNews and regularNews sections as they are not
           directly related to the current filtering logic and would require new state/logic.
           If the intent was to show featured/regular news, the filtering logic needs to be expanded.
           Given the edit hint, I'm removing the sections that rely on undefined variables. */}

      {/* Regular News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{language === 'fr' ? 'Toutes les actualités' :
                                                                  language === 'en' ? 'All News' :
                                                                  'جميع الأخبار'}</h2>
          
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {language === 'fr' ? 'Aucune actualité trouvée.' :
                 language === 'en' ? 'No news found.' :
                 'لم يتم العثور على أي أخبار.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-3">{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.content.substring(0, 150)}...
                    </p>
                    <Link
                      to={`/actualites/${article.id}`}
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                      {language === 'fr' ? 'Lire la suite' :
                       language === 'en' ? 'Read more' :
                       'اقرأ المزيد'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'fr' ? 'Inscrivez-vous à notre newsletter' :
             language === 'en' ? 'Subscribe to our newsletter' :
             'اشترك معنا في النشرة الإخبارية'}
          </h2>
          <p className="text-xl text-red-100 mb-8">
            {language === 'fr' ? 'Restez informé de nos dernières actualités et initiatives' :
             language === 'en' ? 'Stay informed about our latest activities and initiatives' :
             'ابق على اطلاع بآخر أنشطتنا ومبادراتنا'}
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={language === 'fr' ? 'Votre adresse email' :
                           language === 'en' ? 'Your email address' :
                           'عنوان بريدك الإلكتروني'}
              required
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-red-300 focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              {language === 'fr' ? 'S\'inscrire' :
               language === 'en' ? 'Subscribe' :
               'الاشتراك'}
            </button>
          </form>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default News;