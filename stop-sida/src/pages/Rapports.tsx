import React, { useState, useEffect } from 'react';
import { Download, FileText, Calendar, Eye, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';
import { Link } from 'react-router-dom';
import { strapiService, transformRapport } from '../services/strapiService';

interface Report {
  id: string;
  title: string;
  description: string;
  year: string;
  file: string;
  category: string;
  fileName?: string; // Added for base64 files
}

const Reports: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [reports, setReports] = useState<Report[]>([]);
  
  // Calculer les statistiques basées sur les rapports réels
  const calculateStats = () => {
    const totalDocuments = reports.length;
    const annualReports = reports.filter(r => r.category === 'annual').length;
    const studiesReports = reports.filter(r => r.category === 'project').length;
    const financialReports = reports.filter(r => r.category === 'financial').length;
    
    // Simuler des téléchargements basés sur l'ancienneté et la popularité
    const totalDownloads = reports.reduce((total, report) => {
      const year = parseInt(report.year);
      const currentYear = new Date().getFullYear();
      const age = currentYear - year;
      // Plus le rapport est récent, plus il a de téléchargements
      const baseDownloads = Math.max(100, 500 - (age * 50));
      return total + baseDownloads;
    }, 0);
    
    return {
      totalDocuments,
      annualReports,
      studiesReports,
      financialReports,
      totalDownloads
    };
  };

  const reportTypes = [
    { id: 'all', name: language === 'fr' ? 'Tous les documents' : 
                    language === 'en' ? 'All Documents' : 
                    'جميع الوثائق' },
    { id: 'annual', name: language === 'fr' ? 'Rapport annuel' : 
                    language === 'en' ? 'Annual report' : 
                    'التقرير السنوي' },
    { id: 'project', name: language === 'fr' ? 'Rapport de projet' : 
                    language === 'en' ? 'Project report' : 
                    'تقرير المشروع' },
    { id: 'financial', name: language === 'fr' ? 'Rapport financier' : 
                    language === 'en' ? 'Financial report' : 
                    'التقرير المالي' }
  ];

  const years = ['all', '2024', '2023', '2022', '2021', '2020', '2019'];

  // Charger les rapports depuis Strapi et fusionner avec les existants
  useEffect(() => {
    const loadReports = async () => {
      try {
        // Charger les rapports depuis Strapi
        const strapiResponse = await strapiService.getRapports({ pageSize: 50 });
        const strapiReports = strapiResponse.data.map((item: any) => transformRapport(item));
        
        // Charger les rapports depuis l'administration locale
    const savedReports = localStorage.getItem('adminReports');
    const adminReports = savedReports ? JSON.parse(savedReports) : [];
    
    // Rapports existants (hardcodés)
    const existingReports: Report[] = [
      {
        id: '1',
        title: language === 'fr' ? 'Rapport annuel 2023' :
               language === 'en' ? 'Annual Report 2023' :
               'التقرير السنوي 2023',
        description: language === 'fr' ? 'Rapport complet des activités de l\'ONG STOP SIDA pour l\'année 2023' :
               language === 'en' ? 'Complete report of STOP SIDA NGO activities for 2023' :
               'تقرير شامل لأنشطة منظمة STOP SIDA لعام 2023',
        year: '2023',
        file: '/reports/rapport-annuel-2023.pdf',
        category: 'annual'
      },
      {
        id: '2',
        title: language === 'fr' ? 'Rapport de projet - Prévention VIH' :
               language === 'en' ? 'Project Report - HIV Prevention' :
               'تقرير المشروع - الوقاية من فيروس نقص المناعة البشرية',
        description: language === 'fr' ? 'Évaluation du projet de prévention du VIH dans les communautés rurales' :
               language === 'en' ? 'Evaluation of HIV prevention project in rural communities' :
               'تقييم مشروع الوقاية من فيروس نقص المناعة البشرية في المجتمعات الريفية',
        year: '2023',
        file: '/reports/projet-prevention-2023.pdf',
        category: 'project'
      },
      {
        id: '3',
        title: language === 'fr' ? 'Rapport financier 2023' :
               language === 'en' ? 'Financial Report 2023' :
               'التقرير المالي 2023',
        description: language === 'fr' ? 'Bilan financier détaillé de l\'exercice 2023' :
               language === 'en' ? 'Detailed financial statement for fiscal year 2023' :
               'البيان المالي المفصل للسنة المالية 2023',
        year: '2023',
        file: '/reports/rapport-financier-2023.pdf',
        category: 'financial'
          },
          {
            id: '4',
            title: language === 'fr' ? 'Rapport annuel 2022' :
                   language === 'en' ? 'Annual Report 2022' :
                   'التقرير السنوي 2022',
            description: language === 'fr' ? 'Rapport complet des activités de l\'ONG STOP SIDA pour l\'année 2022' :
                   language === 'en' ? 'Complete report of STOP SIDA NGO activities for 2022' :
                   'تقرير شامل لأنشطة منظمة STOP SIDA لعام 2022',
            year: '2022',
            file: '/reports/rapport-annuel-2022.pdf',
            category: 'annual'
          },
          {
            id: '5',
            title: language === 'fr' ? 'Étude sur la prévalence du VIH' :
                   language === 'en' ? 'HIV Prevalence Study' :
                   'دراسة انتشار فيروس نقص المناعة البشرية',
            description: language === 'fr' ? 'Étude épidémiologique sur la prévalence du VIH en Mauritanie' :
                   language === 'en' ? 'Epidemiological study on HIV prevalence in Mauritania' :
                   'دراسة وبائية حول انتشار فيروس نقص المناعة البشرية في موريتانيا',
            year: '2022',
            file: '/reports/etude-prevalence-2022.pdf',
            category: 'project'
          },
          {
            id: '6',
            title: language === 'fr' ? 'Rapport de projet - Sensibilisation' :
                   language === 'en' ? 'Project Report - Awareness' :
                   'تقرير المشروع - التوعية',
            description: language === 'fr' ? 'Campagne de sensibilisation sur le VIH/SIDA dans les écoles' :
                   language === 'en' ? 'HIV/AIDS awareness campaign in schools' :
                   'حملة توعية حول فيروس نقص المناعة البشرية/الإيدز في المدارس',
            year: '2022',
            file: '/reports/projet-sensibilisation-2022.pdf',
            category: 'project'
          },
          {
            id: '7',
            title: language === 'fr' ? 'Rapport financier 2022' :
                   language === 'en' ? 'Financial Report 2022' :
                   'التقرير المالي 2022',
            description: language === 'fr' ? 'Bilan financier détaillé de l\'exercice 2022' :
                   language === 'en' ? 'Detailed financial statement for fiscal year 2022' :
                   'البيان المالي المفصل للسنة المالية 2022',
            year: '2022',
            file: '/reports/rapport-financier-2022.pdf',
            category: 'financial'
          },
          {
            id: '8',
            title: language === 'fr' ? 'Rapport annuel 2021' :
                   language === 'en' ? 'Annual Report 2021' :
                   'التقرير السنوي 2021',
            description: language === 'fr' ? 'Rapport complet des activités de l\'ONG STOP SIDA pour l\'année 2021' :
                   language === 'en' ? 'Complete report of STOP SIDA NGO activities for 2021' :
                   'تقرير شامل لأنشطة منظمة STOP SIDA لعام 2021',
            year: '2021',
            file: '/reports/rapport-annuel-2021.pdf',
            category: 'annual'
          },
          {
            id: '9',
            title: language === 'fr' ? 'Étude sur les comportements à risque' :
                   language === 'en' ? 'Risk Behavior Study' :
                   'دراسة السلوكيات المحفوفة بالمخاطر',
            description: language === 'fr' ? 'Analyse des comportements à risque chez les jeunes' :
                   language === 'en' ? 'Analysis of risk behaviors among youth' :
                   'تحليل السلوكيات المحفوفة بالمخاطر بين الشباب',
            year: '2021',
            file: '/reports/etude-comportements-2021.pdf',
            category: 'project'
          },
          {
            id: '10',
            title: language === 'fr' ? 'Rapport de projet - Formation' :
                   language === 'en' ? 'Project Report - Training' :
                   'تقرير المشروع - التدريب',
            description: language === 'fr' ? 'Programme de formation des éducateurs pairs' :
                   language === 'en' ? 'Peer educator training program' :
                   'برنامج تدريب المربين الأقران',
            year: '2021',
            file: '/reports/projet-formation-2021.pdf',
            category: 'project'
          }
        ];

        // Fusionner tous les rapports : Strapi + Admin + Existants
        const allReports = [...existingReports, ...adminReports, ...strapiReports];
    setReports(allReports);
        
        console.log('Rapports chargés depuis Strapi:', strapiReports);
             } catch (error) {
         console.error('Erreur lors du chargement des rapports depuis Strapi:', error);
         // En cas d'erreur, charger seulement les rapports locaux
         const savedReports = localStorage.getItem('adminReports');
         const adminReports = savedReports ? JSON.parse(savedReports) : [];
         
         // Rapports existants (hardcodés) pour le fallback
         const fallbackReports: Report[] = [
           {
             id: '1',
             title: language === 'fr' ? 'Rapport annuel 2023' :
                    language === 'en' ? 'Annual Report 2023' :
                    'التقرير السنوي 2023',
             description: language === 'fr' ? 'Rapport complet des activités de l\'ONG STOP SIDA pour l\'année 2023' :
                    language === 'en' ? 'Complete report of STOP SIDA NGO activities for 2023' :
                    'تقرير شامل لأنشطة منظمة STOP SIDA لعام 2023',
             year: '2023',
             file: '/reports/rapport-annuel-2023.pdf',
             category: 'annual'
           }
         ];
         
         setReports([...fallbackReports, ...adminReports]);
       }
    };

    loadReports();
  }, [language]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = selectedYear === 'all' || report.year === selectedYear;
    const matchesType = selectedType === 'all' || report.category === selectedType;
    return matchesSearch && matchesYear && matchesType;
  });

  const handleDownload = (report: Report) => {
    if (report.file) {
      // Si c'est un fichier base64 (uploadé via admin)
      if (report.file.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = report.file;
        link.download = report.fileName || `rapport-${report.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Si c'est un fichier externe (URL)
        const link = document.createElement('a');
        link.href = report.file;
        link.download = report.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      alert(language === 'fr' ? 'Fichier non disponible pour le moment' :
            language === 'en' ? 'File not available at the moment' :
            'الملف غير متاح في الوقت الحالي');
    }
  };

  const handlePreview = (reportId: string) => {
    // Simulate preview
    console.log(`Previewing report ${reportId}`);
    alert(language === 'fr' ? 'Fonctionnalité de prévisualisation à venir' : 
          language === 'en' ? 'Preview feature coming soon' : 
          'ميزة المعاينة قريباً');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('reports.title')}
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            {t('reports.subtitle')}
          </p>
        </div>
      </section>


      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={
                  language === 'fr' ? 'Rechercher dans les documents...' : 
                  language === 'en' ? 'Search in documents...' : 
                  'ابحث في الوثائق...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {reportTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">
                    {language === 'fr' ? 'Toutes les années' : 
                     language === 'en' ? 'All Years' : 
                     'جميع السنوات'}
                  </option>
                  {years.filter(year => year !== 'all').map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports List */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {language === 'fr' ? 'Pas de rapports pour le moment' :
                 language === 'en' ? 'No reports available at the moment' :
                 'لا توجد تقارير متاحة في الوقت الحالي'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                {language === 'fr' ? 'Aucun rapport n\'est actuellement disponible. Revenez plus tard pour consulter nos publications.' :
                 language === 'en' ? 'No reports are currently available. Come back later to view our publications.' :
                 'لا توجد تقارير متاحة حالياً. عد لاحقاً لتصفح منشوراتنا.'}
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {language === 'fr' ? 'Rapports disponibles' :
                 language === 'en' ? 'Available Reports' :
                 'التقارير المتاحة'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => (
                <div
                  key={report.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {report.title}
                  </h3>
                        <p className="text-gray-600 text-sm mb-3">
                    {report.description}
                  </p>
                        <div className="flex items-center justify-between">
                          <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            {reportTypes.find(type => type.id === report.category)?.name || report.category}
                          </span>
                          <p className="text-sm text-gray-500">{report.year}</p>
                    </div>
                    </div>
                  </div>
                  
                    <div className="flex space-x-2">
                      {report.file && (
                        <button
                          onClick={() => handleDownload(report)}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-2" />
                          {language === 'fr' ? 'Télécharger' :
                           language === 'en' ? 'Download' :
                           'تحميل'}
                         </button>
                       )}
                       <Link
                         to={`/rapports/${report.id}`}
                         className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                         {language === 'fr' ? 'Lire la suite' :
                          language === 'en' ? 'Read more' :
                          'اقرأ المزيد'}
                       </Link>
                  </div>
                </div>
              ))}
            </div>
            </>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('reports.stats.library')}
            </h2>
            <p className="text-xl text-red-100">
              {t('reports.stats.collection')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {calculateStats().totalDocuments}+
              </div>
              <div className="text-red-100">{t('reports.stats.documents')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {calculateStats().annualReports}
              </div>
              <div className="text-red-100">{t('reports.stats.annual')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {calculateStats().studiesReports}
              </div>
              <div className="text-red-100">{t('reports.stats.studies')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {calculateStats().totalDownloads.toLocaleString()}+
              </div>
              <div className="text-red-100">{t('reports.stats.downloads')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('reports.cta.title')}
          </h2>
          <p className="text-xl text-red-100 mb-8">
            {t('reports.cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors"
            >
              {t('reports.cta.contact')}
            </a>
            <a
              href="mailto:contact@stopsida.mr"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors"
            >
              {t('reports.cta.email')}
            </a>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default Reports;