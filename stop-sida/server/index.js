const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173' 
    : process.env.DOMAIN_URL || 'https://stop-sida.org',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Configuration Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Route pour envoyer des emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, html, cc, bcc, from } = req.body;
    
    console.log('📧 Envoi d\'email vers:', to);
    console.log('📝 Sujet:', subject);
    
    const response = await resend.emails.send({
      from: from || process.env.FROM_EMAIL || 'notifications@stop-sida.org',
      to,
      cc,
      bcc,
      subject,
      html,
    });
    
    if (response.error) {
      console.error('❌ Erreur Resend:', response.error);
      return res.status(400).json({ 
        success: false, 
        error: response.error.message 
      });
    }
    
    console.log('✅ Email envoyé avec succès:', response.data?.id);
    res.json({ 
      success: true, 
      messageId: response.data?.id 
    });
    
  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur email opérationnel' });
});

app.listen(port, () => {
  console.log(`🚀 Serveur email démarré sur le port ${port}`);
  console.log(`📧 Mode: ${process.env.NODE_ENV || 'development'}`);
}); 