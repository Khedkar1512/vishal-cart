import React from 'react';
import { motion, useTime, useTransform } from 'framer-motion';

export const ProgressIndicator: React.FC = () => {
  const time = useTime();
  // Map 60 seconds to a scale from 0 to 100%
  const scaleX = useTransform(time, [0, 60000], [0, 1], { clamp: true });

  return (
    <div style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100vw',
      height: '4px',
      background: 'rgba(0,0,0,0.1)',
      zIndex: 100
    }}>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          transformOrigin: 'left',
          scaleX
        }}
      />
    </div>
  );
};
