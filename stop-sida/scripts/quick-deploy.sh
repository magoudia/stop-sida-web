#!/bin/bash

# Script de déploiement rapide pour Stop-Sida
# Usage: ./quick-deploy.sh [branch]

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Variables
BRANCH=${1:-"main"}
APP_DIR="/var/www/stop-sida"
BACKUP_DIR="/var/www/backups"
DATE=$(date +%Y%m%d_%H%M%S)

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

# Vérification de l'environnement
check_environment() {
    log_info "Vérification de l'environnement..."
    
    if [[ ! -d "$APP_DIR" ]]; then
        log_error "Le dossier de l'application n'existe pas: $APP_DIR"
        exit 1
    fi
    
    if [[ ! -f "$APP_DIR/package.json" ]]; then
        log_error "package.json non trouvé dans $APP_DIR"
        exit 1
    fi
    
    log_success "Environnement vérifié"
}

# Sauvegarde rapide
create_backup() {
    log_info "Création d'une sauvegarde rapide..."
    
    mkdir -p $BACKUP_DIR
    tar -czf $BACKUP_DIR/stop-sida-quick-backup-$DATE.tar.gz -C $APP_DIR . --exclude=node_modules --exclude=.git
    
    log_success "Sauvegarde créée: stop-sida-quick-backup-$DATE.tar.gz"
}

# Récupération des modifications
pull_changes() {
    log_info "Récupération des modifications depuis la branche $BRANCH..."
    
    cd $APP_DIR
    
    # Sauvegarde des modifications locales si nécessaire
    if [[ -n $(git status --porcelain) ]]; then
        log_warning "Modifications locales détectées, création d'un stash..."
        git stash push -m "Auto-stash before deploy $DATE"
    fi
    
    # Pull des modifications
    git fetch origin
    git checkout $BRANCH
    git pull origin $BRANCH
    
    log_success "Modifications récupérées"
}

# Mise à jour des dépendances
update_dependencies() {
    log_info "Mise à jour des dépendances..."
    
    cd $APP_DIR
    
    # Backend
    log_info "Mise à jour des dépendances backend..."
    cd server
    npm install --production
    cd ..
    
    # Frontend
    log_info "Mise à jour des dépendances frontend..."
    npm install
    
    log_success "Dépendances mises à jour"
}

# Build du frontend
build_frontend() {
    log_info "Build du frontend..."
    
    cd $APP_DIR
    npm run build
    
    if [[ ! -d "dist" ]]; then
        log_error "Le build a échoué - dossier dist non trouvé"
        exit 1
    fi
    
    log_success "Frontend buildé avec succès"
}

# Redémarrage du backend
restart_backend() {
    log_info "Redémarrage du backend..."
    
    # Vérification si PM2 est installé
    if ! command -v pm2 &> /dev/null; then
        log_error "PM2 n'est pas installé"
        exit 1
    fi
    
    # Redémarrage du processus
    pm2 restart stop-sida-backend
    
    # Vérification du statut
    sleep 2
    if pm2 list | grep -q "stop-sida-backend.*online"; then
        log_success "Backend redémarré avec succès"
    else
        log_error "Échec du redémarrage du backend"
        pm2 logs stop-sida-backend --lines 10
        exit 1
    fi
}

# Nettoyage des anciennes sauvegardes
cleanup_backups() {
    log_info "Nettoyage des anciennes sauvegardes..."
    
    cd $BACKUP_DIR
    
    # Garde les 10 sauvegardes les plus récentes
    ls -t stop-sida-quick-backup-*.tar.gz | tail -n +11 | xargs -r rm
    
    log_success "Nettoyage terminé"
}

# Test de santé
health_check() {
    log_info "Test de santé de l'application..."
    
    # Test du backend
    if curl -s http://localhost:3001/api/health | grep -q "OK"; then
        log_success "Backend opérationnel"
    else
        log_warning "Backend non accessible"
    fi
    
    # Test de Nginx
    if sudo systemctl is-active --quiet nginx; then
        log_success "Nginx opérationnel"
    else
        log_warning "Nginx non opérationnel"
    fi
}

# Affichage du résumé
show_summary() {
    echo ""
    echo -e "${GREEN}🎉 Déploiement rapide terminé avec succès!${NC}"
    echo ""
    echo -e "${BLUE}📊 Résumé:${NC}"
    echo "• Branche déployée: $BRANCH"
    echo "• Sauvegarde: stop-sida-quick-backup-$DATE.tar.gz"
    echo "• Heure de déploiement: $(date)"
    echo ""
    echo -e "${BLUE}🔧 Commandes utiles:${NC}"
    echo "• Statut PM2: pm2 status"
    echo "• Logs backend: pm2 logs stop-sida-backend"
    echo "• Logs Nginx: sudo tail -f /var/log/nginx/error.log"
    echo "• Diagnostic: cd $APP_DIR && ./diagnostic.sh"
    echo ""
}

# Fonction principale
main() {
    echo -e "${BLUE}🚀 Déploiement rapide Stop-Sida${NC}"
    echo -e "${YELLOW}Branche: $BRANCH${NC}"
    echo ""
    
    check_environment
    create_backup
    pull_changes
    update_dependencies
    build_frontend
    restart_backend
    cleanup_backups
    health_check
    show_summary
}

# Gestion des erreurs
trap 'log_error "Déploiement interrompu"; exit 1' INT TERM

# Exécution du script
main "$@"
