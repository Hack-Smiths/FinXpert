
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";

type AllocationResultsProps = {
  data: {
    age: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    riskAppetite: string;
    investmentHorizon: string;
    investmentGoal: string;
  };
};

const AllocationResults = ({ data }: AllocationResultsProps) => {
  const [activeAsset, setActiveAsset] = useState<string | null>(null);
  
  // Mock allocation data based on user inputs
  const generateAllocation = () => {
    const { riskAppetite, investmentHorizon } = data;
    
    let equity = 0, debt = 0, gold = 0, fd = 0;
    
    // Basic algorithm to determine allocation percentages
    if (riskAppetite === 'high') {
      equity = investmentHorizon === '5yr' ? 80 : investmentHorizon === '3yr' ? 70 : 60;
      debt = investmentHorizon === '5yr' ? 10 : investmentHorizon === '3yr' ? 15 : 20;
      gold = 5;
      fd = 100 - equity - debt - gold;
    } else if (riskAppetite === 'medium') {
      equity = investmentHorizon === '5yr' ? 60 : investmentHorizon === '3yr' ? 50 : 40;
      debt = investmentHorizon === '5yr' ? 25 : investmentHorizon === '3yr' ? 30 : 35;
      gold = 10;
      fd = 100 - equity - debt - gold;
    } else {
      equity = investmentHorizon === '5yr' ? 40 : investmentHorizon === '3yr' ? 30 : 20;
      debt = investmentHorizon === '5yr' ? 40 : investmentHorizon === '3yr' ? 45 : 50;
      gold = 15;
      fd = 100 - equity - debt - gold;
    }
    
    return [
      { name: 'Equity', value: equity, color: '#9b87f5' },
      { name: 'Debt', value: debt, color: '#33C3F0' },
      { name: 'Gold', value: gold, color: '#FEC6A1' },
      { name: 'Fixed Deposit', value: fd, color: '#e5deff' }
    ];
  };

  const allocationData = generateAllocation();
  
  // Monthly savings calculation
  const monthlySavings = data.monthlyIncome - data.monthlyExpenses;
  const savingsRate = ((monthlySavings / data.monthlyIncome) * 100).toFixed(0);
  
  // Create asset type suggestions
  const assetSuggestions = {
    Equity: {
      title: "Equity Investments",
      description: "Stocks and equity mutual funds offer high growth potential over the long term.",
      suggestions: [
        { name: "Axis Bluechip Fund", type: "Large Cap", returns: "12-15%" },
        { name: "SBI Small Cap Fund", type: "Small Cap", returns: "15-18%" },
        { name: "Parag Parikh Flexi Cap", type: "Flexi Cap", returns: "13-16%" },
      ]
    },
    Debt: {
      title: "Debt Investments",
      description: "Debt funds and bonds provide stable income with moderate risk.",
      suggestions: [
        { name: "ICICI Prudential Short Term", type: "Short Term", returns: "7-9%" },
        { name: "Kotak Bond Fund", type: "Long Term", returns: "8-10%" },
        { name: "HDFC Corporate Bond Fund", type: "Corporate", returns: "7.5-9.5%" },
      ]
    },
    Gold: {
      title: "Gold Investments",
      description: "Gold acts as a hedge against inflation and market volatility.",
      suggestions: [
        { name: "Sovereign Gold Bonds", type: "Government", returns: "8-10%" },
        { name: "Gold ETFs", type: "Exchange Traded", returns: "8-12%" },
        { name: "Digital Gold", type: "Digital", returns: "7-10%" },
      ]
    },
    "Fixed Deposit": {
      title: "Fixed Deposits",
      description: "FDs offer guaranteed returns with the highest safety.",
      suggestions: [
        { name: "SBI Fixed Deposit", type: "Bank", returns: "6.5-7.5%" },
        { name: "HDFC Bank FD", type: "Bank", returns: "6.5-7.25%" },
        { name: "Bajaj Finance FD", type: "NBFC", returns: "7.5-8.2%" },
      ]
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const handleAssetClick = (asset: string) => {
    const assetInfo = assetSuggestions[asset as keyof typeof assetSuggestions];
    setSelectedAsset({
      name: asset,
      ...assetInfo
    });
    setOpenDialog(true);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="glass-card p-6 w-full max-w-3xl mx-auto mb-10 animated-card" style={{ animationDelay: "0.3s" }}>
      <h2 className="text-2xl font-bold mb-6 text-center gradient-text">Your Personalized Allocation</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  onClick={(entry) => handleAssetClick(entry.name)}
                  onMouseEnter={(_, index) => setActiveAsset(allocationData[index].name)}
                  onMouseLeave={() => setActiveAsset(null)}
                >
                  {allocationData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="white"
                      strokeWidth={2}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                      style={{
                        filter: activeAsset && activeAsset !== entry.name ? 'opacity(0.7)' : 'none',
                        transform: activeAsset === entry.name ? 'scale(1.05)' : 'none',
                        transformOrigin: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                          <p className="font-medium text-gray-900">{payload[0].name}</p>
                          <p className="text-finxpert-purple font-bold">{`${payload[0].value}%`}</p>
                          <p className="text-xs text-gray-500 mt-1">Click for details</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-2">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="glass-card bg-white/40 p-4 rounded-xl mb-4">
            <h3 className="text-lg font-medium mb-2">AI Financial Summary</h3>
            <div className="text-gray-700 space-y-2 text-sm">
              <p>
                <span className="font-medium">Monthly Savings:</span> {formatCurrency(monthlySavings)} ({savingsRate}% of income)
              </p>
              <p>
                <span className="font-medium">Risk Profile:</span> {data.riskAppetite.charAt(0).toUpperCase() + data.riskAppetite.slice(1)} Risk Investor
              </p>
              <p>
                <span className="font-medium">Investment Goal:</span> {data.investmentGoal.charAt(0).toUpperCase() + data.investmentGoal.slice(1)}
              </p>
              <p>
                <span className="font-medium">Recommended SIP:</span> {formatCurrency(monthlySavings * 0.6)} per month
              </p>
              <div className="mt-3 p-2 bg-finxpert-light-purple rounded-lg text-sm">
                <p>
                  {data.riskAppetite === 'high' ? '🚀' : data.riskAppetite === 'medium' ? '⚖️' : '🛡️'} Based on your {data.riskAppetite} risk appetite and {data.investmentHorizon} timeframe, we recommend a {allocationData[0].value}/{allocationData[1].value}/{allocationData[2].value} split between equity, debt, and gold.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline" 
              className="mt-2 w-full bg-white hover:bg-finxpert-light-purple text-gray-700 hover:text-finxpert-purple border-gray-200 transition-all duration-300"
            >
              <InfoIcon className="w-4 h-4 mr-2" />
              Click on chart sections for investment suggestions
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedAsset?.title}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-4">{selectedAsset?.description}</p>
          
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">Top Recommendations:</h4>
            {selectedAsset?.suggestions.map((suggestion: any, index: number) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium">{suggestion.name}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{suggestion.type}</span>
                  <span className="text-finxpert-purple font-medium">{suggestion.returns}</span>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            className="w-full mt-3 gradient-button"
            onClick={() => setOpenDialog(false)}
          >
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllocationResults;
