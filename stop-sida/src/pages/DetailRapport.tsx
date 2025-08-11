import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Download, FileText, ArrowLeft, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ScrollToTop from '../components/ScrollToTop';

interface Report {
  id: string;
  title: string;
  description: string;
  year: string;
  file: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  category: string;
}

const DetailRapport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Charger tous les rapports
      const savedReports = localStorage.getItem('adminReports');
      const adminReports: Report[] = savedReports ? JSON.parse(savedReports) : [];
      
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
        }
      ];

      const allReports = [...existingReports, ...adminReports];
      const foundReport = allReports.find(r => r.id === id);
      
      if (foundReport) {
        setReport(foundReport);
      }
      setLoading(false);
    }
  }, [id, language]);

  const handleDownload = () => {
    if (report?.file) {
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

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'annual':
        return language === 'fr' ? 'Rapport annuel' :
               language === 'en' ? 'Annual report' :
               'التقرير السنوي';
      case 'project':
        return language === 'fr' ? 'Rapport de projet' :
               language === 'en' ? 'Project report' :
               'تقرير المشروع';
      case 'financial':
        return language === 'fr' ? 'Rapport financier' :
               language === 'en' ? 'Financial report' :
               'التقرير المالي';
      default:
        return category;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {language === 'fr' ? 'Chargement...' :
             language === 'en' ? 'Loading...' :
             'جاري التحميل...'}
          </p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {language === 'fr' ? 'Rapport non trouvé' :
             language === 'en' ? 'Report not found' :
             'التقرير غير موجود'}
          </h2>
          <p className="text-gray-600 mb-4">
            {language === 'fr' ? 'Le rapport que vous recherchez n\'existe pas ou a été supprimé.' :
             language === 'en' ? 'The report you are looking for does not exist or has been deleted.' :
             'التقرير الذي تبحث عنه غير موجود أو تم حذفه.'}
          </p>
          <Link
            to="/rapports"
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'fr' ? 'Retour aux rapports' :
             language === 'en' ? 'Back to reports' :
             'العودة إلى التقارير'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link
              to="/rapports"
              className="flex items-center text-gray-600 hover:text-red-600 transition-colors mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Retour aux rapports' :
               language === 'en' ? 'Back to reports' :
               'العودة إلى التقارير'}
            </Link>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mr-3">
                  {getCategoryName(report.category)}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {report.year}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {report.title}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {report.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="text-center py-12">
              <FileText className="mx-auto h-16 w-16 text-gray-400 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {language === 'fr' ? 'Contenu du rapport' :
                 language === 'en' ? 'Report content' :
                 'محتوى التقرير'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {language === 'fr' ? 'Ce rapport contient des informations détaillées sur nos activités, nos réalisations et nos perspectives pour l\'avenir.' :
                 language === 'en' ? 'This report contains detailed information about our activities, achievements and future prospects.' :
                 'يحتوي هذا التقرير على معلومات مفصلة حول أنشطتنا وإنجازاتنا وآفاقنا المستقبلية.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {report.file && (
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {language === 'fr' ? 'Télécharger le rapport' :
                     language === 'en' ? 'Download report' :
                     'تحميل التقرير'}
                  </button>
                )}
                <button
                  onClick={() => {
                    if (report.file) {
                      window.open(report.file, '_blank');
                    } else {
                      alert(language === 'fr' ? 'Fichier non disponible pour le moment' :
                            language === 'en' ? 'File not available at the moment' :
                            'الملف غير متاح في الوقت الحالي');
                    }
                  }}
                  className="inline-flex items-center px-6 py-3 border border-red-600 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  {language === 'fr' ? 'Voir le rapport' :
                   language === 'en' ? 'View report' :
                   'عرض التقرير'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default DetailRapport; 