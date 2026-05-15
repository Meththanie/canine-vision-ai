import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import translations from './translations/translations';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LanguageSelect from './pages/LanguageSelect';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Results from './pages/Results';
import Diseases from './pages/Diseases';
import Clinics from './pages/Clinics';
import About from './pages/About';
import Disclaimer from './pages/Disclaimer';
import DiseaseDetail from './pages/DiseaseDetail';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
export const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  const { language } = useLanguage();
  return translations[language] || translations.en;
}

function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('cv-language') || '';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('cv-language', lang);
  };

  useEffect(() => {
  AOS.init({ duration: 800, once: true });
}, []);

  if (!language) {
    return (
      <LanguageContext.Provider value={{ language: 'en', changeLanguage }}>
        <Router>
          <Routes>
            <Route path="*" element={<LanguageSelect />} />
          </Routes>
        </Router>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <Router>
        <Routes>
          <Route path="/language" element={<LanguageSelect />} />
          <Route path="/" element={<AppLayout><Home /></AppLayout>} />
          <Route path="/upload" element={<AppLayout><Upload /></AppLayout>} />
          <Route path="/results" element={<AppLayout><Results /></AppLayout>} />
          <Route path="/diseases" element={<AppLayout><Diseases /></AppLayout>} />
          <Route path="/clinics" element={<AppLayout><Clinics /></AppLayout>} />
          <Route path="/about" element={<AppLayout><About /></AppLayout>} />
          <Route path="/disclaimer" element={<AppLayout><Disclaimer /></AppLayout>} />
          <Route path="/diseases/:slug" element={<AppLayout><DiseaseDetail /></AppLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;