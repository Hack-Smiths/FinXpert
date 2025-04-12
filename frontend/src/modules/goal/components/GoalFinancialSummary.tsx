
import React from 'react';
import { Goal } from '@/types/goals';
import { formatCurrency } from '@/utils/goalUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, TrendingDown, TrendingUp } from 'lucide-react';

interface GoalFinancialSummaryProps {
  goal: Goal;
}

const GoalFinancialSummary: React.FC<GoalFinancialSummaryProps> = ({ goal }) => {
  const remainingAmount = goal.targetAmount - goal.currentAmount;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/5 shadow-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-finxpert-soft-purple/50 dark:bg-finxpert-primary/20">
              <TrendingUp className="w-6 h-6 text-finxpert-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Target Amount</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(goal.targetAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/5 shadow-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-green-100 dark:bg-green-900/20">
              <Wallet className="w-6 h-6 text-green-600 dark:text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Savings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(goal.currentAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/5 shadow-md overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-100 dark:bg-blue-900/20">
              <TrendingDown className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Remaining</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(remainingAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalFinancialSummary;
