
import React, { useState } from 'react';
import { Goal } from '@/types/goals';
import { formatCurrency, calculateProgress, formatDaysRemaining, getDaysRemaining, getMotivationalMessage, needsAttention } from '@/utils/goalUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon, AlertCircle, Calendar, Trophy, TrendingUp, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import GoalActions from './GoalActions';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GoalCardProps {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
  onDelete?: (goalId: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  shield: AlertCircle,
  calendar: Calendar,
  trophy: Trophy,
  target: TrendingUp,
};

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const requiresAttention = needsAttention(goal);
  const motivationalMessage = getMotivationalMessage(progress);
  
  const handleUpdate = (updatedGoal: Goal) => {
    onUpdate(updatedGoal);
    setShowActions(false);
  };
  
  const handleCardClick = () => {
    navigate(`/goals/${goal.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(goal.id);
    }
    setShowDeleteDialog(false);
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        className="rounded-3xl overflow-hidden backdrop-blur-lg bg-white/90 dark:bg-gray-800/40 border border-white/20 dark:border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-inner",
                requiresAttention 
                  ? "from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20" 
                  : "from-finxpert-soft-purple to-finxpert-light dark:from-finxpert-primary/20 dark:to-finxpert-vivid-purple/10"
              )}>
                {React.createElement(iconMap[goal.icon || 'target'] || TrendingUp, { 
                  className: cn(
                    "w-6 h-6",
                    requiresAttention ? "text-red-500" : "text-finxpert-primary dark:text-finxpert-primary"
                  )
                })}
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{goal.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{goal.description}</p>
              </div>
            </div>
            
            {requiresAttention && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-medium">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Needs Attention
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>You're falling behind schedule. Consider increasing your savings.</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">{progress.toFixed(0)}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full"
            />
          </div>
          
          <div className="flex justify-between items-center mb-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Current</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(goal.currentAmount)}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 dark:text-gray-400">Target</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(goal.targetAmount)}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDaysRemaining(daysRemaining)}
            </div>
            
            {progress >= 25 && progress < 100 && (
              <Badge className="bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple dark:from-finxpert-vivid-purple dark:to-purple-600 hover:from-finxpert-primary/90 hover:to-finxpert-vivid-purple/90 dark:hover:from-finxpert-vivid-purple/90 dark:hover:to-purple-600/90 text-white rounded-full px-3">
                {progress >= 75 ? "Almost There!" : progress >= 50 ? "Halfway There!" : "25% Reached!"}
              </Badge>
            )}
            
            {progress >= 100 && (
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600/90 hover:to-emerald-600/90 text-white rounded-full px-3">
                Goal Reached! 🎉
              </Badge>
            )}
          </div>
          
          <div className="text-sm italic text-center mb-4 text-finxpert-secondary dark:text-finxpert-soft-purple bg-finxpert-light/50 dark:bg-finxpert-primary/10 p-3 rounded-xl">
            "{motivationalMessage}"
          </div>
          
          <div className="flex space-x-2 mt-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }} 
              className="w-full bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple dark:from-finxpert-vivid-purple dark:to-purple-600 hover:from-finxpert-primary/90 hover:to-finxpert-vivid-purple/90 dark:hover:from-finxpert-vivid-purple/90 dark:hover:to-purple-600/90 text-white transition-all duration-300 rounded-xl"
            >
              {showActions ? "Cancel" : "Update Goal"}
            </Button>
            
            <Button
              onClick={handleDeleteClick}
              variant="outline"
              className="bg-white/80 dark:bg-gray-800/60 hover:bg-red-50 dark:hover:bg-red-900/20 border border-gray-200 dark:border-gray-700 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 rounded-xl"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
          
          {showActions && (
            <div onClick={(e) => e.stopPropagation()}>
              <GoalActions goal={goal} onUpdate={handleUpdate} />
            </div>
          )}
          
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-100 dark:border-gray-700 rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-gray-900 dark:text-gray-100">Delete Goal</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete "{goal.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel 
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConfirmDelete();
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GoalCard;
