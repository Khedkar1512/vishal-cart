import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedText } from './AnimatedText';

export const FinalCTA: React.FC = () => {
  return (
    <section className="scene-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#050505', padding: '4rem 2rem', position: 'relative' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', width: '100%', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fff', margin: '0 auto 2rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ color: '#000', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.1em' }}>A</span>
        </motion.div>
        
        <AnimatedText text="REDEFINE YOUR STYLE" as="h2" delay={0.2} />
        <style dangerouslySetInnerHTML={{__html: `
          h2 {
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 700;
            margin-bottom: 3rem;
            letter-spacing: -0.02em;
          }
        `}} />

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          style={{ 
            padding: '1.25rem 4rem', background: 'transparent', color: '#fff', border: '1px solid #fff',
            fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s'
          }}
          whileHover={{ background: '#fff', color: '#000' }}
        >
          Shop Collection
        </motion.button>
      </div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
        style={{ position: 'absolute', bottom: '2rem', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 4rem', color: '#666', fontSize: '0.875rem' }}
      >
        <div>© 2026 AURA. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#666'}>Instagram</a>
          <a href="#" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#666'}>Twitter</a>
          <a href="#" style={{ transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = '#fff'} onMouseOut={e => e.currentTarget.style.color = '#666'}>Pinterest</a>
        </div>
      </motion.footer>
    </section>
  );
};
