import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowRight, FiInstagram, FiDownload } from 'react-icons/fi';
import { TypeAnimation } from 'react-type-animation';
import './Hero.css';
import { FaFileContract } from 'react-icons/fa';

const Hero = () => {
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/muhtadi97', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/muhtadi-arijuddin/', label: 'LinkedIn' },
    { icon: <FiInstagram />, href: 'https://www.instagram.com/muhtadiarii/', label: 'Instagram' },
  ];

  // State untuk typewriter effect code
  const [typedCode, setTypedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullCodeString = `const developer = {
  name: "Mukhtadi Arijuddin",
  role: "Frontend Developer",
  skills: [
    "React", "TypeScript", "Node.js",
    "Tailwind", "Framer Motion", "MySQL"
  ],
  location: "Remote",
  passion: "Creating Amazing UIs"
};`;

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullCodeString.length) {
      const timer = setTimeout(() => {
        setTypedCode(prev => prev + fullCodeString[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Speed typing: 30ms per karakter

      return () => clearTimeout(timer);
    } else {
      // Blinking cursor setelah selesai
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      
      return () => clearInterval(cursorInterval);
    }
  }, [currentIndex, fullCodeString]);

  // Reset setelah 10 detik
  useEffect(() => {
    if (currentIndex === fullCodeString.length) {
      const resetTimer = setTimeout(() => {
        setTypedCode('');
        setCurrentIndex(0);
        setShowCursor(true);
      }, 8000);
      
      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex, fullCodeString.length]);

  // Fungsi untuk download resume langsung
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/CV - Mukhtadi Arijuddin.pdf';
    link.download = 'Muhtadi_Arijuddin_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-title"
          >
            Halo, Saya <span className="text-gradient">Mukhtadi Arijuddin</span>
            <br />
            <TypeAnimation
              sequence={[
                '"Merancang pengalaman web yang modern"',
                2000,
                '"Menciptakan antarmuka yang interaktif"',
                2000,
                '"Berkomitmen pada kode yang bersih dan terstruktur"',
                2000,
                '"Menyempurnakan desain hingga detail terkecil"',
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              className="type-animation"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-description"
          >
            Membangun platform web yang handal, mudah dikembangkan, dan user-friendly untuk menjadi solusi tantangan bisnis yang kompleks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hero-actions"
          >
            <a href="#projects" className="btn btn-primary">
              Lihat Portofolio <FiArrowRight />
            </a>
            <a href="#contact" className="btn btn-outline">
              Hubungi Saya  ✉︎
            </a>
            <button 
              onClick={handleDownloadResume} 
              className="btn btn-secondary"
            >
              <FiDownload /> Download CV
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hero-social"
          >
            <span className="social-label">Terhubung</span>
            <div className="social-icons">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={link.label}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
          <div className="code-window">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="window-title">
                <span className="file-name">portfolio.js</span>
                <div className="typewriter-indicator">
                  {currentIndex < fullCodeString.length ? (
                    <>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-text">Typing...</span>
                    </>
                  ) : (
                    <span className="typing-text ready">Ready</span>
                  )}
                </div>
              </div>
            </div>
            <div className="window-content">
              <pre className="code-snippet">
                {typedCode}
                {showCursor && <span className="typing-cursor">▌</span>}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;