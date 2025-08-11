# Guide de Configuration du Domaine - Stop-Sida

## 📋 Table des Matières
1. [Prérequis](#prérequis)
2. [Configuration DNS](#configuration-dns)
3. [Configuration du VPS](#configuration-du-vps)
4. [Configuration SSL](#configuration-ssl)
5. [Test et Vérification](#test-et-vérification)
6. [Configuration Email](#configuration-email)
7. [Monitoring du Domaine](#monitoring-du-domaine)
8. [Troubleshooting](#troubleshooting)

## 🎯 Prérequis

- VPS Contabo configuré et opérationnel
- Domaine enregistré chez un registrar (OVH, Namecheap, GoDaddy, etc.)
- Accès au panneau de gestion DNS de votre registrar
- IP publique de votre VPS

## 🌐 Configuration DNS

### 1. Récupération de l'IP du VPS

```bash
# Sur votre VPS, récupérez l'IP publique
curl -s ifconfig.me
# ou
curl -s ipinfo.io/ip
```

### 2. Configuration des Enregistrements DNS

Connectez-vous au panneau de gestion de votre registrar et configurez les enregistrements DNS suivants :

#### Enregistrements A (IPv4)
```
Type: A
Nom: @
Valeur: VOTRE_IP_VPS
TTL: 300 (ou automatique)

Type: A
Nom: www
Valeur: VOTRE_IP_VPS
TTL: 300 (ou automatique)
```

#### Enregistrements CNAME (optionnel)
```
Type: CNAME
Nom: api
Valeur: votre-domaine.com
TTL: 300 (ou automatique)
```

#### Enregistrements MX (pour les emails)
```
Type: MX
Nom: @
Valeur: mail.votre-domaine.com
Priorité: 10
TTL: 300 (ou automatique)
```

#### Enregistrements TXT (pour la vérification)
```
Type: TXT
Nom: @
Valeur: "v=spf1 include:_spf.google.com ~all"
TTL: 300 (ou automatique)
```

### 3. Exemples par Registrar

#### OVH
1. Connectez-vous à votre espace client OVH
2. Allez dans "Domaines" > votre domaine
3. Cliquez sur "Zone DNS"
4. Ajoutez les enregistrements A et CNAME

#### Namecheap
1. Connectez-vous à votre compte Namecheap
2. Allez dans "Domain List" > "Manage"
3. Cliquez sur "Advanced DNS"
4. Ajoutez les enregistrements dans "Host Records"

#### GoDaddy
1. Connectez-vous à votre compte GoDaddy
2. Allez dans "My Products" > "DNS"
3. Cliquez sur "Manage DNS"
4. Ajoutez les enregistrements dans "Records"

## 🔧 Configuration du VPS

### 1. Mise à Jour de la Configuration Nginx

```bash
# Éditez la configuration Nginx
sudo nano /etc/nginx/sites-available/stop-sida
```

Assurez-vous que le `server_name` correspond à votre domaine :

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;
    # ... reste de la configuration
}
```

### 2. Test et Rechargement de Nginx

```bash
# Test de la configuration
sudo nginx -t

# Rechargement de Nginx
sudo systemctl reload nginx
```

### 3. Vérification des Ports

```bash
# Vérifiez que les ports sont ouverts
sudo ufw status
sudo netstat -tlnp | grep -E ':(80|443)'
```

## 🔒 Configuration SSL

### 1. Obtention du Certificat SSL

```bash
# Obtenez le certificat SSL avec Let's Encrypt
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Suivez les instructions interactives
# - Entrez votre email
# - Acceptez les conditions
# - Choisissez de rediriger HTTP vers HTTPS
```

### 2. Vérification du Certificat

```bash
# Vérifiez que le certificat est installé
sudo certbot certificates

# Test du renouvellement automatique
sudo certbot renew --dry-run
```

### 3. Configuration Automatique du Renouvellement

```bash
# Ajoutez un cron job pour le renouvellement automatique
sudo crontab -e

# Ajoutez cette ligne :
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🧪 Test et Vérification

### 1. Test de Résolution DNS

```bash
# Test depuis votre machine locale
nslookup votre-domaine.com
dig votre-domaine.com

# Test depuis le VPS
nslookup votre-domaine.com
dig votre-domaine.com
```

### 2. Test de Connectivité

```bash
# Test HTTP
curl -I http://votre-domaine.com
curl -I http://www.votre-domaine.com

# Test HTTPS
curl -I https://votre-domaine.com
curl -I https://www.votre-domaine.com

# Test de l'API
curl -X GET https://votre-domaine.com/api/health
```

### 3. Test du Frontend

```bash
# Test de la page d'accueil
curl -s https://votre-domaine.com | grep -i "stop-sida"

# Test des ressources statiques
curl -I https://votre-domaine.com/favicon.png
```

### 4. Test de l'Envoi d'Emails

```bash
# Test de l'API d'envoi d'emails
curl -X POST https://votre-domaine.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["test@example.com"],
    "subject": "Test de configuration",
    "html": "<h1>Test réussi!</h1>"
  }'
```

## 📧 Configuration Email

### 1. Configuration Resend

1. Connectez-vous à votre compte Resend
2. Allez dans "Domains"
3. Ajoutez votre domaine : `votre-domaine.com`
4. Suivez les instructions de vérification DNS

### 2. Enregistrements DNS pour Email

Ajoutez ces enregistrements DNS pour Resend :

```
Type: TXT
Nom: @
Valeur: "v=spf1 include:spf.resend.com ~all"

Type: CNAME
Nom: _resend
Valeur: resend.com

Type: TXT
Nom: _resend
Valeur: "resend-verification=YOUR_VERIFICATION_CODE"
```

### 3. Mise à Jour des Variables d'Environnement

```bash
# Mettez à jour le fichier .env du backend
sudo nano /var/www/stop-sida/server/.env
```

Assurez-vous que ces variables sont correctes :
```env
RESEND_API_KEY=votre_clé_api_resend
FROM_EMAIL=notifications@votre-domaine.com
CORS_ORIGIN=https://votre-domaine.com
```

## 📊 Monitoring du Domaine

### 1. Script de Monitoring

```bash
# Créez un script de monitoring
nano /var/www/stop-sida/monitor-domain.sh
```

Contenu du script :
```bash
#!/bin/bash

DOMAIN="votre-domaine.com"
EMAIL="votre-email@domaine.com"

# Test de connectivité
if ! curl -s -f https://$DOMAIN > /dev/null; then
    echo "❌ Le site $DOMAIN n'est pas accessible"
    # Envoyer une notification par email
    echo "Site $DOMAIN inaccessible" | mail -s "Alerte Site" $EMAIL
fi

# Test de l'API
if ! curl -s -f https://$DOMAIN/api/health > /dev/null; then
    echo "❌ L'API de $DOMAIN n'est pas accessible"
fi

# Test SSL
if ! openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | grep -q "Verify return code: 0"; then
    echo "❌ Problème avec le certificat SSL de $DOMAIN"
fi

echo "✅ Monitoring terminé pour $DOMAIN"
```

```bash
# Rendez le script exécutable
chmod +x /var/www/stop-sida/monitor-domain.sh

# Ajoutez un cron job pour le monitoring
sudo crontab -e

# Ajoutez cette ligne pour un monitoring toutes les 5 minutes
*/5 * * * * /var/www/stop-sida/monitor-domain.sh
```

### 2. Outils de Monitoring Externes

- **UptimeRobot** : Monitoring gratuit
- **Pingdom** : Monitoring avancé
- **StatusCake** : Monitoring avec alertes

## 🛠️ Troubleshooting

### 1. Problèmes de Résolution DNS

```bash
# Vérifiez la propagation DNS
dig +trace votre-domaine.com

# Test depuis différents serveurs DNS
nslookup votre-domaine.com 8.8.8.8
nslookup votre-domaine.com 1.1.1.1
```

### 2. Problèmes de Connectivité

```bash
# Test de connectivité depuis le VPS
telnet votre-domaine.com 80
telnet votre-domaine.com 443

# Vérification des logs Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### 3. Problèmes SSL

```bash
# Vérification du certificat
openssl s_client -connect votre-domaine.com:443 -servername votre-domaine.com

# Renouvellement manuel du certificat
sudo certbot renew --force-renewal

# Vérification de la configuration SSL
sudo nginx -t
```

### 4. Problèmes d'Email

```bash
# Test de l'API Resend
curl -X POST https://votre-domaine.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": ["test@example.com"],
    "subject": "Test",
    "html": "<p>Test</p>"
  }'

# Vérification des logs du backend
pm2 logs stop-sida-backend
```

### 5. Script de Diagnostic Complet

```bash
# Créez un script de diagnostic
nano /var/www/stop-sida/diagnose-domain.sh
```

Contenu du script :
```bash
#!/bin/bash

DOMAIN="votre-domaine.com"

echo "🔍 Diagnostic complet pour $DOMAIN"
echo "=================================="

echo "📊 Résolution DNS:"
nslookup $DOMAIN
echo ""

echo "🌐 Connectivité HTTP:"
curl -I http://$DOMAIN
echo ""

echo "🔒 Connectivité HTTPS:"
curl -I https://$DOMAIN
echo ""

echo "📧 Test API:"
curl -X GET https://$DOMAIN/api/health
echo ""

echo "🔐 Vérification SSL:"
openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | grep "Verify return code"
echo ""

echo "📝 Logs Nginx récents:"
sudo tail -n 5 /var/log/nginx/error.log
echo ""

echo "✅ Diagnostic terminé"
```

```bash
# Rendez le script exécutable
chmod +x /var/www/stop-sida/diagnose-domain.sh
```

## 📋 Checklist de Configuration

- [ ] Enregistrements DNS configurés
- [ ] Propagation DNS vérifiée
- [ ] Configuration Nginx mise à jour
- [ ] Certificat SSL obtenu
- [ ] Redirection HTTP vers HTTPS configurée
- [ ] API testée et fonctionnelle
- [ ] Emails configurés et testés
- [ ] Monitoring configuré
- [ ] Scripts de diagnostic créés
- [ ] Documentation mise à jour

## 🎯 Commandes Rapides

```bash
# Test rapide du domaine
curl -I https://votre-domaine.com

# Diagnostic complet
cd /var/www/stop-sida && ./diagnose-domain.sh

# Monitoring
cd /var/www/stop-sida && ./monitor-domain.sh

# Renouvellement SSL
sudo certbot renew

# Redémarrage des services
sudo systemctl reload nginx
pm2 restart stop-sida-backend
```

## 📞 Support

En cas de problème :
1. Vérifiez les logs : `sudo tail -f /var/log/nginx/error.log`
2. Testez la connectivité : `curl -I https://votre-domaine.com`
3. Vérifiez DNS : `nslookup votre-domaine.com`
4. Consultez le diagnostic : `./diagnose-domain.sh`

---

**Note importante** : Remplacez `votre-domaine.com` par votre vrai nom de domaine dans toutes les commandes et configurations.
