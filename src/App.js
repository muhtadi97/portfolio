import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // ✅ Tambahkan ini
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Contact from './components/Contact/Contact';
import { AnimatePresence } from 'framer-motion';
import Cursor from './components/UI/Cursor';
import Loading from './components/UI/Loading';
import './styles/App.css';
import './styles/global.css';
import ResumeDownload from './components/ResumeDownload/ResumeDownload';
import Footer from './components/Footer/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      const isDark = savedMode === 'true';
      setDarkMode(isDark);
      document.documentElement.classList.toggle('light-mode', !isDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  if (loading) {
    return <Loading />;
  }

  return (
    // ✅ Bungkus semua dengan HelmetProvider
    <HelmetProvider>
      {/* ✅ Tambahkan Helmet dengan SEO tags di sini */}
      <Helmet>
        {/* Title dan meta description */}
        <title>Mukhtadi Arijuddin - Portfolio & Projects</title>
        <meta name="description" content="Portfolio website of Mukhtadi Arijuddin, showcasing web development projects and skills." />
        <meta name="author" content="Mukhtadi Arijuddin" />
        <meta name="keywords" content="Mukhtadi Arijuddin, portfolio, web developer, React, JavaScript, frontend" />
        
        {/* Open Graph tags untuk social media */}
        <meta property="og:title" content="Mukhtadi Arijuddin - Portfolio & Projects" />
        <meta property="og:description" content="Portfolio website of Mukhtadi Arijuddin, showcasing web development projects and skills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://muhtadiari-portfolio.netlify.app" />
        {/* Ganti URL gambar di bawah ini dengan URL gambar hero/thumbnail Anda */}
        <meta property="og:image" content="https://muhtadiari-portfolio.netlify.app/images/og-image.jpg" />
        
        {/* Structured Data / JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mukhtadi Arijuddin",
            "url": "https://muhtadiari-portfolio.netlify.app",
            "image": "https://muhtadiari-portfolio.netlify.app/images/profile.jpg", // Ganti dengan path foto Anda
            "sameAs": [
              "https://linkedin.com/in/username-anda", // Ganti dengan LinkedIn Anda
              "https://github.com/username-anda",       // Ganti dengan GitHub Anda
              "https://twitter.com/username-anda"       // Ganti dengan Twitter Anda (jika ada)
            ],
            "jobTitle": "Web Developer",
            "description": "Portfolio of Mukhtadi Arijuddin - Web Developer specializing in React and modern frontend technologies",
            "knowsAbout": ["React", "JavaScript", "Web Development", "Frontend Development", "UI/UX"]
          })}
        </script>
      </Helmet>

      {/* ✅ Kode Anda yang asli tetap sama persis di bawah ini */}
      <Cursor />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <AnimatePresence mode="wait">
        <main className={darkMode ? 'dark-mode' : 'light-mode'}>
          <Hero />
          <Projects />
          <Skills />
          <Contact />
          <section id="resume" className="resume-section">
            <div className="container">
              <ResumeDownload />
            </div>
          </section>
        </main>
      </AnimatePresence>
      <div className="theme-transition-overlay"></div>
      <Footer />
    </HelmetProvider>
  );
}

export default App;