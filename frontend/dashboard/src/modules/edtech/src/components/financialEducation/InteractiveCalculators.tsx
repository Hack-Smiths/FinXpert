import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, PiggyBank, DollarSign, IndianRupee, Euro, PoundSterling } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InteractiveCalculators = () => {
  const [currency, setCurrency] = useState("inr");

  const getCurrencySymbol = (currencyCode: string) => {
    switch (currencyCode) {
      case "inr":
        return "₹";
      case "usd":
        return "$";
      case "eur":
        return "€";
      case "gbp":
        return "£";
      default:
        return "₹";
    }
  };

  return (
    <section id="calculators" className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">Interactive Financial Calculators</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          Use these tools to help plan your financial future and make informed decisions.
        </p>
        
        <div className="max-w-xs mx-auto">
          <Label htmlFor="currency-selector" className="text-sm text-left block mb-2">Select Currency</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Currencies</SelectLabel>
                <SelectItem value="inr" className="flex items-center">
                  <IndianRupee className="h-4 w-4 mr-2" /> Indian Rupee (₹)
                </SelectItem>
                <SelectItem value="usd" className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" /> US Dollar ($)
                </SelectItem>
                <SelectItem value="eur" className="flex items-center">
                  <Euro className="h-4 w-4 mr-2" /> Euro (€)
                </SelectItem>
                <SelectItem value="gbp" className="flex items-center">
                  <PoundSterling className="h-4 w-4 mr-2" /> British Pound (£)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="loan" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="loan" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Loan Repayment</span>
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Investment Growth</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            <span>Budget Planner</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="loan">
          <LoanCalculator currencySymbol={getCurrencySymbol(currency)} />
        </TabsContent>
        
        <TabsContent value="investment">
          <InvestmentCalculator currencySymbol={getCurrencySymbol(currency)} />
        </TabsContent>
        
        <TabsContent value="budget">
          <BudgetCalculator currencySymbol={getCurrencySymbol(currency)} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

const LoanCalculator = ({ currencySymbol = "₹" }) => {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("5");
  const [loanTerm, setLoanTerm] = useState("5");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const interest = parseFloat(interestRate) / 100 / 12;
    const payments = parseFloat(loanTerm) * 12;
    
    const x = Math.pow(1 + interest, payments);
    const monthly = (principal * x * interest) / (x - 1);
    
    if (isFinite(monthly)) {
      const totalInterestPaid = (monthly * payments) - principal;
      
      setMonthlyPayment(monthly);
      setTotalInterest(totalInterestPaid);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-purple-900">Loan Repayment Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="loanAmount">Loan Amount ({currencySymbol})</Label>
              <Input 
                id="loanAmount" 
                type="number" 
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input 
                id="interestRate" 
                type="number" 
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <Input 
                id="loanTerm" 
                type="number" 
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>
            <Button 
              onClick={calculateLoan}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Calculate
            </Button>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-medium text-purple-900 mb-4">Your Loan Summary</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Monthly Payment</p>
                <p className="text-2xl font-bold text-purple-900">
                  {monthlyPayment ? `${currencySymbol}${monthlyPayment.toFixed(2)}` : '-'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Total Interest Paid</p>
                <p className="text-2xl font-bold text-purple-900">
                  {totalInterest ? `${currencySymbol}${totalInterest.toFixed(2)}` : '-'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Total Amount Paid</p>
                <p className="text-2xl font-bold text-purple-900">
                  {monthlyPayment 
                    ? `${currencySymbol}${(monthlyPayment * parseFloat(loanTerm) * 12).toFixed(2)}` 
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InvestmentCalculator = ({ currencySymbol = "₹" }) => {
  const [initialInvestment, setInitialInvestment] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("100");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [years, setYears] = useState("10");
  const [futureValue, setFutureValue] = useState<number | null>(null);
  const [totalContributions, setTotalContributions] = useState<number | null>(null);
  const [interestEarned, setInterestEarned] = useState<number | null>(null);

  const calculateInvestment = () => {
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(annualReturn) / 100 / 12;
    const periods = parseFloat(years) * 12;
    
    let futureVal = initial;
    for (let i = 0; i < periods; i++) {
      futureVal = futureVal * (1 + rate) + monthly;
    }
    
    const totalContrib = initial + (monthly * periods);
    
    setFutureValue(futureVal);
    setTotalContributions(totalContrib);
    setInterestEarned(futureVal - totalContrib);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-purple-900">Investment Growth Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="initialInvestment">Initial Investment ({currencySymbol})</Label>
              <Input 
                id="initialInvestment" 
                type="number" 
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="monthlyContribution">Monthly Contribution ({currencySymbol})</Label>
              <Input 
                id="monthlyContribution" 
                type="number" 
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="annualReturn">Annual Return (%)</Label>
              <Input 
                id="annualReturn" 
                type="number" 
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="years">Investment Period (years)</Label>
              <Input 
                id="years" 
                type="number" 
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>
            <Button 
              onClick={calculateInvestment}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Calculate
            </Button>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-medium text-purple-900 mb-4">Your Investment Summary</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Future Value</p>
                <p className="text-2xl font-bold text-purple-900">
                  {futureValue ? `${currencySymbol}${futureValue.toFixed(2)}` : '-'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Total Contributions</p>
                <p className="text-2xl font-bold text-purple-900">
                  {totalContributions ? `${currencySymbol}${totalContributions.toFixed(2)}` : '-'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Interest Earned</p>
                <p className="text-2xl font-bold text-purple-900">
                  {interestEarned ? `${currencySymbol}${interestEarned.toFixed(2)}` : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const BudgetCalculator = ({ currencySymbol = "₹" }) => {
  const [monthlyIncome, setMonthlyIncome] = useState("5000");
  const [housing, setHousing] = useState("1500");
  const [utilities, setUtilities] = useState("300");
  const [food, setFood] = useState("600");
  const [transportation, setTransportation] = useState("400");
  const [healthcare, setHealthcare] = useState("300");
  const [entertainment, setEntertainment] = useState("200");
  const [savings, setSavings] = useState("500");
  const [other, setOther] = useState("200");
  
  const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [expenseBreakdown, setExpenseBreakdown] = useState<{[key: string]: number}>({});

  const calculateBudget = () => {
    const income = parseFloat(monthlyIncome);
    const expenses = {
      Housing: parseFloat(housing),
      Utilities: parseFloat(utilities),
      Food: parseFloat(food),
      Transportation: parseFloat(transportation),
      Healthcare: parseFloat(healthcare),
      Entertainment: parseFloat(entertainment),
      Savings: parseFloat(savings),
      Other: parseFloat(other)
    };
    
    const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
    const remaining = income - totalExpenses;
    
    setRemainingBudget(remaining);
    setExpenseBreakdown(expenses);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-purple-900">Budget Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyIncome">Monthly Income ({currencySymbol})</Label>
              <Input 
                id="monthlyIncome" 
                type="number" 
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
            </div>
            
            <h3 className="font-medium text-purple-900 mt-4">Monthly Expenses</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="housing">Housing ({currencySymbol})</Label>
                <Input 
                  id="housing" 
                  type="number" 
                  value={housing}
                  onChange={(e) => setHousing(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="utilities">Utilities ({currencySymbol})</Label>
                <Input 
                  id="utilities" 
                  type="number" 
                  value={utilities}
                  onChange={(e) => setUtilities(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="food">Food ({currencySymbol})</Label>
                <Input 
                  id="food" 
                  type="number" 
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="transportation">Transportation ({currencySymbol})</Label>
                <Input 
                  id="transportation" 
                  type="number" 
                  value={transportation}
                  onChange={(e) => setTransportation(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="healthcare">Healthcare ({currencySymbol})</Label>
                <Input 
                  id="healthcare" 
                  type="number" 
                  value={healthcare}
                  onChange={(e) => setHealthcare(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="entertainment">Entertainment ({currencySymbol})</Label>
                <Input 
                  id="entertainment" 
                  type="number" 
                  value={entertainment}
                  onChange={(e) => setEntertainment(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="savings">Savings ({currencySymbol})</Label>
                <Input 
                  id="savings" 
                  type="number" 
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="other">Other ({currencySymbol})</Label>
                <Input 
                  id="other" 
                  type="number" 
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              onClick={calculateBudget}
              className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
            >
              Calculate Budget
            </Button>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-medium text-purple-900 mb-4">Your Budget Summary</h3>
            
            {remainingBudget !== null && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Remaining Budget</p>
                  <p className={`text-2xl font-bold ${
                    remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {currencySymbol}{remainingBudget.toFixed(2)}
                  </p>
                  {remainingBudget < 0 && (
                    <p className="text-sm text-red-600 mt-1">
                      You're over budget. Consider reducing some expenses.
                    </p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Expense Breakdown</p>
                  <div className="space-y-2">
                    {Object.entries(expenseBreakdown).map(([category, amount]) => (
                      <div key={category} className="flex justify-between">
                        <span className="text-sm">{category}</span>
                        <span className="text-sm font-medium">{currencySymbol}{amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-purple-200">
                  <p className="text-sm text-gray-600">Total Expenses</p>
                  <p className="text-xl font-bold text-purple-900">
                    {currencySymbol}{Object.values(expenseBreakdown).reduce((sum, expense) => sum + expense, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            
            {remainingBudget === null && (
              <p className="text-center text-gray-600">
                Enter your income and expenses to see your budget summary.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveCalculators;
