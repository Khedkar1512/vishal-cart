import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';

export const ProductCard: React.FC<{ product: Product, index: number }> = ({ product, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel"
      style={{
        borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column',
        cursor: 'pointer', overflow: 'hidden', position: 'relative'
      }}
      whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.05)' }}
    >
      <div style={{ height: '250px', overflow: 'hidden', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <motion.img 
          src={product.imageUrl} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{product.name}</h3>
        <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginBottom: '1rem' }}>{product.category}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.125rem', fontWeight: 500 }}>${product.price}</span>
          <button style={{ 
            width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',
            border: 'none', cursor: 'pointer'
          }}>+</button>
        </div>
      </div>
    </motion.div>
  );
};
