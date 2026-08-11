import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag, Search, Menu } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={hidden ? { y: -100 } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: 'rgba(249, 246, 242, 0.85)', // Translucent Champagne
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(74, 14, 23, 0.08)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Menu size={24} style={{ cursor: 'pointer', color: '#4a0e17' }} />
        <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.05em', color: '#4a0e17', fontFamily: "'Playfair Display', serif" }}>VISHAL CART</span>
      </div>
      
      <div style={{ display: 'flex', gap: '2.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.15em', fontWeight: 700, color: '#4a0e17' }} className="hidden md:flex">
        <a href="#collection" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#b89047'} onMouseOut={e => e.currentTarget.style.color = '#4a0e17'}>Offers</a>
        <a href="#featured" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#b89047'} onMouseOut={e => e.currentTarget.style.color = '#4a0e17'}>Trending</a>
        <a href="#about" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#b89047'} onMouseOut={e => e.currentTarget.style.color = '#4a0e17'}>Categories</a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#4a0e17' }}>
        <Search size={22} style={{ cursor: 'pointer' }} />
        <div style={{ position: 'relative' }}>
          <ShoppingBag size={22} style={{ cursor: 'pointer' }} />
          <span style={{ 
            position: 'absolute', top: -5, right: -8, 
            background: '#ff5c39', color: '#fff', 
            fontSize: '10px', fontWeight: 'bold', 
            width: '16px', height: '16px', 
            borderRadius: '50%', display: 'flex', 
            alignItems: 'center', justifyContent: 'center' 
          }}>5</span>
        </div>
      </div>
    </motion.nav>
  );
};
