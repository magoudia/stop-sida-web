import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Save, Calendar, FileText, Image, Eye } from 'lucide-react';
import FileUpload from './FileUpload';
import { sendReportNotification, sendNewsNotification } from '../services/resendService';

interface AdminFormProps {
  type: 'report' | 'news';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const AdminForm: React.FC<AdminFormProps> = ({ type, isOpen, onClose, onSubmit, initialData }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    year: new Date().getFullYear().toString(),
    category: '',
    content: '',
    image: '',
    published: true,
    file: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convertir le fichier en base64 pour le stockage
    const submitData = { ...formData };
    
    const processSubmission = async (data: any) => {
      try {
        // Soumettre les données au parent
        onSubmit(data);
        
        // Envoyer les emails selon le type
        if (type === 'report') {
          await sendReportNotification(data, language);
        } else if (type === 'news') {
          await sendNewsNotification(data, language, data.published);
        }
        
        onClose(); // Fermer le formulaire après l'envoi
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        onClose(); // Fermer même en cas d'erreur
      }
    };
    
    if (formData.file) {
      const reader = new FileReader();
      reader.onload = () => {
        submitData.file = reader.result as string;
        submitData.fileName = formData.file?.name;
        submitData.fileSize = formData.file?.size;
        submitData.fileType = formData.file?.type;
        processSubmission(submitData);
      };
      reader.readAsDataURL(formData.file);
    } else {
      processSubmission(submitData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (file: File | null) => {
    setFormData((prev: any) => ({
      ...prev,
      file: file
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {type === 'report' 
              ? (language === 'fr' ? 'Ajouter un rapport' : 
                 language === 'en' ? 'Add a report' : 
                 'إضافة تقرير')
              : (language === 'fr' ? 'Ajouter une actualité' : 
                 language === 'en' ? 'Add news' : 
                 'إضافة خبر')
            }
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Titre' :
               language === 'en' ? 'Title' :
               'العنوان'} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Description' :
               language === 'en' ? 'Description' :
               'الوصف'}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Year (for reports) */}
          {type === 'report' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Année' :
                 language === 'en' ? 'Year' :
                 'السنة'} *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                min="2000"
                max={new Date().getFullYear() + 1}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Category (for reports) */}
          {type === 'report' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Catégorie' :
                 language === 'en' ? 'Category' :
                 'الفئة'}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">
                  {language === 'fr' ? 'Sélectionner une catégorie' :
                   language === 'en' ? 'Select a category' :
                   'اختر فئة'}
                </option>
                <option value="annual">
                  {language === 'fr' ? 'Rapport annuel' :
                   language === 'en' ? 'Annual report' :
                   'التقرير السنوي'}
                </option>
                <option value="project">
                  {language === 'fr' ? 'Rapport de projet' :
                   language === 'en' ? 'Project report' :
                   'تقرير المشروع'}
                </option>
                <option value="financial">
                  {language === 'fr' ? 'Rapport financier' :
                   language === 'en' ? 'Financial report' :
                   'التقرير المالي'}
                </option>
              </select>
            </div>
          )}

          {/* Content (for news) */}
          {type === 'news' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === 'fr' ? 'Contenu' :
                 language === 'en' ? 'Content' :
                 'المحتوى'} *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'URL de l\'image' :
               language === 'en' ? 'Image URL' :
               'رابط الصورة'}
            </label>
            <div className="flex">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder={language === 'fr' ? 'https://exemple.com/image.jpg' :
                           language === 'en' ? 'https://example.com/image.jpg' :
                           'https://example.com/image.jpg'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
              >
                <FileText className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Published (for news) */}
          {type === 'news' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleInputChange}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                {language === 'fr' ? 'Publier immédiatement' :
                 language === 'en' ? 'Publish immediately' :
                 'نشر فوراً'}
              </label>
            </div>
          )}

          {/* File upload (for reports) */}
          {type === 'report' && (
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedTypes={['.pdf']}
              maxSize={20}
              currentFile={formData.file}
              label={language === 'fr' ? 'Fichier PDF du rapport' :
                     language === 'en' ? 'Report PDF file' :
                     'ملف PDF التقرير'}
            />
          )}

          {/* Image upload (for news) */}
          {type === 'news' && (
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedTypes={['image/*']}
              maxSize={5}
              currentFile={formData.image}
              label={language === 'fr' ? 'Image de l\'actualité' :
                     language === 'en' ? 'News image' :
                     'صورة الخبر'}
            />
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              {language === 'fr' ? 'Annuler' :
               language === 'en' ? 'Cancel' :
               'إلغاء'}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Enregistrer' :
               language === 'en' ? 'Save' :
               'حفظ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminForm; 