
import React, { useState } from 'react';
import { Check, ChevronRight, HelpCircle, Lightbulb, BadgeCheck, Clock, AlertCircle } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  impact: 'High' | 'Medium' | 'Low';
  scoreBoost: string;
  tooltip: string;
  completed: boolean;
}

const ImprovementTips: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([
    {
      id: 1,
      title: "Pay down credit card balances",
      description: "Keep your credit card utilization under 30% of your credit limit.",
      icon: BadgeCheck,
      impact: "High",
      scoreBoost: "+25",
      tooltip: "Credit utilization accounts for 30% of your credit score. Keeping balances low shows responsible credit management.",
      completed: false
    },
    {
      id: 2,
      title: "Set up automatic payments",
      description: "Ensure bills are paid on time to avoid late payment penalties.",
      icon: Clock,
      impact: "High",
      scoreBoost: "+35",
      tooltip: "Payment history makes up 35% of your credit score. A single late payment can drop your score by up to 100 points.",
      completed: true
    },
    {
      id: 3,
      title: "Avoid opening multiple new accounts",
      description: "Multiple credit inquiries can temporarily lower your score.",
      icon: AlertCircle,
      impact: "Medium",
      scoreBoost: "+15",
      tooltip: "Each hard inquiry can lower your score by 5-10 points and stays on your report for 2 years.",
      completed: false
    },
    {
      id: 4,
      title: "Increase your credit limit",
      description: "Request a credit limit increase to lower your utilization ratio.",
      icon: BadgeCheck,
      impact: "Medium",
      scoreBoost: "+20",
      tooltip: "A higher credit limit with the same spending habits will lower your credit utilization ratio, improving your score.",
      completed: false
    },
  ]);

  const getImpactColor = (impact: 'High' | 'Medium' | 'Low') => {
    switch(impact) {
      case 'High': return 'bg-credit-excellent text-white';
      case 'Medium': return 'bg-credit-fair text-gray-800';
      case 'Low': return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const toggleTipCompletion = (id: number) => {
    setTips(tips.map(tip => 
      tip.id === id ? { ...tip, completed: !tip.completed } : tip
    ));
  };

  const remindLater = (id: number) => {
    // In a real app, this would set a reminder
    console.log(`Reminder set for tip #${id}`);
  };

  return (
    <div className="credit-card p-6 mb-8 animate-slide-in relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#33C3F0_1px,transparent_1px)] bg-[length:20px_20px]"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            Credit Improvement Tips
            <Lightbulb className="ml-2 text-credit-blue" size={20} />
          </h2>
          <span className="text-sm text-credit-blue font-medium cursor-pointer hover:underline flex items-center">
            View All Tips
            <ChevronRight size={16} className="ml-1" />
          </span>
        </div>

        <div className="space-y-4">
          {tips.map((tip) => (
            <div 
              key={tip.id} 
              className={`p-4 border rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                tip.completed 
                  ? 'bg-gray-50 border-gray-200' 
                  : 'bg-white border-gray-200 hover:border-credit-blue'
              }`}
            >
              <div className="flex items-start">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                    tip.completed 
                      ? 'bg-credit-excellent text-white' 
                      : 'border-2 border-gray-300 cursor-pointer hover:border-credit-blue'
                  }`}
                  onClick={() => toggleTipCompletion(tip.id)}
                >
                  {tip.completed && <Check size={14} />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <tip.icon size={16} className="mr-2 text-credit-blue" />
                      <h3 className={`font-medium ${tip.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                        {tip.title}
                      </h3>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${getImpactColor(tip.impact)}`}>
                      {tip.impact} Impact
                    </span>
                  </div>
                  
                  <p className={`text-sm mt-1 ${tip.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tip.description}
                  </p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="inline-flex items-center text-xs text-credit-blue hover:text-opacity-80">
                              <HelpCircle size={14} className="mr-1" />
                              Learn more
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="w-64 p-3 bg-white/90 backdrop-blur-sm shadow-lg">
                            <p className="text-sm">{tip.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    {!tip.completed && (
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-credit-excellent/10 text-credit-excellent border border-credit-excellent/20">
                          +{tip.scoreBoost} points
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs py-1"
                          onClick={() => remindLater(tip.id)}
                        >
                          Remind Later
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImprovementTips;
