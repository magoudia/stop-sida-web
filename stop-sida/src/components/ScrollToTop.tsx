import React from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110 z-50"
      aria-label="Retour en haut"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop; 