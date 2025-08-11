# Scénarios d'envoi d'emails - Stop SIDA

Ce document détaille tous les scénarios d'envoi d'emails configurés pour les formulaires et la newsletter du site Stop SIDA.

## 📧 Configuration générale

### Destinataires par environnement

**Production :**
- **Admin :** admin@stop-sida.org, directeur@stop-sida.org
- **RH :** rh@stop-sida.org, recrutement@stop-sida.org
- **Partenariats :** partenariats@stop-sida.org, cooperation@stop-sida.org
- **Communication :** communication@stop-sida.org, presse@stop-sida.org
- **Newsletter :** newsletter@stop-sida.org

**Développement :**
- Tous les emails sont envoyés à sambasine365@gmail.com

### Expéditeur
- **Dev :** noreplyong@noriseapp.com
- **Production :** notifications@stop-sida.org

## 📋 Scénarios par formulaire

### 1. Formulaire de Contact (`/contact`)

**Scénario :** Double envoi d'email

**Email 1 - Notification à l'équipe :**
- **Destinataires :** Équipe admin
- **CC :** Équipe partenariats (si type = "partnership")
- **Contenu :** Détails complets du message de contact
- **Langues :** FR, EN, AR

**Email 2 - Confirmation à l'utilisateur :**
- **Destinataires :** Email de l'utilisateur
- **Contenu :** Confirmation de réception avec récapitulatif
- **Langues :** FR, EN, AR

**Données incluses :**
- Nom, email, téléphone
- Type de message (général, bénévolat, partenariat, média, support, autre)
- Sujet et message
- Date d'envoi

### 2. Formulaire de Bénévolat (`/benevolat`)

**Scénario :** Double envoi d'email

**Email 1 - Notification à l'équipe RH :**
- **Destinataires :** Équipe RH
- **BCC :** Équipe admin
- **Contenu :** Détails complets de la candidature
- **Langues :** FR, EN, AR

**Email 2 - Confirmation au candidat :**
- **Destinataires :** Email du candidat
- **Contenu :** Confirmation avec récapitulatif et prochaines étapes
- **Langues :** FR, EN, AR

**Données incluses :**
- Nom complet, email, téléphone, âge
- Profession, expérience, motivation
- Disponibilité, compétences, langues
- Date de candidature

### 3. Newsletter (Page d'accueil, Actualités, Footer)

**Scénario :** Double envoi d'email

**Email 1 - Confirmation à l'abonné :**
- **Destinataires :** Email de l'abonné
- **Contenu :** Confirmation d'inscription avec informations sur la newsletter
- **Langues :** FR, EN, AR

**Email 2 - Notification à l'équipe communication :**
- **Destinataires :** Équipe communication
- **CC :** Équipe admin
- **Contenu :** Notification d'un nouvel abonné
- **Langues :** FR, EN, AR

**Données incluses :**
- Email de l'abonné
- Date d'inscription

### 4. Formulaire d'Administration - Rapports

**Scénario :** Notification unique

**Email - Notification à l'équipe :**
- **Destinataires :** Équipe admin
- **CC :** Équipe communication
- **Contenu :** Détails du rapport soumis
- **Langues :** FR, EN, AR

**Données incluses :**
- Titre, description, année, catégorie
- Nom du fichier, taille
- Date de soumission

### 5. Formulaire d'Administration - Actualités

**Scénario :** Notification conditionnelle

**Email 1 - Notification interne :**
- **Destinataires :** Équipe communication
- **CC :** Équipe admin
- **Contenu :** Détails de l'actualité créée
- **Langues :** FR, EN, AR

**Email 2 - Publication aux abonnés (si publié) :**
- **Destinataires :** Liste des abonnés newsletter
- **Contenu :** Contenu de l'actualité avec lien vers le site
- **Langues :** FR, EN, AR

**Données incluses :**
- Titre, description, contenu
- Statut de publication
- Date de création

### 6. Formulaire de Partenaire

**Scénario :** Notification unique

**Email - Notification à l'équipe :**
- **Destinataires :** Équipe partenariats
- **CC :** Équipe admin
- **Contenu :** Détails du nouveau partenaire
- **Langues :** FR, EN, AR

**Données incluses :**
- Nom, acronyme, description
- Site web, catégorie, collaboration
- Date d'ajout

## 🔧 Fonctionnalités techniques

### Gestion des langues
- Support complet pour français, anglais et arabe
- Templates traduits pour tous les emails
- Formatage des dates selon la locale

### Gestion des erreurs
- Logs détaillés des erreurs d'envoi
- Fallback UX : affichage du succès même en cas d'erreur technique
- Retry automatique en cas d'échec

### Sécurité
- Validation des emails côté client et serveur
- Protection contre les injections
- Limitation des tentatives d'envoi

### Monitoring
- Logs de tous les envois d'emails
- Suivi des succès/échecs
- Métriques d'utilisation

## 📊 Statistiques d'utilisation

Les emails sont envoyés via l'API Resend avec :
- Suivi des taux de livraison
- Notifications de rebond
- Analytics des ouvertures et clics

## 🚀 Déploiement

Pour activer les emails en production :
1. Configurer les variables d'environnement
2. Vérifier les clés API Resend
3. Tester avec l'email de développement
4. Basculer vers les emails de production

## 📞 Support

En cas de problème avec les emails :
1. Vérifier les logs dans la console
2. Contrôler la configuration Resend
3. Tester avec la fonction `testEmailConfiguration()`
4. Contacter l'équipe technique

