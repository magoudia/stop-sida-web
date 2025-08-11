import React, { useState } from 'react';
import { Facebook, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SocialBar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const { t } = useLanguage();

  if (!visible) return null;

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-3 bg-white shadow-lg rounded-l-xl px-3 py-4 border border-gray-200">
      <button
        onClick={() => setVisible(false)}
        className="mb-2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={t('social.close')}
      >
        <X className="h-4 w-4" />
      </button>
      <a
        href="https://www.facebook.com/asdcm.mr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 transition-colors"
        aria-label="Facebook"
      >
        <Facebook className="h-6 w-6" />
      </a>
    </div>
  );
};

export default SocialBar; 