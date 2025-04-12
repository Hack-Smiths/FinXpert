
import React from 'react';
import { Goal } from '@/types/goals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpCircle, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/utils/goalUtils';
import { format } from 'date-fns';

interface GoalContributionsProps {
  goal: Goal;
}

// For demo purposes, let's create some mock contribution data
const mockContributions = [
  { id: 1, amount: 15000, date: new Date('2024-02-15'), method: 'Bank Transfer' },
  { id: 2, amount: 20000, date: new Date('2024-03-10'), method: 'UPI Payment' },
  { id: 3, amount: 18000, date: new Date('2024-04-05'), method: 'Auto-debit' },
];

const GoalContributions: React.FC<GoalContributionsProps> = ({ goal }) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/5 shadow-md overflow-hidden">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700/50 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <ArrowUpCircle className="h-5 w-5 text-finxpert-primary" />
          Recent Contributions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {mockContributions.map((contribution) => (
            <div 
              key={contribution.id}
              className="flex justify-between items-center p-3 rounded-xl bg-finxpert-light/50 dark:bg-finxpert-primary/10 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/20">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {formatCurrency(contribution.amount)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {contribution.method}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {format(contribution.date, 'PP')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {format(contribution.date, 'p')}
                </p>
              </div>
            </div>
          ))}
          
          <div className="text-center pt-3">
            <button className="text-finxpert-primary dark:text-finxpert-soft-purple text-sm font-medium hover:underline">
              View All Transactions
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalContributions;
