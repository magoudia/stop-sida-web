# Guide de Dépannage - Backend en Production

## Problème : Le backend ne se lance pas en production

### ✅ Solution Implémentée

Le problème était que Vercel utilise des **fonctions serverless**, pas un serveur Express traditionnel. J'ai corrigé cela en :

1. **Supprimé la configuration `builds`** dans `vercel.json`
2. **Ajouté la configuration `functions`** pour les fonctions serverless
3. **Amélioré les fonctions API** avec une meilleure gestion d'erreurs
4. **Ajouté une fonction de test** pour diagnostiquer les problèmes

## Problème : Erreur MIME Type "Failed to load module script"

### ✅ Solution Implémentée

L'erreur `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "text/html"` indique un problème de configuration Vercel.

**Corrections apportées :**

1. **Configuration Vercel simplifiée** (`vercel.json`)
   - Ajout de `buildCommand` et `outputDirectory`
   - Routes simplifiées pour éviter les conflits
   - Suppression des headers problématiques

2. **Configuration Vite optimisée** (`vite.config.ts`)
   - Configuration de build pour ES2015
   - Chunking manuel pour de meilleures performances
   - Headers de sécurité appropriés

3. **Package.json mis à jour**
   - Script de build avec TypeScript
   - Nom et version corrects
   - Configuration de module ES

### 🔧 Fonctions API Disponibles

#### 1. `/api/health` - Test de santé
```bash
curl https://votre-domaine.vercel.app/api/health
```
**Réponse attendue :**
```json
{
  "status": "OK",
  "message": "Serveur email opérationnel",
  "environmentCheck": {
    "RESEND_API_KEY": true,
    "FROM_EMAIL": true,
    "NODE_ENV": "production"
  }
}
```

#### 2. `/api/test-email` - Test d'envoi d'email
```bash
curl -X POST https://votre-domaine.vercel.app/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"testEmail": "sambasine365@gmail.com"}'
```

#### 3. `/api/send-email` - Envoi d'emails
```bash
curl -X POST https://votre-domaine.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["sambasine365@gmail.com"],
    "subject": "Test",
    "html": "<h1>Test</h1>"
  }'
```

### 🚨 Problèmes Courants et Solutions

#### 1. Erreur "Function not found"
**Cause :** Fonction serverless non déployée
**Solution :**
- Vérifiez que les fichiers `api/*.js` sont bien dans le repository
- Redéployez sur Vercel
- Vérifiez les logs de déploiement

#### 2. Erreur "Invalid API Key"
**Cause :** Variable d'environnement manquante
**Solution :**
1. Allez dans Vercel Dashboard > Settings > Environment Variables
2. Ajoutez : `RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. Redéployez

#### 3. Erreur CORS
**Cause :** Configuration CORS incorrecte
**Solution :** Les fonctions sont déjà configurées avec CORS approprié

#### 4. Erreur "Function timeout"
**Cause :** Fonction trop lente
**Solution :** Les fonctions sont configurées avec `maxDuration: 10`

#### 5. Erreur MIME Type
**Cause :** Configuration Vercel incorrecte pour les modules ES
**Solution :**
- Utilisez la configuration `vercel.json` mise à jour
- Vérifiez que `buildCommand` et `outputDirectory` sont corrects
- Redéployez après modification

### 🔍 Diagnostic

#### Étape 1 : Vérifier la santé de l'API
```bash
curl https://votre-domaine.vercel.app/api/health
```

#### Étape 2 : Vérifier les variables d'environnement
La réponse de `/api/health` inclut un `environmentCheck` qui montre si les variables sont configurées.

#### Étape 3 : Tester l'envoi d'email
```bash
curl -X POST https://votre-domaine.vercel.app/api/test-email \
  -H "Content-Type: application/json" \
  -d '{}'
```

#### Étape 4 : Vérifier les logs Vercel
1. Allez dans Vercel Dashboard
2. Sélectionnez votre projet
3. Allez dans "Functions"
4. Cliquez sur une fonction pour voir les logs

#### Étape 5 : Vérifier le build
1. Allez dans Vercel Dashboard
2. Sélectionnez votre projet
3. Allez dans "Deployments"
4. Vérifiez que le build s'est bien passé

### 📋 Checklist de Déploiement

- [ ] Variables d'environnement configurées dans Vercel
- [ ] Fichiers `api/*.js` dans le repository
- [ ] `vercel.json` correctement configuré
- [ ] `vite.config.ts` optimisé
- [ ] `package.json` mis à jour
- [ ] Déploiement réussi sur Vercel
- [ ] `/api/health` retourne "OK"
- [ ] `/api/test-email` fonctionne
- [ ] Formulaires du site fonctionnent
- [ ] Pas d'erreurs MIME type dans la console

### 🆘 Support

Si les problèmes persistent :

1. **Vérifiez les logs Vercel** dans le dashboard
2. **Testez avec curl** les endpoints API
3. **Vérifiez les variables d'environnement** dans Vercel
4. **Redéployez** après chaque modification
5. **Vérifiez la console du navigateur** pour les erreurs MIME type

### 📞 Contact

Pour toute question technique :
- Logs de déploiement : Vercel Dashboard
- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Documentation Resend : [resend.com/docs](https://resend.com/docs) 