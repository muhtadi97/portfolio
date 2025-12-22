import React from 'react';
import { motion } from 'framer-motion';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <motion.div
          className="loading-logo"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <span className="text-gradient">◌</span>
        </motion.div>
        
        <motion.div
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="loading-title">Loading Portfolio</h2>
          <div className="loading-bar">
            <motion.div
              className="loading-progress"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;