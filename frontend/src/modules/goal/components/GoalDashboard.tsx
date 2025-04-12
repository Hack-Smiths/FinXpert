
import React, { useState, useEffect } from 'react';
import { Goal } from '@/types/goals';
import { mockGoals } from '@/data/mockGoals';
import GoalCard from './GoalCard';
import GoalCreator from './GoalCreator';
import NudgeContainer from './NudgeContainer';
import GoalAchievements from './GoalAchievements';
import GoalReminders from './GoalReminders';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GoalDashboard: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate API call to fetch goals
    const fetchGoals = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setGoals(mockGoals);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching goals:', error);
        setLoading(false);
      }
    };
    
    fetchGoals();
  }, []);
  
  const handleGoalUpdate = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    console.log('Goal updated:', updatedGoal);
  };
  
  const handleCreateGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
    console.log('New goal created:', newGoal);
  };
  
  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    toast({
      title: "Goal removed",
      description: "Your goal has been successfully removed",
      duration: 3000,
    });
    console.log('Goal deleted:', goalId);
  };
  
  const handleDismissNudge = (goalId: string, nudgeId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return {
          ...goal,
          nudges: goal.nudges.map(nudge => 
            nudge.id === nudgeId ? { ...nudge, dismissed: true } : nudge
          )
        };
      }
      return goal;
    }));
  };
  
  const handleDismissReminder = (reminderId: string) => {
    toast({
      title: "Reminder dismissed",
      description: "The reminder has been removed from your dashboard",
      duration: 3000,
    });
  };
  
  // Get all non-dismissed nudges across all goals
  const allNudges = goals
    .flatMap(goal => goal.nudges
      .filter(nudge => !nudge.dismissed)
      .map(nudge => ({ ...nudge, goalName: goal.name, goalId: goal.id }))
    );
  
  return (
    <div className="container px-4 pt-10 pb-20 mx-auto max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-finxpert-primary to-finxpert-vivid-purple text-transparent bg-clip-text">
          Finance Goal Planner
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Set, track, and achieve your financial goals with personalized insights
        </p>
      </div>
      
      <Tabs 
        defaultValue="dashboard" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto mb-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          {allNudges.length > 0 && (
            <NudgeContainer 
              nudges={allNudges} 
              onDismiss={handleDismissNudge} 
            />
          )}
          
          <GoalAchievements goals={goals} showSummary={true} />
          
          <GoalReminders 
            goals={goals} 
            onDismissReminder={handleDismissReminder} 
          />
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Financial Goals</h2>
            <GoalCreator onCreateGoal={handleCreateGoal} />
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 rounded-xl bg-gray-100 animate-pulse"></div>
              ))}
            </div>
          ) : goals.length === 0 ? (
            <div className="text-center py-20 bg-finxpert-light rounded-xl">
              <h3 className="text-xl font-medium text-gray-700">No goals yet</h3>
              <p className="mt-2 mb-6 text-gray-500">
                Start by creating your first financial goal
              </p>
              <GoalCreator onCreateGoal={handleCreateGoal} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <GoalCard 
                  key={goal.id} 
                  goal={goal} 
                  onUpdate={handleGoalUpdate}
                  onDelete={handleDeleteGoal}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="achievements">
          <GoalAchievements goals={goals} showDetailed={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalDashboard;
