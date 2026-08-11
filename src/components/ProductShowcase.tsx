import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { AnimatedText } from './AnimatedText';

export const ProductShowcase: React.FC = () => {
  return (
    <section className="scene-container" style={{ padding: '8rem 2rem', minHeight: '100vh', display: 'block' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem', marginBottom: '1rem' }}
            >
              Curated Selection
            </motion.p>
            <AnimatedText text="LIFESTYLE ESSENTIALS" as="h2" delay={0.2} />
            <style dangerouslySetInnerHTML={{__html: `
              h2 {
                font-size: clamp(2rem, 4vw, 3rem);
                font-weight: 600;
              }
            `}} />
          </div>
          <motion.a 
            href="#all"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textDecoration: 'underline', textUnderlineOffset: '4px', letterSpacing: '0.05em' }}
            whileHover={{ color: '#a0a0a0' }}
          >
            View All
          </motion.a>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
