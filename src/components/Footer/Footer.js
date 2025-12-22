import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiCoffee, FiCode, FiGithub } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2024;
  
  // Jika tahun sekarang sama dengan startYear, tampilkan hanya satu tahun
  const yearText = currentYear === startYear ? startYear : `${startYear} - ${currentYear}`;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
        
          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="copyright">
              <p>
                &copy; {yearText} Mukhtadi Arijuddin. All rights reserved.
              </p>
              <div className="made-with">
                <span className="made-with-text">
                  Dibuat dengan 
                  <motion.span 
                    className="heart-icon"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <FiHeart /> 
                  </motion.span>
                  dan banyak
                  <motion.span 
                    className="coffee-icon"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <FiCoffee />
                  </motion.span>
                  oleh <span className="author-name">Mukhtadi Arijuddin</span>
                </span>
              </div>
            </div>

            <div className="footer-stats">
              <div className="stat">
                <FiCode />
                <span>99,99% Hand Coded</span>
              </div>
              <div className="stat">
                <span className="tech-stack">React • Framer Motion • Tailwind</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="footer-extra"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="footer-note">
              Portofolio ini selalu dalam pengembangan. Punya saran? 
              <a href="#contact"> Hubungi saya!</a>
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;