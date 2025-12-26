import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiFileText, FiEye, FiCheck, FiBarChart2 } from 'react-icons/fi';
import trackingService from '../../utils/tracking';
import './ResumeDownload.css';

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [downloadStats, setDownloadStats] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {

      // Create download link
      const link = document.createElement('a');
      link.href = '/CV - Mukhtadi Arijuddin.pdf';
      link.download = 'CV_Muhtadi_Arijuddin.pdf'; // Custom filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show confirmation
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);

    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleView = async () => {
    // Track view event
    await trackingService.openResume({
      resumeVersion: '1.0',
      action: 'view_only'
    });

    // Open in new tab
    window.open('/CV - Mukhtadi Arijuddin.pdf', '_blank', 'noopener,noreferrer');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="resume-download-container">
      <div className="resume-card">
        <div className="resume-header">
          <div className="resume-icon">
            <FiFileText size={32} />
          </div>
          <div className="resume-info">
            <h3 className="resume-title">CV Mukhtadi Arijuddin</h3>
            <p className="resume-subtitle">Diperbarui: Desember 2025 • PDF • 1 Page</p>
          </div>
        </div>

        <div className="resume-actions">
          <motion.button
            className="btn btn-primary download-btn"
            onClick={handleDownload}
            disabled={isDownloading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDownloading ? (
              <>
                <span className="spinner"></span>
                Downloading...
              </>
            ) : (
              <>
                <FiDownload />
                Download CV
              </>
            )}
          </motion.button>

          <motion.button
            className="btn btn-outline view-btn"
            onClick={handleView}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiEye />
            Lihat CV
          </motion.button>
        </div>
      </div>

      {/* Download Confirmation Toast */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="confirmation-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <FiCheck />
            <span>CV berhasil diunduh! Terima kasih atas ketertarikan Anda.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResumeDownload;