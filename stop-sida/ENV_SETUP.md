# Configuration des Variables d'Environnement

## Variables Requises pour Vercel

### 1. RESEND_API_KEY
- **Description**: Clé API de Resend pour l'envoi d'emails
- **Obtention**: Créez un compte sur [resend.com](https://resend.com) et générez une clé API
- **Format**: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 2. FROM_EMAIL
- **Description**: Adresse email expéditeur
- **Valeur recommandée**: `notifications@stop-sida.org`
- **Important**: Cette adresse doit être vérifiée dans votre compte Resend

### 3. NODE_ENV
- **Description**: Mode d'environnement
- **Valeur**: `production`

### 4. DOMAIN_URL
- **Description**: URL du domaine principal du site
- **Valeur recommandée**: `https://stop-sida.org`
- **Important**: Utilisé pour la configuration CORS du serveur

### 5. CORS_ORIGIN
- **Description**: Origine autorisée pour les requêtes CORS
- **Valeur recommandée**: `https://stop-sida.org`
- **Important**: Doit correspondre au domaine principal du site

## Configuration dans Vercel

1. Allez dans votre dashboard Vercel
2. Sélectionnez votre projet
3. Allez dans "Settings" > "Environment Variables"
4. Ajoutez chaque variable :

```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL = notifications@stop-sida.org
NODE_ENV = production
DOMAIN_URL = https://stop-sida.org
CORS_ORIGIN = https://stop-sida.org
```

## Configuration Locale (Développement)

Créez un fichier `.env` à la racine du projet :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=notifications@stop-sida.org
NODE_ENV=development
DOMAIN_URL=https://stop-sida.org
CORS_ORIGIN=https://stop-sida.org
```

## Vérification

Après déploiement, testez l'API :
- URL de santé : `https://votre-domaine.vercel.app/api/health`
- Test d'email : Utilisez le panneau de test dans l'interface admin

## Résolution des Problèmes

### Erreur "Invalid API Key"
- Vérifiez que votre clé Resend est correcte
- Assurez-vous que le domaine expéditeur est vérifié dans Resend

### Erreur CORS
- Les fonctions serverless sont configurées pour accepter toutes les origines
- Vérifiez que l'URL de l'API est correcte

### Emails non reçus
- Vérifiez les logs dans Vercel Functions
- Testez avec l'email de test : `sambasine365@gmail.com` 