import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Lock, Users, FileText, Newspaper, Settings, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import AdminForm from '../components/AdminForm';
import PartnerForm from '../components/PartnerForm';

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

interface News {
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

interface Partner {
  id: string;
  name: string;
  acronym?: string;
  logo: string;
  description: string;
  website: string;
  category: string;
  collaboration?: string;
}

const Admin: React.FC = () => {
  const { language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'dashboard' | 'reports' | 'news' | 'partners'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Credentials (en production, utilisez une API sécurisée)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'stop-sida-2024'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setCurrentView('dashboard');
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      alert(language === 'fr' ? 'Identifiants incorrects' : 
            language === 'en' ? 'Incorrect credentials' : 
            'بيانات اعتماد غير صحيحة');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
    localStorage.removeItem('adminAuthenticated');
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuthenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
  }, []);

  // Déconnexion automatique après 5 minutes d'inactivité
  React.useEffect(() => {
    if (!isAuthenticated) return;
    let timeout: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsAuthenticated(false);
        setCurrentView('login');
        localStorage.removeItem('adminAuthenticated');
        alert(language === 'fr' ? 'Déconnecté pour cause d\'inactivité.' :
              language === 'en' ? 'Logged out due to inactivity.' :
              'تم تسجيل الخروج بسبب عدم النشاط');
      }, 5 * 60 * 1000); // 5 minutes
    };
    // Écoute des événements utilisateur
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    resetTimer();
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [isAuthenticated, language]);

  // Fonctions de gestion des données
  const handleAddReport = (data: any) => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      year: data.year,
      file: data.file || '',
      fileName: data.fileName,
      fileSize: data.fileSize,
      fileType: data.fileType,
      category: data.category
    };
    setReports(prev => {
      const updated = [...prev, newReport];
      localStorage.setItem('adminReports', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddNews = (data: any) => {
    const newNews: News = {
      id: Date.now().toString(),
      title: data.title,
      content: data.content,
      image: data.file || data.image || '',
      imageName: data.fileName,
      imageSize: data.fileSize,
      imageType: data.fileType,
      date: new Date().toISOString().split('T')[0],
      published: data.published
    };
    setNews(prev => {
      const updated = [...prev, newNews];
      localStorage.setItem('adminNews', JSON.stringify(updated));
      return updated;
    });
  };

  const handleEditReport = (id: string) => {
    const report = reports.find(r => r.id === id);
    if (report) {
      setEditingItem(report);
      setShowReportForm(true);
    }
  };

  const handleEditNews = (id: string) => {
    const newsItem = news.find(n => n.id === id);
    if (newsItem) {
      setEditingItem(newsItem);
      setShowNewsForm(true);
    }
  };

  const handleDeleteReport = (id: string) => {
    if (confirm(language === 'fr' ? 'Êtes-vous sûr de vouloir supprimer ce rapport ?' :
               language === 'en' ? 'Are you sure you want to delete this report?' :
               'هل أنت متأكد من حذف هذا التقرير؟')) {
      const updatedReports = reports.filter(r => r.id !== id);
      setReports(updatedReports);
      localStorage.setItem('adminReports', JSON.stringify(updatedReports));
    }
  };

  const handleDeleteNews = (id: string) => {
    if (confirm(language === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cette actualité ?' :
               language === 'en' ? 'Are you sure you want to delete this news?' :
               'هل أنت متأكد من حذف هذا الخبر؟')) {
      const updatedNews = news.filter(n => n.id !== id);
      setNews(updatedNews);
      localStorage.setItem('adminNews', JSON.stringify(updatedNews));
    }
  };

  const handleAddPartner = (data: any) => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: data.name,
      acronym: data.acronym,
      logo: data.logo,
      description: data.description,
      website: data.website,
      category: data.category,
      collaboration: data.collaboration
    };
    setPartners(prev => {
      const updated = [...prev, newPartner];
      localStorage.setItem('adminPartners', JSON.stringify(updated));
      return updated;
    });
  };

  const handleEditPartner = (id: string) => {
    const partner = partners.find(p => p.id === id);
    if (partner) {
      setEditingItem(partner);
      setShowPartnerForm(true);
    }
  };

  const handleDeletePartner = (id: string) => {
    if (confirm(language === 'fr' ? 'Êtes-vous sûr de vouloir supprimer ce partenaire ?' :
               language === 'en' ? 'Are you sure you want to delete this partner?' :
               'هل أنت متأكد من حذف هذا الشريك؟')) {
      const updatedPartners = partners.filter(p => p.id !== id);
      setPartners(updatedPartners);
      localStorage.setItem('adminPartners', JSON.stringify(updatedPartners));
    }
  };

  // Charger les données au démarrage
  useEffect(() => {
    const savedReports = localStorage.getItem('adminReports');
    const savedNews = localStorage.getItem('adminNews');
    const savedPartners = localStorage.getItem('adminPartners');
    
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
    if (savedNews) {
      setNews(JSON.parse(savedNews));
    }
    if (savedPartners) {
      setPartners(JSON.parse(savedPartners));
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
              <Lock className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {language === 'fr' ? 'Administration' :
               language === 'en' ? 'Administration' :
               'الإدارة'}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {language === 'fr' ? 'Connectez-vous pour accéder au panel d\'administration' :
               language === 'en' ? 'Sign in to access the administration panel' :
               'تسجيل الدخول للوصول إلى لوحة الإدارة'}
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  {language === 'fr' ? 'Nom d\'utilisateur' :
                   language === 'en' ? 'Username' :
                   'اسم المستخدم'}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder={language === 'fr' ? 'Nom d\'utilisateur' :
                             language === 'en' ? 'Username' :
                             'اسم المستخدم'}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  {language === 'fr' ? 'Mot de passe' :
                   language === 'en' ? 'Password' :
                   'كلمة المرور'}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder={language === 'fr' ? 'Mot de passe' :
                             language === 'en' ? 'Password' :
                             'كلمة المرور'}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {language === 'fr' ? 'Se connecter' :
                 language === 'en' ? 'Sign in' :
                 'تسجيل الدخول'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'fr' ? 'Tableau de bord' :
           language === 'en' ? 'Dashboard' :
           'لوحة التحكم'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Bienvenue dans le panel d\'administration de STOP SIDA' :
           language === 'en' ? 'Welcome to the STOP SIDA administration panel' :
           'مرحباً بك في لوحة إدارة STOP SIDA'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setCurrentView('reports')}
        >
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'fr' ? 'Rapports' :
                 language === 'en' ? 'Reports' :
                 'التقارير'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' ? 'Gérer les rapports' :
                 language === 'en' ? 'Manage reports' :
                 'إدارة التقارير'}
              </p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setCurrentView('news')}
        >
          <div className="flex items-center">
            <Newspaper className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'fr' ? 'Actualités' :
                 language === 'en' ? 'News' :
                 'الأخبار'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' ? 'Gérer les actualités' :
                 language === 'en' ? 'Manage news' :
                 'إدارة الأخبار'}
              </p>
            </div>
          </div>
        </div>

        <div 
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => setCurrentView('partners')}
        >
          <div className="flex items-center">
            <Users className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {language === 'fr' ? 'Partenaires' :
                 language === 'en' ? 'Partners' :
                 'الشركاء'}
              </h3>
              <p className="text-gray-600">
                {language === 'fr' ? 'Gérer les partenaires' :
                 language === 'en' ? 'Manage partners' :
                 'إدارة الشركاء'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'fr' ? 'Gestion des rapports' :
           language === 'en' ? 'Reports Management' :
           'إدارة التقارير'}
        </h2>
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
          onClick={() => {
            setEditingItem(null);
            setShowReportForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Ajouter' :
           language === 'en' ? 'Add' :
           'إضافة'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Titre' :
                 language === 'en' ? 'Title' :
                 'العنوان'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Année' :
                 language === 'en' ? 'Year' :
                 'السنة'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Catégorie' :
                 language === 'en' ? 'Category' :
                 'الفئة'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Fichier' :
                 language === 'en' ? 'File' :
                 'الملف'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Actions' :
                 language === 'en' ? 'Actions' :
                 'الإجراءات'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  {language === 'fr' ? 'Aucun rapport disponible' :
                   language === 'en' ? 'No reports available' :
                   'لا توجد تقارير متاحة'}
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.fileName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-red-600 hover:text-red-900 mr-3"
                      onClick={() => handleEditReport(report.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteReport(report.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNews = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'fr' ? 'Gestion des actualités' :
           language === 'en' ? 'News Management' :
           'إدارة الأخبار'}
        </h2>
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
          onClick={() => {
            setEditingItem(null);
            setShowNewsForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Ajouter' :
           language === 'en' ? 'Add' :
           'إضافة'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Titre' :
                 language === 'en' ? 'Title' :
                 'العنوان'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Date' :
                 language === 'en' ? 'Date' :
                 'التاريخ'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Statut' :
                 language === 'en' ? 'Status' :
                 'الحالة'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Actions' :
                 language === 'en' ? 'Actions' :
                 'الإجراءات'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  {language === 'fr' ? 'Aucune actualité disponible' :
                   language === 'en' ? 'No news available' :
                   'لا توجد أخبار متاحة'}
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.published 
                        ? (language === 'fr' ? 'Publié' : language === 'en' ? 'Published' : 'منشور')
                        : (language === 'fr' ? 'Brouillon' : language === 'en' ? 'Draft' : 'مسودة')
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900 mr-3" onClick={() => handleEditNews(item.id)}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteNews(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPartners = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'fr' ? 'Gestion des partenaires' :
           language === 'en' ? 'Partners Management' :
           'إدارة الشركاء'}
        </h2>
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
          onClick={() => {
            setEditingItem(null);
            setShowPartnerForm(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          {language === 'fr' ? 'Ajouter' :
           language === 'en' ? 'Add' :
           'إضافة'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Partenaire' :
                 language === 'en' ? 'Partner' :
                 'الشريك'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Catégorie' :
                 language === 'en' ? 'Category' :
                 'الفئة'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Site web' :
                 language === 'en' ? 'Website' :
                 'الموقع الإلكتروني'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'fr' ? 'Actions' :
                 language === 'en' ? 'Actions' :
                 'الإجراءات'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partners.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  {language === 'fr' ? 'Aucun partenaire disponible' :
                   language === 'en' ? 'No partners available' :
                   'لا توجد شركاء متاحين'}
                </td>
              </tr>
            ) : (
              partners.map((partner) => (
                <tr key={partner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {partner.logo && (
                        <img
                          className="h-10 w-10 rounded-full mr-3"
                          src={partner.logo}
                          alt={partner.name}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {partner.name}
                        </div>
                        {partner.acronym && (
                          <div className="text-sm text-gray-500">
                            {partner.acronym}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {partner.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {partner.website ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:text-red-900"
                      >
                        {language === 'fr' ? 'Voir le site' :
                         language === 'en' ? 'View site' :
                         'عرض الموقع'}
                      </a>
                    ) : (
                      <span className="text-gray-400">
                        {language === 'fr' ? 'Non disponible' :
                         language === 'en' ? 'Not available' :
                         'غير متاح'}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-red-600 hover:text-red-900 mr-3"
                      onClick={() => handleEditPartner(partner.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeletePartner(partner.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                STOP SIDA - {language === 'fr' ? 'Administration' :
                              language === 'en' ? 'Administration' :
                              'الإدارة'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'dashboard'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {language === 'fr' ? 'Tableau de bord' :
                 language === 'en' ? 'Dashboard' :
                 'لوحة التحكم'}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                {language === 'fr' ? 'Déconnexion' :
                 language === 'en' ? 'Logout' :
                 'تسجيل الخروج'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentView === 'dashboard' && renderDashboard()}
        {currentView === 'reports' && renderReports()}
        {currentView === 'news' && renderNews()}
        {currentView === 'partners' && renderPartners()}
      </main>

      {/* Formulaires */}
      <AdminForm
        type="report"
        isOpen={showReportForm}
        onClose={() => {
          setShowReportForm(false);
          setEditingItem(null);
        }}
        onSubmit={handleAddReport}
        initialData={editingItem}
      />

      <AdminForm
        type="news"
        isOpen={showNewsForm}
        onClose={() => {
          setShowNewsForm(false);
          setEditingItem(null);
        }}
        onSubmit={handleAddNews}
        initialData={editingItem}
      />

      <PartnerForm
        isOpen={showPartnerForm}
        onClose={() => {
          setShowPartnerForm(false);
          setEditingItem(null);
        }}
        onSubmit={handleAddPartner}
        initialData={editingItem}
      />

      <ScrollToTop />
    </div>
  );
};

export default Admin;