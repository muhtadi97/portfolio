import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const Header = ({ darkMode, setDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Simpan preference ke localStorage
    localStorage.setItem('darkMode', newMode);
    
    // Update CSS variables
    updateTheme(newMode);
  };

  // Update CSS variables berdasarkan tema
  const updateTheme = (isDark) => {
    const root = document.documentElement;
    
    if (isDark) {
      root.style.setProperty('--dark', '#0f172a');
      root.style.setProperty('--dark-light', '#1e293b');
      root.style.setProperty('--light', '#f8fafc');
      root.style.setProperty('--gray', '#64748b');
      root.style.setProperty('--gray-light', '#cbd5e1');
    } else {
      root.style.setProperty('--dark', '#f8fafc');
      root.style.setProperty('--dark-light', '#e2e8f0');
      root.style.setProperty('--light', '#0f172a');
      root.style.setProperty('--gray', '#475569');
      root.style.setProperty('--gray-light', '#334155');
    }
  };

  // Initialize theme on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      const isDark = savedMode === 'true';
      setDarkMode(isDark);
      updateTheme(isDark);
    }
  }, [setDarkMode]);

  const navItems = [
    { name: 'Beranda', href: '#home' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Keahlian', href: '#skills' },
    { name: 'Kontak', href: '#contact' },
    { name: 'Resume', href: '#resume' },
  ];

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`header ${isScrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : 'light'}`}
    >
      <div className="container header-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#home" onClick={() => handleNavClick('#home')}>
            <span className="text-gradient">MA</span>
            <span className="logo-text">.Portfolio</span>
          </a>
        </motion.div>

        <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="nav-link"
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <motion.button
            className="theme-toggle"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>

          <motion.button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
    
  );
};

export default Header;