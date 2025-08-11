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
    const { to, subject, html, cc, bcc, from } = req.body;
    
    // Validation des données requises
    if (!to || !Array.isArray(to) || to.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Le champ "to" est requis et doit être un tableau non vide'
      });
    }

    if (!subject || typeof subject !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Le champ "subject" est requis et doit être une chaîne de caractères'
      });
    }

    if (!html || typeof html !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Le champ "html" est requis et doit être une chaîne de caractères'
      });
    }

    console.log('📧 Envoi d\'email vers:', to);
    console.log('📝 Sujet:', subject);
    console.log('📤 Expéditeur:', from || process.env.FROM_EMAIL || 'notifications@stop-sida.org');
    
    const response = await resend.emails.send({
      from: from || process.env.FROM_EMAIL || 'notifications@stop-sida.org',
      to,
      cc: cc || undefined,
      bcc: bcc || undefined,
      subject,
      html,
    });
    
    if (response.error) {
      console.error('❌ Erreur Resend:', response.error);
      return res.status(400).json({ 
        success: false, 
        error: response.error.message || 'Erreur lors de l\'envoi de l\'email'
      });
    }
    
    console.log('✅ Email envoyé avec succès:', response.data?.id);
    res.json({ 
      success: true, 
      messageId: response.data?.id,
      message: 'Email envoyé avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Erreur interne du serveur'
    });
  }
}; 