
import React, { useState } from 'react';
import { Nudge } from '@/types/goals';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, Lightbulb, Trophy, Heart, Plus, Filter, Droplet, Dumbbell, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';

interface NudgeContainerProps {
  nudges: Array<Nudge & { goalName: string; goalId: string }>;
  onDismiss: (goalId: string, nudgeId: string) => void;
}

type NudgeCategory = 'all' | 'encouragement' | 'suggestion' | 'warning' | 'celebration';
type NudgeViewMode = 'grid' | 'list';

const NudgeTypeIcons = {
  'hydration': Droplet,
  'exercise': Dumbbell,
  'focus': Brain,
  'encouragement': Heart,
  'suggestion': Lightbulb,
  'warning': AlertCircle,
  'celebration': Trophy,
};

// Array of inspiring header texts to rotate through
const inspiringHeaders = [
  "💡 Smart Boosts to Speed Up Your Goals",
  "❤️ Your Personalized Money Motivators",
  "🔥 Daily Nudges That Fuel Your Financial Wins",
  "✨ Tailored Tips for Financial Success",
  "🚀 Momentum Builders for Your Wealth Journey"
];

const NudgeContainer: React.FC<NudgeContainerProps> = ({ nudges, onDismiss }) => {
  const [activeCategory, setActiveCategory] = useState<NudgeCategory>('all');
  const [viewMode, setViewMode] = useState<NudgeViewMode>('grid');
  const { toast } = useToast();
  // Randomly select one of the inspiring headers
  const [headerText] = useState(inspiringHeaders[Math.floor(Math.random() * inspiringHeaders.length)]);
  
  // Exit early if no nudges
  if (nudges.length === 0) return null;
  
  const getNudgeIcon = (type: Nudge['type']) => {
    const IconComponent = NudgeTypeIcons[type as keyof typeof NudgeTypeIcons] || Lightbulb;
    return <IconComponent className={cn(
      "h-5 w-5",
      type === 'encouragement' ? "text-pink-500" : 
      type === 'suggestion' ? "text-amber-500" :
      type === 'warning' ? "text-red-500" : 
      type === 'celebration' ? "text-green-500" :
      "text-finxpert-primary"
    )} />;
  };
  
  const getNudgeColor = (type: Nudge['type']) => {
    switch (type) {
      case 'encouragement':
        return "bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 dark:from-pink-900/20 dark:to-purple-900/20 dark:border-pink-800/30";
      case 'suggestion':
        return "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-900/20 dark:to-yellow-900/20 dark:border-amber-800/30";
      case 'warning':
        return "bg-gradient-to-br from-red-50 to-orange-50 border-red-200 dark:from-red-900/20 dark:to-orange-900/20 dark:border-red-800/30";
      case 'celebration':
        return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800/30";
      default:
        return "bg-gradient-to-br from-finxpert-soft-purple to-finxpert-light border-finxpert-light dark:from-finxpert-primary/10 dark:to-finxpert-vivid-purple/10 dark:border-finxpert-primary/20";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const nudgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };
  
  const filteredNudges = activeCategory === 'all' 
    ? nudges 
    : nudges.filter(nudge => nudge.type === activeCategory);

  const categoryCount = {
    all: nudges.length,
    encouragement: nudges.filter(n => n.type === 'encouragement').length,
    suggestion: nudges.filter(n => n.type === 'suggestion').length,
    warning: nudges.filter(n => n.type === 'warning').length,
    celebration: nudges.filter(n => n.type === 'celebration').length
  };
  
  const handleAddNudge = () => {
    toast({
      title: "Create New Nudge",
      description: "This feature will be available soon!",
      duration: 3000,
    });
  };
  
  return (
    <div className="mb-8 space-y-4">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple">{headerText}</h2>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center space-x-1 bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm hover:shadow border border-finxpert-light dark:border-white/10 text-finxpert-secondary dark:text-gray-300"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                <Filter className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">View</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle between grid and list view</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveCategory(value as NudgeCategory)}>
          <TabsList className="grid grid-cols-5 mb-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-xl border border-finxpert-light/50 dark:border-white/5 p-1.5 w-full">
            <TabsTrigger value="all" className="font-medium">
              <span className="flex items-center gap-2">
                📝 All ({categoryCount.all})
              </span>
            </TabsTrigger>
            <TabsTrigger value="encouragement" className="font-medium">
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" /> 
                <span className="hidden sm:inline">Encouragement</span>
                <span className="sm:hidden">({categoryCount.encouragement})</span>
                <span className="hidden sm:inline">({categoryCount.encouragement})</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="suggestion" className="font-medium">
              <span className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500" /> 
                <span className="hidden sm:inline">Suggestions</span>
                <span className="sm:hidden">({categoryCount.suggestion})</span>
                <span className="hidden sm:inline">({categoryCount.suggestion})</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="warning" className="font-medium">
              <span className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" /> 
                <span className="hidden sm:inline">Reminders</span>
                <span className="sm:hidden">({categoryCount.warning})</span>
                <span className="hidden sm:inline">({categoryCount.warning})</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="celebration" className="font-medium">
              <span className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-green-500" /> 
                <span className="hidden sm:inline">Achievements</span>
                <span className="sm:hidden">({categoryCount.celebration})</span>
                <span className="hidden sm:inline">({categoryCount.celebration})</span>
              </span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value={activeCategory} className="mt-0">
              <div className={cn(
                "grid gap-4",
                viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}>
                <AnimatePresence>
                  {filteredNudges.map((nudge, i) => (
                    <motion.div
                      key={nudge.id}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={nudgeVariants}
                      layout
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Card 
                        className={cn(
                          "p-5 backdrop-blur-md shadow-lg dark:shadow-2xl hover:shadow-xl transition-all duration-300 rounded-3xl border",
                          getNudgeColor(nudge.type)
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-4">
                            <div className="p-3 bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-2xl shadow-inner">
                              {getNudgeIcon(nudge.type)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{nudge.goalName}</p>
                                <Badge variant="outline" className="text-[0.65rem] py-0 px-2 h-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm font-medium rounded-full">
                                  {nudge.type.charAt(0).toUpperCase() + nudge.type.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300 font-medium">{nudge.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {new Date(nudge.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0 rounded-full hover:bg-white/70 dark:hover:bg-white/10"
                            onClick={() => onDismiss(nudge.goalId, nudge.id)}
                          >
                            <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span className="sr-only">Dismiss</span>
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>

      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.3 }}
      >
        <Button 
          size="lg"
          onClick={handleAddNudge}
          className="rounded-full w-14 h-14 p-0 bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple dark:from-finxpert-vivid-purple dark:to-purple-600 hover:from-finxpert-vivid-purple hover:to-finxpert-primary shadow-lg hover:shadow-xl transition-all group relative z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-finxpert-vivid-purple to-purple-600 dark:from-purple-600 dark:to-finxpert-vivid-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
          <Plus className="h-6 w-6 relative z-10" />
          <span className="sr-only">Add nudge</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default NudgeContainer;
