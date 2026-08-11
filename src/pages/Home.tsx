import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { Play, Pause, FastForward, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../data/products';

// Child component to prevent violating the Rules of Hooks in loops
interface FlashCardProps {
  product: Product;
  progress: MotionValue<number>;
  start: number;
  end: number;
}

const FlashProductCard: React.FC<FlashCardProps> = ({ product, progress, start, end }) => {
  const fade = 0.003;
  const opacity = useTransform(progress, [start - fade, start, end - fade, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.1, 1]);

  return (
    <motion.div 
      style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        opacity, 
        zIndex: 40, 
        background: 'linear-gradient(135deg, #fdfaf6 0%, #f4eae1 100%)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <motion.div 
        style={{ 
          position: 'relative', 
          width: 'min(90vw, 450px)', 
          height: 'min(60vh, 500px)', 
          borderRadius: '24px', 
          overflow: 'hidden', 
          boxShadow: '0 30px 60px rgba(74,14,23,0.12)', 
          scale 
        }}
      >
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{ 
          marginTop: '-2.5rem', 
          zIndex: 5, 
          background: '#fff', 
          padding: '1.25rem 2rem', 
          borderRadius: '20px', 
          boxShadow: '0 15px 35px rgba(74,14,23,0.15)', 
          textAlign: 'center', 
          width: 'min(80vw, 350px)',
          border: '1px solid rgba(74,14,23,0.08)',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease'
        }}
      >
        <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', fontWeight: 800, marginBottom: '0.25rem', fontFamily: "'Playfair Display', serif", color: '#4a0e17' }}>
          {product.name}
        </h2>
        <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', fontWeight: 900, color: '#b89047' }}>
          ₹{product.price}
        </p>
      </motion.div>
    </motion.div>
  );
};

export const Home: React.FC = () => {
  // Controlled video commercial timeline states
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeState, setTimeState] = useState(0);
  const [muted, setMuted] = useState(true);
  
  const progress = useMotionValue(0);

  // Sync React state to Framer Motion MotionValue
  useEffect(() => {
    progress.set(timeState / 60000);
  }, [timeState, progress]);

  // RequestAnimationFrame Loop for smooth time updates
  useEffect(() => {
    let lastTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      if (isPlaying) {
        const delta = now - lastTime;
        setTimeState(prev => {
          const next = prev + delta;
          return next >= 60000 ? 0 : next; // Loop timeline
        });
      }
      lastTime = now;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  // Handle Seek click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    setTimeState(Math.floor(percentage * 60000));
  };

  // Skip Intro function (jump to product grid - 0.30 progress / 18 seconds)
  const handleSkipIntro = () => {
    setTimeState(18000);
  };

  // Reset function
  const handleReset = () => {
    setTimeState(0);
  };

  // FRAME 1: Dashboard Page (0.0 to 0.06)
  const dashboardOpacity = useTransform(progress, [0, 0.05, 0.06], [1, 1, 0]);

  // FRAME 2: Rapid One-by-One Flash (0.06 to 0.30)
  const flashProducts = products.slice(0, 8);
  const durations = [
    0.035, // 2.1s
    0.035, // 2.1s
    0.030, // 1.8s
    0.030, // 1.8s
    0.030, // 1.8s
    0.030, // 1.8s
    0.025, // 1.5s
    0.025, // 1.5s
  ];
  const getFlashTiming = (index: number) => {
    let start = 0.06;
    for (let i = 0; i < index; i++) {
      start += durations[i];
    }
    const end = start + durations[index];
    return { start, end };
  };

  // FRAME 3: All Items Grid (0.30 to 0.60)
  // Making grid slide amount responsive using client-width percentage ratios
  const gridX = useTransform(progress, [0.30, 0.60], ["100vw", "-320vw"]);
  const gridOpacity = useTransform(progress, [0.29, 0.30, 0.58, 0.60], [0, 1, 1, 0]);

  // FRAME 4: High Offer Session (0.60 to 0.80)
  const offerScale = useTransform(progress, [0.60, 0.80], [0.8, 1.1]);
  const offerOpacity = useTransform(progress, [0.59, 0.60, 0.78, 0.80], [0, 1, 1, 0]);

  // FRAME 5: Final CTA (0.80 to 1.0)
  const ctaY = useTransform(progress, [0.80, 0.9], ["20%", "0%"]);
  const ctaOpacity = useTransform(progress, [0.80, 0.9], [0, 1]);

  return (
    <main 
      style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', background: '#fcfaf6' }}
    >
      
      {/* FRAME 1: Dashboard Page - Simple Editorial Brand Intro */}
      <motion.div 
        style={{ 
          position: 'absolute', 
          width: '100%', 
          height: '100%', 
          opacity: dashboardOpacity, 
          zIndex: 10, 
          background: 'linear-gradient(135deg, #fbf8f3 0%, #ebdcd0 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            width: '90%',
            maxWidth: '800px',
            gap: '2.5rem'
          }}
        >
          {/* Editorial Title */}
          <div>
            <h1 style={{ 
              color: '#4a0e17', 
              fontSize: 'clamp(3.2rem, 9vw, 6.5rem)', 
              fontWeight: 800, 
              letterSpacing: '0.12em', 
              lineHeight: 1.1,
              fontFamily: "'Playfair Display', serif",
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textShadow: '0 4px 10px rgba(74,14,23,0.05)'
            }}>
              VISHAL CART
            </h1>
            <p style={{ color: '#b89047', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.25rem)' }}>
              The Grand Shopping Festival
            </p>
          </div>

          {/* Website Data / Brand Quality Overlays */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              width: '100%', 
              borderTop: '1px solid rgba(74, 14, 23, 0.12)',
              borderBottom: '1px solid rgba(74, 14, 23, 0.12)',
              padding: '1.25rem 0',
              fontSize: 'clamp(0.7rem, 1.8vw, 0.9rem)',
              fontWeight: 800,
              color: '#4a0e17',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <span>ESTD. 2026</span>
            <span>Premium Materials</span>
            <span>Free Pan-India Delivery</span>
          </div>

          {/* Explore Button */}
          <div>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#4a0e17', color: '#fff', boxShadow: '0 10px 25px rgba(74,14,23,0.25)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSkipIntro}
              style={{
                padding: '1.25rem 4rem', 
                border: '2px solid #4a0e17',
                background: 'transparent', 
                color: '#4a0e17', 
                fontSize: '1rem',
                fontWeight: 800, 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                cursor: 'pointer', 
                borderRadius: '50px', 
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              Explore Collection
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* FRAME 2: Rapid One-by-One Flash with Hook-Safe Component */}
      {flashProducts.map((product, index) => {
        const { start, end } = getFlashTiming(index);
        return (
          <FlashProductCard 
            key={product.id} 
            product={product} 
            progress={progress} 
            start={start} 
            end={end} 
          />
        );
      })}

      {/* FRAME 3: All Items Grid - Rose Gold / Champagne Background */}
      <motion.div style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', display: 'flex', alignItems: 'center', opacity: gridOpacity, zIndex: 20, background: 'linear-gradient(135deg, #fff3eb 0%, #f6eae1 100%)' }}>
        <motion.div style={{ position: 'absolute', height: '100%', display: 'flex', alignItems: 'center', x: gridX, paddingLeft: '50vw' }}>
          <div style={{ position: 'absolute', top: '15%', left: '0', width: '100vw', textAlign: 'center' }}>
             <h2 style={{ fontSize: 'clamp(5rem, 14vw, 10rem)', fontWeight: 900, color: 'rgba(74,14,23,0.05)', whiteSpace: 'nowrap', fontFamily: "'Playfair Display', serif" }}>TRENDING NOW</h2>
          </div>
          <div style={{ display: 'flex', gap: 'max(2rem, 3vw)', zIndex: 5 }}>
            {products.slice(0, 10).map(product => (
              <motion.div 
                key={product.id} 
                whileHover={{ y: -15, scale: 1.02, boxShadow: '0 25px 50px rgba(74,14,23,0.12)' }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  background: '#fff', 
                  width: 'min(80vw, 360px)', 
                  height: 'min(65vh, 520px)', 
                  borderRadius: '24px', 
                  padding: '1.25rem', 
                  flexShrink: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)', 
                  border: '1px solid rgba(74,14,23,0.06)',
                  cursor: 'pointer',
                  transition: 'y 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '58%', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.25rem' }} />
                <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 800, color: '#4a0e17', fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>{product.name}</h3>
                <p style={{ color: '#8a7968', marginTop: '0.25rem', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#b89047' }}>₹{product.price}</div>
                  {product.badge && <span style={{ background: '#4a0e17', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.badge}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* FRAME 4: High Offer Session - Light Gold / Apricot Gradient */}
      <motion.div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: offerOpacity, zIndex: 30, background: 'linear-gradient(135deg, #fffaf5 0%, #ffebdb 100%)' }}>
        <motion.div style={{ scale: offerScale, textAlign: 'center', width: '100%' }}>
           <h2 style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', fontWeight: 900, color: '#4a0e17', marginBottom: '2.5rem', fontFamily: "'Playfair Display', serif" }}>MEGA OFFERS</h2>
           <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', padding: '0 1rem' }}>
             {products.filter(p => p.offer).slice(0, 3).map(product => (
               <motion.div 
                 key={product.id} 
                 whileHover={{ scale: 1.04, y: -8, boxShadow: '0 25px 45px rgba(74,14,23,0.15)' }}
                 whileTap={{ scale: 0.98 }}
                 style={{ 
                   width: 'min(90vw, 310px)', 
                   background: '#fff', 
                   borderRadius: '24px', 
                   overflow: 'hidden', 
                   boxShadow: '0 15px 35px rgba(74,14,23,0.06)',
                   border: '1px solid rgba(74,14,23,0.06)',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease'
                 }}
               >
                 <div style={{ position: 'relative' }}>
                   <img src={product.imageUrl} style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                   <div style={{ position: 'absolute', top: '1rem', right: '-2rem', background: '#4a0e17', color: '#fff', padding: '0.5rem 3rem', fontWeight: '900', fontSize: '1rem', transform: 'rotate(45deg)', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>{product.offer}</div>
                 </div>
                 <div style={{ padding: '1.25rem', textAlign: 'left' }}>
                   <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.25rem', color: '#4a0e17', fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                   <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#b89047' }}>₹{product.price}</div>
                 </div>
               </motion.div>
             ))}
           </div>
        </motion.div>
      </motion.div>

      {/* FRAME 5: Other Session & Final CTA - Rose Champagne Theme */}
      <motion.div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fff5f0 0%, #ffebf0 100%)', opacity: ctaOpacity, zIndex: 50, pointerEvents: 'auto' }}>
        <motion.div style={{ textAlign: 'center', color: '#111', y: ctaY, padding: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 900, marginBottom: '1.5rem', color: '#4a0e17', fontFamily: "'Playfair Display', serif" }}>VISHAL CART FESTIVAL</h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.35rem)', color: '#666', marginBottom: '3.5rem', maxWidth: '700px', margin: '0 auto 3.5rem auto', lineHeight: 1.6, fontWeight: 600 }}>Celebrate the joy of shopping with India's most trusted online store. Fast delivery, easy returns, and premium quality guaranteed.</p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#800020', boxShadow: '0 15px 35px rgba(74,14,23,0.3)' }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                padding: '1.25rem 3rem', background: '#4a0e17', color: '#fff', border: 'none',
                fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: '50px', boxShadow: '0 10px 20px rgba(74,14,23,0.15)',
                fontFamily: 'inherit', transition: 'all 0.3s ease'
              }}
            >
              Continue Shopping
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#4a0e17', color: '#fff' }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                padding: '1.25rem 3rem', background: 'transparent', color: '#4a0e17', border: '2px solid #4a0e17',
                fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: '50px',
                fontFamily: 'inherit', transition: 'all 0.3s ease'
              }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Real Video Commercial HUD / Interactive Controller Bar */}
      <div 
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(90vw, 650px)',
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(74, 14, 23, 0.1)',
          borderRadius: '30px',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          zIndex: 90,
          boxShadow: '0 20px 40px rgba(74,14,23,0.06)'
        }}
      >
        {/* Play/Pause Button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ background: '#4a0e17', color: '#fff', border: 'none', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {isPlaying ? <Pause size={16} fill="#fff" /> : <Play size={16} fill="#fff" style={{ marginLeft: '2px' }} />}
        </motion.button>

        {/* Progress seek bar */}
        <div 
          onClick={handleSeek}
          style={{ flex: 1, height: '6px', background: 'rgba(74, 14, 23, 0.1)', borderRadius: '3px', position: 'relative', cursor: 'pointer' }}
        >
          <div 
            style={{ width: `${(timeState / 60000) * 100}%`, height: '100%', background: 'linear-gradient(to right, #4a0e17, #b89047)', borderRadius: '3px' }}
          />
          {/* Thumb marker */}
          <div 
            style={{ left: `calc(${(timeState / 60000) * 100}% - 5px)`, position: 'absolute', top: '-4px', width: '14px', height: '14px', borderRadius: '50%', background: '#4a0e17', border: '2px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}
          />
        </div>

        {/* Time Stamp (e.g. 0:18 / 1:00) */}
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4a0e17', fontFamily: 'monospace' }}>
          {Math.floor(timeState / 1000).toString().padStart(2, '0')}s / 60s
        </div>

        {/* Muted toggle */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMuted(!muted)}
          style={{ background: 'transparent', border: 'none', color: '#4a0e17', cursor: 'pointer', padding: '4px' }}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.button>

        {/* Skip/Reset Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(74, 14, 23, 0.05)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            style={{ background: 'transparent', border: 'none', color: '#4a0e17', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}
          >
            <RotateCcw size={16} />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#4a0e17', color: '#fff' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkipIntro}
            style={{ background: 'rgba(74, 14, 23, 0.05)', border: 'none', color: '#4a0e17', padding: '6px 12px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            Skip <FastForward size={12} />
          </motion.button>
        </div>
      </div>
    </main>
  );
};
