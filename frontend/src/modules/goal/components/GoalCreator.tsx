
import React, { useState } from 'react';
import { Goal, GoalCategory } from '@/types/goals';
import { goalTemplates } from '@/data/mockGoals';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Plus, Target, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface GoalCreatorProps {
  onCreateGoal: (goal: Goal) => void;
}

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

const GoalCreator: React.FC<GoalCreatorProps> = ({ onCreateGoal }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'template' | 'details'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<null | typeof goalTemplates[0]>(null);
  const [customGoal, setCustomGoal] = useState(false);
  
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState<number | ''>('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const { toast } = useToast();
  
  const resetForm = () => {
    setStep('template');
    setSelectedTemplate(null);
    setCustomGoal(false);
    setName('');
    setTargetAmount('');
    setDeadline(undefined);
    setDescription('');
  };
  
  const handleSelectTemplate = (template: typeof goalTemplates[0] | null) => {
    setSelectedTemplate(template);
    
    if (template) {
      setName(template.name);
      setDescription(template.description);
      setCustomGoal(false);
    } else {
      setCustomGoal(true);
      setName('');
      setDescription('');
    }
    
    setStep('details');
  };
  
  const createNewGoal = () => {
    if (!name) {
      toast({
        title: "Goal name required",
        description: "Please enter a name for your goal.",
        variant: "destructive",
      });
      return;
    }
    
    if (!targetAmount || targetAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid target amount.",
        variant: "destructive",
      });
      return;
    }
    
    if (!deadline) {
      toast({
        title: "Deadline required",
        description: "Please select a deadline for your goal.",
        variant: "destructive",
      });
      return;
    }
    
    const baseId = generateId();
    
    const newGoal: Goal = {
      id: baseId,
      name,
      targetAmount: Number(targetAmount),
      currentAmount: 0,
      deadline,
      description,
      category: selectedTemplate?.category || 'custom',
      icon: selectedTemplate?.icon || 'target',
      createdAt: new Date(),
      updatedAt: new Date(),
      milestones: [
        {
          id: `${baseId}-m1`,
          goalId: baseId,
          percentage: 25,
          achieved: false,
          message: `You've saved 25% of your ${name} goal!`,
        },
        {
          id: `${baseId}-m2`,
          goalId: baseId,
          percentage: 50,
          achieved: false,
          message: `Halfway to your ${name} goal!`,
        },
        {
          id: `${baseId}-m3`,
          goalId: baseId,
          percentage: 75,
          achieved: false,
          message: `Almost there! 75% of your ${name} goal saved.`,
        },
        {
          id: `${baseId}-m4`,
          goalId: baseId,
          percentage: 100,
          achieved: false,
          message: `Congratulations! You've fully funded your ${name} goal!`,
        },
      ],
      nudges: [],
    };
    
    onCreateGoal(newGoal);
    toast({
      title: "Goal Created!",
      description: `Your ${name} goal has been created successfully.`,
    });
    setOpen(false);
    resetForm();
  };
  
  const handleBack = () => {
    setStep('template');
  };
  
  const TemplateStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-xl">Choose a Goal Template</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-3 my-4">
        {goalTemplates.map((template) => (
          <Card 
            key={template.name} 
            className={cn(
              "cursor-pointer hover:border-finxpert-primary transition-all",
              selectedTemplate?.name === template.name && "border-finxpert-primary bg-finxpert-soft-purple/20"
            )}
            onClick={() => handleSelectTemplate(template)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {template.description.length > 40 
                  ? `${template.description.substring(0, 40)}...` 
                  : template.description}
              </p>
            </CardContent>
          </Card>
        ))}
        <Card 
          className={cn(
            "cursor-pointer hover:border-finxpert-primary transition-all",
            customGoal && "border-finxpert-primary bg-finxpert-soft-purple/20"
          )}
          onClick={() => handleSelectTemplate(null)}
        >
          <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
            <Plus className="h-5 w-5 text-finxpert-primary mb-1" />
            <h3 className="font-medium">Custom Goal</h3>
            <p className="text-xs text-gray-500 mt-1">
              Create a personalized financial goal
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
  
  const DetailsStep = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-center text-xl">{customGoal ? 'Create Custom Goal' : `Set Up ${name}`}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 my-4">
        <div className="space-y-2">
          <Label htmlFor="name">Goal Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter goal name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="target">Target Amount (₹)</Label>
          <Input
            id="target"
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="Enter target amount"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                id="deadline"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !deadline && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadline ? format(deadline, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={(date) => {
                  setDeadline(date);
                  setCalendarOpen(false);
                }}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a brief description of your goal"
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex space-x-2 justify-between mt-4">
        <Button variant="outline" onClick={handleBack}>
          Back to Templates
        </Button>
        <Button onClick={createNewGoal} className="bg-finxpert-primary hover:bg-finxpert-vivid-purple">
          <Check className="mr-2 h-4 w-4" /> Create Goal
        </Button>
      </div>
    </>
  );
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-finxpert-primary hover:bg-finxpert-vivid-purple"
        >
          <Target className="h-4 w-4 mr-2" /> Create New Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {step === 'template' ? <TemplateStep /> : <DetailsStep />}
      </DialogContent>
    </Dialog>
  );
};

export default GoalCreator;
