import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Save, Upload, Globe, Building } from 'lucide-react';
import FileUpload from './FileUpload';
import { sendPartnerNotification } from '../services/resendService';

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

interface PartnerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const PartnerForm: React.FC<PartnerFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState(initialData || {
    name: '',
    acronym: '',
    logo: '',
    description: '',
    website: '',
    category: '',
    collaboration: '',
    logoFile: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const processSubmission = async (data: any) => {
      try {
        // Soumettre les données au parent
        onSubmit(data);
        
        // Envoyer l'email de notification
        await sendPartnerNotification(data, language);
        
        onClose();
      } catch (error) {
        console.error('Erreur lors de la soumission:', error);
        onClose(); // Fermer même en cas d'erreur
      }
    };
    
    // Si un fichier logo a été uploadé, le convertir en base64
    if (formData.logoFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const logoBase64 = reader.result as string;
        processSubmission({ ...formData, logo: logoBase64 });
      };
      reader.readAsDataURL(formData.logoFile);
    } else {
      processSubmission(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoSelect = (file: File | null) => {
    setFormData((prev: any) => ({
      ...prev,
      logoFile: file
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {initialData 
              ? (language === 'fr' ? 'Modifier le partenaire' : 
                 language === 'en' ? 'Edit partner' : 
                 'تعديل الشريك')
              : (language === 'fr' ? 'Ajouter un partenaire' : 
                 language === 'en' ? 'Add a partner' : 
                 'إضافة شريك')
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
          {/* Nom du partenaire */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Nom du partenaire' :
               language === 'en' ? 'Partner name' :
               'اسم الشريك'} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Acronyme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Acronyme' :
               language === 'en' ? 'Acronym' :
               'الاختصار'}
            </label>
            <input
              type="text"
              name="acronym"
              value={formData.acronym}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Catégorie' :
               language === 'en' ? 'Category' :
               'الفئة'} *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">
                {language === 'fr' ? 'Sélectionner une catégorie' :
                 language === 'en' ? 'Select a category' :
                 'اختر فئة'}
              </option>
              <option value="international">
                {language === 'fr' ? 'Partenaires Internationaux' :
                 language === 'en' ? 'International Partners' :
                 'الشركاء الدوليون'}
              </option>
              <option value="national">
                {language === 'fr' ? 'Partenaires Nationaux' :
                 language === 'en' ? 'National Partners' :
                 'الشركاء الوطنيون'}
              </option>
              <option value="technical">
                {language === 'fr' ? 'Partenaires Techniques' :
                 language === 'en' ? 'Technical Partners' :
                 'الشركاء التقنيون'}
              </option>
              <option value="other">
                {language === 'fr' ? 'Autres partenaires techniques et de soutien' :
                 language === 'en' ? 'Other Technical and Support Partners' :
                 'شركاء تقنيون وداعمون آخرون'}
              </option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Description' :
               language === 'en' ? 'Description' :
               'الوصف'} *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Site web */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Site web' :
               language === 'en' ? 'Website' :
               'الموقع الإلكتروني'}
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                <Globe className="h-4 w-4" />
              </span>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://exemple.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Logo upload */}
          <FileUpload
            onFileSelect={handleLogoSelect}
            acceptedTypes={['image/*']}
            maxSize={5}
            currentFile={formData.logoFile || formData.logo}
            label={language === 'fr' ? 'Logo du partenaire' :
                   language === 'en' ? 'Partner logo' :
                   'شعار الشريك'}
          />

          {/* Collaboration depuis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'fr' ? 'Collaboration depuis' :
               language === 'en' ? 'Collaboration since' :
               'التعاون منذ'}
            </label>
            <input
              type="text"
              name="collaboration"
              value={formData.collaboration}
              onChange={handleInputChange}
              placeholder="Depuis 2020"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

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

export default PartnerForm; 