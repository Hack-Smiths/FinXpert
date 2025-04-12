
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        size="icon"
        variant="outline"
        className="rounded-full w-12 h-12 backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Toggle dark mode"
      >
        <motion.div
          initial={false}
          animate={{ rotateY: isDark ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-amber-300" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-finxpert-secondary" />
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default DarkModeToggle;
