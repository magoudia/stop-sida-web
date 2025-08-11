# Guide de Déploiement - Stop-Sida sur VPS Contabo Ubuntu

## 📋 Table des Matières
1. [Prérequis](#prérequis)
2. [Configuration Initiale du VPS](#configuration-initiale-du-vps)
3. [Installation des Dépendances](#installation-des-dépendances)
4. [Configuration de l'Environnement](#configuration-de-lenvironnement)
5. [Déploiement du Backend](#déploiement-du-backend)
6. [Déploiement du Frontend](#déploiement-du-frontend)
7. [Configuration de Nginx](#configuration-de-nginx)
8. [Configuration SSL avec Let's Encrypt](#configuration-ssl-avec-lets-encrypt)
9. [Configuration du Domaine](#configuration-du-domaine)
10. [Gestion des Mises à Jour](#gestion-des-mises-à-jour)
11. [Monitoring et Maintenance](#monitoring-et-maintenance)
12. [Troubleshooting](#troubleshooting)

## 🎯 Prérequis

- VPS Contabo avec Ubuntu 22.04 LTS
- Domaine configuré et pointant vers votre VPS
- Accès SSH au serveur
- Clé API Resend pour l'envoi d'emails

## 🚀 Configuration Initiale du VPS

### 1. Connexion SSH et Mise à Jour

```bash
# Connexion au serveur
ssh root@votre-ip-serveur

# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation des paquets essentiels
sudo apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release
```

### 2. Configuration du Pare-feu

```bash
# Installation d'UFW
sudo apt install ufw -y

# Configuration des règles
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3001

# Activation du pare-feu
sudo ufw enable
sudo ufw status
```

### 3. Création d'un Utilisateur Non-Root

```bash
# Création de l'utilisateur
sudo adduser stopsida
sudo usermod -aG sudo stopsida

# Configuration SSH pour l'utilisateur
sudo mkdir -p /home/stopsida/.ssh
sudo cp ~/.ssh/authorized_keys /home/stopsida/.ssh/
sudo chown -R stopsida:stopsida /home/stopsida/.ssh
sudo chmod 700 /home/stopsida/.ssh
sudo chmod 600 /home/stopsida/.ssh/authorized_keys

# Test de connexion avec le nouvel utilisateur
exit
ssh stopsida@votre-ip-serveur
```

## 📦 Installation des Dépendances

### 1. Installation de Node.js

```bash
# Installation de Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérification de l'installation
node --version
npm --version
```

### 2. Installation de Nginx

```bash
# Installation de Nginx
sudo apt install nginx -y

# Démarrage et activation au boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Vérification du statut
sudo systemctl status nginx
```

### 3. Installation de PM2

```bash
# Installation globale de PM2
sudo npm install -g pm2

# Configuration de PM2 pour démarrer au boot
pm2 startup
# Suivre les instructions affichées
```

### 4. Installation de Certbot

```bash
# Installation de Certbot pour Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
```

## ⚙️ Configuration de l'Environnement

### 1. Création de la Structure des Dossiers

```bash
# Création des dossiers de l'application
sudo mkdir -p /var/www/stop-sida
sudo chown -R stopsida:stopsida /var/www/stop-sida
cd /var/www/stop-sida
```

### 2. Configuration des Variables d'Environnement

```bash
# Création du fichier .env pour le backend
sudo nano /var/www/stop-sida/server/.env
```

Contenu du fichier `.env` :
```env
NODE_ENV=production
PORT=3001
RESEND_API_KEY=
FROM_EMAIL=notifications@votre-domaine.com
CORS_ORIGIN=https://votre-domaine.com
```

```bash
# Création du fichier .env pour le frontend
sudo nano /var/www/stop-sida/.env
```

Contenu du fichier `.env` :
```env
VITE_API_URL=https://votre-domaine.com/api
VITE_GA_TRACKING_ID=votre_ga_tracking_id
```

## 🔧 Déploiement du Backend

### 1. Clonage et Configuration du Backend

```bash
# Clonage du projet (remplacez par votre repo)
cd /var/www/stop-sida
git clone https://github.com/votre-username/Stop-Sida-web.git temp
cp -r temp/stop-sida/* .
rm -rf temp

# Installation des dépendances du backend
cd server
npm install --production

# Test du serveur
npm start
# Ctrl+C pour arrêter le test
```

### 2. Configuration PM2 pour le Backend

```bash
# Création du fichier ecosystem.config.js
cd /var/www/stop-sida
nano ecosystem.config.js
```

Contenu du fichier `ecosystem.config.js` :
```javascript
module.exports = {
  apps: [
    {
      name: 'stop-sida-backend',
      script: './server/index.js',
      cwd: '/var/www/stop-sida',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/stop-sida-backend-error.log',
      out_file: '/var/log/stop-sida-backend-out.log',
      log_file: '/var/log/stop-sida-backend-combined.log',
      time: true
    }
  ]
};
```

```bash
# Démarrage du backend avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🎨 Déploiement du Frontend

### 1. Build du Frontend

```bash
# Installation des dépendances du frontend
cd /var/www/stop-sida
npm install

# Build de production
npm run build

# Vérification du build
ls -la dist/
```

### 2. Configuration Nginx pour le Frontend

```bash
# Création de la configuration Nginx
sudo nano /etc/nginx/sites-available/stop-sida
```

Contenu de la configuration Nginx :
```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;
    root /var/www/stop-sida/dist;
    index index.html;

    # Gestion des routes React
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuration pour les fichiers statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy pour l'API backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
```

```bash
# Activation du site
sudo ln -s /etc/nginx/sites-available/stop-sida /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Configuration SSL avec Let's Encrypt

### 1. Obtention du Certificat SSL

```bash
# Obtention du certificat SSL
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Test du renouvellement automatique
sudo certbot renew --dry-run
```

### 2. Configuration du Renouvellement Automatique

```bash
# Ajout d'un cron job pour le renouvellement
sudo crontab -e
```

Ajouter cette ligne :
```
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🌐 Configuration du Domaine

### 1. Configuration DNS

Dans votre panneau de gestion de domaine, configurez les enregistrements DNS :

```
Type: A
Nom: @
Valeur: IP_DE_VOTRE_VPS

Type: A
Nom: www
Valeur: IP_DE_VOTRE_VPS
```

### 2. Vérification de la Configuration

```bash
# Test de la résolution DNS
nslookup votre-domaine.com
dig votre-domaine.com

# Test de la connectivité
curl -I http://votre-domaine.com
curl -I https://votre-domaine.com
```

## 🔄 Gestion des Mises à Jour

### 1. Script de Déploiement Automatique

```bash
# Création du script de déploiement
nano /var/www/stop-sida/deploy.sh
```

Contenu du script `deploy.sh` :
```bash
#!/bin/bash

# Script de déploiement automatique
set -e

echo "🚀 Début du déploiement..."

# Variables
APP_DIR="/var/www/stop-sida"
BACKUP_DIR="/var/www/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Création du backup
echo "📦 Création du backup..."
mkdir -p $BACKUP_DIR
tar -czf $BACKUP_DIR/stop-sida-backup-$DATE.tar.gz -C $APP_DIR .

# Pull des dernières modifications
echo "📥 Récupération des dernières modifications..."
cd $APP_DIR
git pull origin main

# Mise à jour des dépendances backend
echo "🔧 Mise à jour des dépendances backend..."
cd server
npm install --production

# Mise à jour des dépendances frontend
echo "🎨 Mise à jour des dépendances frontend..."
cd ..
npm install

# Build du frontend
echo "🏗️ Build du frontend..."
npm run build

# Redémarrage du backend
echo "🔄 Redémarrage du backend..."
pm2 restart stop-sida-backend

# Nettoyage des anciens backups (garde les 5 plus récents)
echo "🧹 Nettoyage des anciens backups..."
cd $BACKUP_DIR
ls -t | tail -n +6 | xargs -r rm

echo "✅ Déploiement terminé avec succès!"
echo "📊 Statut des services:"
pm2 status
```

```bash
# Rendre le script exécutable
chmod +x /var/www/stop-sida/deploy.sh
```

### 2. Configuration Git Hooks (Optionnel)

```bash
# Configuration d'un webhook pour le déploiement automatique
sudo apt install webhook -y

# Création du fichier de configuration webhook
sudo nano /etc/webhook.conf
```

Contenu du fichier `webhook.conf` :
```json
[
  {
    "id": "stop-sida-deploy",
    "execute-command": "/var/www/stop-sida/deploy.sh",
    "command-working-directory": "/var/www/stop-sida"
  }
]
```

```bash
# Démarrage du service webhook
sudo systemctl enable webhook
sudo systemctl start webhook
```

## 📊 Monitoring et Maintenance

### 1. Configuration des Logs

```bash
# Configuration de la rotation des logs
sudo nano /etc/logrotate.d/stop-sida
```

Contenu du fichier de rotation :
```
/var/log/stop-sida-*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 stopsida stopsida
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 2. Monitoring avec PM2

```bash
# Installation du module de monitoring PM2
pm2 install pm2-server-monit

# Configuration du monitoring
pm2 set pm2-server-monit:email votre-email@domaine.com
```

### 3. Script de Maintenance

```bash
# Création du script de maintenance
nano /var/www/stop-sida/maintenance.sh
```

Contenu du script `maintenance.sh` :
```bash
#!/bin/bash

echo "🔧 Début de la maintenance..."

# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Nettoyage des paquets inutilisés
sudo apt autoremove -y
sudo apt autoclean

# Vérification de l'espace disque
df -h

# Vérification de la mémoire
free -h

# Vérification des services
pm2 status
sudo systemctl status nginx

# Vérification des certificats SSL
sudo certbot certificates

echo "✅ Maintenance terminée!"
```

```bash
# Rendre le script exécutable
chmod +x /var/www/stop-sida/maintenance.sh
```

## 🛠️ Troubleshooting

### 1. Commandes de Diagnostic

```bash
# Vérification des services
sudo systemctl status nginx
pm2 status
pm2 logs stop-sida-backend

# Vérification des ports
sudo netstat -tlnp
sudo ss -tlnp

# Vérification des logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
pm2 logs stop-sida-backend --lines 100

# Test de l'API
curl -X GET http://localhost:3001/api/health
```

### 2. Problèmes Courants

#### Problème : Le site ne se charge pas
```bash
# Vérifier Nginx
sudo nginx -t
sudo systemctl restart nginx

# Vérifier le backend
pm2 restart stop-sida-backend
pm2 logs stop-sida-backend
```

#### Problème : Erreurs SSL
```bash
# Renouveler le certificat SSL
sudo certbot renew

# Vérifier la configuration SSL
sudo nginx -t
sudo systemctl reload nginx
```

#### Problème : Erreurs de permissions
```bash
# Corriger les permissions
sudo chown -R stopsida:stopsida /var/www/stop-sida
sudo chmod -R 755 /var/www/stop-sida
```

### 3. Script de Diagnostic

```bash
# Création du script de diagnostic
nano /var/www/stop-sida/diagnostic.sh
```

Contenu du script `diagnostic.sh` :
```bash
#!/bin/bash

echo "🔍 Diagnostic du système..."

echo "📊 Informations système:"
uname -a
cat /etc/os-release

echo "💾 Espace disque:"
df -h

echo "🧠 Utilisation mémoire:"
free -h

echo "🌐 Services réseau:"
sudo netstat -tlnp | grep -E ':(80|443|3001)'

echo "📝 Statut des services:"
sudo systemctl status nginx --no-pager
pm2 status

echo "📋 Logs récents:"
echo "--- Nginx Error Log ---"
sudo tail -n 10 /var/log/nginx/error.log
echo "--- PM2 Logs ---"
pm2 logs stop-sida-backend --lines 10

echo "🔒 Certificats SSL:"
sudo certbot certificates

echo "✅ Diagnostic terminé!"
```

```bash
# Rendre le script exécutable
chmod +x /var/www/stop-sida/diagnostic.sh
```

## 📋 Checklist de Déploiement

- [ ] VPS configuré avec Ubuntu 22.04
- [ ] Utilisateur non-root créé
- [ ] Pare-feu configuré
- [ ] Node.js installé
- [ ] Nginx installé et configuré
- [ ] PM2 installé
- [ ] Certbot installé
- [ ] Variables d'environnement configurées
- [ ] Backend déployé et fonctionnel
- [ ] Frontend buildé et déployé
- [ ] SSL configuré
- [ ] Domaine configuré
- [ ] Scripts de déploiement créés
- [ ] Monitoring configuré
- [ ] Tests de fonctionnement effectués

## 🎯 Commandes Rapides

```bash
# Déploiement rapide
cd /var/www/stop-sida && ./deploy.sh

# Redémarrage des services
pm2 restart stop-sida-backend
sudo systemctl reload nginx

# Vérification du statut
pm2 status
sudo systemctl status nginx

# Maintenance
cd /var/www/stop-sida && ./maintenance.sh

# Diagnostic
cd /var/www/stop-sida && ./diagnostic.sh
```

## 📞 Support

En cas de problème, consultez :
1. Les logs PM2 : `pm2 logs stop-sida-backend`
2. Les logs Nginx : `sudo tail -f /var/log/nginx/error.log`
3. Le script de diagnostic : `./diagnostic.sh`

---

**Note importante** : N'oubliez pas de remplacer `votre-domaine.com` et `votre-ip-serveur` par vos vraies valeurs dans toutes les configurations. 