# Guide de Maintenance et Mises à Jour - Stop-Sida

## 📋 Table des Matières
1. [Maintenance Quotidienne](#maintenance-quotidienne)
2. [Maintenance Hebdomadaire](#maintenance-hebdomadaire)
3. [Maintenance Mensuelle](#maintenance-mensuelle)
4. [Mises à Jour de l'Application](#mises-à-jour-de-lapplication)
5. [Sauvegardes](#sauvegardes)
6. [Monitoring et Alertes](#monitoring-et-alertes)
7. [Sécurité](#sécurité)
8. [Performance](#performance)
9. [Troubleshooting Avancé](#troubleshooting-avancé)

## 🔄 Maintenance Quotidienne

### 1. Vérification des Services

```bash
# Script de vérification quotidienne
nano /var/www/stop-sida/daily-check.sh
```

Contenu du script :
```bash
#!/bin/bash

echo "🔍 Vérification quotidienne - $(date)"
echo "====================================="

# Vérification des services
echo "📊 Statut des services:"
pm2 status
sudo systemctl status nginx --no-pager

# Vérification de l'espace disque
echo "💾 Espace disque:"
df -h | grep -E '(/dev/|Filesystem)'

# Vérification de la mémoire
echo "🧠 Utilisation mémoire:"
free -h

# Vérification des logs d'erreur
echo "📝 Erreurs récentes:"
sudo tail -n 10 /var/log/nginx/error.log
pm2 logs stop-sida-backend --lines 5

# Test de santé de l'API
echo "🏥 Test de santé API:"
curl -s http://localhost:3001/api/health || echo "❌ API non accessible"

echo "✅ Vérification terminée"
```

```bash
# Rendre le script exécutable
chmod +x /var/www/stop-sida/daily-check.sh

# Ajouter au cron pour exécution quotidienne à 6h
sudo crontab -e
# Ajouter: 0 6 * * * /var/www/stop-sida/daily-check.sh >> /var/log/stop-sida-daily.log 2>&1
```

### 2. Surveillance des Logs

```bash
# Surveillance en temps réel des logs
sudo tail -f /var/log/nginx/access.log | grep -E "(error|404|500)"
pm2 logs stop-sida-backend --lines 50
```

### 3. Vérification des Sauvegardes

```bash
# Vérification des sauvegardes récentes
ls -la /var/www/backups/ | head -10
du -sh /var/www/backups/
```

## 📅 Maintenance Hebdomadaire

### 1. Nettoyage du Système

```bash
# Script de nettoyage hebdomadaire
nano /var/www/stop-sida/weekly-cleanup.sh
```

Contenu du script :
```bash
#!/bin/bash

echo "🧹 Nettoyage hebdomadaire - $(date)"
echo "==================================="

# Nettoyage des paquets
sudo apt autoremove -y
sudo apt autoclean

# Nettoyage des logs anciens
sudo find /var/log -name "*.log" -mtime +7 -delete
sudo find /var/log -name "*.gz" -mtime +30 -delete

# Nettoyage des sauvegardes anciennes (garde 30 jours)
find /var/www/backups -name "*.tar.gz" -mtime +30 -delete

# Nettoyage du cache npm
npm cache clean --force

# Redémarrage des services pour libérer la mémoire
pm2 restart stop-sida-backend
sudo systemctl reload nginx

echo "✅ Nettoyage terminé"
```

```bash
# Rendre le script exécutable
chmod +x /var/www/stop-sida/weekly-cleanup.sh

# Ajouter au cron pour exécution hebdomadaire (dimanche 2h)
sudo crontab -e
# Ajouter: 0 2 * * 0 /var/www/stop-sida/weekly-cleanup.sh >> /var/log/stop-sida-weekly.log 2>&1
```

### 2. Mise à Jour des Dépendances

```bash
# Vérification des mises à jour de sécurité
sudo apt update
sudo apt list --upgradable

# Mise à jour des dépendances Node.js
cd /var/www/stop-sida
npm audit
npm update
```

### 3. Test de Performance

```bash
# Test de charge simple
ab -n 100 -c 10 https://votre-domaine.com/
ab -n 100 -c 10 https://votre-domaine.com/api/health
```

## 📆 Maintenance Mensuelle

### 1. Mise à Jour du Système

```bash
# Script de mise à jour mensuelle
nano /var/www/stop-sida/monthly-update.sh
```

Contenu du script :
```bash
#!/bin/bash

echo "🔄 Mise à jour mensuelle - $(date)"
echo "=================================="

# Sauvegarde avant mise à jour
echo "📦 Création de sauvegarde..."
cd /var/www/stop-sida
tar -czf /var/www/backups/pre-update-backup-$(date +%Y%m%d).tar.gz .

# Mise à jour du système
echo "🔄 Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

# Mise à jour de Node.js si nécessaire
echo "🔄 Vérification de Node.js..."
NODE_VERSION=$(node --version)
echo "Version actuelle: $NODE_VERSION"

# Mise à jour de PM2
echo "🔄 Mise à jour de PM2..."
sudo npm update -g pm2

# Vérification des certificats SSL
echo "🔒 Vérification des certificats SSL..."
sudo certbot certificates

# Test complet de l'application
echo "🧪 Test complet de l'application..."
curl -f https://votre-domaine.com/api/health || echo "❌ Test API échoué"

echo "✅ Mise à jour mensuelle terminée"
```

### 2. Analyse des Performances

```bash
# Analyse des logs d'accès
sudo goaccess /var/log/nginx/access.log --log-format=COMBINED --output=/var/www/stop-sida/performance-report.html

# Analyse de l'utilisation des ressources
echo "📊 Rapport d'utilisation des ressources:"
echo "CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')"
echo "Mémoire: $(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2}')"
echo "Disque: $(df -h | awk '$NF=="/"{printf "%s", $5}')"
```

### 3. Révision de Sécurité

```bash
# Audit de sécurité
sudo apt audit
npm audit

# Vérification des ports ouverts
sudo netstat -tlnp
sudo ufw status

# Vérification des utilisateurs
cat /etc/passwd | grep -E ":[0-9]{4}:" | cut -d: -f1
```

## 🚀 Mises à Jour de l'Application

### 1. Processus de Déploiement

```bash
# Script de déploiement sécurisé
nano /var/www/stop-sida/secure-deploy.sh
```

Contenu du script :
```bash
#!/bin/bash

set -e

echo "🚀 Déploiement sécurisé - $(date)"
echo "=================================="

# Variables
APP_DIR="/var/www/stop-sida"
BACKUP_DIR="/var/www/backups"
BRANCH=${1:-"main"}
DATE=$(date +%Y%m%d_%H%M%S)

# 1. Sauvegarde complète
echo "📦 Création de sauvegarde complète..."
tar -czf $BACKUP_DIR/full-backup-$DATE.tar.gz -C $APP_DIR .

# 2. Pull des modifications
echo "📥 Récupération des modifications..."
cd $APP_DIR
git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

# 3. Vérification des changements
echo "🔍 Vérification des changements..."
git log --oneline -10

# 4. Mise à jour des dépendances
echo "📦 Mise à jour des dépendances..."
npm install
cd server && npm install --production && cd ..

# 5. Tests avant déploiement
echo "🧪 Tests avant déploiement..."
npm run build
npm run lint

# 6. Déploiement en production
echo "🏗️ Build de production..."
npm run build

# 7. Redémarrage des services
echo "🔄 Redémarrage des services..."
pm2 restart stop-sida-backend

# 8. Vérification post-déploiement
echo "✅ Vérification post-déploiement..."
sleep 5
curl -f http://localhost:3001/api/health || exit 1

echo "🎉 Déploiement réussi!"
```

### 2. Déploiement par Branches

```bash
# Déploiement de la branche de développement
./secure-deploy.sh develop

# Déploiement de la branche principale
./secure-deploy.sh main

# Déploiement d'une branche spécifique
./secure-deploy.sh feature/nouvelle-fonctionnalite
```

### 3. Rollback en Cas de Problème

```bash
# Script de rollback
nano /var/www/stop-sida/rollback.sh
```

Contenu du script :
```bash
#!/bin/bash

BACKUP_FILE=${1:-"latest"}
APP_DIR="/var/www/stop-sida"
BACKUP_DIR="/var/www/backups"

echo "🔄 Rollback vers $BACKUP_FILE"

# Trouver le fichier de sauvegarde
if [[ "$BACKUP_FILE" == "latest" ]]; then
    BACKUP_FILE=$(ls -t $BACKUP_DIR/*.tar.gz | head -1)
fi

if [[ ! -f "$BACKUP_FILE" ]]; then
    echo "❌ Fichier de sauvegarde non trouvé: $BACKUP_FILE"
    exit 1
fi

# Arrêt des services
pm2 stop stop-sida-backend

# Restauration
cd $APP_DIR
tar -xzf $BACKUP_FILE

# Redémarrage des services
pm2 start stop-sida-backend

echo "✅ Rollback terminé vers $BACKUP_FILE"
```

## 💾 Sauvegardes

### 1. Stratégie de Sauvegarde

```bash
# Script de sauvegarde automatique
nano /var/www/stop-sida/backup-strategy.sh
```

Contenu du script :
```bash
#!/bin/bash

APP_DIR="/var/www/stop-sida"
BACKUP_DIR="/var/www/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Sauvegarde de l'application
echo "📦 Sauvegarde de l'application..."
tar -czf $BACKUP_DIR/app-backup-$DATE.tar.gz -C $APP_DIR . --exclude=node_modules --exclude=.git

# Sauvegarde de la base de données (si applicable)
# mysqldump -u user -p database > $BACKUP_DIR/db-backup-$DATE.sql

# Sauvegarde des configurations
echo "⚙️ Sauvegarde des configurations..."
tar -czf $BACKUP_DIR/config-backup-$DATE.tar.gz \
    /etc/nginx/sites-available/stop-sida \
    /etc/nginx/sites-enabled/stop-sida \
    /var/www/stop-sida/server/.env \
    /var/www/stop-sida/.env

# Nettoyage des anciennes sauvegardes (garde 30 jours)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "✅ Sauvegarde terminée: $DATE"
```

### 2. Sauvegarde Externe

```bash
# Script de sauvegarde vers un serveur externe
nano /var/www/stop-sida/external-backup.sh
```

```bash
#!/bin/bash

# Configuration
REMOTE_HOST="votre-serveur-backup.com"
REMOTE_USER="backup"
REMOTE_PATH="/backups/stop-sida"
LOCAL_BACKUP="/var/www/backups"

# Synchronisation avec rsync
rsync -avz --delete $LOCAL_BACKUP/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/

echo "✅ Sauvegarde externe terminée"
```

## 📊 Monitoring et Alertes

### 1. Monitoring Avancé

```bash
# Script de monitoring complet
nano /var/www/stop-sida/advanced-monitoring.sh
```

Contenu du script :
```bash
#!/bin/bash

DOMAIN="votre-domaine.com"
EMAIL="admin@votre-domaine.com"
ALERT_LOG="/var/log/stop-sida-alerts.log"

# Fonction d'envoi d'alerte
send_alert() {
    local message="$1"
    echo "$(date): $message" >> $ALERT_LOG
    echo "$message" | mail -s "Alerte Stop-Sida" $EMAIL
}

# Test de connectivité
if ! curl -s -f https://$DOMAIN > /dev/null; then
    send_alert "❌ Site $DOMAIN inaccessible"
fi

# Test de l'API
if ! curl -s -f https://$DOMAIN/api/health > /dev/null; then
    send_alert "❌ API $DOMAIN inaccessible"
fi

# Vérification de l'espace disque
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [[ $DISK_USAGE -gt 80 ]]; then
    send_alert "⚠️ Espace disque critique: ${DISK_USAGE}%"
fi

# Vérification de la mémoire
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [[ $MEMORY_USAGE -gt 90 ]]; then
    send_alert "⚠️ Utilisation mémoire critique: ${MEMORY_USAGE}%"
fi

# Vérification des certificats SSL
SSL_EXPIRY=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
SSL_DAYS=$(echo $SSL_EXPIRY | xargs -I {} date -d {} +%s | xargs -I {} echo $(( ({} - $(date +%s)) / 86400 )))
if [[ $SSL_DAYS -lt 30 ]]; then
    send_alert "⚠️ Certificat SSL expire dans $SSL_DAYS jours"
fi
```

### 2. Dashboard de Monitoring

```bash
# Installation de Netdata pour le monitoring en temps réel
bash <(curl -Ss https://my-netdata.io/kickstart.sh) --stable-channel --disable-telemetry
```

## 🔒 Sécurité

### 1. Audit de Sécurité Mensuel

```bash
# Script d'audit de sécurité
nano /var/www/stop-sida/security-audit.sh
```

Contenu du script :
```bash
#!/bin/bash

echo "🔒 Audit de sécurité - $(date)"
echo "=============================="

# Vérification des mises à jour de sécurité
echo "📦 Mises à jour de sécurité disponibles:"
sudo apt list --upgradable | grep -i security

# Audit des vulnérabilités npm
echo "📦 Audit des dépendances npm:"
npm audit

# Vérification des ports ouverts
echo "🌐 Ports ouverts:"
sudo netstat -tlnp

# Vérification des utilisateurs avec accès SSH
echo "👥 Utilisateurs SSH:"
grep -E "sshd" /var/log/auth.log | tail -10

# Vérification des tentatives de connexion échouées
echo "🚫 Tentatives de connexion échouées:"
grep "Failed password" /var/log/auth.log | tail -10

# Vérification des fichiers modifiés récemment
echo "📝 Fichiers modifiés récemment:"
find /var/www/stop-sida -type f -mtime -7 -ls
```

### 2. Mise à Jour de Sécurité Automatique

```bash
# Script de mise à jour de sécurité automatique
nano /var/www/stop-sida/auto-security-update.sh
```

```bash
#!/bin/bash

# Mise à jour automatique des paquets de sécurité
sudo unattended-upgrades -d

# Redémarrage des services si nécessaire
if [[ -f /var/run/reboot-required ]]; then
    echo "🔄 Redémarrage requis après mise à jour de sécurité"
    # Notification avant redémarrage
    echo "Redémarrage du serveur dans 5 minutes" | mail -s "Redémarrage Sécurité" admin@votre-domaine.com
    sleep 300
    sudo reboot
fi
```

## ⚡ Performance

### 1. Optimisation Nginx

```bash
# Configuration Nginx optimisée
sudo nano /etc/nginx/nginx.conf
```

Ajoutez ces optimisations :
```nginx
# Gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

# Cache des fichiers statiques
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Limitation du taux de requêtes
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
location /api/ {
    limit_req zone=api burst=20 nodelay;
    proxy_pass http://localhost:3001;
}
```

### 2. Optimisation Node.js

```bash
# Configuration PM2 optimisée
pm2 ecosystem
```

Configuration optimisée :
```javascript
module.exports = {
  apps: [{
    name: 'stop-sida-backend',
    script: './server/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
```

## 🛠️ Troubleshooting Avancé

### 1. Diagnostic Complet

```bash
# Script de diagnostic avancé
nano /var/www/stop-sida/advanced-diagnostic.sh
```

Contenu du script :
```bash
#!/bin/bash

echo "🔍 Diagnostic avancé - $(date)"
echo "=============================="

# Informations système
echo "💻 Informations système:"
uname -a
cat /etc/os-release

# Ressources système
echo "📊 Ressources système:"
top -bn1 | head -20
free -h
df -h

# Services
echo "🔧 Services:"
sudo systemctl list-units --failed
pm2 status

# Réseau
echo "🌐 Réseau:"
ip addr show
sudo netstat -tlnp
sudo ufw status

# Logs
echo "📝 Logs récents:"
sudo tail -n 20 /var/log/nginx/error.log
pm2 logs stop-sida-backend --lines 20

# Performance
echo "⚡ Performance:"
iostat -x 1 3
vmstat 1 3

# Sécurité
echo "🔒 Sécurité:"
sudo fail2ban-client status
sudo ufw status verbose
```

### 2. Récupération d'Urgence

```bash
# Script de récupération d'urgence
nano /var/www/stop-sida/emergency-recovery.sh
```

```bash
#!/bin/bash

echo "🚨 Récupération d'urgence - $(date)"

# Arrêt de tous les services
pm2 stop all
sudo systemctl stop nginx

# Nettoyage des processus zombies
sudo pkill -f node
sudo pkill -f nginx

# Redémarrage des services
sudo systemctl start nginx
pm2 start ecosystem.config.js

# Vérification
sleep 10
curl -f http://localhost:3001/api/health || echo "❌ Récupération échouée"
```

## 📋 Checklist de Maintenance

### Quotidien
- [ ] Vérification des services
- [ ] Surveillance des logs
- [ ] Vérification de l'espace disque

### Hebdomadaire
- [ ] Nettoyage du système
- [ ] Mise à jour des dépendances
- [ ] Test de performance

### Mensuel
- [ ] Mise à jour du système
- [ ] Audit de sécurité
- [ ] Analyse des performances
- [ ] Révision des sauvegardes

### Trimestriel
- [ ] Mise à jour majeure de l'application
- [ ] Audit de sécurité approfondi
- [ ] Optimisation des performances
- [ ] Révision de la documentation

## 🎯 Commandes Rapides

```bash
# Maintenance quotidienne
cd /var/www/stop-sida && ./daily-check.sh

# Maintenance hebdomadaire
cd /var/www/stop-sida && ./weekly-cleanup.sh

# Maintenance mensuelle
cd /var/www/stop-sida && ./monthly-update.sh

# Déploiement sécurisé
cd /var/www/stop-sida && ./secure-deploy.sh main

# Diagnostic avancé
cd /var/www/stop-sida && ./advanced-diagnostic.sh

# Récupération d'urgence
cd /var/www/stop-sida && ./emergency-recovery.sh
```

---

**Note importante** : Adaptez ces scripts à votre environnement spécifique et testez-les dans un environnement de développement avant de les utiliser en production.
