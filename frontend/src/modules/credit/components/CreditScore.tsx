
import React from 'react';
import { BadgeCheck, ChevronUp, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const getCreditScoreColor = (score: number): string => {
  if (score >= 800) return 'text-credit-excellent';
  if (score >= 700) return 'text-credit-good';
  if (score >= 600) return 'text-credit-fair';
  if (score >= 500) return 'text-credit-poor';
  return 'text-credit-very-poor';
};

const getCreditScoreLabel = (score: number): string => {
  if (score >= 800) return 'Excellent';
  if (score >= 700) return 'Good';
  if (score >= 600) return 'Fair';
  if (score >= 500) return 'Poor';
  return 'Very Poor';
};

const getCreditScoreRingColor = (score: number): string => {
  if (score >= 800) return 'from-credit-excellent to-credit-excellent/60';
  if (score >= 700) return 'from-credit-good to-credit-good/60';
  if (score >= 600) return 'from-credit-fair to-credit-fair/60';
  if (score >= 500) return 'from-credit-poor to-credit-poor/60';
  return 'from-credit-very-poor to-credit-very-poor/60';
};

const getCreditScoreBadgeColor = (score: number): string => {
  if (score >= 800) return 'bg-credit-excellent/10 text-credit-excellent border-credit-excellent/30';
  if (score >= 700) return 'bg-credit-good/10 text-credit-good border-credit-good/30';
  if (score >= 600) return 'bg-credit-fair/10 text-credit-fair border-credit-fair/30';
  if (score >= 500) return 'bg-credit-poor/10 text-credit-poor border-credit-poor/30';
  return 'bg-credit-very-poor/10 text-credit-very-poor border-credit-very-poor/30';
};

interface CreditScoreProps {
  score: number;
  lastUpdated: string;
}

const CreditScore: React.FC<CreditScoreProps> = ({ score, lastUpdated }) => {
  return (
    <div className="credit-card p-0 mb-8 overflow-hidden animate-fade-in">
      <div className="relative">
        {/* Background gradient pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,#33C3F0,#fff)]"></div>
        
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                Your Credit Score
                <BadgeCheck className="ml-2 text-credit-blue" size={20} />
              </h2>
              <p className="text-sm text-gray-500 flex items-center">
                <span>Last updated: {lastUpdated}</span>
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 animate-pulse">
                  Live
                </span>
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center">
              <div className="bg-credit-light-blue p-2 rounded-lg text-credit-blue text-sm font-medium flex items-center shadow-md">
                <TrendingUp size={16} className="mr-1" />
                <span>+15 points this month</span>
                <ChevronUp size={14} className="ml-1 text-credit-excellent" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col items-center mb-6 md:mb-0">
              {/* 3D effect credit score circle with glassmorphism */}
              <div className="relative">
                <div className={`w-48 h-48 rounded-full flex items-center justify-center bg-gradient-to-br ${getCreditScoreRingColor(score)} shadow-xl transition-all duration-500 mb-4 backdrop-blur-sm border border-white/20`}>
                  <div className="w-40 h-40 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-inner">
                    <div className="text-center">
                      <div className={`text-5xl font-bold ${getCreditScoreColor(score)} animate-pulse-slow`}>{score}</div>
                      <div className={`text-sm font-medium mt-1 ${getCreditScoreColor(score)}`}>
                        {getCreditScoreLabel(score)}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Badge overlay */}
                <div className={`absolute -right-2 top-2 px-3 py-1 rounded-full text-xs font-semibold border ${getCreditScoreBadgeColor(score)} shadow-md`}>
                  {getCreditScoreLabel(score)}
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-600 mr-1">Range:</span>
                <span className="text-sm font-medium">300-850</span>
              </div>
              
              <Button className="mt-4 bg-credit-blue hover:bg-credit-blue/90 text-white shadow-md transition-all hover:translate-y-[-2px]">
                Improve My Score
              </Button>
            </div>
            
            <div className="w-full md:w-1/2 bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-100 shadow-md">
              <div className="flex items-start mb-4">
                <Lightbulb className="text-credit-blue mr-3 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-gray-800">Score Insight</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Your score puts you in the <span className={`font-medium ${getCreditScoreColor(score)}`}>{getCreditScoreLabel(score)}</span> range. 
                    This means you qualify for most loans at competitive rates.
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>300</span>
                  <span>500</span>
                  <span>600</span>
                  <span>700</span>
                  <span>850</span>
                </div>
                <div className="credit-progress-track w-full shadow-inner">
                  <div 
                    className="credit-progress-fill bg-gradient-to-r from-credit-very-poor via-credit-fair to-credit-excellent shadow-md" 
                    style={{ width: `${((score - 300) / 550) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-credit-very-poor font-medium">Very Poor</span>
                  <span className="text-credit-poor font-medium">Poor</span>
                  <span className="text-credit-fair font-medium">Fair</span>
                  <span className="text-credit-good font-medium">Good</span>
                  <span className="text-credit-excellent font-medium">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScore;
