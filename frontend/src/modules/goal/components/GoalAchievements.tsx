
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Calendar, Sparkles, Target, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Goal } from '@/types/goals';

interface GoalAchievementsProps {
  goals: Goal[];
  showSummary?: boolean;
  showDetailed?: boolean;
}

interface Achievement {
  id: string;
  goalName: string;
  title: string;
  description: string;
  icon: 'trophy' | 'calendar' | 'sparkles' | 'target';
  date: Date;
  amount?: number;
  monthsTaken?: number;
  averageSIP?: number;
  goalCategory?: string;
}

const GoalAchievements: React.FC<GoalAchievementsProps> = ({ 
  goals, 
  showSummary = false,
  showDetailed = false
}) => {
  // Generate achievements based on goals
  const generateAchievements = (goals: Goal[]): Achievement[] => {
    const achievements: Achievement[] = [];
    
    // Check for completed goals
    const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount);
    completedGoals.forEach(goal => {
      const createdDate = new Date(goal.createdAt);
      const completionDate = new Date(); // In a real app, this would be the actual completion date
      const monthsTaken = Math.max(1, Math.floor((completionDate.getTime() - createdDate.getTime()) / (30 * 24 * 60 * 60 * 1000)));
      const averageSIP = Math.round(goal.targetAmount / monthsTaken);
      
      achievements.push({
        id: `completed-${goal.id}`,
        goalName: goal.name,
        title: `${goal.name} goal completed!`,
        description: `You successfully reached your target of ₹${goal.targetAmount.toLocaleString()}`,
        icon: 'trophy',
        date: new Date(),
        amount: goal.targetAmount,
        monthsTaken,
        averageSIP,
        goalCategory: goal.category
      });
    });
    
    // Check for saving milestones
    const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
    if (totalSaved > 0) {
      achievements.push({
        id: 'savings-milestone',
        goalName: 'All Goals',
        title: 'Savings Milestone',
        description: `You've successfully saved ₹${totalSaved.toLocaleString()} across all goals!`,
        icon: 'sparkles',
        date: new Date(),
        amount: totalSaved
      });
    }
    
    // Check for approaching goals
    const approachingGoals = goals.filter(goal => {
      const progress = goal.currentAmount / goal.targetAmount;
      return progress >= 0.8 && progress < 1;
    });
    
    approachingGoals.forEach(goal => {
      achievements.push({
        id: `approaching-${goal.id}`,
        goalName: goal.name,
        title: 'Almost There!',
        description: `You're about to complete your ${goal.name} goal!`,
        icon: 'calendar',
        date: new Date(),
        amount: goal.currentAmount
      });
    });
    
    return achievements;
  };
  
  const achievements = generateAchievements(goals);
  
  if (achievements.length === 0) {
    return null;
  }
  
  const iconMap = {
    'trophy': <Trophy className="h-6 w-6 text-amber-500" />,
    'calendar': <Calendar className="h-6 w-6 text-blue-500" />,
    'sparkles': <Sparkles className="h-6 w-6 text-purple-500" />,
    'target': <Target className="h-6 w-6 text-green-500" />
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // If we're showing the detailed view only
  if (showDetailed) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            <span className="bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple text-transparent bg-clip-text flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-amber-500" />
              Your Financial Achievements
            </span>
          </h2>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {achievements.map((achievement) => (
            <motion.div 
              key={achievement.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <Card className={cn(
                "p-6 overflow-hidden relative bg-gradient-to-br from-white to-finxpert-light dark:from-gray-900 dark:to-gray-800 border-finxpert-light shadow-md hover:shadow-lg transition-all duration-300",
                "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-finxpert-primary/10 after:to-finxpert-vivid-purple/10 after:opacity-30"
              )}>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-inner">
                        {iconMap[achievement.icon]}
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                        {achievement.goalName} Achieved
                      </h3>
                    </div>
                    
                    {achievement.amount && (
                      <p className="text-lg text-gray-700 dark:text-gray-300 font-medium relative z-10 mb-1">
                        ₹{achievement.amount.toLocaleString()} saved
                        {achievement.monthsTaken && (
                          <span> in {achievement.monthsTaken} {achievement.monthsTaken === 1 ? 'month' : 'months'}</span>
                        )}
                      </p>
                    )}
                    
                    {achievement.averageSIP && (
                      <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        <span>Average Monthly SIP: ₹{achievement.averageSIP.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {achievement.date.toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    
                    {achievement.goalCategory && (
                      <span className="mt-2 px-3 py-1 text-xs font-medium bg-finxpert-soft-purple/50 dark:bg-finxpert-soft-purple/30 text-finxpert-primary dark:text-finxpert-vivid-purple rounded-full">
                        {achievement.goalCategory}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-5">
                  {iconMap[achievement.icon]}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
  
  // This is the summary view for the dashboard tab
  if (showSummary && achievements.length > 0) {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            <span className="bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple text-transparent bg-clip-text">
              🎉 Achievements
            </span>
          </h2>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {achievements.slice(0, 3).map((achievement) => (
            <motion.div 
              key={achievement.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <Card className={cn(
                "p-6 overflow-hidden relative bg-gradient-to-br from-white to-finxpert-light dark:from-gray-900 dark:to-gray-800 border-finxpert-light shadow-md hover:shadow-lg transition-all duration-300",
                "after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-r after:from-finxpert-primary/10 after:to-finxpert-vivid-purple/10 after:opacity-30"
              )}>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-inner">
                    {iconMap[achievement.icon]}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{achievement.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-2 relative z-10">{achievement.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {achievement.date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
                
                <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-5">
                  {iconMap[achievement.icon]}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
  
  return null;
};

export default GoalAchievements;
