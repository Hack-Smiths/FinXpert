
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { toast } from "sonner";

type InputPanelProps = {
  onGeneratePlan: (data: any) => void;
};

const InputPanel = ({ onGeneratePlan }: InputPanelProps) => {
  const [age, setAge] = useState(30);
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(25000);
  const [riskAppetite, setRiskAppetite] = useState("medium");
  const [investmentHorizon, setInvestmentHorizon] = useState("3yr");
  const [investmentGoal, setInvestmentGoal] = useState("retirement");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSubmit = () => {
    const data = {
      age,
      monthlyIncome,
      monthlyExpenses,
      riskAppetite,
      investmentHorizon,
      investmentGoal,
    };
    
    onGeneratePlan(data);
    toast.success("Your investment plan is being generated!", {
      description: "We're analyzing your data to create the perfect plan.",
    });
  };

  return (
    <div className="glass-card p-6 w-full max-w-3xl mx-auto mb-10 animated-card" style={{ animationDelay: "0.1s" }}>
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Your Financial Profile</h2>
      
      <div className="space-y-6">
        <div className="input-container">
          <div className="flex justify-between mb-1">
            <Label className="input-label">Age: {age}</Label>
            <span className="text-sm text-gray-500">{age < 30 ? "Young Investor" : age < 50 ? "Mid-Career" : "Retirement Planning"}</span>
          </div>
          <input
            type="range"
            min="18"
            max="70"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="input-range"
          />
        </div>

        <div className="input-container">
          <div className="flex justify-between mb-1">
            <Label className="input-label">Monthly Income</Label>
            <span className="text-sm font-medium text-finxpert-purple">{formatCurrency(monthlyIncome)}</span>
          </div>
          <input
            type="range"
            min="10000"
            max="500000"
            step="5000"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
            className="input-range"
          />
        </div>

        <div className="input-container">
          <div className="flex justify-between mb-1">
            <Label className="input-label">Monthly Expenses</Label>
            <span className="text-sm font-medium text-finxpert-purple">{formatCurrency(monthlyExpenses)}</span>
          </div>
          <input
            type="range"
            min="5000"
            max={monthlyIncome}
            step="1000"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(parseInt(e.target.value))}
            className="input-range"
          />
          <div className="mt-1 text-xs text-right text-gray-500">
            Savings rate: {Math.round(((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100)}%
            {monthlyIncome > 0 && monthlyExpenses / monthlyIncome > 0.7 && (
              <span className="ml-2 text-amber-500">⚠️ High expense ratio</span>
            )}
          </div>
        </div>

        <div className="input-container">
          <Label className="input-label mb-2 block">Risk Appetite</Label>
          <div className="flex gap-2">
            <Toggle
              variant="outline"
              className={`flex-1 ${riskAppetite === 'low' ? 'bg-finxpert-blue text-blue-700' : ''}`}
              pressed={riskAppetite === 'low'}
              onPressedChange={() => setRiskAppetite('low')}
            >
              Low 🛡️
            </Toggle>
            <Toggle
              variant="outline"
              className={`flex-1 ${riskAppetite === 'medium' ? 'bg-finxpert-soft-yellow text-amber-700' : ''}`}
              pressed={riskAppetite === 'medium'}
              onPressedChange={() => setRiskAppetite('medium')}
            >
              Medium ⚖️
            </Toggle>
            <Toggle
              variant="outline"
              className={`flex-1 ${riskAppetite === 'high' ? 'bg-finxpert-peach text-rose-700' : ''}`}
              pressed={riskAppetite === 'high'}
              onPressedChange={() => setRiskAppetite('high')}
            >
              High 🚀
            </Toggle>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="input-container">
            <Label className="input-label mb-2 block">Investment Horizon</Label>
            <Select value={investmentHorizon} onValueChange={setInvestmentHorizon}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6mo">6 Months</SelectItem>
                <SelectItem value="1yr">1 Year</SelectItem>
                <SelectItem value="3yr">3 Years</SelectItem>
                <SelectItem value="5yr">5+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="input-container">
            <Label className="input-label mb-2 block">Investment Goal</Label>
            <Select value={investmentGoal} onValueChange={setInvestmentGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Select goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emergency">Emergency Fund</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="wealth">Wealth Creation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleSubmit}
          className="gradient-button w-full py-6 text-lg rounded-2xl mt-4"
        >
          Generate My Investment Plan 🚀
        </Button>
      </div>
    </div>
  );
};

export default InputPanel;
