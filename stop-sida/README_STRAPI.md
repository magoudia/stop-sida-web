# 🚀 Intégration Strapi CMS - ONG STOP SIDA

## 📋 Vue d'ensemble

Ce projet intègre **Strapi CMS** avec votre application React existante pour permettre à l'équipe de Stop SIDA de gérer le contenu du site web sans connaissances techniques.

## 🏗️ Architecture

```
ONG_STOP_SIDA/
├── stop-sida/                 # Application React principale
│   ├── strapi-cms/           # CMS Strapi
│   ├── src/
│   │   ├── services/
│   │   │   └── strapiService.ts  # Service d'intégration
│   │   └── components/
│   │       └── StrapiTest.tsx    # Composant de test
│   ├── server/               # Serveur email
│   └── start-dev.bat         # Script de démarrage
└── README_STRAPI.md          # Ce fichier
```

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Git

### 1. Installation des dépendances

```bash
# Dans le dossier principal
npm install

# Dans le dossier Strapi
cd strapi-cms
npm install

# Dans le dossier serveur
cd ../server
npm install
```

### 2. Configuration des variables d'environnement

Copiez le fichier `env.example` vers `.env` :

```bash
cp env.example .env
```

Modifiez le fichier `.env` :

```env
# Configuration Strapi
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_STRAPI_API_TOKEN=your_strapi_api_token_here

# Configuration Email (Resend)
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=notifications@stop-sida.org

# Configuration serveur
PORT=3001
NODE_ENV=development
```

### 3. Démarrage des services

#### Option A : Script automatique (Recommandé)

**Windows (CMD) :**
```bash
start-dev.bat
```

**Windows (PowerShell) :**
```powershell
.\start-dev.ps1
```

#### Option B : Démarrage manuel

**Terminal 1 - Strapi :**
```bash
cd strapi-cms
npm run develop
```

**Terminal 2 - Serveur email :**
```bash
cd server
npm start
```

**Terminal 3 - Application React :**
```bash
npm run dev
```

## 🌐 URLs d'accès

- **Application React** : http://localhost:5173
- **Strapi Admin** : http://localhost:1337/admin
- **API Strapi** : http://localhost:1337/api
- **Serveur Email** : http://localhost:3001

## 📝 Configuration initiale de Strapi

### 1. Première connexion

1. Allez sur http://localhost:1337/admin
2. Créez votre compte administrateur
3. Configurez votre profil

### 2. Création des modèles de contenu

Les modèles suivants sont déjà configurés :

- **Actualités** : Gestion des nouvelles et articles
- **Rapports** : Gestion des documents PDF
- **Partenaires** : Gestion des partenariats
- **Membres Équipe** : Gestion de l'équipe
- **Événements** : Gestion des événements

### 3. Configuration des permissions

1. Allez dans **Settings > Users & Permissions Plugin > Roles**
2. Sélectionnez **Public**
3. Activez les permissions de lecture pour chaque modèle
4. Sauvegardez

### 4. Génération du token API

1. Allez dans **Settings > API Tokens**
2. Créez un nouveau token
3. Copiez le token dans votre fichier `.env`

## 🔧 Utilisation

### Pour l'équipe Stop SIDA

1. **Accédez à l'interface d'administration** : http://localhost:1337/admin
2. **Consultez le guide d'utilisation** : `STRAPI_GUIDE.md`
3. **Créez du contenu** via l'interface intuitive
4. **Publiez** vos contenus

### Pour les développeurs

#### Intégration dans les composants React

```typescript
import { strapiService, transformActualite } from '../services/strapiService';

// Dans votre composant
const [actualites, setActualites] = useState([]);

useEffect(() => {
  const fetchActualites = async () => {
    try {
      const response = await strapiService.getActualites({ pageSize: 10 });
      const transformedData = response.data.map(transformActualite);
      setActualites(transformedData);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  fetchActualites();
}, []);
```

#### Test de l'intégration

1. Ajoutez le composant de test à votre routeur :

```typescript
import StrapiTest from './components/StrapiTest';

// Dans votre routeur
<Route path="/test-strapi" element={<StrapiTest />} />
```

2. Accédez à http://localhost:5173/test-strapi

## 📊 Modèles de contenu

### Actualités
- **Titre** : Titre de l'actualité
- **Description** : Résumé court
- **Contenu** : Contenu complet (Rich Text)
- **Image** : Image d'illustration
- **Catégorie** : Santé, Prévention, Événement, etc.
- **Statut** : Brouillon ou Publié
- **Date de publication** : Date de mise en ligne

### Rapports
- **Titre** : Titre du rapport
- **Description** : Description du rapport
- **Fichier** : Fichier PDF
- **Année** : Année du rapport
- **Catégorie** : Type de rapport
- **Statut** : Brouillon ou Publié

### Partenaires
- **Nom** : Nom de l'organisation
- **Logo** : Logo du partenaire
- **Description** : Description du partenariat
- **Catégorie** : Type de partenaire
- **Site web** : URL du site
- **Statut** : Actif, Inactif, En négociation

### Membres Équipe
- **Nom et Prénom** : Nom complet
- **Photo** : Photo du membre
- **Poste** : Fonction dans l'organisation
- **Biographie** : Description du parcours
- **Département** : Service d'appartenance
- **Statut** : Actif, Inactif, Ancien

### Événements
- **Titre** : Nom de l'événement
- **Description** : Résumé de l'événement
- **Contenu** : Détails complets
- **Dates** : Date de début et fin
- **Lieu** : Lieu de l'événement
- **Image** : Image de l'événement
- **Statut** : Planifié, En cours, Terminé, Annulé

## 🔐 Sécurité

### Bonnes pratiques

1. **Mots de passe forts** pour les comptes administrateur
2. **Permissions limitées** pour les utilisateurs non-admin
3. **Tokens API sécurisés** avec expiration
4. **Sauvegardes régulières** des données
5. **Mise à jour** régulière de Strapi

### Configuration de production

1. **Variables d'environnement** sécurisées
2. **Base de données** externe (PostgreSQL, MySQL)
3. **CDN** pour les médias
4. **SSL/TLS** pour les connexions sécurisées
5. **Monitoring** et logs

## 🛠️ Développement

### Structure des fichiers

```
strapi-cms/
├── src/
│   └── api/
│       ├── actualite/
│       ├── rapport/
│       ├── partenaire/
│       ├── membre-equipe/
│       └── evenement/
└── config/
```

### Ajout d'un nouveau modèle

1. Créez le fichier de schéma dans `strapi-cms/src/api/[nom]/content-types/[nom]/schema.json`
2. Redémarrez Strapi
3. Configurez les permissions
4. Ajoutez les méthodes dans `strapiService.ts`

### Personnalisation de l'interface

1. **Thème** : Modifiez les couleurs dans Strapi
2. **Langue** : Interface en français
3. **Champs personnalisés** : Ajoutez des champs selon vos besoins

## 📈 Déploiement

### Environnement de développement

- Strapi : http://localhost:1337
- React : http://localhost:5173
- Base de données : SQLite (par défaut)

### Environnement de production

1. **Strapi** : Déployez sur un serveur ou service cloud
2. **Base de données** : PostgreSQL ou MySQL
3. **Médias** : Service de stockage cloud (AWS S3, etc.)
4. **React** : Build de production et déploiement

## 🆘 Support

### Problèmes courants

**Strapi ne démarre pas :**
- Vérifiez Node.js version
- Supprimez `node_modules` et réinstallez
- Vérifiez les ports disponibles

**Erreur de connexion API :**
- Vérifiez l'URL Strapi dans `.env`
- Vérifiez le token API
- Vérifiez les permissions

**Images ne s'affichent pas :**
- Vérifiez les permissions des médias
- Vérifiez l'URL de base
- Vérifiez le format des images

### Ressources

- **Documentation Strapi** : https://docs.strapi.io/
- **Guide d'utilisation** : `STRAPI_GUIDE.md`
- **Support technique** : Contactez l'équipe de développement

## 🎯 Avantages de cette intégration

✅ **Interface intuitive** : Pas besoin de connaissances techniques
✅ **Gestion centralisée** : Tout le contenu au même endroit
✅ **API moderne** : REST et GraphQL disponibles
✅ **Sécurité** : Permissions granulaires
✅ **Performance** : Cache et optimisation automatiques
✅ **Évolutif** : Facile d'ajouter de nouveaux types de contenu
✅ **Multilingue** : Support des langues multiples
✅ **Responsive** : Interface mobile-friendly

---

**Note :** Cette intégration permet à l'équipe de Stop SIDA de gérer le contenu du site web de manière autonome, tout en conservant la flexibilité technique pour les développeurs. 