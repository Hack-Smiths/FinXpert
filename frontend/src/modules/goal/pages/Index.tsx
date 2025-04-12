
import React, { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import GoalDashboard from '@/components/GoalDashboard';
import Celebration from '@/components/Celebration';
import { AnimatePresence } from 'framer-motion';
import DarkModeToggle from '@/components/DarkModeToggle';

const Index = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  
  // This would be triggered from within GoalCard when a milestone is reached
  // For demo purposes, we'll just add a setTimeout to show it briefly
  
  React.useEffect(() => {
    // Show celebration after 2 seconds for demo purposes
    const timer = setTimeout(() => {
      setShowCelebration(true);
      
      // Hide after 4 seconds
      setTimeout(() => {
        setShowCelebration(false);
      }, 4000);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-gradient-to-b from-white to-finxpert-light/30 dark:from-gray-900 dark:to-indigo-950/30 transition-colors duration-300">
        <Header />
        <GoalDashboard />
        <AnimatePresence>
          {showCelebration && <Celebration show={showCelebration} />}
        </AnimatePresence>
        <DarkModeToggle />
      </div>
    </ThemeProvider>
  );
};

export default Index;
