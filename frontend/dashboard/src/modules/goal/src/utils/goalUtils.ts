
import { Goal, GoalCategory } from '../types/goals';
import { goalTemplates } from '../data/mockGoals';

// Format currency in Indian Rupee format
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate progress percentage
export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  const progress = (current / target) * 100;
  return Math.min(progress, 100);
};

// Get days remaining until deadline
export const getDaysRemaining = (deadline: Date): number => {
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 0);
};

// Format days remaining in a readable format
export const formatDaysRemaining = (days: number): string => {
  if (days === 0) return "Due today";
  if (days === 1) return "1 day remaining";
  if (days < 30) return `${days} days remaining`;
  
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month remaining";
  if (months < 12) return `${months} months remaining`;
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 1 && remainingMonths === 0) return "1 year remaining";
  if (remainingMonths === 0) return `${years} years remaining`;
  if (years === 1) return `1 year ${remainingMonths} months remaining`;
  return `${years} years ${remainingMonths} months remaining`;
};

// Generate a monthly savings recommendation
export const getMonthlySavingsRecommendation = (goal: Goal): number => {
  const daysRemaining = getDaysRemaining(goal.deadline);
  const monthsRemaining = Math.max(daysRemaining / 30, 1);
  const amountRemaining = goal.targetAmount - goal.currentAmount;
  return Math.ceil(amountRemaining / monthsRemaining);
};

// Get icon name based on goal category
export const getCategoryIcon = (category: GoalCategory): string => {
  const template = goalTemplates.find(t => t.category === category);
  return template?.icon || 'target';
};

// Get a motivational message based on progress
export const getMotivationalMessage = (progress: number): string => {
  if (progress < 10) {
    return "Every journey begins with a single step. You've started!";
  } else if (progress < 25) {
    return "You're building momentum! Keep it going!";
  } else if (progress < 50) {
    return "Making great progress! You're on your way!";
  } else if (progress < 75) {
    return "You're more than halfway there! Keep pushing!";
  } else if (progress < 90) {
    return "The finish line is in sight! You're doing amazing!";
  } else if (progress < 100) {
    return "So close! Just one final push to reach your goal!";
  } else {
    return "Congratulations! You've reached your goal!";
  }
};

// Check if a goal needs attention (falling behind)
export const needsAttention = (goal: Goal): boolean => {
  const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const daysTotal = (goal.deadline.getTime() - goal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
  const timeElapsedPercentage = ((daysTotal - daysRemaining) / daysTotal) * 100;
  
  // If time elapsed percentage is significantly higher than progress percentage
  return timeElapsedPercentage > progress + 10;
};

// Get next milestone for a goal
export const getNextMilestone = (goal: Goal) => {
  return goal.milestones.find(milestone => !milestone.achieved);
};
