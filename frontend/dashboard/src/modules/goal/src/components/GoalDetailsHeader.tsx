
import React from 'react';
import { Goal } from '@/types/goals';
import { calculateProgress } from '@/utils/goalUtils';
import { Progress } from '@/components/ui/progress';
import { LucideIcon, TrendingUp, AlertCircle, Calendar, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalDetailsHeaderProps {
  goal: Goal;
}

const iconMap: Record<string, LucideIcon> = {
  shield: AlertCircle,
  calendar: Calendar,
  trophy: Trophy,
  target: TrendingUp,
};

const GoalDetailsHeader: React.FC<GoalDetailsHeaderProps> = ({ goal }) => {
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  
  return (
    <div className="bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/5 shadow-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-inner",
          "from-finxpert-soft-purple to-finxpert-light dark:from-finxpert-primary/20 dark:to-finxpert-vivid-purple/10"
        )}>
          {React.createElement(iconMap[goal.icon || 'target'] || TrendingUp, { 
            className: "w-8 h-8 text-finxpert-primary dark:text-finxpert-primary"
          })}
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple text-transparent bg-clip-text">
            {goal.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {goal.description}
          </p>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Goal Progress</span>
          <span className="text-sm font-bold text-finxpert-primary dark:text-finxpert-soft-purple">{progress.toFixed(0)}% Complete</span>
        </div>
        <Progress 
          value={progress} 
          className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full"
        />
      </div>
    </div>
  );
};

export default GoalDetailsHeader;
