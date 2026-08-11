import React from 'react';
import { motion, useTime, useTransform, MotionValue } from 'framer-motion';
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
        background: 'linear-gradient(135deg, #d84315 0%, #bf360c 100%)', // Reverted to Orange/Rust BG
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
          boxShadow: '0 30px 60px rgba(0,0,0,0.4)', 
          scale 
        }}
      >
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
      <div 
        style={{ 
          marginTop: '-2rem', 
          zIndex: 5, 
          background: '#fff', 
          padding: '1rem 2rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)', 
          textAlign: 'center', 
          width: 'min(80vw, 350px)' 
        }}
      >
        <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginBottom: '0.25rem', fontFamily: "'Playfair Display', serif", color: '#bf360c' }}>
          {product.name}
        </h2>
        <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: 900, color: '#111' }}>
          ₹{product.price}
        </p>
      </div>
    </motion.div>
  );
};

export const Home: React.FC = () => {
  // Revert back to Framer Motion useTime loop for pure automatic playback
  const time = useTime();
  const progress = useTransform(time, [0, 60000], [0, 1], { clamp: true });

  // FRAME 1: Dashboard Page (0.0 to 0.06)
  const dashboardScale = useTransform(progress, [0, 0.06], [1, 1.3]);
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
  const gridX = useTransform(progress, [0.30, 0.60], ["100vw", "-250vw"]);
  const gridOpacity = useTransform(progress, [0.29, 0.30, 0.58, 0.60], [0, 1, 1, 0]);

  // FRAME 4: High Offer Session (0.60 to 0.80)
  const offerScale = useTransform(progress, [0.60, 0.80], [0.8, 1.1]);
  const offerOpacity = useTransform(progress, [0.59, 0.60, 0.78, 0.80], [0, 1, 1, 0]);

  // FRAME 5: Final CTA (0.80 to 1.0)
  const ctaY = useTransform(progress, [0.80, 0.9], ["20%", "0%"]);
  const ctaOpacity = useTransform(progress, [0.80, 0.9], [0, 1]);

  return (
    <main 
      style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', background: '#e65100' }}
    >
      
      {/* FRAME 1: Dashboard Page - Festival Orange/Gold (Reverted to Option 2 background image) */}
      <motion.div style={{ position: 'absolute', width: '100%', height: '100%', opacity: dashboardOpacity, zIndex: 10, background: 'linear-gradient(45deg, #FF512F 0%, #F09819 100%)' }}>
        <motion.img 
          src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=2000" 
          alt="Dashboard"
          style={{ 
            width: '100%', height: '100%', objectFit: 'cover', scale: dashboardScale,
            opacity: 0.25, mixBlendMode: 'multiply'
          }}
        />
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.2) 60deg, transparent 120deg, rgba(255,255,255,0.2) 180deg, transparent 240deg, rgba(255,255,255,0.2) 300deg, transparent 360deg)', zIndex: 1 }} 
        />
        
        <motion.div style={{ position: 'absolute', top: '50%', left: '50%', x: '-50%', y: '-50%', textAlign: 'center', width: '90%', zIndex: 5 }}>
           <h1 style={{ 
             color: '#fff', fontSize: 'clamp(4rem, 15vw, 12rem)', 
             fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1,
             fontFamily: "'Dancing Script', cursive",
             textShadow: '0 10px 40px rgba(0,0,0,0.5)'
           }}>
             Vishal Cart
           </h1>
           <p style={{ color: '#fff', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: '1rem', fontWeight: 800, fontSize: 'clamp(1rem, 3vw, 1.5rem)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
             The Grand Shopping Festival
           </p>
           <motion.button 
             whileHover={{ scale: 1.1, backgroundColor: '#fff', color: '#FF512F', boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
             style={{
               marginTop: '3rem', padding: '1rem 3rem', border: '2px solid #fff',
               background: 'transparent', color: '#fff', fontSize: '1.1rem',
               fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
               cursor: 'pointer', borderRadius: '50px', transition: 'all 0.3s ease'
             }}
           >
             Explore Now
           </motion.button>
        </motion.div>
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

      {/* FRAME 3: All Items Grid - Reverted to Light Orange Background */}
      <motion.div style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0', display: 'flex', alignItems: 'center', opacity: gridOpacity, zIndex: 20, background: 'linear-gradient(135deg, #ffe0b2 0%, #ffcc80 100%)' }}>
        <motion.div style={{ position: 'absolute', height: '100%', display: 'flex', alignItems: 'center', x: gridX, paddingLeft: '50vw' }}>
          <div style={{ position: 'absolute', top: '15%', left: '0', width: '100vw', textAlign: 'center' }}>
             <h2 style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', fontWeight: 900, color: 'rgba(191,54,12,0.1)', whiteSpace: 'nowrap', fontFamily: "'Playfair Display', serif" }}>TRENDING NOW</h2>
          </div>
          <div style={{ display: 'flex', gap: 'max(2rem, 3vw)', zIndex: 5 }}>
            {products.slice(0, 10).map(product => (
              <motion.div 
                key={product.id} 
                whileHover={{ y: -20, boxShadow: '0 30px 60px rgba(191,54,12,0.2)' }}
                style={{ background: '#fff', width: 'min(80vw, 380px)', height: 'min(70vh, 580px)', borderRadius: '24px', padding: '1.5rem', flexShrink: 0, display: 'flex', flexDirection: 'column', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}
              >
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '60%', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)', fontWeight: 800, color: '#bf360c', fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                <p style={{ color: '#666', marginTop: '0.25rem', fontWeight: 600, fontSize: '1rem' }}>{product.category}</p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111' }}>₹{product.price}</div>
                  {product.badge && <span style={{ background: '#bf360c', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{product.badge}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* FRAME 4: High Offer Session */}
      <motion.div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: offerOpacity, zIndex: 30, background: 'linear-gradient(135deg, #ff9a44 0%, #fc6076 100%)' }}>
        <motion.div style={{ scale: offerScale, textAlign: 'center', width: '100%' }}>
           <h2 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, color: '#fff', marginBottom: '3rem', fontFamily: "'Playfair Display', serif", textShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>MEGA OFFERS</h2>
           <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', padding: '0 1rem' }}>
             {products.filter(p => p.offer).slice(0, 3).map(product => (
               <motion.div 
                 key={product.id} 
                 whileHover={{ scale: 1.05 }}
                 style={{ width: 'min(90vw, 320px)', background: '#fff', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}
               >
                 <div style={{ position: 'relative' }}>
                   <img src={product.imageUrl} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                   <div style={{ position: 'absolute', top: '1rem', right: '-2rem', background: '#bf360c', color: '#fff', padding: '0.5rem 3rem', fontWeight: '900', fontSize: '1.1rem', transform: 'rotate(45deg)', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>{product.offer}</div>
                 </div>
                 <div style={{ padding: '1.5rem' }}>
                   <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#111', fontFamily: "'Playfair Display', serif" }}>{product.name}</h3>
                   <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#e65100' }}>₹{product.price}</div>
                 </div>
               </motion.div>
             ))}
           </div>
        </motion.div>
      </motion.div>

      {/* FRAME 5: Other Session & Final CTA - Light Peach Theme */}
      <motion.div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fff3e0 0%, #ffcc80 100%)', opacity: ctaOpacity, zIndex: 50, pointerEvents: 'auto' }}>
        <motion.div style={{ textAlign: 'center', color: '#111', y: ctaY, padding: '2rem' }}>
          <h2 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, marginBottom: '1.5rem', color: '#bf360c', fontFamily: "'Playfair Display', serif" }}>VISHAL CART FESTIVAL</h2>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#444', marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem auto', lineHeight: 1.6, fontWeight: 600 }}>Celebrate the joy of shopping with India's most trusted online store. Fast delivery, easy returns, and premium quality guaranteed.</p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(191,54,12,0.3)' }}
              style={{ 
                padding: '1.25rem 3rem', background: '#bf360c', color: '#fff', border: 'none',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: '50px', boxShadow: '0 10px 20px rgba(191,54,12,0.15)',
                fontFamily: 'inherit'
              }}
            >
              Continue Shopping
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#bf360c', color: '#fff' }}
              style={{ 
                padding: '1.25rem 3rem', background: 'transparent', color: '#bf360c', border: '2px solid #bf360c',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: '50px',
                fontFamily: 'inherit'
              }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};
