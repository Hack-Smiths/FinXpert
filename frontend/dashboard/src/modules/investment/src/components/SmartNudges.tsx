
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, BellRing, X } from "lucide-react";

type SmartNudgesProps = {
  data?: {
    age?: number;
    monthlyIncome?: number;
    monthlyExpenses?: number;
    riskAppetite?: string;
    investmentHorizon?: string;
    investmentGoal?: string;
  };
};

const SmartNudges = ({ data }: SmartNudgesProps) => {
  const [dismissedNudges, setDismissedNudges] = useState<string[]>([]);
  
  // Generic nudges (always shown)
  const genericNudges = [
    {
      id: "gold-inflation",
      emoji: "🪙",
      title: "Hedge Against Inflation",
      content: "Consider adding 10% gold to your portfolio to protect against inflation.",
    },
    {
      id: "tax-saving",
      emoji: "💰",
      title: "Save on Taxes",
      content: "Invest in ELSS funds to save up to ₹46,800 in taxes under Section 80C.",
    },
    {
      id: "emergency",
      emoji: "🛡️",
      title: "Build Emergency Fund",
      content: "Maintain 6 months of expenses in liquid funds for emergencies.",
    }
  ];
  
  // Dynamic nudges based on user data
  const getDynamicNudges = () => {
    if (!data) return [];
    
    const nudges = [];
    
    if (data.monthlyIncome && data.monthlyExpenses) {
      const expenseRatio = data.monthlyExpenses / data.monthlyIncome;
      if (expenseRatio > 0.7) {
        nudges.push({
          id: "high-expenses",
          emoji: "⚠️",
          title: "High Expense Ratio",
          content: `You're spending ${Math.round(expenseRatio * 100)}% of income. Try to keep it under 70% for effective investing.`,
        });
      }
    }
    
    if (data.investmentHorizon === "6mo" || data.investmentHorizon === "1yr") {
      nudges.push({
        id: "short-term",
        emoji: "⏱️",
        title: "Short-term Strategy",
        content: "For goals under 1 year, consider 80% debt instruments for capital safety.",
      });
    }
    
    if (data.age && data.age < 30 && data.riskAppetite === "low") {
      nudges.push({
        id: "young-conservative",
        emoji: "🚀",
        title: "Growth Opportunity",
        content: "Young investors can consider higher equity allocation to maximize long-term growth.",
      });
    }
    
    if (data.age && data.age > 45 && data.riskAppetite === "high") {
      nudges.push({
        id: "older-aggressive",
        emoji: "⚖️",
        title: "Balance Your Risk",
        content: "As you approach retirement, consider reducing equity exposure to protect your capital.",
      });
    }
    
    return nudges;
  };
  
  const allNudges = [...genericNudges, ...getDynamicNudges()];
  const visibleNudges = allNudges.filter(nudge => !dismissedNudges.includes(nudge.id));
  
  const dismissNudge = (id: string) => {
    setDismissedNudges([...dismissedNudges, id]);
  };
  
  // Reset dismissed nudges when data changes
  useEffect(() => {
    setDismissedNudges([]);
  }, [data]);

  if (visibleNudges.length === 0) return null;

  return (
    <div className="glass-card p-5 w-full max-w-md mx-auto sticky top-20 animated-card" style={{ animationDelay: "0.8s" }}>
      <div className="flex items-center mb-4">
        <BellRing className="w-5 h-5 text-finxpert-purple mr-2" />
        <h3 className="text-lg font-bold">Smart Nudges</h3>
      </div>
      
      <div className="space-y-3">
        {visibleNudges.map((nudge) => (
          <div key={nudge.id} className="bg-white/60 p-3 rounded-lg relative pr-8">
            <button 
              onClick={() => dismissNudge(nudge.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Dismiss nudge"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex">
              <span className="text-xl mr-2" role="img" aria-label="nudge icon">
                {nudge.emoji}
              </span>
              <div>
                <h4 className="font-medium text-gray-800">{nudge.title}</h4>
                <p className="text-sm text-gray-600">{nudge.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button
        variant="ghost"
        className="w-full mt-3 text-sm text-gray-500 hover:text-finxpert-purple"
      >
        View All Tips <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

export default SmartNudges;
