import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedText } from './AnimatedText';

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="scene-container" style={{ height: '100vh' }}>
      <motion.div 
        style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          y, scale, opacity
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(5,5,5,0.4)', zIndex: 1
        }} />
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', padding: '0 2rem', width: '100%' }}>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.875rem', marginBottom: '1.5rem', color: '#a0a0a0' }}
        >
          Introducing
        </motion.p>
        <AnimatedText 
          text="THE NEXT COLLECTION" 
          as="h1"
          delay={0.2}
          className="hero-title"
        />
        <style dangerouslySetInnerHTML={{__html: `
          .hero-title {
            font-size: clamp(3rem, 8vw, 7rem);
            font-weight: 700;
            line-height: 1.1;
            letter-spacing: -0.02em;
            margin-bottom: 2rem;
          }
        `}} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <button style={{ 
            padding: '1rem 3rem', background: '#fff', color: '#000', 
            fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            borderRadius: '4px', transition: 'transform 0.3s'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Explore Now
          </button>
        </motion.div>
      </div>

      <motion.div 
        style={{ position: 'absolute', bottom: '2rem', left: '50%', x: '-50%', zIndex: 10 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)', margin: '0 auto', overflow: 'hidden' }}>
          <motion.div 
            style={{ width: '100%', height: '100%', background: '#fff', transformOrigin: 'top' }}
            animate={{ scaleY: [0, 1, 0], translateY: ['-100%', '0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
