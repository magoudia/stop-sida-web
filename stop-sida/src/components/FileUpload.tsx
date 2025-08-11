import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Upload, File, Image, X, Download, Eye } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedTypes?: string[];
  maxSize?: number; // en MB
  currentFile?: string | File;
  label?: string;
  required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = ['image/*', '.pdf'],
  maxSize = 10, // 10MB par défaut
  currentFile,
  label,
  required = false
}) => {
  const { language } = useLanguage();
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError('');
    
    // Vérifier la taille du fichier
    if (file.size > maxSize * 1024 * 1024) {
      setError(language === 'fr' 
        ? `Le fichier est trop volumineux. Taille maximale : ${maxSize}MB`
        : language === 'en'
        ? `File is too large. Maximum size: ${maxSize}MB`
        : `الملف كبير جداً. الحجم الأقصى: ${maxSize}MB`
      );
      return;
    }

    // Vérifier le type de fichier
    const isValidType = acceptedTypes.some(type => {
      if (type.includes('*')) {
        return file.type.startsWith(type.replace('*', ''));
      }
      return file.type === type || file.name.toLowerCase().endsWith(type);
    });

    if (!isValidType) {
      setError(language === 'fr'
        ? 'Type de fichier non supporté. Utilisez des images ou des PDF.'
        : language === 'en'
        ? 'Unsupported file type. Use images or PDFs.'
        : 'نوع الملف غير مدعوم. استخدم الصور أو ملفات PDF.'
      );
      return;
    }

    // Créer un aperçu pour les images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }

    onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setPreview('');
    setError('');
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getFileIcon = (fileName?: string | File) => {
    if (!fileName) return <File className="h-8 w-8 text-gray-500" />;
    
    // Si c'est un objet File, extraire le nom
    const name = typeof fileName === 'string' ? fileName : fileName.name;
    
    if (name.toLowerCase().endsWith('.pdf')) {
      return <File className="h-8 w-8 text-red-500" />;
    }
    return <Image className="h-8 w-8 text-blue-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && '*'}
        </label>
      )}

      {/* Zone de téléchargement */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${error ? 'border-red-500 bg-red-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {!preview && !currentFile ? (
          <div>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              {language === 'fr'
                ? 'Glissez-déposez un fichier ici, ou cliquez pour sélectionner'
                : language === 'en'
                ? 'Drag and drop a file here, or click to select'
                : 'اسحب وأفلت ملف هنا، أو انقر للاختيار'
              }
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {language === 'fr'
                ? `Types acceptés : Images, PDF (max ${maxSize}MB)`
                : language === 'en'
                ? `Accepted types: Images, PDF (max ${maxSize}MB)`
                : `الأنواع المقبولة: الصور، PDF (الحد الأقصى ${maxSize}MB)`
              }
            </p>
            <button
              type="button"
              onClick={openFileDialog}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {language === 'fr' ? 'Choisir un fichier' :
               language === 'en' ? 'Choose file' :
               'اختر ملف'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Aperçu du fichier */}
            <div className="flex items-center justify-center">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-32 max-w-full rounded-lg object-contain"
                />
              ) : currentFile ? (
                <div className="flex items-center space-x-3">
                  {getFileIcon(currentFile)}
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {typeof currentFile === 'string' 
                        ? currentFile.split('/').pop() || 'Fichier'
                        : (currentFile as File)?.name || 'Fichier'
                      }
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === 'fr' ? 'Fichier actuel' :
                       language === 'en' ? 'Current file' :
                       'الملف الحالي'}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Actions */}
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                onClick={openFileDialog}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-1" />
                {language === 'fr' ? 'Remplacer' :
                 language === 'en' ? 'Replace' :
                 'استبدال'}
              </button>
              <button
                type="button"
                onClick={removeFile}
                className="inline-flex items-center px-3 py-1 border border-red-300 text-sm rounded-md text-red-700 bg-white hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-1" />
                {language === 'fr' ? 'Supprimer' :
                 language === 'en' ? 'Remove' :
                 'حذف'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FileUpload; 