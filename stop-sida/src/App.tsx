
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil';
import APropos from './pages/APropos';
import Actions from './pages/Actions';
import Benevolat from './pages/Benevolat';
import Actualites from './pages/Actualites';
import Rapports from './pages/Rapports';
import DetailRapport from './pages/DetailRapport';
import Partenaires from './pages/Partenaires';
import Contact from './pages/Contact';
import DetailActualite from './pages/DetailActualite';
import Admin from './pages/Admin';
import TestEmail from './pages/TestEmail';
import { LanguageProvider } from './contexts/LanguageContext';
import GoogleAnalytics from './components/GoogleAnalytics';
import SocialBar from './components/SocialBar';
import StrapiDebug from './components/StrapiDebug';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <GoogleAnalytics />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={
            <>
              <SocialBar />
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/a-propos" element={<APropos />} />
              <Route path="/actions" element={<Actions />} />
                    <Route path="/benevolat" element={<Benevolat />} />
                    <Route path="/actualites" element={<Actualites />} />
                    <Route path="/rapports" element={<Rapports />} />
                    <Route path="/partenaires" element={<Partenaires />} />
              <Route path="/contact" element={<Contact />} />
                    <Route path="/actualites/:id" element={<DetailActualite />} />
                    <Route path="/rapports/:id" element={<DetailRapport />} />
                    <Route path="/debug-strapi" element={<StrapiDebug />} />
                    <Route path="/test-email" element={<TestEmail />} />
            </Routes>
          </main>
          <Footer />
        </div>

            </>
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;