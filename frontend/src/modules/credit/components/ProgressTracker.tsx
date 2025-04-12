
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Calendar, ChevronDown, Target, TrendingUp, CheckCircle2, Star, Heart, Leaf } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: 'Jan', score: 620 },
  { month: 'Feb', score: 625 },
  { month: 'Mar', score: 630 },
  { month: 'Apr', score: 645 },
  { month: 'May', score: 660 },
  { month: 'Jun', score: 675 },
  { month: 'Jul', score: 678 },
  { month: 'Aug', score: 690 },
  { month: 'Sep', score: 705 },
  { month: 'Oct', score: 718 },
  { month: 'Nov', score: 720 },
  { month: 'Dec', score: 722 },
];

const keyEvents = [
  { month: 'Mar', event: 'Paid off credit card', impact: '+10', icon: <CheckCircle2 size={16} className="text-credit-excellent" /> },
  { month: 'Jun', event: 'Loan application', impact: '-5', icon: <Star size={16} className="text-credit-fair" /> },
  { month: 'Sep', event: 'Credit limit increase', impact: '+15', icon: <Leaf size={16} className="text-credit-excellent" /> },
  { month: 'Nov', event: 'Home loan refinanced', impact: '+5', icon: <Heart size={16} className="text-credit-excellent" /> },
];

interface TimelineEvent {
  month: string;
  event: string;
  impact: string;
  icon?: React.ReactNode;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    const event = keyEvents.find(e => e.month === label);
    
    return (
      <div className="glass-effect p-3 rounded-lg shadow-md border border-white/20">
        <p className="font-medium text-gray-800">{label}</p>
        <p className="text-sm text-gray-600">Score: <span className="font-medium">{payload[0].value}</span></p>
        {event && (
          <>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex items-center gap-2">
              {event.icon}
              <p className="text-xs text-gray-800">{event.event}</p>
            </div>
            <p className={`text-xs font-medium ${event.impact.startsWith('+') ? 'text-credit-excellent' : 'text-credit-poor'}`}>
              {event.impact} points
            </p>
          </>
        )}
      </div>
    );
  }

  return null;
};

const ProgressTracker: React.FC = () => {
  const [timeRange, setTimeRange] = useState('quarter');
  const targetScore = 750;
  const currentScore = 722;
  const progressPercentage = (currentScore / targetScore) * 100;
  const pointsToGo = targetScore - currentScore;
  
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in rounded-xl" style={{ animationDelay: '0.2s' }}>
      <CardHeader className="pb-2 bg-gradient-to-r from-credit-soft-bg/70 to-white/80">
        {/* Adjusted header layout for better alignment */}
        <div className="flex flex-col space-y-4">
          {/* Title row moved slightly upward with reduced bottom margin */}
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={20} className="text-credit-blue" />
            <CardTitle className="text-xl text-gray-800">Score Progress</CardTitle>
          </div>
          
          {/* Even alignment of badge and dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mb-3 sm:mb-0">
              <div className="flex items-center">
                <Target size={14} className="mr-1.5 text-gray-500" />
                <span className="text-sm text-gray-500">Target: </span>
                <span className="font-medium ml-1 text-sm text-credit-blue">750 (Excellent)</span>
              </div>
              <Badge className="bg-credit-light-blue text-credit-blue hover:bg-credit-light-blue/80 ml-3">
                +102 points this year
              </Badge>
            </div>
            
            <div className="flex items-center">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[180px] border border-gray-200 focus:ring-credit-blue shadow-sm bg-white">
                  <SelectValue placeholder="Select Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last 3 Months</SelectItem>
                  <SelectItem value="six-months">Last 6 Months</SelectItem>
                  <SelectItem value="year">Last 12 Months</SelectItem>
                  <SelectItem value="two-years">Last 2 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Progress bar towards target */}
        <div className="mb-8 p-5 rounded-xl glass-effect shadow-sm">
          <div className="flex justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-credit-blue animate-pulse"></div>
              <span className="text-sm font-medium">Current: <span className="text-base font-semibold text-credit-blue">{currentScore}</span></span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-credit-excellent"></div>
              <span className="text-sm font-medium">Target: <span className="text-base font-semibold text-credit-excellent">{targetScore}</span></span>
            </div>
          </div>
          
          <div className="relative mt-4">
            <Progress 
              value={progressPercentage} 
              className="h-6 rounded-full shadow-inner bg-gray-100/80"
            />
            
            {/* Custom styled progress bar */}
            <div className="absolute top-0 left-0 h-6 rounded-full bg-gradient-to-r from-[#33C3F0] via-[#66DAFB] to-[#8BC34A] transition-all duration-1000 overflow-hidden" style={{ width: `${progressPercentage}%` }}>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
            </div>
            
            {/* Current position marker */}
            <div 
              className="absolute top-0 h-6 w-1 bg-white shadow-md z-10"
              style={{ left: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <div className="text-xs text-credit-blue">
              <span>Started at 620</span>
            </div>
            <div className="text-xs font-medium text-credit-excellent bg-credit-excellent/10 px-2 py-1 rounded-full">
              <span>{pointsToGo} points to go</span>
            </div>
          </div>
        </div>
        
        <div className="h-80 mb-8 p-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#33C3F0" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#33C3F0" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                domain={[600, 850]} 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine 
                y={targetScore} 
                stroke="#8BC34A" 
                strokeDasharray="5 5" 
                label={{
                  value: 'Target', 
                  fill: '#8BC34A', 
                  fontSize: 12,
                  position: 'right'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#33C3F0" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
                activeDot={{ r: 8, fill: "#33C3F0", stroke: "#fff", strokeWidth: 2, className: "animate-pulse" }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <Card className="border border-gray-200/50 shadow-sm bg-gradient-to-b from-white to-credit-soft-bg/50 rounded-xl">
          <CardHeader className="px-4 py-3 border-b border-gray-100">
            <CardTitle className="text-base font-medium text-gray-800 flex items-center">
              <Star size={16} className="mr-2 text-credit-blue" />
              Key Credit Events
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {keyEvents.map((event, index) => (
                <div key={index} className="flex items-start p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 mr-3">
                    {event.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{event.month}:</span>
                      <Badge 
                        className={`${event.impact.startsWith('+') ? 'bg-credit-excellent/10 text-credit-excellent' : 'bg-credit-poor/10 text-credit-poor'}`}
                      >
                        {event.impact} points
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600">{event.event}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
