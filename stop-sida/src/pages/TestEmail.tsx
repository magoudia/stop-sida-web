import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  sendContactNotification,
  sendVolunteerNotification,
  sendNewsletterSubscription,
  sendReportNotification,
  sendNewsNotification,
  sendPartnerNotification,
  testEmailConfiguration
} from '../services/resendService';

const TestEmail: React.FC = () => {
  const { t, language } = useLanguage();
  const [testResults, setTestResults] = useState<{ [key: string]: { success: boolean; message: string } }>({});
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

  // Données de test pour les formulaires
  const testContactData = {
    name: 'Test Contact',
    email: 'test@example.com',
    phone: '+22212345678',
    type: 'general',
    message: 'Ceci est un message de test pour le formulaire de contact.'
  };

  const testVolunteerData = {
    name: 'Test Bénévole',
    email: 'volunteer@example.com',
    phone: '+22212345678',
    age: '25',
    skills: 'Informatique, Communication',
    availability: 'Weekends',
    motivation: 'Je souhaite contribuer à la lutte contre le VIH/SIDA.'
  };

  const testReportData = {
    title: 'Rapport de Test',
    description: 'Description du rapport de test',
    file: null,
    date: new Date().toISOString().split('T')[0]
  };

  const testNewsData = {
    title: 'Actualité de Test',
    content: 'Contenu de l\'actualité de test',
    published: true,
    date: new Date().toISOString().split('T')[0]
  };

  const testPartnerData = {
    name: 'Partenaire Test',
    description: 'Description du partenaire test',
    website: 'https://example.com',
    category: 'national',
    logo: null
  };

  const testEmail = 'test@example.com';

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    setIsLoading(prev => ({ ...prev, [testName]: true }));
    setTestResults(prev => ({ ...prev, [testName]: { success: false, message: 'Test en cours...' } }));

    try {
      const result = await testFunction();
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          success: result.success,
          message: result.success ? 'Test réussi !' : `Erreur: ${result.error}`
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [testName]: {
          success: false,
          message: `Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`
        }
      }));
    } finally {
      setIsLoading(prev => ({ ...prev, [testName]: false }));
    }
  };

  const testContactEmail = () => runTest('contact', () => sendContactNotification(testContactData, language));
  const testVolunteerEmail = () => runTest('volunteer', () => sendVolunteerNotification(testVolunteerData, language));
  const testNewsletterEmail = () => runTest('newsletter', () => sendNewsletterSubscription(testEmail, language));
  const testReportEmail = () => runTest('report', () => sendReportNotification(testReportData, language));
  const testNewsEmail = () => runTest('news', () => sendNewsNotification(testNewsData, language));
  const testPartnerEmail = () => runTest('partner', () => sendPartnerNotification(testPartnerData, language));
  const testEmailConfig = () => runTest('config', () => testEmailConfiguration());

  const TestButton: React.FC<{ 
    testName: string; 
    label: string; 
    onClick: () => void; 
    description: string;
  }> = ({ testName, label, onClick, description }) => (
    <div className="mb-6 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <p className="text-gray-600 mb-3 text-sm">{description}</p>
      <button
        onClick={onClick}
        disabled={isLoading[testName]}
        className={`px-4 py-2 rounded-md text-white font-medium ${
          isLoading[testName]
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading[testName] ? 'Test en cours...' : 'Lancer le test'}
      </button>
      {testResults[testName] && (
        <div className={`mt-3 p-3 rounded-md text-sm ${
          testResults[testName].success
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {testResults[testName].message}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Page de Test - Envoi d'Emails
          </h1>
          <p className="text-gray-600">
            Cette page permet de tester tous les scénarios d'envoi d'emails configurés dans l'application.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test de configuration */}
          <div className="lg:col-span-2">
            <TestButton
              testName="config"
              label="Test de Configuration Email"
              onClick={testEmailConfig}
              description="Vérifie la configuration générale des emails (API Resend, destinataires, etc.)"
            />
          </div>

          {/* Tests des formulaires utilisateur */}
          <TestButton
            testName="contact"
            label="Test Formulaire Contact"
            onClick={testContactEmail}
            description="Envoie un email de notification à l'équipe et un email de confirmation au contact"
          />

          <TestButton
            testName="volunteer"
            label="Test Formulaire Bénévolat"
            onClick={testVolunteerEmail}
            description="Envoie un email de notification à l'équipe et un email de confirmation au bénévole"
          />

          <TestButton
            testName="newsletter"
            label="Test Inscription Newsletter"
            onClick={testNewsletterEmail}
            description="Envoie un email de confirmation à l'abonné et un email de notification à l'équipe communication"
          />

          {/* Tests des formulaires admin */}
          <TestButton
            testName="report"
            label="Test Formulaire Rapport (Admin)"
            onClick={testReportEmail}
            description="Envoie un email de notification à l'équipe administrative pour un nouveau rapport"
          />

          <TestButton
            testName="news"
            label="Test Formulaire Actualité (Admin)"
            onClick={testNewsEmail}
            description="Envoie un email de notification à l'équipe et aux abonnés newsletter si publié"
          />

          <TestButton
            testName="partner"
            label="Test Formulaire Partenaire (Admin)"
            onClick={testPartnerEmail}
            description="Envoie un email de notification à l'équipe pour un nouveau partenaire"
          />
        </div>

        {/* Résumé des tests */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Résumé des Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(testResults).map(([testName, result]) => (
              <div
                key={testName}
                className={`p-3 rounded-md border ${
                  result.success
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="font-medium capitalize">{testName}</div>
                <div className={`text-sm ${
                  result.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.success ? '✅ Réussi' : '❌ Échec'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informations techniques */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Informations Techniques</h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Langue actuelle:</strong> {language}</p>
            <p><strong>Environnement:</strong> {import.meta.env.MODE}</p>
            <p><strong>API Resend:</strong> {import.meta.env.VITE_RESEND_API_KEY ? 'Configurée' : 'Non configurée'}</p>
            <p><strong>URL API:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:3001'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEmail;

