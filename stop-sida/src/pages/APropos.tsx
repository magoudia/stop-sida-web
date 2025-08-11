import React from 'react';
import { Users, Target, Heart, Award, Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: t('about.values.solidarity'),
      description: t('about.values.solidarity.desc'),
    },
    {
      icon: Award,
      title: t('about.values.transparency'),
      description: t('about.values.transparency.desc'),
    },
    {
      icon: Users,
      title: t('about.values.respect'),
      description: t('about.values.respect.desc'),
    },
    {
      icon: Target,
      title: t('about.values.engagement'),
      description: t('about.values.engagement.desc'),
    },
  ];

  const teamMembers = [
    // Première ligne
    {
      name: t('about.team.honorable.full'),
      role: t('about.team.honorable.role'),
      image: '/team/Imam Hademine Saleck.jpg',
      description: t('about.team.honorable.desc'),
    },
    {
      name: t('about.team.president.full'),
      role: t('about.team.president'),
      image: '/team/Fatimetou MAHAM.jpg',
      description: t('about.team.president.desc'),
    },
    {
      name: t('about.team.secretary.full'),
      role: t('about.team.secretary.role'),
      image: '/team/Savia Mohamed Salem.jpg',
      description: t('about.team.secretary.desc'),
    },
    {
      name: t('about.team.treasurer.full'),
      role: t('about.team.treasurer.role'),
      image: '/team/Mahamadou Diawara.jpg',
      description: t('about.team.treasurer.desc'),
    },
    // Deuxième ligne
    {
      name: 'Dr. Ismaïl El moctar',
      role: t('about.team.obstetrics'),
      image: '/team/Dr Ismail Moctar Ndioubnane.jpg',
      description: t('about.team.obstetrics.desc'),
    },
    {
      name: t('about.team.programs.full'),
      role: t('about.team.programs'),
      image: '/team/Aïssa ta Elhadj N’Gaydé.jpg',
      description: t('about.team.programs.desc'),
    },
    {
      name: 'Pr Ahmed el Bara',
      role: t('about.team.microbiology'),
      image: '/team/Dr Ahmed Elbara.jpg',
      description: t('about.team.microbiology.desc'),
    },
  ];

  // Découpage de l'équipe en deux lignes
  const teamLine1 = teamMembers.slice(0, 4);
  const teamLine2 = teamMembers.slice(4);

  const milestones = [
    {
      year: '1993',
      title: t('about.milestones.1993.title'),
      description: t('about.milestones.1993.desc'),
    },
    {
      year: '2000',
      title: t('about.milestones.2000.title'),
      description: (
        <>
          <ul className="list-disc pl-5 space-y-2 text-left">
            <li>
              {language === 'fr' ? 'Première initiative de prise en charge globale des PVVIH (Personnes Vivant avec le VIH) avant l\'inauguration du CTA (Centre de Traitement Ambulatoire) à Nouakchott' : 
               language === 'en' ? 'First comprehensive care initiative for PLHIV (People Living with HIV) before the opening of the CTA (Ambulatory Treatment Center) in Nouakchott' : 
               'أول مبادرة للرعاية الشاملة للأشخاص المتعايشين مع فيروس نقص المناعة البشرية قبل افتتاح مركز العلاج الخارجي في نواكشوط'}
            </li>
            <li>
              {language === 'fr' ? '140 personnes sous ARV (Antirétroviraux)' : 
               language === 'en' ? '140 people on ARV (Antiretrovirals)' : 
               '140 شخصاً على مضادات الفيروسات الرجعية'}
            </li>
            <li>
              {language === 'fr' ? 'Prise en charge psychosociale des personnes affectées et infectées par le Virus VIH (Virus de l\'Immunodéficience Humaine)' : 
               language === 'en' ? 'Psychosocial support for people affected and infected by HIV (Human Immunodeficiency Virus)' : 
               'الدعم النفسي والاجتماعي للأشخاص المتأثرين والمصابين بفيروس نقص المناعة البشرية'}
            </li>
            <li>
              {language === 'fr' ? 'Prise en charge économique de certaines familles (8 AGR - Activités Génératrices de Revenus)' : 
               language === 'en' ? 'Economic support for some families (8 IGA - Income Generating Activities)' : 
               'الدعم الاقتصادي لبعض الأسر (8 أنشطة مولدة للدخل)'}
            </li>
            <li>
              {language === 'fr' ? 'Deux voitures de transport en commun (Taxi) : le revenu permet aux familles d\'avoir un revenu' : 
               language === 'en' ? 'Two public transport cars (Taxi): the income allows families to have a revenue' : 
               'سيارتان للنقل العام (تاكسي): الدخل يسمح للأسر بالحصول على دخل'}
            </li>
            <li>
              {language === 'fr' ? 'Un centre de couture : formation et insertion économique' : 
               language === 'en' ? 'A sewing center: training and economic integration' : 
               'مركز خياطة: تدريب وإدماج اقتصادي'}
            </li>
          </ul>
        </>
      ),
    },
    {
      year: '2010',
      title: t('about.milestones.2010.title'),
      description: t('about.milestones.2010.desc'),
    },
    {
      year: '2017',
      title: t('about.milestones.2017.title'),
      description: t('about.milestones.2017.desc'),
    },
    {
      year: '2020',
      title: language === 'fr' ? 'Premier centre de santé' : 
             language === 'en' ? 'First health center' : 
             'أول مركز صحي',
      description: language === 'fr' ? 'L\'ONG a obtenu son agrément en 2019. Elle a alors loué et occupé un immeuble pendant plusieurs années avant de solliciter la coopération japonaise pour un nouveau centre plus moderne.' : 
                  language === 'en' ? 'The NGO obtained its accreditation in 2019. It then rented and occupied a building for several years before requesting Japanese cooperation for a more modern center.' : 
                  'حصلت المنظمة على اعتمادها في عام 2019. ثم استأجرت واحتلت مبنى لعدة سنوات قبل طلب التعاون الياباني لمركز أكثر حداثة.'
    },
    {
      year: '2024',
      title: language === 'fr' ? 'Inauguration du centre financé par le Japon' : 
             language === 'en' ? 'Inauguration of the Japan-funded center' : 
             'افتتاح المركز الممول من اليابان',
      description: language === 'fr' ? 'Le centre de santé financé par le Japon a été inauguré en 2024. Le centre est moderne et bien équipé par le ministère de la santé.' : 
                  language === 'en' ? 'The Japan-funded health center was inaugurated in 2024. The center is modern and well-equipped by the Ministry of Health.' : 
                  'تم افتتاح المركز الصحي الممول من اليابان في عام تم افتتاح مركز الصحة الممول من اليابان في عام 2024. المركز حديث ومجهز تجهيزاً جيداً من قبل وزارة الصحةتم افتتاح مركز الصحة الممول من اليابان في عام 2024. المركز حديث ومجهز تجهيزاً جيداً.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInDown">
            {t('about.title')}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto animate-fadeInUp">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.history.title')}
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  {t('about.history.description')}
                </p>
                <p>
                  {t('about.history.founded')}
                </p>
                <p>
                  {t('about.history.pioneers').replace('PVVIH', 'PVVIH')}
                </p>
              </div>
              <div className="mt-8 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {t('about.history.founded.year')}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {t('about.history.location')}
                </div>
              </div>
            </div>
            <div>
              <img
                src="/events/activitéfemmeavecElles1.jpg"
                alt={t('about.history.image.alt')}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/events/consultation1.jpg"
                alt={t('about.vision.image.alt')}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.vision.title')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {t('about.vision.description')}
              </p>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-900 mb-3">{t('about.motto.title')}</h3>
                <p className="text-red-800 text-lg font-medium italic">
                  {t('about.motto.text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.values.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.values.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.timeline.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.timeline.subtitle')}
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-red-600"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-2xl font-bold text-red-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Abbreviations Legend Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {language === 'fr' ? 'Légende des abréviations' : 
               language === 'en' ? 'Abbreviations Legend' : 
               'دليل الاختصارات'}
            </h2>
            <p className="text-lg text-gray-600">
              {language === 'fr' ? 'Explications des termes techniques utilisés dans nos documents' : 
               language === 'en' ? 'Explanations of technical terms used in our documents' : 
               'شرح المصطلحات التقنية المستخدمة في وثائقنا'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-red-600 mb-4">
                {language === 'fr' ? 'Termes médicaux' : 
                 language === 'en' ? 'Medical Terms' : 
                 'المصطلحات الطبية'}
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-900">PVVIH : </span>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Personnes Vivant avec le VIH' : 
                     language === 'en' ? 'People Living with HIV' : 
                     'الأشخاص المتعايشون مع فيروس نقص المناعة البشرية'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">ARV : </span>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Antirétroviraux - médicaments utilisés pour traiter l\'infection par le VIH' : 
                     language === 'en' ? 'Antiretrovirals - medications used to treat HIV infection' : 
                     'مضادات الفيروسات الرجعية - أدوية تستخدم لعلاج عدوى فيروس نقص المناعة البشرية'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">CTA : </span>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Centre de Traitement Ambulatoire - structure de prise en charge des PVVIH' : 
                     language === 'en' ? 'Ambulatory Treatment Center - structure for PLHIV care' : 
                     'مركز العلاج الخارجي - هيكل لرعاية الأشخاص المتعايشين مع فيروس نقص المناعة البشرية'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">VIH : </span>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Virus de l\'Immunodéficience Humaine' : 
                     language === 'en' ? 'Human Immunodeficiency Virus' : 
                     'فيروس نقص المناعة البشرية'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-red-600 mb-4">
                {language === 'fr' ? 'Termes économiques' : 
                 language === 'en' ? 'Economic Terms' : 
                 'المصطلحات الاقتصادية'}
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-900">AGR : </span>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Activités Génératrices de Revenus' : 
                     language === 'en' ? 'Income Generating Activities' : 
                     'الأنشطة المولدة للدخل'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">IGA : </span>
                  <span className="text-gray-600">
                    {language === 'fr' ? 'Initiatives de Gestion d\'Activités - projets économiques' : 
                     language === 'en' ? 'Income Generating Initiatives - economic projects' : 
                     'مبادرات توليد الدخل - المشاريع الاقتصادية'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('about.team.description')}
            </p>
          </div>
          {/* Première ligne : 4 membres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {teamLine1.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-lg shadow"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Deuxième ligne : 3 membres centrés */}
          <div className="flex flex-wrap justify-center gap-8">
            {teamLine2.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-full md:w-1/2 lg:w-1/4 max-w-xs"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className={`w-full h-64 object-cover rounded-lg shadow ${
                    member.name === 'Dr. Ismaïl El moctar' ? 'object-top' : ''
                  }`}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
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
            {language === 'fr' ? 'Prêt à nous rejoindre ?' : 
             language === 'en' ? 'Ready to join us?' : 
             'مستعد للانضمام إلينا؟'}
          </h2>
          <p className="text-xl text-red-100 mb-8">
            {language === 'fr' ? 'Découvrez nos actions et contactez-nous pour plus d\'informations' : 
             language === 'en' ? 'Discover our actions and contact us for more information' : 
             'اكتشف أعمالنا واتصل بنا للحصول على مزيد من المعلومات'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              {language === 'fr' ? 'Nous contacter' : 
               language === 'en' ? 'Contact Us' : 
               'اتصل بنا'}
            </a>
            <a
              href="/actions"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              {language === 'fr' ? 'Nos actions' : 
               language === 'en' ? 'Our Actions' : 
               'أعمالنا'}
            </a>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default About;