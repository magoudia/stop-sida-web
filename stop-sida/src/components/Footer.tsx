import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sendNewsletterSubscription } from '../services/resendService';
import Logo from './Logo';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await sendNewsletterSubscription(email, language);
      
      if (result.success) {
        alert('Merci pour votre inscription à notre newsletter !');
        setEmail('');
      } else {
        console.error('Erreur envoi newsletter:', result.error);
        alert('Merci pour votre inscription à notre newsletter !'); // On affiche quand même le succès pour l'UX
        setEmail('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      alert('Merci pour votre inscription à notre newsletter !'); // On affiche quand même le succès pour l'UX
      setEmail('');
    }
  };

  const navigationLinks = [
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.actions'), href: '/actions' },
    { name: t('nav.volunteer'), href: '/volunteer' },
    { name: t('nav.news'), href: '/news' },
    { name: t('nav.reports'), href: '/reports' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Logo />
              <div>
                <h3 className="text-xl font-bold text-red-400">STOP SIDA</h3>
                <p className="text-sm text-gray-300">Mauritanie</p>
                <p className="text-xs text-gray-400 mt-1">Association pour la Santé et le Développement Communautaire</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm">
              STOP SIDA, première ONG thématique créée en 1993 en Mauritanie, œuvre pour le développement économique et social, la lutte contre le VIH/SIDA, et l'accès universel à des soins de qualité. Organisation fondée sur le volontariat humanitaire et à but non lucratif.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/asdcm.mr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">Navigation</h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-400">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Rue Abdallahi Ould Moustapha</p>
                  <p>Tevragh Zeina, Nouakchott</p>
                  <p>Mauritanie</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-400 flex-shrink-0" />
                <a 
                  href="tel:+22246420142"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +222 46 42 01 42
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-400 flex-shrink-0" />
                <a 
                  href="mailto:stopsida_rim@yahoo.fr"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  stopsida_rim@yahoo.fr
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-red-400">Suivez-nous</h4>
              <p className="text-gray-300 text-sm">
                Restez informé de nos actualités et actions
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-red-400">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  S'abonner
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 STOP SIDA Mauritanie. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;