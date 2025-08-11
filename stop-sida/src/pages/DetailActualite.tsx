import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  published: boolean;
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Charger les actualités depuis l'administration
      const savedNews = localStorage.getItem('adminNews');
      const adminNews: NewsItem[] = savedNews ? JSON.parse(savedNews) : [];
      
      // Actualités existantes (hardcodées)
      const existingNews = [
        {
          id: '1',
          title: language === 'fr' ? 'Formation des jeunes sur la prévention du VIH/SIDA' :
                 language === 'en' ? 'Youth training on HIV/AIDS prevention' :
                 'تدريب الشباب على الوقاية من فيروس نقص المناعة البشرية/الإيدز',
          content: language === 'fr' ? 'Une session de formation intensive a été organisée pour sensibiliser les jeunes aux risques du VIH/SIDA et aux méthodes de prévention. Cette formation a réuni plus de 50 jeunes de différents quartiers de la ville.' :
                 language === 'en' ? 'An intensive training session was organized to raise awareness among young people about HIV/AIDS risks and prevention methods. This training brought together more than 50 young people from different neighborhoods of the city.' :
                 'تم تنظيم جلسة تدريب مكثف لزيادة الوعي بين الشباب حول مخاطر فيروس نقص المناعة البشرية/الإيدز وطرق الوقاية. جمع هذا التدريب أكثر من 50 شاباً من أحياء مختلفة في المدينة.',
          date: '2024-01-15',
      image: '/actualités/formation.jpg',
          published: true
        },
        {
          id: '2',
          title: language === 'fr' ? 'Sensibilisation communautaire dans les quartiers' :
                 language === 'en' ? 'Community awareness in neighborhoods' :
                 'التوعية المجتمعية في الأحياء',
          content: language === 'fr' ? 'Notre équipe a mené des campagnes de sensibilisation dans plusieurs quartiers pour informer la population sur les services disponibles au centre de santé.' :
                 language === 'en' ? 'Our team conducted awareness campaigns in several neighborhoods to inform the population about available services at the health center.' :
                 'نفذ فريقنا حملات توعية في عدة أحياء لإعلام السكان بالخدمات المتاحة في مركز الصحة.',
          date: '2024-01-10',
      image: '/actualités/jeune4.png',
          published: true
        },
        {
          id: '3',
          title: language === 'fr' ? 'Consultations gratuites au centre de santé' :
                 language === 'en' ? 'Free consultations at the health center' :
                 'استشارات مجانية في مركز الصحة',
          content: language === 'fr' ? 'Le centre de santé a organisé une journée de consultations gratuites pour les personnes vulnérables. Plus de 100 personnes ont bénéficié de ces services.' :
                 language === 'en' ? 'The health center organized a day of free consultations for vulnerable people. More than 100 people benefited from these services.' :
                 'نظم مركز الصحة يوماً للاستشارات المجانية للأشخاص الضعفاء. استفاد أكثر من 100 شخص من هذه الخدمات.',
          date: '2024-01-05',
          image: '/actualités/moustic1.png',
          published: true
        },
        {
          id: '4',
          title: language === 'fr' ? 'Session de formation des imams' :
                 language === 'en' ? 'Imam training session' :
                 'جلسة تدريب الأئمة',
          content: language === 'fr' ? 'Une formation spéciale a été dispensée aux imams pour les sensibiliser à leur rôle dans la prévention du VIH/SIDA. Cette initiative vise à mobiliser les leaders religieux dans la lutte contre la maladie.' :
                 language === 'en' ? 'Special training was provided to imams to raise awareness of their role in HIV/AIDS prevention. This initiative aims to mobilize religious leaders in the fight against the disease.' :
                 'تم تقديم تدريب خاص للأئمة لزيادة الوعي بدورهم في الوقاية من فيروس نقص المناعة البشرية/الإيدز. تهدف هذه المبادرة إلى حشد القادة الدينيين في مكافحة المرض.',
          date: '2024-01-01',
      image: '/actualités/session1.jpg',
          published: true
        }
      ];

      const allNews = [...existingNews, ...adminNews];
      const foundArticle = allNews.find(n => n.id === id);
      
      if (foundArticle) {
        setArticle(foundArticle);
      }
      setLoading(false);
    }
  }, [id, language]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>{language === 'fr' ? 'Chargement de l\'actualité...' : 'Loading news...'}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">{language === 'fr' ? 'Actualité non trouvée' : 'News not found'}</h2>
        <Link to="/actualites" className="text-red-600 hover:underline flex items-center"><ArrowLeft className="mr-2" />{language === 'fr' ? 'Retour aux actualités' : 'Back to news'}</Link>
      </div>
    );
  }

  // Galerie pour la deuxième actualité (id: 2)
  const galerieJeunes = [
    '/actualités/jeune1.png',
    '/actualités/jeune2.png',
    '/actualités/jeune3.png',
    '/actualités/jeune4.png',
  ];

  // Galerie pour la troisième actualité (id: 3)
  const galerieMoustiquaires = [
    '/actualités/moustic1.png',
    '/actualités/moustic2.png',
    '/actualités/moustic3.png',
    '/actualités/moustic4.png',
  ];

  // Galerie pour la nouvelle actualité (id: 4)
  const galerieSession1 = [
    '/actualités/session1.jpg',
    '/actualités/session2.jpg',
    '/actualités/session3.jpg',
    '/actualités/session4.jpg',
    '/actualités/session5.jpg',
    '/actualités/session6.jpg',
    '/actualités/session7.jpg',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-72 object-cover" />
        <div className="p-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="mr-4">{article.date}</span>
            <User className="h-4 w-4 mr-2" />
            <span className="mr-4">{article.author}</span>
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
              {article.category === 'training' ? language === 'fr' ? 'Formation' : 'Training' : language === 'fr' ? 'Prévention' : 'Prevention'}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{article.title}</h1>
          <p className="text-lg text-gray-700 mb-8 whitespace-pre-line">{article.content}</p>
          {/* Galerie spécifique pour la deuxième actualité */}
          {article.id === '2' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{language === 'fr' ? 'Activités de la deuxième actualité' : 'Activities of the second news'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {galerieJeunes.map((src, idx) => (
                  <img key={src} src={src} alt={`Jeune ${idx + 1}`} className="w-full h-64 object-cover rounded-lg shadow" />
                ))}
              </div>
            </div>
          )}
          {/* Galerie formation pour la première actualité */}
          {article.id === '1' && (
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <img src="/actualités/formation1.jpg" alt="Formation 1" className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow" />
              <img src="/actualités/formation2.jpg" alt="Formation 2" className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow" />
            </div>
          )}
          {/* Galerie spécifique pour la troisième actualité */}
          {article.id === '3' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{language === 'fr' ? 'Galerie des moustiquaires' : 'Mosquito gallery'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {galerieMoustiquaires.map((src, idx) => (
                  <img key={src} src={src} alt={`Moustiquaire ${idx + 1}`} className="w-full h-64 object-cover rounded-lg shadow" />
                ))}
              </div>
            </div>
          )}
          {/* Galerie spécifique pour la nouvelle actualité (id: 4) */}
          {article.id === '4' && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{language === 'fr' ? 'Galerie de la session 1' : 'Session 1 gallery'}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {galerieSession1.map((src, idx) => (
                  <img key={src} src={src} alt={`Session 1 - ${idx + 1}`} className="w-full h-64 object-cover rounded-lg shadow" />
                ))}
              </div>
            </div>
          )}
          <Link to="/actualites" className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"><ArrowLeft className="mr-2" />{language === 'fr' ? 'Retour aux actualités' : 'Back to news'}</Link>
        </div>
      </div>

      {/* Related News */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {language === 'fr' ? 'Actualités liées' : 'Related news'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Related news items would go here */}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default NewsDetail; 