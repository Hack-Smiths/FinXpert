
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp } from "lucide-react";

const ROISimulator = () => {
  const [sipAmount, setSipAmount] = useState(5000);
  const [duration, setDuration] = useState(5);
  const [returnRate, setReturnRate] = useState(12);
  const [futureValue, setFutureValue] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculateFutureValue = () => {
    // Calculate future value
    // FV = P × ((1 + r)^n - 1) / r × (1 + r)
    // Where:
    // P = SIP amount
    // r = rate of return per month
    // n = number of months
    
    const monthlyRate = returnRate / 12 / 100;
    const months = duration * 12;
    const invested = sipAmount * months;
    
    const fv = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    setFutureValue(Math.round(fv));
    
    // Generate chart data
    const data = [];
    for (let year = 0; year <= duration; year++) {
      const yearMonths = year * 12;
      const yearlyInvested = sipAmount * yearMonths;
      const yearlyFV = yearMonths === 0 ? 0 : sipAmount * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      
      data.push({
        year,
        invested: Math.round(yearlyInvested),
        returns: Math.round(yearlyFV - yearlyInvested),
        total: Math.round(yearlyFV)
      });
    }
    
    setChartData(data);
  };

  useEffect(() => {
    calculateFutureValue();
  }, [sipAmount, duration, returnRate]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatTooltipValue = (value: number) => {
    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(2)} L`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} K`;
    }
    return value;
  };

  return (
    <div className="glass-card p-6 w-full max-w-3xl mx-auto mb-10 animated-card" style={{ animationDelay: "0.7s" }}>
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">
        <TrendingUp className="inline-block mr-2 h-6 w-6" />
        ROI Simulator
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Label htmlFor="sip-amount" className="input-label">Monthly SIP Amount</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
            <Input
              id="sip-amount"
              type="number"
              min="500"
              max="1000000"
              value={sipAmount}
              onChange={(e) => setSipAmount(Math.max(500, Number(e.target.value)))}
              className="pl-8 bg-white"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="duration" className="input-label">Duration (Years)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            max="30"
            value={duration}
            onChange={(e) => setDuration(Math.max(1, Math.min(30, Number(e.target.value))))}
            className="bg-white"
          />
        </div>
        
        <div>
          <Label htmlFor="return-rate" className="input-label">Expected Return (%)</Label>
          <div className="relative">
            <Input
              id="return-rate"
              type="number"
              min="1"
              max="30"
              value={returnRate}
              onChange={(e) => setReturnRate(Math.max(1, Math.min(30, Number(e.target.value))))}
              className="pr-8 bg-white"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="h-[280px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Years', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  tickFormatter={(value) => {
                    if (value >= 10000000) {
                      return `${(value / 10000000).toFixed(1)}Cr`;
                    } else if (value >= 100000) {
                      return `${(value / 100000).toFixed(1)}L`;
                    } else if (value >= 1000) {
                      return `${(value / 1000).toFixed(0)}K`;
                    }
                    return value;
                  }}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), '']}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#9b87f5" 
                  strokeWidth={2}
                  dot={{ fill: '#9b87f5', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Total Value"
                />
                <Line 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#33C3F0" 
                  strokeWidth={2}
                  dot={{ fill: '#33C3F0', r: 3 }}
                  name="Amount Invested"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="bg-white/70 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Investment Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Investment</span>
                <span className="font-bold">{formatCurrency(sipAmount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Time Period</span>
                <span className="font-bold">{duration} years</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Invested</span>
                <span className="font-bold">{formatCurrency(sipAmount * duration * 12)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Returns</span>
                <span className="font-bold text-finxpert-purple">{formatCurrency(futureValue - (sipAmount * duration * 12))}</span>
              </div>
              
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">Future Value</span>
                  <span className="text-xl font-bold gradient-text">{formatCurrency(futureValue)}</span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline"
              className="w-full mt-4 border-finxpert-purple text-finxpert-purple hover:bg-finxpert-light-purple"
              onClick={calculateFutureValue}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Recalculate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROISimulator;
