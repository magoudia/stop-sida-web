import React, { useState, useEffect } from 'react';
import { strapiService } from '../services/strapiService';

const StrapiDebug: React.FC = () => {
  const [status, setStatus] = useState<string>('Chargement...');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testStrapi = async () => {
      try {
        setStatus('Test de connexion à Strapi...');
        
        // Test simple de l'API
        const response = await strapiService.getRapports({ pageSize: 5 });
        
        setData(response);
        setStatus(`✅ Connexion réussie ! ${response.data.length} rapports trouvés`);
        
        console.log('Données Strapi:', response);
      } catch (err: any) {
        setError(err.message);
        setStatus('❌ Erreur de connexion');
        console.error('Erreur Strapi:', err);
      }
    };

    testStrapi();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">🔧 Debug Strapi</h2>
      
      <div className="mb-4">
        <strong>Status:</strong> {status}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Erreur:</strong> {error}
        </div>
      )}

      {data && (
        <div className="mb-4">
          <strong>Données reçues:</strong>
          <pre className="mt-2 p-4 bg-gray-100 rounded text-sm overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p><strong>URL Strapi:</strong> {import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337'}</p>
        <p><strong>Token API:</strong> {import.meta.env.VITE_STRAPI_API_TOKEN ? '✅ Configuré' : '❌ Manquant'}</p>
      </div>
    </div>
  );
};

export default StrapiDebug; 