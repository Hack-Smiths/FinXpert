
import React from 'react';
import { Goal } from '@/types/goals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, ChevronRight } from 'lucide-react';
import { formatCurrency, getMonthlySavingsRecommendation } from '@/utils/goalUtils';

interface GoalRecommendationsProps {
  goal: Goal;
}

const GoalRecommendations: React.FC<GoalRecommendationsProps> = ({ goal }) => {
  const monthlySavings = getMonthlySavingsRecommendation(goal);
  
  return (
    <Card className="bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/5 shadow-md overflow-hidden">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700/50 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-finxpert-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-finxpert-soft-purple/40 to-finxpert-light/40 dark:from-finxpert-primary/20 dark:to-finxpert-vivid-purple/10">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Increase your monthly contribution to {formatCurrency(monthlySavings)} to stay on track.
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-finxpert-soft-blue/40 to-finxpert-light/40 dark:from-indigo-500/20 dark:to-blue-500/10">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              Consider setting up automatic transfers to reach your goal faster.
            </p>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-br from-finxpert-soft-pink/40 to-finxpert-light/40 dark:from-pink-500/20 dark:to-red-500/10">
            <p className="text-gray-800 dark:text-gray-200 font-medium">
              You could reach your goal 3 months earlier by increasing contributions by 15%.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalRecommendations;
