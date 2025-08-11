import React, { useEffect } from 'react';
import { ExternalLink, Handshake, Globe, Building, Heart, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';

const Partners: React.FC = () => {
  const { t, language } = useLanguage();

  const [categories, setCategories] = React.useState<any[]>([]);

  // Mettre à jour les catégories quand la langue change
  useEffect(() => {
    const updatedCategories = [
      {
        title: language === 'fr' ? 'Partenaires Internationaux' :
               language === 'en' ? 'International Partners' :
               'الشركاء الدوليون',
        icon: Globe,
        description: language === 'fr' ? 'Organisations internationales et agences de coopération' :
                     language === 'en' ? 'International organizations and cooperation agencies' :
                     'المنظمات الدولية ووكالات التعاون',
        partners: [
          {
            name: language === 'fr' ? 'Organisation Mondiale de la Santé' :
                   language === 'en' ? 'World Health Organization' :
                   'منظمة الصحة العالمية',
            acronym: language === 'fr' ? 'OMS' :
                     language === 'en' ? 'WHO' :
                     'OMS',
            logo: '/partners/international/oms.png',
            description: language === 'fr' ? 'Partenariat stratégique pour le renforcement des systèmes de santé et la lutte contre le VIH/SIDA.' :
                         language === 'en' ? 'Strategic partnership for strengthening health systems and HIV/AIDS response.' :
                         'شراكة استراتيجية لتعزيز أنظمة الصحة ومكافحة فيروس نقص المناعة البشرية/الإيدز.',
            website: 'https://www.who.int',
            collaboration: language === 'fr' ? 'Depuis 2018' :
                           language === 'en' ? 'Since 2018' :
                           'منذ 2018'
          },
          {
            name: language === 'fr' ? 'Agence Américaine pour le Développement International' :
                   language === 'en' ? 'United States Agency for International Development' :
                   'الوكالة الأمريكية للتنمية الدولية',
            acronym: 'USAID',
            logo: '/partners/international/usaid.png',
            description: language === 'fr' ? 'Financement des programmes de lutte contre le VIH/SIDA et de développement sanitaire.' :
                         language === 'en' ? 'Funding for HIV/AIDS programs and health development.' :
                         'تمويل برامج مكافحة فيروس نقص المناعة البشرية/الإيدز والتنمية الصحية.',
            website: 'https://www.usaid.gov',
            collaboration: language === 'fr' ? 'Depuis 2017' :
                           language === 'en' ? 'Since 2017' :
                           'منذ 2017'
          },
          {
            name: language === 'fr' ? 'Fonds Mondial de Lutte contre le SIDA, la Tuberculose et le Paludisme' :
                   language === 'en' ? 'Global Fund to Fight AIDS, Tuberculosis and Malaria' :
                   'الصندوق العالمي لمكافحة الإيدز والسل والملاريا',
            acronym: language === 'fr' ? 'Fonds Mondial' :
                     language === 'en' ? 'Global Fund' :
                     'Fonds Mondial',
            logo: '/partners/international/fond_mondial.png',
            description: language === 'fr' ? 'Financement des programmes de prévention et de traitement du VIH/SIDA.' :
                         language === 'en' ? 'Funding for HIV/AIDS prevention and treatment programs.' :
                         'تمويل برامج الوقاية والعلاج من فيروس نقص المناعة البشرية/الإيدز.',
            website: 'https://www.worldbank.org',
            collaboration: language === 'fr' ? 'Depuis 2019' :
                           language === 'en' ? 'Since 2019' :
                           'منذ 2019'
          },
          {
            name: language === 'fr' ? 'Organisation Internationale pour les Migrations' :
                   language === 'en' ? 'International Organization for Migration' :
                   'المنظمة الدولية للهجرة',
            acronym: language === 'fr' ? 'OIM' :
                     language === 'en' ? 'IOM' :
                     'OIM',
            logo: '/partners/international/iom.png',
            description: language === 'fr' ? 'Soutien aux migrants et aux populations vulnérables en matière de santé.' :
                         language === 'en' ? 'Support for migrants and vulnerable populations in health matters.' :
                         'دعم المهاجرين والفئات الضعيفة في مجال الصحة.',
            website: 'https://www.iom.int',
            collaboration: language === 'fr' ? 'Depuis 2020' :
                           language === 'en' ? 'Since 2020' :
                           'منذ 2020'
          },
          {
            name: language === 'fr' ? 'Programme des Nations Unies pour le Développement' :
                   language === 'en' ? 'United Nations Development Programme' :
                   'برنامج الأمم المتحدة الإنمائي',
            acronym: language === 'fr' ? 'PNUD' :
                     language === 'en' ? 'UNDP' :
                     'PNUD',
            logo: '/partners/international/undp.png',
            description: language === 'fr' ? 'Soutien aux projets de développement durable et de santé communautaire.' :
                         language === 'en' ? 'Support for sustainable development and community health projects.' :
                         'دعم مشاريع التنمية المستدامة والصحة المجتمعية.',
            website: 'https://www.undp.org',
            collaboration: language === 'fr' ? 'Depuis 2015' :
                           language === 'en' ? 'Since 2015' :
                           'منذ 2015'
          },
          {
            name: language === 'fr' ? 'Fonds des Nations Unies pour la Population' :
                   language === 'en' ? 'United Nations Population Fund' :
                   'صندوق الأمم المتحدة للسكان',
            acronym: 'UNFPA',
            logo: '/partners/international/unfpa.png',
            description: language === 'fr' ? 'Promotion de la santé reproductive et des droits des femmes.' :
                         language === 'en' ? 'Promoting reproductive health and women\'s rights.' :
                         'تعزيز الصحة الإنجابية وحقوق المرأة.',
            website: 'https://www.unfpa.org',
            collaboration: language === 'fr' ? 'Depuis 2016' :
                           language === 'en' ? 'Since 2016' :
                           'منذ 2016'
          }
        ]
      },
      {
        title: language === 'fr' ? 'Partenaires Institutionnels Nationaux' :
               language === 'en' ? 'National Institutional Partners' :
               'الشركاء المؤسسيون الوطنيون',
        icon: Building,
        description: language === 'fr' ? 'Institutions gouvernementales et organisations nationales' :
                     language === 'en' ? 'Government institutions and national organizations' :
                     'المؤسسات الحكومية والمنظمات الوطنية',
        partners: [
          {
            name: 'SENLS',
            logo: '/partners/civil-society/senls.png',
            description: language === 'fr' ? 'Secrétariat Exécutif National de lutte contre le Sida (SENLS) : Financement du fond mondial' :
                         language === 'en' ? 'National Executive Secretariat for the Fight against AIDS (SENLS): Global Fund financing' :
                         'الأمانة التنفيذية الوطنية لمكافحة السيدا (SENLS): تمويل الصندوق العالمي',
            website: 'https://senls.mr',
            collaboration: ''
          },
          {
            name: language === 'fr' ? 'Ministère de la Santé' :
                   language === 'en' ? 'Ministry of Health' :
                   'وزارة الصحة',
            acronym: language === 'fr' ? 'MS' :
                     language === 'en' ? 'MS' :
                     'MS',
            logo: '/partners/national/ministere_sante.png',
            description: language === 'fr' ? 'Partenariat institutionnel pour la mise en œuvre des politiques de santé publique.' :
                         language === 'en' ? 'Institutional partnership for implementing public health policies.' :
                         'شراكة مؤسسية لتنفيذ سياسات الصحة العامة.',
            website: 'https://sante.gov.mr',
            collaboration: language === 'fr' ? 'Depuis 1993' :
                           language === 'en' ? 'Since 1993' :
                           'منذ 1993'
          },
          {
            name: language === 'fr' ? 'Programme National d\'Éducation pour la Santé' :
                   language === 'en' ? 'National Health Education Program' :
                   'البرنامج الوطني للتربية الصحية',
            acronym: 'PNEPS',
            logo: '/partners/national/MS PNEPS.png',
            description: language === 'fr' ? 'Collaboration pour les programmes d\'éducation et de sensibilisation en santé.' :
                         language === 'en' ? 'Collaboration for health education and awareness programs.' :
                         'التعاون في برامج التربية والتوعية الصحية.',
            website: 'https://pneps.mr',
            collaboration: language === 'fr' ? 'Depuis 2015' :
                           language === 'en' ? 'Since 2015' :
                           'منذ 2015'
          }
        ]
      },
      {
        title: language === 'fr' ? 'Partenaires Techniques' :
               language === 'en' ? 'Technical Partners' :
               'الشركاء التقنيون',
        icon: Handshake,
        description: language === 'fr' ? 'Partenaires techniques et de mise en œuvre' :
                     language === 'en' ? 'Technical and implementation partners' :
                     'الشركاء التقنيون وشركاء التنفيذ',
        partners: [
          {
            name: 'ELLES DU SAHEL (EDS)',
            logo: '/partners/technical/ELLES_DU_SAHEL.png',
            description: language === 'fr' ? "Collaboration pour l'autonomisation des femmes et la santé reproductive. L'ONG est partenaire." :
                         language === 'en' ? "Collaboration for women's empowerment and reproductive health. The NGO is a partner." :
                         "تعاون لتمكين المرأة والصحة الإنجابية. المنظمة شريك.",
            website: '#',
          },
          {
            name: language === 'fr' ? 'Palladium' :
                   language === 'en' ? 'Palladium' :
                   'بالاديوم',
            acronym: 'Palladium',
            logo: '/partners/technical/palladium.png',
            description: language === 'fr' ? 'Partenariat pour le développement et l\'évaluation des programmes.' :
                         language === 'en' ? 'Partnership for program development and evaluation.' :
                         'شراكة لتطوير البرامج وتقييمها.',
            website: '#',
            collaboration: language === 'fr' ? 'Depuis 2020' :
                           language === 'en' ? 'Since 2020' :
                           'منذ 2020'
          },
          {
            name: language === 'fr' ? 'Peace Corps' :
                   language === 'en' ? 'Peace Corps' :
                   'فيلق السلام',
            acronym: 'PC',
            logo: '/partners/technical/peace_corps.png',
            description: language === 'fr' ? 'Collaboration pour les programmes de volontariat et de développement communautaire.' :
                         language === 'en' ? 'Collaboration for volunteer and community development programs.' :
                         'تعاون في برامج التطوع وتنمية المجتمع.',
            website: '#',
            collaboration: language === 'fr' ? 'Depuis 2017' :
                           language === 'en' ? 'Since 2017' :
                           'منذ 2017'
          },
          {
            name: language === 'fr' ? 'Propel' :
                   language === 'en' ? 'Propel' :
                   'بروبل',
            acronym: 'Propel',
            logo: '/partners/technical/propel.png',
            description: language === 'fr' ? 'Soutien technique pour l\'innovation et le développement de projets.' :
                         language === 'en' ? 'Technical support for innovation and project development.' :
                         'دعم تقني للابتكار وتطوير المشاريع.',
            website: '#',
            collaboration: language === 'fr' ? 'Depuis 2021' :
                           language === 'en' ? 'Since 2021' :
                           'منذ 2021'
          },
          {
            name: language === 'fr' ? 'Public Tech' :
                   language === 'en' ? 'Public Tech' :
                   'بابليك تيك',
            acronym: 'PT',
            logo: '/partners/technical/publiC Tech.png',
            description: language === 'fr' ? 'Partenariat pour les solutions technologiques en santé publique.' :
                         language === 'en' ? 'Partnership for technological solutions in public health.' :
                         'شراكة من أجل الحلول التكنولوجية في الصحة العامة.',
            website: '#',
            collaboration: language === 'fr' ? 'Depuis 2022' :
                           language === 'en' ? 'Since 2022' :
                           'منذ 2022'
          },
          {
            name: language === 'fr' ? 'SIRCOMA' :
                   language === 'en' ? 'SIRCOMA' :
                   'سيركوما',
            acronym: 'SIRCOMA',
            logo: '/partners/technical/sircoma.png',
            description: language === 'fr' ? 'Collaboration pour les services de santé et la formation médicale.' :
                         language === 'en' ? 'Collaboration for health services and medical training.' :
                         'تعاون في الخدمات الصحية والتدريب الطبي.',
            website: '#',
            collaboration: language === 'fr' ? 'Depuis 2015' :
                           language === 'en' ? 'Since 2015' :
                           'منذ 2015'
          },
          {
            name: 'Tasghif',
            acronym: 'Tasghif',
            logo: '/partners/technical/taskhaf.png',
            description: language === 'fr' ? 'Collaboration pour les programmes d\'éducation et de sensibilisation.' :
                         language === 'en' ? 'Collaboration for education and awareness programs.' :
                         'تعاون في برامج التربية والتوعية.',
            website: '#',
            collaboration: 'Depuis 2019'
          }
        ]
      },
      {
        title: language === 'fr' ? 'Autres partenaires techniques et de soutien' :
               language === 'en' ? 'Other Technical and Support Partners' :
               'شركاء تقنيون وداعمون آخرون',
        icon: Users,
        description: '',
        partners: [
          {
            name: language === 'fr' ? 'Pharma' :
                   language === 'en' ? 'Pharma' :
                   'فارما',
            logo: '/partners/technical/pharma.png',
            description: language === 'fr' ? 'Partenariat pour l\'accès aux médicaments et produits de santé.' :
                         language === 'en' ? 'Partnership for access to medicines and health products.' :
                         'شراكة من أجل الوصول إلى الأدوية والمنتجات الصحية.',
            website: 'https://chinguitypharma.com',
            collaboration: language === 'fr' ? 'Depuis 2016' :
                           language === 'en' ? 'Since 2016' :
                           'منذ 2016'
          },
          {
            name: 'BAMIS',
            logo: '/partners/technical/bamis.png',
            description: language === 'fr' ? 'Partenariat technique pour le renforcement des capacités et la formation.' :
                         language === 'en' ? 'Technical partnership for capacity building and training.' :
                         'شراكة تقنية لتعزيز القدرات والتدريب.',
            website: 'https://bamis.mr',
            collaboration: language === 'fr' ? 'Depuis 2018' :
                           language === 'en' ? 'Since 2018' :
                           'منذ 2018'
          },
          {
            name: language === 'fr' ? 'Ciment de Mauritanie' :
                   language === 'en' ? 'Ciment de Mauritanie' :
                   'اسمنت موريتانيا',
            logo: '/partners/technical/Societe Ciment Mauritanie.png',
            description: language === 'fr' ? 'Partenariat pour le soutien aux projets communautaires et de développement.' :
                         language === 'en' ? 'Partnership for support to community and development projects.' :
                         'شراكة لدعم المشاريع المجتمعية والتنموية.',
            website: 'https://ciment-mauritanie.com',
            collaboration: language === 'fr' ? 'Depuis 2018' :
                           language === 'en' ? 'Since 2018' :
                           'منذ 2018'
          },
          {
            name: 'BMI',
            logo: '/bmi.png',
            description: language === 'fr' ? "Soutien logistique et matériel aux actions de l'association." :
                         language === 'en' ? "Logistical and material support for the association's activities." :
                         'دعم لوجستي ومادي لأنشطة الجمعية.',
            website: 'https://bmi.mr',
            collaboration: ''
          }
        ]
      }
    ];
    setCategories(updatedCategories);
  }, [language]);

  const achievements = [
    {
      title: t('partners.trust.title'),
      items: [
        t('partners.achievements.item1'),
        t('partners.achievements.item2'),
        t('partners.achievements.item3'),
        t('partners.achievements.item4'),
        t('partners.achievements.item5'),
        t('partners.achievements.item6')
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white py-20" style={{ backgroundImage: 'url(/events/visite_du_ministre_de_la_culture1.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 to-red-800/80"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('partners.title')}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('partners.trust.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('partners.trust.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements[0].items.map((item, index) => (
              <div
                key={index}
                className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600"
              >
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners by Category */}
      {categories.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-gray-900">
                    {category.title}
                  </h2>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.partners.map((partner, partnerIndex) => (
                <div
                  key={partnerIndex}
                  className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 transform transition-transform duration-500 opacity-0 translate-y-4 animate-fadeInUp hover:scale-105"
                  style={{ animationDelay: `${partnerIndex * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="flex items-start mb-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-14 h-14 object-contain rounded-lg mr-4 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {partner.name}{('acronym' in partner && partner.acronym) ? ` (${partner.acronym})` : ''}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {partner.description}
                  </p>
                  
                  {partner.website !== '#' && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors"
                    >
                      {t('partners.visit.website')}
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Partnership Statistics */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('partners.network.title')}
            </h2>
            <p className="text-xl text-red-100">
              {t('partners.network.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-red-100">{t('partners.stats.active')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15</div>
              <div className="text-red-100">{t('partners.stats.countries')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">31</div>
              <div className="text-red-100">{t('partners.stats.years')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-red-100">{t('partners.stats.projects')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('partners.approach.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('partners.approach.winwin.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('partners.approach.winwin.desc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('partners.approach.skills.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('partners.approach.skills.desc')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t('partners.approach.alliances.title')}
                    </h3>
                    <p className="text-gray-600">
                      {t('partners.approach.alliances.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="/partners/partenariat.jpeg"
                alt="Partenariats STOP SIDA"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === 'fr' ? 'Devenez notre partenaire' :
             language === 'en' ? 'Become our partner' :
             'كن شريكنا'}
          </h2>
          <p className="text-xl text-red-100 mb-8">
            {language === 'fr' ? 'Rejoignez notre réseau de partenaires et contribuez à la lutte contre le VIH/SIDA' :
             language === 'en' ? 'Join our partner network and contribute to the fight against HIV/AIDS' :
             'انضم إلى شبكة شركائنا وساهم في مكافحة فيروس نقص المناعة البشرية/الإيدز'}
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

export default Partners;