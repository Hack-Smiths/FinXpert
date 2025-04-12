
import React from 'react';
import { Goal } from '@/types/goals';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LightbulbIcon, PiggyBank, ChevronRight } from 'lucide-react';

interface GoalInvestmentSuggestionsProps {
  goal: Goal;
}

const GoalInvestmentSuggestions: React.FC<GoalInvestmentSuggestionsProps> = ({ goal }) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl border border-white/20 dark:border-white/5 shadow-md overflow-hidden">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700/50 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5 text-finxpert-primary" />
          Investment Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Card className="border border-finxpert-light dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900/20">
                  <PiggyBank className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Recurring Deposit</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">6.8% p.a. for 12 months</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
          
          <Card className="border border-finxpert-light dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/20">
                  <PiggyBank className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">SIP in Mutual Fund</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">10-12% estimated returns</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
          
          <Card className="border border-finxpert-light dark:border-gray-700/30 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/20">
                  <PiggyBank className="w-5 h-5 text-green-600 dark:text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Fixed Deposit</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">7.2% p.a. for 15 months</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalInvestmentSuggestions;
