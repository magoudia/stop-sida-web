#!/usr/bin/env node

/**
 * Script de test pour vérifier la configuration de l'envoi d'emails
 * Usage: node scripts/test-email.js
 */

const { Resend } = require('resend');
require('dotenv').config();

async function testEmailSetup() {
  console.log('🧪 Test de configuration email...\n');

  // Vérifier les variables d'environnement
  console.log('📋 Vérification des variables d\'environnement:');
  console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Configuré' : '❌ Manquant'}`);
  console.log(`   FROM_EMAIL: ${process.env.FROM_EMAIL ? '✅ Configuré' : '❌ Manquant'}`);
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);

  if (!process.env.RESEND_API_KEY) {
    console.log('❌ ERREUR: RESEND_API_KEY n\'est pas configurée');
    console.log('   Veuillez ajouter votre clé API Resend dans le fichier .env');
    console.log('   Obtenez votre clé sur: https://resend.com/api-keys');
    process.exit(1);
  }

  if (!process.env.FROM_EMAIL) {
    console.log('❌ ERREUR: FROM_EMAIL n\'est pas configurée');
    console.log('   Veuillez ajouter votre email expéditeur dans le fichier .env');
    process.exit(1);
  }

  try {
    // Initialiser Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('✅ Resend initialisé avec succès');

    // Test d'envoi d'email
    console.log('\n📧 Test d\'envoi d\'email...');
    
    const testEmail = 'sambasine365@gmail.com';
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [testEmail],
      subject: '🧪 Test Configuration Email - Stop SIDA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">✅ Configuration Email Réussie !</h2>
          <p>Bonjour,</p>
          <p>Ceci est un email de test pour vérifier que la configuration d'envoi d'emails fonctionne correctement.</p>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">✅ Configuration Vérifiée</h3>
            <ul style="color: #1e40af;">
              <li>✅ API Resend fonctionnelle</li>
              <li>✅ Variables d'environnement configurées</li>
              <li>✅ Email expéditeur valide</li>
              <li>✅ Connexion API établie</li>
            </ul>
          </div>
          
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString('fr-FR')}</p>
          <p><strong>Environnement:</strong> ${process.env.NODE_ENV || 'development'}</p>
          
          <p style="margin-top: 30px;">
            Cordialement,<br>
            <strong>L'équipe Stop SIDA</strong>
          </p>
        </div>
      `,
    });

    if (response.error) {
      console.error('❌ Erreur lors du test:', response.error);
      process.exit(1);
    }

    console.log('✅ Email de test envoyé avec succès!');
    console.log(`   Message ID: ${response.data?.id}`);
    console.log(`   Destinataire: ${testEmail}`);
    console.log('\n🎉 Configuration email opérationnelle!');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    
    if (error.message.includes('Invalid API key')) {
      console.log('\n💡 Solution: Vérifiez votre clé API Resend');
      console.log('   1. Allez sur https://resend.com/api-keys');
      console.log('   2. Copiez votre clé API');
      console.log('   3. Mettez à jour RESEND_API_KEY dans .env');
    } else if (error.message.includes('domain')) {
      console.log('\n💡 Solution: Vérifiez votre domaine expéditeur');
      console.log('   1. Allez sur https://resend.com/domains');
      console.log('   2. Ajoutez et vérifiez votre domaine');
      console.log('   3. Mettez à jour FROM_EMAIL dans .env');
    }
    
    process.exit(1);
  }
}

// Exécuter le test
testEmailSetup();
