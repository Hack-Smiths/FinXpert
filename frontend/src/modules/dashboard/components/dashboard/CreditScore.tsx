
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface CreditScoreProps {
  score: number;
  maxScore: number;
  level: string;
  suggestions: string[];
}

export const CreditScore = ({
  score,
  maxScore,
  level,
  suggestions,
}: CreditScoreProps) => {
  const percentage = (score / maxScore) * 100;
  const data = [
    { name: "Score", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];
  
  const COLORS = ["#4F46E5", "#EEF2FF"];
  
  let levelColor = "text-amber-600";
  if (percentage >= 80) {
    levelColor = "text-emerald-600";
  } else if (percentage >= 65) {
    levelColor = "text-blue-600";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 h-full hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      style={{
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card className="border-none shadow-none bg-transparent h-full">
        <CardHeader className="px-0 pt-0 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold gradient-text">Credit Health</CardTitle>
            <span className={cn("font-medium px-3 py-1 rounded-full text-xs", 
              percentage >= 80 ? "bg-emerald-50 text-emerald-600" :
              percentage >= 65 ? "bg-blue-50 text-blue-600" :
              "bg-amber-50 text-amber-600"
            )}>
              {level}
            </span>
          </div>
          <CardDescription className="text-muted-foreground text-sm mt-1">
            Your credit score assessment
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <div className="relative h-40 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      startAngle={180}
                      endAngle={0}
                      paddingAngle={0}
                      dataKey="value"
                      animationDuration={1500}
                      animationBegin={200}
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index]}
                          style={index === 0 ? { filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' } : {}}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute text-center">
                  <span className="text-3xl font-bold background-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-700">{score}</span>
                  <p className="text-xs text-muted-foreground">out of {maxScore}</p>
                </div>
              </div>
            </div>
            
            <div className="w-1/2">
              <h4 className="font-medium text-sm mb-3">Improvement Tips</h4>
              <ul className="space-y-3">
                {suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-muted-foreground">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-0 mt-4">
          <button className="w-full py-2.5 rounded-lg gradient-bg text-white text-sm font-medium transition-all hover:opacity-90 shadow-sm hover:shadow-md">
            Improve Score
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
