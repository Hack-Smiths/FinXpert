
import { 
  BarChart3, 
  Bike, 
  BriefcaseBusiness, 
  CreditCard, 
  DollarSign, 
  Gauge, 
  Landmark, 
  LineChart, 
  Plane, 
  ScrollText, 
  Shield, 
  TrendingUp, 
  Wallet 
} from "lucide-react";

// User Overview Data
export const userOverview = [
  {
    id: 1,
    title: "Monthly Income",
    value: "₹1,25,000",
    icon: Wallet,
    change: "+5.2%",
    trend: "up",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Monthly Savings",
    value: "₹29,600",
    icon: DollarSign,
    change: "+12.3%",
    trend: "up",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 3,
    title: "Total Expenses",
    value: "₹95,400",
    icon: CreditCard,
    change: "-3.1%",
    trend: "down",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 4,
    title: "Savings Rate",
    value: "23.7%",
    icon: TrendingUp,
    change: "+2.5%",
    trend: "up",
    color: "from-purple-500 to-indigo-600",
  },
];

// Investment Allocator Data
export const investmentData = [
  {
    id: 1,
    name: "Bluechip Equity Fund",
    value: 25,
    amount: 7400,
    color: "#4F46E5",
    description: "A diversified equity fund investing in established companies.",
    category: "Mutual Fund",
    risk: "Moderate Risk",
    return: "12%",
    icon: LineChart,
  },
  {
    id: 2,
    name: "Index Fund (Nifty 50)",
    value: 15,
    amount: 4440,
    color: "#06B6D4",
    description: "Low-cost fund that tracks the performance of Nifty 50 index.",
    category: "Index Fund",
    risk: "Moderate Risk",
    return: "10%",
    icon: BarChart3,
  },
  {
    id: 3,
    name: "Public Provident Fund",
    value: 20,
    amount: 5920,
    color: "#10B981",
    description: "Government-backed long-term savings scheme with tax benefits.",
    category: "Fixed Income",
    risk: "Low Risk",
    return: "7.1%",
    icon: Shield,
  },
  {
    id: 4,
    name: "Corporate Bond Fund",
    value: 15,
    amount: 4440,
    color: "#8B5CF6",
    description: "Fund that invests in bonds issued by high-quality corporations.",
    category: "Debt Fund",
    risk: "Low-Moderate Risk",
    return: "8.5%",
    icon: Landmark,
  },
  {
    id: 5,
    name: "SmallCap Fund",
    value: 15,
    amount: 4440,
    color: "#EC4899",
    description: "High-growth potential fund investing in small-cap companies.",
    category: "Mutual Fund",
    risk: "High Risk",
    return: "14%",
    icon: TrendingUp,
  },
  {
    id: 6,
    name: "Liquid Fund",
    value: 10,
    amount: 2960,
    color: "#F59E0B",
    description: "Low-risk fund for emergency funds and short-term goals.",
    category: "Debt Fund",
    risk: "Very Low Risk",
    return: "6%",
    icon: BriefcaseBusiness,
  },
];

// Goal Overview Data
export const goalsData = [
  {
    id: 1,
    title: "Buy a Bike",
    saved: 84000,
    target: 120000,
    progress: 70,
    icon: Bike,
    color: "from-blue-500 to-indigo-600",
    date: "Dec 2025",
  },
  {
    id: 2,
    title: "Emergency Fund",
    saved: 300000,
    target: 750000,
    progress: 40,
    icon: Shield,
    color: "from-amber-500 to-orange-600",
    date: "Ongoing",
  },
  {
    id: 3,
    title: "Europe Vacation",
    saved: 100000,
    target: 500000,
    progress: 20,
    icon: Plane,
    color: "from-emerald-500 to-teal-600",
    date: "Apr 2026",
  },
];

// Education Modules Data
export const educationData = [
  {
    id: 1,
    title: "Tax Saving 101",
    description: "Learn the basics of tax-saving investments and deductions.",
    tag: "Beginner",
    type: "Article",
    duration: "10 min read",
    icon: ScrollText,
  },
  {
    id: 2,
    title: "SIP vs Lumpsum",
    description: "Understand the difference and benefits of systematic vs one-time investments.",
    tag: "Intermediate",
    type: "Video",
    duration: "15 min watch",
    icon: LineChart,
  },
  {
    id: 3,
    title: "Risk Management",
    description: "Master techniques to balance risk and return in your portfolio.",
    tag: "Advanced",
    type: "Interactive",
    duration: "20 min activity",
    icon: Shield,
  },
  {
    id: 4,
    title: "Basics of Credit Score",
    description: "Learn how credit scores work and strategies to improve yours.",
    tag: "Beginner",
    type: "Video",
    duration: "12 min watch",
    icon: CreditCard,
  },
];

// Credit Optimizer Data
export const creditData = {
  score: 756,
  maxScore: 900,
  level: "Good",
  suggestions: [
    "Pay credit card bills on time",
    "Keep credit utilization below 30%",
    "Maintain older credit accounts"
  ],
  history: [
    { month: "Jan", score: 720 },
    { month: "Feb", score: 722 },
    { month: "Mar", score: 725 },
    { month: "Apr", score: 732 },
    { month: "May", score: 740 },
    { month: "Jun", score: 756 }
  ]
};

// AI Chatbot Sample Conversations
export const chatSamples = [
  {
    id: 1,
    question: "How much am I saving this month?",
    answer: "You're currently saving ₹29,600 this month, which is 23.7% of your income. This is a 12.3% increase from last month!"
  },
  {
    id: 2,
    question: "Suggest better funds for low risk",
    answer: "Based on your profile, I recommend increasing allocation to PPF to 25% and adding a Short-Term Debt Fund at 10%. This can improve stability while maintaining returns around 7-8%."
  },
  {
    id: 3,
    question: "What's my credit score?",
    answer: "Your current credit score is 756 out of 900, which is considered 'Good'. It's improved by 36 points in the last 6 months. Keep up the good work!"
  }
];
