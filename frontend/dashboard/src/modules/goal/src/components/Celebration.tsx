
import React, { useState, useEffect } from 'react';

interface CelebrationProps {
  show: boolean;
  duration?: number;
}

const Celebration: React.FC<CelebrationProps> = ({ show, duration = 3000 }) => {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (show) {
      setActive(true);
      timer = setTimeout(() => {
        setActive(false);
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [show, duration]);
  
  if (!active) return null;
  
  // Create random confetti pieces
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const duration = 2 + Math.random() * 2;
    const rotation = Math.random() * 360;
    const color = [
      '#9b87f5',  // finxpert-primary
      '#7E69AB',  // finxpert-secondary
      '#8B5CF6',  // finxpert-vivid-purple
      '#FFDEE2',  // finxpert-soft-pink
      '#E5DEFF',  // finxpert-soft-purple
    ][Math.floor(Math.random() * 5)];
    
    return (
      <div 
        key={i}
        className="absolute top-0 rounded-md"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          transform: `rotate(${rotation}deg)`,
          animation: `confetti ${duration}s ease-out forwards ${delay}s`,
          opacity: Math.random() * 0.5 + 0.5,
        }}
      />
    );
  });
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces}
    </div>
  );
};

export default Celebration;
