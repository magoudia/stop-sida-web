import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, Search, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSocialBarVisible, setIsSocialBarVisible] = useState(true);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/a-propos' },
    { name: t('nav.actions'), href: '/actions' },
    { name: t('nav.volunteer'), href: '/benevolat' },
    { name: t('nav.news'), href: '/actualites' },
    { name: t('nav.reports'), href: '/rapports' },
    { name: t('nav.partners'), href: '/partenaires' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <a href="tel:+22246420142" className="flex items-center text-sm hover:text-red-100 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                +222 46 42 01 42
              </a>
              <a href="mailto:stopsida_rim@yahoo.fr" className="flex items-center text-sm hover:text-red-100 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                stopsida_rim@yahoo.fr
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden md:block text-sm">Lun - Ven: 8h00 - 17h00</span>
              
              {/* Admin Link (discret) */}
              {localStorage.getItem('adminAuthenticated') === 'true' && (
                <Link 
                  to="/admin" 
                  className="text-xs text-red-100 hover:text-white transition-colors px-2 py-1 border border-red-400 rounded"
                  title="Administration"
                >
                  Admin
                </Link>
              )}
              
              {/* Test Email Link (discret) */}
              {import.meta.env.MODE === 'development' && (
                <Link 
                  to="/test-email" 
                  className="text-xs text-red-100 hover:text-white transition-colors px-2 py-1 border border-red-400 rounded"
                  title="Test Email"
                >
                  Test Email
                </Link>
              )}
              
              {/* Language Selector in Top Bar */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-1 px-2 py-1 text-sm font-medium text-white hover:text-red-100 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language.toUpperCase()}</span>
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-[9999]">
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as 'fr' | 'en' | 'ar');
                            setIsLanguageOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            language === lang.code
                              ? 'bg-red-50 text-red-600'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <Logo />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-black">Stop Sida</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-red-600 border-b-2 border-red-600 pb-1'
                      : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              >
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.href
                        ? 'text-red-600 bg-red-50'
                        : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Language Selector */}
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Langue</span>
                  </div>
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as 'fr' | 'en' | 'ar');
                          setIsMenuOpen(false);
                        }}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          language === lang.code
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {lang.code.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;