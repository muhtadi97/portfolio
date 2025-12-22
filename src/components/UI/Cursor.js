import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [trailParticles, setTrailParticles] = useState([]);
  const lastParticleTime = useRef(0);
  const particleId = useRef(0);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isMobile = useRef(false);

  // Cek jika device mobile
  useEffect(() => {
    const checkMobile = () => {
      isMobile.current = window.innerWidth <= 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Particle system untuk efek bintang
  useEffect(() => {
    if (isMobile.current) return;

    const updateParticles = () => {
      setTrailParticles(prev => 
        prev
          .map(p => ({
            ...p,
            life: p.life - 0.02,
            size: p.size * 0.95,
            x: p.x + p.vx,
            y: p.y + p.vy
          }))
          .filter(p => p.life > 0)
      );
    };

    const interval = setInterval(updateParticles, 16);
    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk membuat partikel bintang
  const createStarParticle = (x, y, isHover = false) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = isHover ? 2 + Math.random() * 3 : 1 + Math.random() * 2;
    const size = isHover ? 8 + Math.random() * 6 : 4 + Math.random() * 4;

    return {
      id: particleId.current++,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size,
      life: 1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      type: Math.random() > 0.7 ? 'sparkle' : 'star',
      color: isHover ? '#6366f1' : '#ffffff'
    };
  };

  // Fungsi untuk membuat partikel tongkat sihir (saat hover)
  const createMagicParticles = (x, y) => {
    const particles = [];
    const count = 8;
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 1.5 + Math.random() * 2;
      const size = 6 + Math.random() * 4;
      
      particles.push({
        id: particleId.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        life: 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        type: 'magic',
        color: `hsl(${280 + Math.random() * 40}, 100%, ${60 + Math.random() * 20}%)`
      });
    }
    
    return particles;
  };

  useEffect(() => {
    if (isMobile.current) return;

    const mouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setMousePosition({ x, y });
      mousePositionRef.current = { x, y };

      // Buat partikel trail secara berkala
      const now = Date.now();
      if (now - lastParticleTime.current > 40) {
        const isHover = cursorVariant === 'hover';
        
        setTrailParticles(prev => [
          ...prev.slice(-30), // Batasi jumlah partikel
          createStarParticle(x, y, isHover)
        ]);
        
        lastParticleTime.current = now;
      }
    };

    const handleMouseEnter = () => {
      setCursorVariant('hover');
      
      // Buat efek ledakan partikel saat hover
      const particles = createMagicParticles(
        mousePositionRef.current.x,
        mousePositionRef.current.y
      );
      setTrailParticles(prev => [...prev.slice(-20), ...particles]);
    };

    const handleMouseLeave = () => {
      setCursorVariant('default');
    };

    window.addEventListener('mousemove', mouseMove);

    // Event listeners untuk efek hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, [data-cursor-hover]');
    
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorVariant]);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      rotate: 0,
      scale: 1,
      opacity: 1
    },
    hover: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      rotate: 15,
      scale: 1.3,
      opacity: 0.9
    }
  };

  // Render partikel bintang
  const renderParticles = () => {
    if (isMobile.current) return null;

    return trailParticles.map(particle => {
      const style = {
        left: `${particle.x}px`,
        top: `${particle.y}px`,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        opacity: particle.life,
        transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.life})`,
        pointerEvents: 'none',
        position: 'fixed'
      };

      if (particle.type === 'magic' && particle.color) {
        style.backgroundColor = particle.color;
        style.boxShadow = `0 0 8px ${particle.color}`;
      } else {
        style.backgroundColor = particle.color || '#ffffff';
      }

      return (
        <div
          key={particle.id}
          className={`cursor-particle ${particle.type}`}
          style={style}
        />
      );
    });
  };

  // Jika mobile, sembunyikan semua efek kursor
  if (isMobile.current) {
    return null;
  }

  return (
    <>
      {/* Kursor utama (tongkat sihir) */}
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{ 
          type: 'spring', 
          stiffness: 500, 
          damping: 28,
          mass: 0.5
        }}
      />
      
      {/* Trail kursor */}
      <div 
        className="cursor-trail"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      />
      
      {/* Partikel bintang */}
      <div className="particles-container">
        {renderParticles()}
      </div>
      
      {/* Efek khusus untuk tongkat sihir saat hover */}
      {cursorVariant === 'hover' && (
        <motion.div
          className="magic-sparkle"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity
          }}
          style={{
            position: 'fixed',
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            pointerEvents: 'none',
            zIndex: 9997,
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 70%)'
          }}
        />
      )}
    </>
  );
};

export default Cursor;