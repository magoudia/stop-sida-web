module.exports = async (req, res) => {
  // Configuration CORS pour Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Gérer les requêtes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Vérifier que c'est une requête GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Méthode non autorisée. Utilisez GET.' 
    });
  }

  try {
    // Vérifier les variables d'environnement critiques
    const envCheck = {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      NODE_ENV: process.env.NODE_ENV || 'development'
    };

    res.json({ 
      status: 'OK', 
      message: 'Serveur email opérationnel',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      environmentCheck: envCheck,
      version: '1.0.0'
    });
  } catch (error) {
    console.error('❌ Erreur dans health check:', error);
    res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors du health check',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 