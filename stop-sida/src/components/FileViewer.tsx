import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { X, Download, Eye, File, Image } from 'lucide-react';

interface FileViewerProps {
  file: string;
  fileName?: string;
  fileType?: string;
  onClose: () => void;
  isOpen: boolean;
}

const FileViewer: React.FC<FileViewerProps> = ({
  file,
  fileName,
  fileType,
  onClose,
  isOpen
}) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file;
    link.download = fileName || 'file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isImage = fileType?.startsWith('image/') || file.toLowerCase().includes('image');
  const isPDF = fileType === 'application/pdf' || file.toLowerCase().includes('pdf');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            {isImage ? (
              <Image className="h-5 w-5 text-blue-500" />
            ) : (
              <File className="h-5 w-5 text-red-500" />
            )}
            <span className="font-medium text-gray-900">
              {fileName || (language === 'fr' ? 'Fichier' : 
                           language === 'en' ? 'File' : 
                           'ملف')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-1" />
              {language === 'fr' ? 'Télécharger' :
               language === 'en' ? 'Download' :
               'تحميل'}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          )}

          {isImage ? (
            <img
              src={file}
              alt={fileName || 'Image'}
              className="max-w-full h-auto mx-auto"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
            />
          ) : isPDF ? (
            <iframe
              src={file}
              className="w-full h-96 border-0"
              onLoad={() => setLoading(false)}
              title={fileName || 'PDF Document'}
            />
          ) : (
            <div className="text-center py-8">
              <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {language === 'fr' ? 'Aperçu non disponible pour ce type de fichier' :
                 language === 'en' ? 'Preview not available for this file type' :
                 'معاينة غير متاحة لهذا النوع من الملفات'}
              </p>
              <button
                onClick={handleDownload}
                className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <Download className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Télécharger le fichier' :
                 language === 'en' ? 'Download file' :
                 'تحميل الملف'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileViewer; 