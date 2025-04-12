
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockGoals } from '@/data/mockGoals';
import { Goal } from '@/types/goals';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import { 
  formatCurrency, 
  calculateProgress, 
  formatDaysRemaining, 
  getDaysRemaining,
  getMonthlySavingsRecommendation
} from '@/utils/goalUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  ArrowUpCircle, 
  Clock,
  Sparkles,
  LightbulbIcon,
  PiggyBank
} from 'lucide-react';
import GoalDetailsHeader from '@/components/GoalDetailsHeader';
import GoalFinancialSummary from '@/components/GoalFinancialSummary';
import GoalTimeline from '@/components/GoalTimeline';
import GoalContributions from '@/components/GoalContributions';
import GoalRecommendations from '@/components/GoalRecommendations';
import GoalInvestmentSuggestions from '@/components/GoalInvestmentSuggestions';
import DarkModeToggle from '@/components/DarkModeToggle';
import { motion } from 'framer-motion';

const GoalDetails = () => {
  const { goalId } = useParams<{ goalId: string }>();
  const navigate = useNavigate();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const foundGoal = mockGoals.find(g => g.id === goalId);
          if (foundGoal) {
            setGoal(foundGoal);
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching goal details:', error);
        setLoading(false);
      }
    };
    
    fetchGoal();
  }, [goalId]);
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  if (loading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-gradient-to-b from-white to-finxpert-light/30 dark:from-gray-900 dark:to-indigo-950/30 transition-colors duration-300">
          <Header />
          <div className="container px-4 pt-10 pb-20 mx-auto max-w-6xl">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
  
  if (!goal) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen bg-gradient-to-b from-white to-finxpert-light/30 dark:from-gray-900 dark:to-indigo-950/30 transition-colors duration-300">
          <Header />
          <div className="container px-4 pt-10 pb-20 mx-auto max-w-6xl">
            <Button onClick={handleGoBack} variant="outline" className="mb-6" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Goals
            </Button>
            <div className="p-12 bg-white/90 dark:bg-gray-800/40 backdrop-blur-lg rounded-3xl text-center">
              <h2 className="text-2xl font-semibold mb-4">Goal not found</h2>
              <p className="mb-8">The goal you're looking for doesn't exist or has been removed.</p>
              <Button onClick={handleGoBack} className="bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple text-white">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-gradient-to-b from-white to-finxpert-light/30 dark:from-gray-900 dark:to-indigo-950/30 transition-colors duration-300">
        <Header />
        <div className="container px-4 pt-6 pb-20 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button 
              onClick={handleGoBack} 
              variant="outline" 
              className="mb-6 rounded-xl hover:shadow-md transition-all duration-300" 
              size="sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Goals
            </Button>
            
            <div className="space-y-6">
              <GoalDetailsHeader goal={goal} />
              <GoalFinancialSummary goal={goal} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GoalTimeline goal={goal} />
                <GoalContributions goal={goal} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GoalRecommendations goal={goal} />
                <GoalInvestmentSuggestions goal={goal} />
              </div>
            </div>
          </motion.div>
        </div>
        <DarkModeToggle />
      </div>
    </ThemeProvider>
  );
};

export default GoalDetails;
