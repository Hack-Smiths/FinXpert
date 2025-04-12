
import React from 'react';
import { Goal } from '@/types/goals';
import { formatCurrency, formatDaysRemaining, getDaysRemaining, getMonthlySavingsRecommendation } from '@/utils/goalUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Clock, ArrowUpCircle } from 'lucide-react';
import { format } from 'date-fns';

interface GoalTimelineProps {
  goal: Goal;
}

const GoalTimeline: React.FC<GoalTimelineProps> = ({ goal }) => {
  const daysRemaining = getDaysRemaining(goal.deadline);
  const monthlySavings = getMonthlySavingsRecommendation(goal);
  
  return (
    <Card className="bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/5 shadow-md overflow-hidden">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700/50 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-finxpert-primary" />
          Goal Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-finxpert-light dark:bg-finxpert-primary/20">
              <Calendar className="w-5 h-5 text-finxpert-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Target Date</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {format(goal.deadline, 'PPP')} ({formatDaysRemaining(daysRemaining)})
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-finxpert-light dark:bg-finxpert-primary/20">
              <Clock className="w-5 h-5 text-finxpert-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Started On</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {format(goal.createdAt, 'PPP')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-finxpert-light dark:bg-finxpert-primary/20">
              <ArrowUpCircle className="w-5 h-5 text-finxpert-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Recommended Monthly SIP</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {formatCurrency(monthlySavings)}/month
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-finxpert-light dark:bg-finxpert-primary/20">
              <TrendingUp className="w-5 h-5 text-finxpert-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {format(goal.updatedAt, 'PPP')}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalTimeline;
