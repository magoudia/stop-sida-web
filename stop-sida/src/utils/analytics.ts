import ReactGA from 'react-ga4';

// Remplacez 'G-XXXXXXXXXX' par votre ID de mesure Google Analytics
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Initialiser Google Analytics
export const initGA = () => {
  if (import.meta.env.PROD) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

// Suivre les vues de page
export const logPageView = (path: string) => {
  if (import.meta.env.PROD) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

// Suivre les événements
export const logEvent = (action: string, category: string, label?: string, value?: number) => {
  if (import.meta.env.PROD) {
    ReactGA.event({
      action,
      category,
      label,
      value,
    });
  }
};

// Suivre les clics sur les liens
export const logLinkClick = (linkName: string, linkUrl: string) => {
  if (import.meta.env.PROD) {
    ReactGA.event({
      action: 'click',
      category: 'link',
      label: linkName,
      value: 1,
    });
  }
};

// Suivre les soumissions de formulaire
export const logFormSubmit = (formName: string) => {
  if (import.meta.env.PROD) {
    ReactGA.event({
      action: 'submit',
      category: 'form',
      label: formName,
      value: 1,
    });
  }
}; 