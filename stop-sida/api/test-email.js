const { Resend } = require('resend');

// Configuration Resend
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  // Configuration CORS pour Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vérifier que c'est une requête POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Méthode non autorisée. Utilisez POST.' 
    });
  }

  try {
    const { testEmail = 'sambasine365@gmail.com' } = req.body;

    console.log('🧪 Test d\'envoi d\'email vers:', testEmail);
    
    const response = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'notifications@stop-sida.org',
      to: [testEmail],
      subject: '🧪 Test Email - Stop SIDA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Test Email Réussi !</h2>
          <p>Bonjour,</p>
          <p>Ceci est un email de test pour vérifier que le système d'envoi d'emails fonctionne correctement sur Vercel.</p>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-top: 0;">✅ Configuration Vérifiée</h3>
            <ul style="color: #1e40af;">
              <li>✅ API Resend fonctionnelle</li>
              <li>✅ Variables d'environnement configurées</li>
              <li>✅ Fonction serverless opérationnelle</li>
              <li>✅ CORS configuré correctement</li>
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
      return res.status(400).json({ 
        success: false, 
        error: response.error.message || 'Erreur lors du test d\'envoi'
      });
    }
    
    console.log('✅ Test d\'email réussi:', response.data?.id);
    res.json({ 
      success: true, 
      messageId: response.data?.id,
      message: 'Email de test envoyé avec succès',
      testEmail,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Erreur serveur lors du test:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Erreur interne du serveur lors du test'
    });
  }
}; 