import React, { useState, useEffect } from 'react';
import { strapiService, transformActualite, transformRapport, transformPartenaire } from '../services/strapiService';

interface TestData {
  actualites: any[];
  rapports: any[];
  partenaires: any[];
  loading: boolean;
  error: string | null;
}

const StrapiTest: React.FC = () => {
  const [data, setData] = useState<TestData>({
    actualites: [],
    rapports: [],
    partenaires: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));

        // Récupérer les actualités
        const actualitesResponse = await strapiService.getActualites({ pageSize: 5 });
        const actualites = actualitesResponse.data.map(transformActualite);

        // Récupérer les rapports
        const rapportsResponse = await strapiService.getRapports({ pageSize: 5 });
        const rapports = rapportsResponse.data.map(transformRapport);

        // Récupérer les partenaires
        const partenairesResponse = await strapiService.getPartenaires();
        const partenaires = partenairesResponse.data.map(transformPartenaire);

        setData({
          actualites,
          rapports,
          partenaires,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Erreur inconnue'
        }));
      }
    };

    fetchData();
  }, []);

  if (data.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données depuis Strapi...</p>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 text-lg font-semibold mb-2">Erreur de connexion</h2>
          <p className="text-red-600 mb-4">{data.error}</p>
          <div className="text-sm text-red-500">
            <p>Vérifiez que :</p>
            <ul className="list-disc list-inside mt-2">
              <li>Strapi est démarré sur http://localhost:1337</li>
              <li>Les modèles de contenu sont créés</li>
              <li>Les variables d'environnement sont configurées</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test d'intégration Strapi
          </h1>
          <p className="text-gray-600">
            Données récupérées depuis le CMS Strapi
          </p>
        </div>

        {/* Actualités */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Actualités ({data.actualites.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.actualites.map((actualite) => (
              <div key={actualite.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {actualite.image && (
                  <img 
                    src={actualite.image} 
                    alt={actualite.titre}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {actualite.titre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {actualite.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{actualite.categorie}</span>
                    <span>{new Date(actualite.date_publication).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rapports */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Rapports ({data.rapports.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.rapports.map((rapport) => (
              <div key={rapport.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {rapport.titre}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {rapport.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{rapport.annee}</span>
                  <span>{rapport.categorie}</span>
                </div>
                {rapport.fichier && (
                  <a 
                    href={rapport.fichier}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Télécharger
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partenaires */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Partenaires ({data.partenaires.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.partenaires.map((partenaire) => (
              <div key={partenaire.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  {partenaire.logo && (
                    <img 
                      src={partenaire.logo} 
                      alt={partenaire.nom}
                      className="w-16 h-16 object-contain mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {partenaire.nom}
                    </h3>
                    {partenaire.acronyme && (
                      <p className="text-sm text-gray-500">{partenaire.acronyme}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {partenaire.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{partenaire.categorie}</span>
                  <span>{partenaire.statut}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Prochaines étapes
          </h3>
          <div className="text-blue-800 space-y-2">
            <p>✅ Strapi est configuré et fonctionnel</p>
            <p>📝 Créez du contenu via l'interface d'administration Strapi</p>
            <p>🔗 Intégrez ces données dans vos pages React</p>
            <p>🎨 Personnalisez l'affichage selon vos besoins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrapiTest; 