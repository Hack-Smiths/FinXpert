
import React, { useState } from 'react';
import { Goal } from '@/types/goals';
import { formatCurrency, getMonthlySavingsRecommendation } from '@/utils/goalUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { TrendingUp, AlertTriangle, Trophy } from 'lucide-react';

interface GoalActionsProps {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
}

const GoalActions: React.FC<GoalActionsProps> = ({ goal, onUpdate }) => {
  const [contribution, setContribution] = useState<number | ''>('');
  const { toast } = useToast();
  
  const recommendedSavings = getMonthlySavingsRecommendation(goal);
  
  const handleContribute = () => {
    if (contribution === '' || Number(contribution) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid contribution amount.",
        variant: "destructive",
      });
      return;
    }
    
    const newAmount = goal.currentAmount + Number(contribution);
    const updatedGoal = { 
      ...goal, 
      currentAmount: newAmount,
      updatedAt: new Date()
    };
    
    // Check if we reached any milestones
    const justAchievedMilestones = goal.milestones.filter(milestone => {
      const oldProgress = (goal.currentAmount / goal.targetAmount) * 100;
      const newProgress = (newAmount / goal.targetAmount) * 100;
      
      return !milestone.achieved && 
        oldProgress < milestone.percentage && 
        newProgress >= milestone.percentage;
    });
    
    // If we achieved any milestones, update them
    if (justAchievedMilestones.length > 0) {
      updatedGoal.milestones = goal.milestones.map(milestone => {
        if (justAchievedMilestones.some(m => m.id === milestone.id)) {
          return {
            ...milestone,
            achieved: true,
            achievedAt: new Date(),
          };
        }
        return milestone;
      });
      
      // Show milestone achievement toast
      toast({
        title: "Milestone Achieved! 🎉",
        description: justAchievedMilestones[0].message,
        variant: "default",
      });
    } else {
      // Regular contribution toast
      toast({
        title: "Contribution Added!",
        description: `You've added ${formatCurrency(Number(contribution))} to your ${goal.name} goal.`,
        variant: "default",
      });
    }
    
    onUpdate(updatedGoal);
    setContribution('');
  };
  
  return (
    <div className="mt-4 p-4 bg-finxpert-soft-purple rounded-lg animate-celebrate">
      <h4 className="font-medium mb-2 flex items-center">
        <Trophy className="w-4 h-4 mr-1 text-finxpert-primary" />
        Add Contribution
      </h4>
      
      <div className="flex items-center mb-4 bg-white/50 p-2 rounded">
        <TrendingUp className="w-4 h-4 text-finxpert-secondary mr-2" />
        <p className="text-xs text-gray-700">
          Recommended monthly contribution: <span className="font-semibold">{formatCurrency(recommendedSavings)}</span>
        </p>
      </div>
      
      <div className="flex space-x-2">
        <Input
          type="number"
          placeholder="Amount"
          value={contribution}
          onChange={(e) => setContribution(e.target.value === '' ? '' : Number(e.target.value))}
          className="bg-white"
        />
        <Button onClick={handleContribute} className="bg-finxpert-primary hover:bg-finxpert-vivid-purple">
          Add
        </Button>
      </div>
      
      <div className="mt-3 text-xs flex items-start space-x-2">
        <AlertTriangle className="w-3 h-3 text-amber-500 mt-0.5" />
        <p className="text-gray-600">
          Adding contributions helps you track progress toward your goal. 
          This doesn't move actual money - it records what you've saved elsewhere.
        </p>
      </div>
    </div>
  );
};

export default GoalActions;
