
import React from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { InvestmentPieChart } from "@/components/dashboard/InvestmentPieChart";
import { InvestmentCard } from "@/components/dashboard/InvestmentCard";
import { GoalCard } from "@/components/dashboard/GoalCard";
import { EducationCard } from "@/components/dashboard/EducationCard";
import { CreditScore } from "@/components/dashboard/CreditScore";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { AIChat } from "@/components/dashboard/AIChat";
import { SavingsConfetti } from "@/components/dashboard/SavingsConfetti";
import { 
  userOverview, 
  investmentData, 
  goalsData, 
  educationData, 
  creditData,
  chatSamples
} from "@/data/mockData";

const Dashboard = () => {
  const savingsRate = 23.7;
  const totalInvestment = 29600;

  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-64 w-full">
        <main className="py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex justify-between items-center"
            >
              <div>
                <h1 className="text-3xl font-bold background-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Your Financial Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, Rahul! Here's your financial overview.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-medium">RS</span>
                </div>
                <div className="pr-2">
                  <p className="font-medium">Rahul Sharma</p>
                  <p className="text-xs text-muted-foreground">Premium Plan</p>
                </div>
              </div>
            </motion.div>
            
            {/* Overview Section */}
            <section className="mb-10">
              <SectionHeader 
                title="Financial Overview"
                description="Your financial health at a glance"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userOverview.map((stat, i) => (
                  <StatCard
                    key={stat.id}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    change={stat.change}
                    trend={stat.trend as "up" | "down"}
                    color={stat.color}
                    delay={i}
                  />
                ))}
              </div>
            </section>
            
            {/* Investment and Credit Section */}
            <section className="mb-10">
              <SectionHeader 
                title="Investment & Credit Portfolio"
                description="Your investment allocation and credit health"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <InvestmentPieChart 
                  data={investmentData.slice(0, 4)} 
                  totalInvestment={totalInvestment} 
                />
                
                <CreditScore
                  score={creditData.score}
                  maxScore={creditData.maxScore}
                  level={creditData.level}
                  suggestions={creditData.suggestions}
                />
              </div>
            </section>
            
            {/* Investment Cards Section */}
            <section className="mb-10">
              <SectionHeader 
                title="Investment Details"
                description="Your current investment portfolio breakdown"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {investmentData.map((investment, i) => (
                  <InvestmentCard
                    key={investment.id}
                    name={investment.name}
                    description={investment.description}
                    category={investment.category}
                    risk={investment.risk}
                    return={investment.return}
                    value={investment.value}
                    amount={investment.amount}
                    icon={investment.icon}
                    delay={i}
                  />
                ))}
              </div>
            </section>
            
            {/* Goal Section */}
            <section className="mb-10">
              <SectionHeader 
                title="Financial Goals"
                description="Track progress towards your goals"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {goalsData.map((goal, i) => (
                  <GoalCard
                    key={goal.id}
                    title={goal.title}
                    saved={goal.saved}
                    target={goal.target}
                    progress={goal.progress}
                    icon={goal.icon}
                    color={goal.color}
                    date={goal.date}
                    delay={i}
                  />
                ))}
              </div>
            </section>
            
            {/* Education Section */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <SectionHeader 
                  title="Learning Center"
                  description="Enhance your financial knowledge"
                />
                <button className="text-primary font-medium hover:underline flex items-center gap-1">
                  View All Courses
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </button>
              </div>
              
              <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none">
                {educationData.map((module, i) => (
                  <EducationCard
                    key={module.id}
                    title={module.title}
                    description={module.description}
                    tag={module.tag}
                    type={module.type}
                    duration={module.duration}
                    icon={module.icon}
                    delay={i}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      
      {/* AI Chatbot */}
      <AIChat sampleQuestions={chatSamples} />
      
      {/* Confetti for high savings */}
      <SavingsConfetti savingsRate={savingsRate} threshold={20} />
    </div>
  );
};

export default Dashboard;
