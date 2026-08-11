import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
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
          background: 'rgba(191, 54, 12, 0.95)', // Dark Orange/Rust
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <motion.div 
            whileTap={{ scale: 0.9 }} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {mobileMenuOpen ? <X size={24} style={{ color: '#fff' }} /> : <Menu size={24} style={{ color: '#fff' }} />}
          </motion.div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '0.05em', color: '#fff', fontFamily: "'Playfair Display', serif" }}>VISHAL CART</span>
        </div>
        
        <div style={{ display: 'flex', gap: '2.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.15em', fontWeight: 700, color: '#fff' }} className="hidden md:flex">
          <a href="#collection" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#ffd54f'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Offers</a>
          <a href="#featured" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#ffd54f'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Trending</a>
          <a href="#about" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#ffd54f'} onMouseOut={e => e.currentTarget.style.color = '#fff'}>Categories</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#fff' }}>
          <Search size={22} style={{ cursor: 'pointer' }} />
          <div style={{ position: 'relative' }}>
            <ShoppingBag size={22} style={{ cursor: 'pointer' }} />
            <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ffd54f', color: '#111', fontSize: '0.7rem', fontWeight: 'bold', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              width: '100vw',
              background: 'rgba(191, 54, 12, 0.98)',
              backdropFilter: 'blur(10px)',
              zIndex: 99,
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              textAlign: 'center'
            }}
          >
            <a href="#collection" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Offers</a>
            <a href="#featured" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Trending</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Categories</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
