import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const PromoScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-100%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);

  return (
    <section ref={containerRef} className="scene-container" style={{ minHeight: '80vh', backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      <motion.div 
        style={{ 
          position: 'absolute', top: '-20%', left: '-10%', 
          width: '50vw', height: '50vw', borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)',
          y: y1 
        }} 
      />
      <motion.div 
        style={{ 
          position: 'absolute', bottom: '-20%', right: '-10%', 
          width: '60vw', height: '60vw', borderRadius: '50%', 
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 70%)',
          y: y2 
        }} 
      />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '2rem' }}>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          viewport={{ once: true }}
          style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '1rem' }}
        >
          UP TO 40% OFF
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          style={{ fontSize: '1.25rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a0a0a0', marginBottom: '3rem' }}
        >
          End of Season Sale
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          style={{ 
            padding: '1.25rem 4rem', background: '#fff', color: '#000', 
            fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            borderRadius: '4px', cursor: 'pointer', border: 'none'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop Sale
        </motion.button>
      </div>
    </section>
  );
};
