import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, logPageView } from '../utils/analytics';

const GoogleAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialiser Google Analytics au montage du composant
    initGA();
  }, []);

  useEffect(() => {
    // Suivre les changements de page
    logPageView(location.pathname + location.search);
  }, [location]);

  return null; // Ce composant ne rend rien visuellement
};

export default GoogleAnalytics; 