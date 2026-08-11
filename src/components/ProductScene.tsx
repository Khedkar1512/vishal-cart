import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Product } from '../data/products';
import { AnimatedText } from './AnimatedText';

interface ProductSceneProps {
  product: Product;
  reverse?: boolean;
}

export const ProductScene: React.FC<ProductSceneProps> = ({ product, reverse = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const filter = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  return (
    <section ref={containerRef} className="scene-container" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ 
        maxWidth: '1200px', width: '100%', margin: '0 auto', 
        display: 'flex', alignItems: 'center', 
        flexDirection: reverse ? 'row-reverse' : 'row',
        gap: '4rem',
        flexWrap: 'wrap'
      }}>
        
        <motion.div style={{ flex: '1 1 400px', opacity, minWidth: '300px' }} className="product-image-wrapper">
          <motion.img 
            src={product.imageUrl} 
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: '70vh', objectFit: 'cover', scale, y: y1, filter }}
          />
        </motion.div>

        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '300px' }}>
          {product.badge && (
            <motion.span 
              initial={{ opacity: 0, x: reverse ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              style={{ 
                alignSelf: 'flex-start', padding: '0.25rem 0.75rem', 
                border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.75rem', 
                letterSpacing: '0.1em', marginBottom: '1.5rem', borderRadius: '4px' 
              }}
            >
              {product.badge}
            </motion.span>
          )}
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            style={{ color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem', marginBottom: '1rem' }}
          >
            {product.category}
          </motion.p>
          
          <AnimatedText 
            text={product.name} 
            as="h2"
            className="product-title"
          />
          <style dangerouslySetInnerHTML={{__html: `
            .product-title {
              font-size: clamp(2.5rem, 5vw, 4rem);
              font-weight: 600;
              line-height: 1.1;
              margin-bottom: 1.5rem;
            }
          `}} />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, margin: "-10%" }}
            style={{ color: '#ccc', fontSize: '1.125rem', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '400px' }}
          >
            {product.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true, margin: "-10%" }}
            style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 500 }}>${product.price}</span>
            <button style={{ 
              padding: '1rem 2rem', background: 'transparent', color: '#fff', 
              border: '1px solid #fff', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em',
              transition: 'all 0.3s'
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
            >
              Explore Product
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
