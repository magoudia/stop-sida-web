#!/bin/bash

# Script de configuration automatique du VPS Contabo pour Stop-Sida
# Usage: ./setup-vps.sh [DOMAIN] [RESEND_API_KEY]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
DOMAIN=${1:-"votre-domaine.com"}
RESEND_API_KEY=${2:-"votre_clé_api_resend"}
VPS_IP=$(curl -s ifconfig.me)
APP_DIR="/var/www/stop-sida"
USER="stopsida"

echo -e "${BLUE}🚀 Configuration automatique du VPS Contabo pour Stop-Sida${NC}"
echo -e "${YELLOW}Domaine: $DOMAIN${NC}"
echo -e "${YELLOW}IP du VPS: $VPS_IP${NC}"
echo ""

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    if [[ $EUID -eq 0 ]]; then
        log_error "Ce script ne doit pas être exécuté en tant que root"
        exit 1
    fi
    
    if [[ -z "$DOMAIN" || "$DOMAIN" == "votre-domaine.com" ]]; then
        log_error "Veuillez spécifier un domaine valide"
        echo "Usage: ./setup-vps.sh votre-domaine.com votre_clé_api_resend"
        exit 1
    fi
    
    if [[ -z "$RESEND_API_KEY" || "$RESEND_API_KEY" == "votre_clé_api_resend" ]]; then
        log_error "Veuillez spécifier une clé API Resend valide"
        echo "Usage: ./setup-vps.sh votre-domaine.com votre_clé_api_resend"
        exit 1
    fi
    
    log_success "Prérequis vérifiés"
}

# Mise à jour du système
update_system() {
    log_info "Mise à jour du système..."
    sudo apt update && sudo apt upgrade -y
    log_success "Système mis à jour"
}

# Installation des paquets essentiels
install_essential_packages() {
    log_info "Installation des paquets essentiels..."
    sudo apt install -y curl wget git unzip software-properties-common \
        apt-transport-https ca-certificates gnupg lsb-release ufw
    log_success "Paquets essentiels installés"
}

# Configuration du pare-feu
configure_firewall() {
    log_info "Configuration du pare-feu..."
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    sudo ufw allow ssh
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw allow 3001
    sudo ufw --force enable
    log_success "Pare-feu configuré"
}

# Installation de Node.js
install_nodejs() {
    log_info "Installation de Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    log_success "Node.js installé (version $(node --version))"
}

# Installation de Nginx
install_nginx() {
    log_info "Installation de Nginx..."
    sudo apt install nginx -y
    sudo systemctl start nginx
    sudo systemctl enable nginx
    log_success "Nginx installé et démarré"
}

# Installation de PM2
install_pm2() {
    log_info "Installation de PM2..."
    sudo npm install -g pm2
    log_success "PM2 installé"
}

# Installation de Certbot
install_certbot() {
    log_info "Installation de Certbot..."
    sudo apt install certbot python3-certbot-nginx -y
    log_success "Certbot installé"
}

# Création de la structure des dossiers
create_app_structure() {
    log_info "Création de la structure des dossiers..."
    sudo mkdir -p $APP_DIR
    sudo chown -R $USER:$USER $APP_DIR
    sudo mkdir -p /var/www/backups
    sudo chown -R $USER:$USER /var/www/backups
    log_success "Structure des dossiers créée"
}

# Configuration des variables d'environnement
setup_environment() {
    log_info "Configuration des variables d'environnement..."
    
    # Backend .env
    cat > $APP_DIR/server/.env << EOF
NODE_ENV=production
PORT=3001
RESEND_API_KEY=$RESEND_API_KEY
FROM_EMAIL=notifications@$DOMAIN
CORS_ORIGIN=https://$DOMAIN
EOF

    # Frontend .env
    cat > $APP_DIR/.env << EOF
VITE_API_URL=https://$DOMAIN/api
VITE_GA_TRACKING_ID=
EOF

    log_success "Variables d'environnement configurées"
}

# Configuration PM2
setup_pm2() {
    log_info "Configuration de PM2..."
    
    cat > $APP_DIR/ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'stop-sida-backend',
      script: './server/index.js',
      cwd: '$APP_DIR',
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
EOF

    log_success "Configuration PM2 créée"
}

# Configuration Nginx
setup_nginx() {
    log_info "Configuration de Nginx..."
    
    cat > /tmp/stop-sida << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    root $APP_DIR/dist;
    index index.html;

    # Gestion des routes React
    location / {
        try_files \$uri \$uri/ /index.html;
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
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

    sudo cp /tmp/stop-sida /etc/nginx/sites-available/
    sudo ln -sf /etc/nginx/sites-available/stop-sida /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t
    sudo systemctl reload nginx
    
    log_success "Nginx configuré"
}

# Création des scripts utilitaires
create_utility_scripts() {
    log_info "Création des scripts utilitaires..."
    
    # Script de déploiement
    cat > $APP_DIR/deploy.sh << 'EOF'
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
EOF

    # Script de maintenance
    cat > $APP_DIR/maintenance.sh << 'EOF'
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
EOF

    # Script de diagnostic
    cat > $APP_DIR/diagnostic.sh << 'EOF'
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
EOF

    # Rendre les scripts exécutables
    chmod +x $APP_DIR/deploy.sh
    chmod +x $APP_DIR/maintenance.sh
    chmod +x $APP_DIR/diagnostic.sh
    
    log_success "Scripts utilitaires créés"
}

# Configuration de la rotation des logs
setup_log_rotation() {
    log_info "Configuration de la rotation des logs..."
    
    cat > /tmp/stop-sida-logrotate << EOF
/var/log/stop-sida-*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

    sudo cp /tmp/stop-sida-logrotate /etc/logrotate.d/stop-sida
    log_success "Rotation des logs configurée"
}

# Configuration du renouvellement SSL automatique
setup_ssl_renewal() {
    log_info "Configuration du renouvellement SSL automatique..."
    
    # Ajout du cron job pour le renouvellement SSL
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    
    log_success "Renouvellement SSL automatique configuré"
}

# Affichage des informations finales
show_final_info() {
    echo ""
    echo -e "${GREEN}🎉 Configuration terminée avec succès!${NC}"
    echo ""
    echo -e "${BLUE}📋 Prochaines étapes:${NC}"
    echo "1. Configurez votre domaine DNS pour pointer vers: $VPS_IP"
    echo "2. Clonez votre repository dans: $APP_DIR"
    echo "3. Installez les dépendances: cd $APP_DIR && npm install"
    echo "4. Build du frontend: npm run build"
    echo "5. Démarrez le backend: pm2 start ecosystem.config.js"
    echo "6. Obtenez le certificat SSL: sudo certbot --nginx -d $DOMAIN"
    echo ""
    echo -e "${BLUE}🔧 Commandes utiles:${NC}"
    echo "• Déploiement: cd $APP_DIR && ./deploy.sh"
    echo "• Maintenance: cd $APP_DIR && ./maintenance.sh"
    echo "• Diagnostic: cd $APP_DIR && ./diagnostic.sh"
    echo "• Statut PM2: pm2 status"
    echo "• Logs backend: pm2 logs stop-sida-backend"
    echo ""
    echo -e "${YELLOW}⚠️  N'oubliez pas de:${NC}"
    echo "• Configurer votre clé API Resend dans $APP_DIR/server/.env"
    echo "• Tester l'envoi d'emails après le déploiement"
    echo "• Configurer un monitoring régulier"
    echo ""
}

# Fonction principale
main() {
    check_prerequisites
    update_system
    install_essential_packages
    configure_firewall
    install_nodejs
    install_nginx
    install_pm2
    install_certbot
    create_app_structure
    setup_environment
    setup_pm2
    setup_nginx
    create_utility_scripts
    setup_log_rotation
    setup_ssl_renewal
    show_final_info
}

# Exécution du script
main "$@"
