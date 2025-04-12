
import React from 'react';
import { Card } from '@/components/ui/card';
import { Goal } from '@/types/goals';
import { Clock, AlertCircle, LightbulbIcon, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GoalRemindersProps {
  goals: Goal[];
  onDismissReminder: (reminderId: string) => void;
}

interface Reminder {
  id: string;
  goalId: string;
  goalName: string;
  message: string;
  actionText?: string;
  type: 'warning' | 'suggestion' | 'action';
  icon: 'clock' | 'alert' | 'lightbulb';
}

const GoalReminders: React.FC<GoalRemindersProps> = ({ goals, onDismissReminder }) => {
  // Generate reminders based on goals
  const generateReminders = (goals: Goal[]): Reminder[] => {
    const reminders: Reminder[] = [];
    
    // Check for behind schedule goals
    const behindGoals = goals.filter(goal => {
      if (goal.currentAmount >= goal.targetAmount) return false;
      
      const today = new Date();
      const deadline = new Date(goal.deadline);
      const totalDays = (deadline.getTime() - goal.createdAt.getTime()) / (1000 * 3600 * 24);
      const daysElapsed = (today.getTime() - goal.createdAt.getTime()) / (1000 * 3600 * 24);
      
      const expectedProgress = daysElapsed / totalDays;
      const actualProgress = goal.currentAmount / goal.targetAmount;
      
      return actualProgress < expectedProgress * 0.8 && actualProgress < 0.95;
    });
    
    behindGoals.forEach(goal => {
      const shortfall = goal.targetAmount * 0.2;
      const suggestedIncrease = Math.ceil(shortfall / 10) * 100; // Round to nearest 100
      
      reminders.push({
        id: `behind-${goal.id}`,
        goalId: goal.id,
        goalName: goal.name,
        message: `Your "${goal.name}" goal is behind schedule. Consider increasing your SIP by ₹${suggestedIncrease.toLocaleString()}.`,
        actionText: 'Adjust SIP',
        type: 'warning',
        icon: 'alert'
      });
    });
    
    // Generate tips and suggestions
    goals.forEach(goal => {
      if (Math.random() > 0.7) { // Only generate suggestions for some goals
        reminders.push({
          id: `tip-${goal.id}`,
          goalId: goal.id,
          goalName: goal.name,
          message: `Tip: Adding a bonus deposit this month to your ${goal.name} goal can help you stay on track.`,
          type: 'suggestion',
          icon: 'lightbulb'
        });
      }
    });
    
    // Upcoming deadlines
    const upcomingDeadlines = goals.filter(goal => {
      if (goal.currentAmount >= goal.targetAmount) return false;
      
      const today = new Date();
      const deadline = new Date(goal.deadline);
      const daysRemaining = (deadline.getTime() - today.getTime()) / (1000 * 3600 * 24);
      
      return daysRemaining > 0 && daysRemaining < 60; // Within 60 days
    });
    
    upcomingDeadlines.forEach(goal => {
      const deadline = new Date(goal.deadline);
      const daysRemaining = Math.ceil((deadline.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
      
      reminders.push({
        id: `deadline-${goal.id}`,
        goalId: goal.id,
        goalName: goal.name,
        message: `Only ${daysRemaining} days remaining to reach your ${goal.name} target.`,
        actionText: 'Review Goal',
        type: 'action',
        icon: 'clock'
      });
    });
    
    return reminders;
  };
  
  const reminders = generateReminders(goals);
  
  if (reminders.length === 0) {
    return null;
  }
  
  const iconMap = {
    'clock': <Clock className="h-5 w-5 text-amber-500" />,
    'alert': <AlertCircle className="h-5 w-5 text-red-500" />,
    'lightbulb': <LightbulbIcon className="h-5 w-5 text-blue-500" />
  };
  
  const reminderColors = {
    'warning': 'bg-gradient-to-br from-red-50 to-amber-50 border-red-200 dark:from-red-900/20 dark:to-amber-900/20 dark:border-red-800/30',
    'suggestion': 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-800/30',
    'action': 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-900/20 dark:to-yellow-900/20 dark:border-amber-800/30'
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15
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
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          <span className="bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple text-transparent bg-clip-text">
            🔔 Reminders
          </span>
        </h2>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {reminders.map((reminder) => (
          <motion.div 
            key={reminder.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            <Card className={cn(
              "p-5 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 rounded-xl border relative overflow-hidden",
              reminderColors[reminder.type]
            )}>
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm shadow-inner">
                    {iconMap[reminder.icon]}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-1">
                      {reminder.goalName}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{reminder.message}</p>
                    
                    {reminder.actionText && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-3 h-8 text-xs font-medium text-finxpert-primary hover:text-finxpert-vivid-purple hover:bg-finxpert-soft-purple/50 p-2"
                      >
                        {reminder.actionText}
                      </Button>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-7 p-0 rounded-full hover:bg-white/70 dark:hover:bg-white/10"
                  onClick={() => onDismissReminder(reminder.id)}
                >
                  <Check className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default GoalReminders;
