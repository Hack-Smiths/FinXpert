
export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  description?: string;
  category: GoalCategory;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
  milestones: Milestone[];
  nudges: Nudge[];
}

export type GoalCategory = 
  | 'retirement'
  | 'emergency'
  | 'debt'
  | 'education'
  | 'travel'
  | 'home'
  | 'car'
  | 'wedding'
  | 'custom';

export interface Milestone {
  id: string;
  goalId: string;
  percentage: number;
  achieved: boolean;
  message: string;
  achievedAt?: Date;
}

export interface Nudge {
  id: string;
  goalId: string;
  message: string;
  type: 'encouragement' | 'suggestion' | 'warning' | 'celebration';
  dismissed: boolean;
  createdAt: Date;
}

export interface GoalTemplate {
  name: string;
  category: GoalCategory;
  icon: string;
  description: string;
}
