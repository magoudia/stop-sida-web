# Guide d'utilisation de Strapi pour l'ONG STOP SIDA

## 🎯 Qu'est-ce que Strapi ?

Strapi est un CMS (Content Management System) moderne qui permet à l'équipe de Stop SIDA de gérer le contenu du site web sans avoir besoin de connaissances techniques en programmation.

## 🚀 Démarrage rapide

### 1. Accéder à l'interface d'administration

1. Ouvrez votre navigateur
2. Allez sur : `http://localhost:1337/admin`
3. Connectez-vous avec vos identifiants

### 2. Première connexion

Lors de la première connexion, vous devrez :
- Créer un compte administrateur
- Choisir un mot de passe sécurisé
- Configurer votre profil

## 📝 Gestion du contenu

### Actualités

**Pour créer une nouvelle actualité :**

1. Dans le menu de gauche, cliquez sur "Actualité"
2. Cliquez sur "Créer une nouvelle entrée"
3. Remplissez les champs :
   - **Titre** : Le titre de l'actualité
   - **Description** : Un résumé court (max 500 caractères)
   - **Contenu** : Le contenu complet de l'actualité
   - **Date de publication** : Date de publication
   - **Catégorie** : Choisissez parmi (Santé, Prévention, Événement, Partenariat, Formation, Autre)
   - **Statut** : Brouillon ou Publié
   - **Auteur** : Nom de l'auteur
   - **Image** : Uploadez une image (optionnel)
   - **Tags** : Mots-clés pour le référencement

4. Cliquez sur "Sauvegarder" puis "Publier"

### Rapports

**Pour ajouter un nouveau rapport :**

1. Cliquez sur "Rapport" dans le menu
2. Cliquez sur "Créer une nouvelle entrée"
3. Remplissez :
   - **Titre** : Titre du rapport
   - **Description** : Description du rapport
   - **Année** : Année du rapport
   - **Catégorie** : Type de rapport
   - **Fichier** : Uploadez le fichier PDF
   - **Date de publication** : Date de mise en ligne
   - **Statut** : Brouillon ou Publié

### Partenaires

**Pour ajouter un nouveau partenaire :**

1. Cliquez sur "Partenaire" dans le menu
2. Cliquez sur "Créer une nouvelle entrée"
3. Remplissez :
   - **Nom** : Nom de l'organisation
   - **Acronyme** : Abréviation (optionnel)
   - **Description** : Description du partenariat
   - **Catégorie** : Type de partenaire
   - **Logo** : Uploadez le logo
   - **Site web** : URL du site web
   - **Email** : Email de contact
   - **Téléphone** : Numéro de téléphone
   - **Date de collaboration** : Date de début de collaboration
   - **Statut** : Actif, Inactif, En négociation
   - **Ordre d'affichage** : Position dans la liste

### Membres de l'équipe

**Pour ajouter un membre :**

1. Cliquez sur "Membre Équipe" dans le menu
2. Cliquez sur "Créer une nouvelle entrée"
3. Remplissez :
   - **Nom** et **Prénom**
   - **Poste** : Fonction dans l'organisation
   - **Biographie** : Description du parcours
   - **Photo** : Photo du membre
   - **Email** et **Téléphone**
   - **Département** : Service d'appartenance
   - **Date d'entrée** : Date d'arrivée
   - **Statut** : Actif, Inactif, Ancien
   - **Ordre d'affichage** : Position dans la liste

### Événements

**Pour créer un événement :**

1. Cliquez sur "Événement" dans le menu
2. Cliquez sur "Créer une nouvelle entrée"
3. Remplissez :
   - **Titre** : Nom de l'événement
   - **Description** : Résumé de l'événement
   - **Contenu** : Détails complets
   - **Date de début** et **Date de fin**
   - **Lieu** et **Adresse**
   - **Image** : Image de l'événement
   - **Catégorie** : Type d'événement
   - **Statut** : Planifié, En cours, Terminé, Annulé
   - **Public cible** : Public visé
   - **Capacité max** : Nombre maximum de participants
   - **Inscription requise** : Oui/Non
   - **Contact inscription** : Coordonnées pour s'inscrire

## 🔧 Fonctionnalités avancées

### Gestion des médias

1. **Uploadez des images** : Glissez-déposez ou cliquez pour sélectionner
2. **Formats acceptés** : JPG, PNG, GIF, WebP
3. **Taille recommandée** : Maximum 5MB par fichier
4. **Organisation** : Créez des dossiers pour organiser vos médias

### Publication et brouillons

- **Brouillon** : Le contenu n'est pas visible sur le site
- **Publié** : Le contenu est visible sur le site
- **Modification** : Vous pouvez modifier un contenu publié, il restera en ligne

### Recherche et filtres

- Utilisez la barre de recherche pour trouver rapidement du contenu
- Filtrez par catégorie, statut, date, etc.
- Triez par ordre alphabétique, date, etc.

## 🔐 Sécurité et permissions

### Gestion des utilisateurs

1. **Administrateur** : Accès complet à toutes les fonctionnalités
2. **Éditeur** : Peut créer et modifier du contenu
3. **Auteur** : Peut créer du contenu mais ne peut pas publier
4. **Lecteur** : Peut seulement consulter le contenu

### Bonnes pratiques

- **Mots de passe forts** : Utilisez des mots de passe complexes
- **Déconnexion** : Déconnectez-vous après utilisation
- **Sauvegarde** : Sauvegardez régulièrement votre contenu
- **Vérification** : Vérifiez le contenu avant publication

## 📱 Interface mobile

L'interface d'administration Strapi est responsive et fonctionne sur :
- Ordinateurs de bureau
- Tablettes
- Smartphones

## 🆘 Support et aide

### Problèmes courants

**Je ne peux pas me connecter :**
- Vérifiez que Strapi est démarré
- Vérifiez vos identifiants
- Contactez l'administrateur

**Je ne vois pas mes modifications :**
- Vérifiez que le contenu est publié
- Videz le cache de votre navigateur
- Attendez quelques minutes (mise à jour automatique)

**Erreur lors de l'upload :**
- Vérifiez la taille du fichier (max 5MB)
- Vérifiez le format du fichier
- Réessayez dans quelques minutes

### Contact

Pour toute question technique :
- Email : [votre-email-technique]
- Téléphone : [votre-numero-technique]

## 🎨 Personnalisation

### Interface en français

L'interface est entièrement en français pour faciliter l'utilisation.

### Thème personnalisé

L'interface utilise les couleurs de l'ONG STOP SIDA (rouge #dc2626).

## 📊 Statistiques

Vous pouvez voir :
- Nombre de contenus créés
- Contenus les plus consultés
- Activité récente
- Utilisateurs connectés

---

**Note :** Ce guide sera mis à jour régulièrement. N'hésitez pas à demander de l'aide si vous rencontrez des difficultés ! 