
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";

type PlanSuggestionsProps = {
  data: {
    age: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    riskAppetite: string;
    investmentHorizon: string;
    investmentGoal: string;
  };
};

const PlanSuggestions = ({ data }: PlanSuggestionsProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const plans = [
    {
      id: "conservative",
      title: "Conservative Plan",
      description: "Safe and steady wealth protection with minimal risk",
      allocation: { equity: 30, debt: 40, gold: 15, fd: 15 },
      riskLevel: "Low",
      idealFor: "Short-term goals, seniors, emergency funds",
      expectedReturns: "7-9%",
      color: "bg-finxpert-blue",
      gradient: "bg-blue-gradient",
      delay: "0.4s"
    },
    {
      id: "balanced",
      title: "Balanced Plan",
      description: "Optimal mix of growth and safety for steady building",
      allocation: { equity: 50, debt: 30, gold: 10, fd: 10 },
      riskLevel: "Medium",
      idealFor: "Mid-term goals, family planning, education",
      expectedReturns: "9-12%",
      color: "bg-finxpert-soft-yellow",
      gradient: "bg-mint-gradient",
      delay: "0.5s"
    },
    {
      id: "aggressive",
      title: "Aggressive Plan",
      description: "Maximum growth potential for long-term wealth creation",
      allocation: { equity: 70, debt: 20, gold: 5, fd: 5 },
      riskLevel: "High",
      idealFor: "Long-term goals, young investors, retirement",
      expectedReturns: "12-15%",
      color: "bg-finxpert-peach",
      gradient: "bg-peach-gradient",
      delay: "0.6s"
    }
  ];

  const handleApplyPlan = (planId: string) => {
    setSelectedPlan(planId);
    toast.success(`${planId.charAt(0).toUpperCase() + planId.slice(1)} plan applied!`, {
      description: "Your investment plan has been updated.",
    });
  };

  const getProgressBarColor = (planId: string) => {
    switch (planId) {
      case "conservative":
        return "bg-blue-400";
      case "balanced":
        return "bg-green-400";
      case "aggressive":
        return "bg-rose-400";
      default:
        return "bg-gray-400";
    }
  };

  // Recommend a plan based on user inputs
  const getRecommendedPlan = () => {
    const { riskAppetite, investmentHorizon, age } = data;
    
    if (riskAppetite === 'low' || investmentHorizon === '6mo' || age > 55) {
      return "conservative";
    } else if (riskAppetite === 'high' && (investmentHorizon === '5yr' || investmentHorizon === '3yr') && age < 40) {
      return "aggressive";
    } else {
      return "balanced";
    }
  };

  const recommendedPlan = getRecommendedPlan();

  return (
    <div className="w-full max-w-5xl mx-auto mb-10">
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Suggested Investment Plans</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`glass-card p-5 border animated-card ${
              recommendedPlan === plan.id ? 'ring-2 ring-finxpert-purple' : ''
            }`}
            style={{ animationDelay: plan.delay }}
          >
            {recommendedPlan === plan.id && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-finxpert-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                Recommended
              </div>
            )}
            
            <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Expected Returns</span>
                <span className="font-medium">{plan.expectedReturns}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getProgressBarColor(plan.id)}`}
                  style={{ width: `${parseInt(plan.expectedReturns.split('-')[1])}0%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex mb-4">
              <div 
                className="w-[30%] h-4 rounded-l-full"
                style={{ backgroundColor: '#9b87f5', width: `${plan.allocation.equity}%` }}
                title={`Equity: ${plan.allocation.equity}%`}
              ></div>
              <div 
                className="h-4"
                style={{ backgroundColor: '#33C3F0', width: `${plan.allocation.debt}%` }}
                title={`Debt: ${plan.allocation.debt}%`}
              ></div>
              <div 
                className="h-4"
                style={{ backgroundColor: '#FEC6A1', width: `${plan.allocation.gold}%` }}
                title={`Gold: ${plan.allocation.gold}%`}
              ></div>
              <div 
                className="h-4 rounded-r-full"
                style={{ backgroundColor: '#e5deff', width: `${plan.allocation.fd}%` }}
                title={`FD: ${plan.allocation.fd}%`}
              ></div>
            </div>
            
            <div className="text-sm space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Level</span>
                <span className={`font-medium ${
                  plan.riskLevel === "Low" ? "text-blue-600" : 
                  plan.riskLevel === "Medium" ? "text-amber-600" : "text-rose-600"
                }`}>{plan.riskLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ideal For</span>
                <span className="font-medium text-right">{plan.idealFor.split(',')[0]}</span>
              </div>
            </div>
            
            <Button 
              onClick={() => handleApplyPlan(plan.id)}
              className={`w-full ${
                selectedPlan === plan.id 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : plan.id === 'conservative' 
                    ? 'bg-blue-gradient' 
                    : plan.id === 'balanced' 
                      ? 'bg-mint-gradient' 
                      : 'bg-peach-gradient'
              } text-white font-medium rounded-xl p-3 transition-all`}
            >
              {selectedPlan === plan.id ? (
                <>
                  <Check className="w-4 h-4 mr-2" /> Applied
                </>
              ) : (
                <>
                  Apply Plan <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-center text-gray-500 flex items-center justify-center">
        <AlertCircle className="w-4 h-4 mr-2" />
        These plans are suggestions and should be reviewed by a financial advisor.
      </div>
    </div>
  );
};

export default PlanSuggestions;
