
import React, { useState } from 'react';
import { Calculator, ChevronsUpDown, HelpCircle, TrendingUp } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const SimulatorWidget: React.FC = () => {
  const [creditCardBalance, setCreditCardBalance] = useState(3000);
  const [missedPayments, setMissedPayments] = useState("0");
  const [hardInquiries, setHardInquiries] = useState("0");
  const [scoreImpact, setScoreImpact] = useState(0);
  
  const calculateImpact = () => {
    // Simple simulation logic - in a real app this would be more sophisticated
    let impact = 0;
    
    // Credit card balance impact (assuming $10,000 limit)
    const utilization = creditCardBalance / 10000;
    if (utilization <= 0.1) impact += 15;
    else if (utilization <= 0.3) impact += 5;
    else if (utilization > 0.5) impact -= 10;
    else if (utilization > 0.7) impact -= 20;
    
    // Missed payments impact
    if (missedPayments === "1") impact -= 40;
    if (missedPayments === "2") impact -= 70;
    if (missedPayments === "3+") impact -= 100;
    
    // Hard inquiries impact
    if (hardInquiries === "1") impact -= 5;
    if (hardInquiries === "2") impact -= 15;
    if (hardInquiries === "3+") impact -= 30;
    
    setScoreImpact(impact);
  };

  return (
    <div className="credit-card p-6 mb-10 animate-slide-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center mb-6">
        <Calculator className="text-credit-blue mr-2" size={20} />
        <h2 className="text-xl font-bold text-gray-800">Credit Score Simulator</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Credit Card Balance
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-1">
                        <HelpCircle size={14} className="text-gray-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="w-64 p-3">
                      <p className="text-sm">Your credit utilization ratio accounts for 30% of your credit score. Lower balances mean better scores.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <span className="text-sm font-medium">
                ${creditCardBalance.toLocaleString()}
              </span>
            </div>
            <Slider
              value={[creditCardBalance]}
              min={0}
              max={10000}
              step={100}
              onValueChange={(value) => setCreditCardBalance(value[0])}
              className="my-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$0</span>
              <span>$5,000</span>
              <span>$10,000</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Missed Payments (Last 6 Months)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-1">
                        <HelpCircle size={14} className="text-gray-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="w-64 p-3">
                      <p className="text-sm">Payment history is the most important factor, accounting for 35% of your credit score.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Select
                value={missedPayments}
                onValueChange={setMissedPayments}
              >
                <SelectTrigger className="border border-gray-200 focus:ring-credit-blue">
                  <SelectValue placeholder="Select number of missed payments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="1">1 payment</SelectItem>
                  <SelectItem value="2">2 payments</SelectItem>
                  <SelectItem value="3+">3+ payments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                New Hard Inquiries
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="ml-1">
                        <HelpCircle size={14} className="text-gray-400" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="w-64 p-3">
                      <p className="text-sm">Each hard inquiry can lower your score by 5-10 points and stays on your report for 2 years.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Select
                value={hardInquiries}
                onValueChange={setHardInquiries}
              >
                <SelectTrigger className="border border-gray-200 focus:ring-credit-blue">
                  <SelectValue placeholder="Select number of inquiries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="1">1 inquiry</SelectItem>
                  <SelectItem value="2">2 inquiries</SelectItem>
                  <SelectItem value="3+">3+ inquiries</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <button 
            className="credit-btn credit-btn-primary w-full mt-4 flex items-center justify-center"
            onClick={calculateImpact}
          >
            Calculate Impact
            <ChevronsUpDown size={16} className="ml-2" />
          </button>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-xl flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Potential Impact</h3>
          
          <div className={`text-6xl font-bold mb-2 flex items-center ${
            scoreImpact > 0 ? 'text-credit-excellent' : 
            scoreImpact < 0 ? 'text-credit-poor' : 
            'text-gray-400'
          }`}>
            {scoreImpact > 0 && '+'}{scoreImpact}
            {scoreImpact !== 0 && (
              <span className="text-sm ml-1 font-medium">points</span>
            )}
          </div>
          
          {scoreImpact !== 0 ? (
            <div className="flex items-center">
              <TrendingUp size={18} className={scoreImpact > 0 ? 'text-credit-excellent' : 'text-credit-poor'} />
              <span className="text-sm ml-1 text-gray-600">
                {scoreImpact > 0 ? 'Positive impact on your score' : 'Negative impact on your score'}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center">
              Adjust the sliders and select options to see how different actions might affect your credit score.
            </p>
          )}
          
          {scoreImpact !== 0 && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 w-full">
              <h4 className="font-medium text-gray-800 mb-2">Recommendation</h4>
              <p className="text-sm text-gray-600">
                {scoreImpact > 0 
                  ? "These changes could improve your score. Consider implementing them if possible."
                  : "These changes could hurt your score. Try to avoid them if possible or take steps to minimize their impact."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulatorWidget;
