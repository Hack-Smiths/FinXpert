
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

interface SavingsConfettiProps {
  savingsRate: number;
  threshold?: number;
}

export const SavingsConfetti = ({ 
  savingsRate, 
  threshold = 40 
}: SavingsConfettiProps) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (savingsRate >= threshold && !shown) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#4F46E5", "#8B5CF6", "#10B981"]
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#4F46E5", "#8B5CF6", "#10B981"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
      setShown(true);
    }
  }, [savingsRate, threshold, shown]);

  return null;
};
