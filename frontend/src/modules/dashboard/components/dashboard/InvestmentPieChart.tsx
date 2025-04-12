
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Investment {
  id: number;
  name: string;
  value: number;
  amount: number;
  color: string;
}

interface InvestmentPieChartProps {
  data: Investment[];
  totalInvestment: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const InvestmentPieChart = ({
  data,
  totalInvestment,
}: InvestmentPieChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full transform hover:-translate-y-1"
      style={{
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg font-semibold gradient-text">Investment Allocator</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            ₹{totalInvestment.toLocaleString()} monthly allocation
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))' }}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Allocation']}
                  labelFormatter={(name: string) => `${name}`}
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '12px', 
                    padding: '8px 12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: 'none'
                  }}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  wrapperStyle={{ paddingLeft: "10px" }}
                  formatter={(value, entry, index) => (
                    <span className="text-sm font-medium">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
