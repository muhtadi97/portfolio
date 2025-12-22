import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheckCircle } from 'react-icons/fi';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  
  const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
  };


  const contactInfo = [
    {
      icon: <FiMail />,
      title: "Email",
      info: "muhtadiarijuddin5@gmail.com",
      link: "mailto:muhtadiarijuddin5@gmail.com"
    },
    {
      icon: <FiPhone />,
      title: "Telpon",
      info: "+1 (234) 567-8900",
      link: "tel:+12345678900"
    },
    {
      icon: <FiMapPin />,
      title: "Lokasi",
      info: "Remote • Available Worldwide",
      link: "#"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };
      
    
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Tampilkan error yang lebih spesifik
      let errorMessage = 'Failed to send message. Please try again.';
      
      if (error.text === 'USER_IN_DEMO_MODE') {
        errorMessage = 'Please verify your EmailJS account to send emails.';
      } else if (error.text && error.text.includes('invalid')) {
        errorMessage = 'Invalid EmailJS configuration. Please check your credentials.';
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <span className="section-subtitle">Hubungi Saya</span>
          <h2 className="section-title">Mari Bekerja Sama</h2>
          <p className="section-description">
            Ada proyek yang ingin dikembangkan? Saya sangat tertarik untuk mendengarnya.
          </p>
        </motion.div>

        <div className="contact-container">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  className="contact-card"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="contact-icon">
                    {info.icon}
                  </div>
                  <div className="contact-details">
                    <h3 className="contact-title">{info.title}</h3>
                    <p className="contact-text">{info.info}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              className="availability"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="availability-badge">
                <div className="status-dot"></div>
                Siap untuk Proyek Baru
              </div>
              <p className="availability-text">
                Mari diskusikan bagaimana kita dapat bekerja sama!
                Saya sangat antusias untuk mendengar ide-ide dan kebutuhan proyek Anda!
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="success-message"
                >
                  <FiCheckCircle />
                  Pesan berhasil dikirim! Saya akan segera menghubungi Anda kembali.
                </motion.div>
              )}

              {errors.submit && (
                <div className="error-message">
                  {errors.submit}
                </div>
              )}

              <div className="form-group">
                <input
                  type="text"
                  name="name"  
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama Anda"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  required
                  autoComplete="name"
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"  
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Anda"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  required
                  autoComplete="email"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject (Opsional)"
                  className="form-input"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Pesan Anda"
                  rows="6"
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  required
                  autoComplete="off"
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Kirim Pesan<FiSend />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;