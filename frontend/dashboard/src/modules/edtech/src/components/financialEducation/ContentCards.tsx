import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  CreditCard, 
  Shield, 
  Clock, 
  Calculator, 
  PiggyBank, 
  BarChart, 
  DollarSign,
  ArrowRight,
  Info,
  Calendar,
  Building,
  Layers,
  Landmark,
  Briefcase,
  Coins,
  Stars,
  Home
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ContentCardsProps {
  activeFilter: string;
  searchQuery: string;
}

interface Topic {
  id: number;
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<any>;
  category: string;
  difficulty: string;
  progress: number;
  tooltipText: string;
  expandedContent: {
    summary: string;
    bulletPoints: string[];
  };
  subcategory?: string;
}

const investmentTopics: Topic[] = [
  {
    id: 9,
    title: "Mutual Fund Investing",
    description: "Understanding mutual funds, their types, and how to select the right ones for your portfolio.",
    icon: Layers,
    category: "mutual-funds",
    subcategory: "investing",
    difficulty: "beginner",
    progress: 0,
    tooltipText: "Mutual funds pool money from multiple investors to purchase diversified securities.",
    expandedContent: {
      summary: "Learn the fundamentals of mutual funds and how to incorporate them into your investment strategy.",
      bulletPoints: [
        "Types of mutual funds: equity, debt, hybrid, and more",
        "Understanding expense ratios and fund management",
        "How to analyze mutual fund performance",
        "Regular investments through SIPs (Systematic Investment Plans)"
      ]
    }
  },
  {
    id: 10,
    title: "Stock Market Essentials",
    description: "Learn how to analyze stocks, understand market movements, and build a direct equity portfolio.",
    icon: TrendingUp,
    category: "stock-market",
    subcategory: "investing",
    difficulty: "intermediate",
    progress: 0,
    tooltipText: "Stocks represent ownership in a company and can be bought and sold on stock exchanges.",
    expandedContent: {
      summary: "Understand stock market dynamics and develop your stock investing strategy.",
      bulletPoints: [
        "Fundamental vs. technical analysis explained",
        "How to read company financial statements",
        "Identifying growth vs. value stocks",
        "Managing risk in direct equity investments"
      ]
    }
  },
  {
    id: 11,
    title: "Fixed Deposits Guide",
    description: "Explore how fixed deposits work, their benefits, and how to maximize returns in a low-risk environment.",
    icon: Landmark,
    category: "fixed-deposits",
    subcategory: "investing",
    difficulty: "beginner",
    progress: 0,
    tooltipText: "Fixed deposits offer guaranteed returns over a fixed period with minimal risk.",
    expandedContent: {
      summary: "Learn everything about fixed deposits and their role in a balanced portfolio.",
      bulletPoints: [
        "Benefits and limitations of fixed deposits",
        "Regular vs. tax-saver fixed deposits",
        "Strategies to ladder fixed deposits for liquidity",
        "FD rates comparison across different banks"
      ]
    }
  },
  {
    id: 12,
    title: "Real Estate Investment",
    description: "Understanding the real estate market, property valuation, and strategies for successful investments.",
    icon: Home,
    category: "real-estate",
    subcategory: "investing",
    difficulty: "advanced",
    progress: 0,
    tooltipText: "Real estate can be a valuable asset class that provides both rental income and potential appreciation.",
    expandedContent: {
      summary: "Explore the fundamentals of real estate investing and property management.",
      bulletPoints: [
        "Residential vs. commercial real estate investing",
        "Analyzing locations and property appreciation potential",
        "Calculating rental yields and ROI",
        "REITs (Real Estate Investment Trusts) as alternatives"
      ]
    }
  },
  {
    id: 13,
    title: "Public Provident Fund (PPF)",
    description: "Learn about PPF, its tax benefits, and how to use it effectively for long-term wealth creation.",
    icon: Briefcase,
    category: "ppf",
    subcategory: "investing",
    difficulty: "beginner",
    progress: 0,
    tooltipText: "PPF is a government-backed savings scheme with attractive interest rates and tax benefits.",
    expandedContent: {
      summary: "Understand the benefits and strategies for maximizing your PPF investments.",
      bulletPoints: [
        "PPF account opening and contribution rules",
        "Tax benefits under Section 80C and EEE status",
        "Loan and withdrawal facilities from PPF",
        "PPF as part of your retirement portfolio"
      ]
    }
  },
  {
    id: 14,
    title: "Equity Linked Savings Scheme (ELSS)",
    description: "Explore ELSS mutual funds, their tax advantages, and how they compare to other tax-saving instruments.",
    icon: Stars,
    category: "elss",
    subcategory: "investing",
    difficulty: "intermediate",
    progress: 0,
    tooltipText: "ELSS funds are tax-saving mutual funds with the shortest lock-in period among tax-saving instruments.",
    expandedContent: {
      summary: "Learn how ELSS can help you save taxes while generating potentially higher returns.",
      bulletPoints: [
        "ELSS vs. other tax-saving options under Section 80C",
        "Understanding the 3-year lock-in period",
        "Analyzing ELSS fund performance",
        "SIP vs. lump sum investments in ELSS"
      ]
    }
  },
  {
    id: 15,
    title: "National Pension System (NPS)",
    description: "Understanding NPS, its tiers, investment options, and tax benefits for retirement planning.",
    icon: Building,
    category: "nps",
    subcategory: "investing",
    difficulty: "intermediate",
    progress: 0,
    tooltipText: "NPS is a voluntary retirement savings scheme designed to provide pension in old age.",
    expandedContent: {
      summary: "Explore the structure and benefits of investing in the National Pension System.",
      bulletPoints: [
        "NPS Tier 1 vs. Tier 2 accounts explained",
        "Asset allocation options in NPS",
        "Tax benefits under Section 80CCD",
        "Withdrawal rules and annuity purchase at maturity"
      ]
    }
  },
  {
    id: 16,
    title: "Sovereign Gold Bonds",
    description: "Learn about investing in gold without physical possession through Sovereign Gold Bonds.",
    icon: Coins,
    category: "gold-bonds",
    subcategory: "investing",
    difficulty: "beginner",
    progress: 0,
    tooltipText: "Sovereign Gold Bonds are government securities denominated in grams of gold, offering an alternative to physical gold.",
    expandedContent: {
      summary: "Understand how Sovereign Gold Bonds work and their advantages over physical gold.",
      bulletPoints: [
        "Issue price and interest payments",
        "Tax advantages of Sovereign Gold Bonds",
        "Redemption options and capital gains",
        "SGB as a portfolio diversifier"
      ]
    }
  }
];

const otherTopics: Topic[] = [
  {
    id: 1,
    title: "Understanding Market Basics",
    description: "Learn how stock markets work, key terms, and fundamental principles of investing.",
    icon: TrendingUp,
    category: "investing",
    difficulty: "beginner",
    progress: 0,
    tooltipText: "The stock market is where investors buy and sell shares of publicly traded companies.",
    expandedContent: {
      summary: "This module covers the fundamental concepts of stock markets and investing.",
      bulletPoints: [
        "What are stocks and how do they work?",
        "Understanding market capitalization",
        "Bull vs. bear markets explained",
        "How to read stock tickers and financial news"
      ]
    }
  },
  {
    id: 3,
    title: "Smart Debt Management",
    description: "Learn strategies to manage and pay down debt efficiently while maintaining financial health.",
    icon: CreditCard,
    category: "debt",
    difficulty: "beginner",
    progress: 10,
    tooltipText: "Not all debt is bad! Learn to distinguish between good and bad debt.",
    expandedContent: {
      summary: "Understand different types of debt and strategies for efficient repayment.",
      bulletPoints: [
        "Good debt vs. bad debt explained",
        "Debt avalanche vs. debt snowball methods",
        "How to negotiate with creditors",
        "Using balance transfers effectively"
      ]
    }
  },
  {
    id: 4,
    title: "Improving Your Credit Score",
    description: "Understand what affects your credit score and actionable steps to improve it.",
    icon: Shield,
    category: "credit",
    difficulty: "beginner",
    progress: 60,
    tooltipText: "Your credit score is a number that represents your creditworthiness, typically ranging from 300-850.",
    expandedContent: {
      summary: "Learn what factors affect your credit score and how to improve it over time.",
      bulletPoints: [
        "The five factors that determine your credit score",
        "How credit utilization impacts your score",
        "Disputing errors on your credit report",
        "Building credit when starting from zero"
      ]
    }
  },
  {
    id: 5,
    title: "Retirement Planning Essentials",
    description: "Start planning for retirement with guidance on savings strategies and account types.",
    icon: Clock,
    category: "retirement",
    difficulty: "intermediate",
    progress: 25,
    tooltipText: "The earlier you start saving for retirement, the more you benefit from compound interest.",
    expandedContent: {
      summary: "Discover the fundamentals of retirement planning and account types.",
      bulletPoints: [
        "401(k) vs. IRA accounts explained",
        "How to calculate your retirement number",
        "Tax advantages of different retirement accounts",
        "Creating a retirement withdrawal strategy"
      ]
    }
  },
  {
    id: 6,
    title: "Creating a Personal Budget",
    description: "Learn how to create and stick to a personal budget that aligns with your financial goals.",
    icon: Calculator,
    category: "planning",
    difficulty: "beginner",
    progress: 15,
    tooltipText: "A budget is a plan that helps you track income and expenses over a specific period.",
    expandedContent: {
      summary: "Master the art of creating and maintaining a personal budget.",
      bulletPoints: [
        "The 50/30/20 budgeting method explained",
        "Tracking expenses effectively",
        "Setting and achieving savings goals",
        "Adjusting your budget as circumstances change"
      ]
    }
  },
  {
    id: 7,
    title: "Emergency Fund Strategies",
    description: "Learn why emergency funds are crucial and how to build one even on a tight budget.",
    icon: PiggyBank,
    category: "planning",
    difficulty: "beginner",
    progress: 45,
    tooltipText: "An emergency fund typically covers 3-6 months of living expenses.",
    expandedContent: {
      summary: "Understand how to build and maintain an appropriate emergency fund.",
      bulletPoints: [
        "How much to save in your emergency fund",
        "Where to keep your emergency savings",
        "How to build an emergency fund on a tight budget",
        "When to use (and not use) your emergency fund"
      ]
    }
  },
  {
    id: 8,
    title: "Maximizing Retirement Contributions",
    description: "Strategies for maximizing your retirement savings through employer matches and catch-up contributions.",
    icon: DollarSign,
    category: "retirement",
    difficulty: "advanced",
    progress: 75,
    tooltipText: "Employer matches are essentially free money for your retirement.",
    expandedContent: {
      summary: "Learn advanced strategies to boost your retirement savings.",
      bulletPoints: [
        "Taking full advantage of employer matching",
        "Catch-up contributions after age 50",
        "Roth vs. traditional retirement accounts",
        "Maximizing Social Security benefits"
      ]
    }
  }
];

const topics: Topic[] = [...investmentTopics, ...otherTopics];

const ContentCards = ({ activeFilter, searchQuery }: ContentCardsProps) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [userProgress, setUserProgress] = useState<{ [key: number]: number }>(
    topics.reduce((acc, topic) => ({ ...acc, [topic.id]: topic.progress }), {})
  );

  const filteredTopics = topics.filter(topic => {
    const categoryMatch = 
      activeFilter === "all" || 
      topic.category === activeFilter || 
      (topic.subcategory && topic.subcategory === activeFilter);
    
    const searchMatch = 
      !searchQuery || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  const handleLearnMore = (topicId: number) => {
    setExpandedCard(expandedCard === topicId ? null : topicId);
    
    if (userProgress[topicId] < 100) {
      setUserProgress({
        ...userProgress,
        [topicId]: Math.min(userProgress[topicId] + 20, 100)
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "investing":
        return TrendingUp;
      case "debt":
        return CreditCard;
      case "credit":
        return Shield;
      case "retirement":
        return Clock;
      case "planning":
        return Calculator;
      case "mutual-funds":
        return Layers;
      case "stock-market":
        return TrendingUp;
      case "fixed-deposits":
        return Landmark;
      case "real-estate":
        return Home;
      case "ppf":
        return Briefcase;
      case "elss":
        return Stars;
      case "nps":
        return Building;
      case "gold-bonds":
        return Coins;
      default:
        return Info;
    }
  };

  return (
    <div className="mb-16">
      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No matching topics found. Try a different search or filter.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const Icon = topic.icon;
          const CategoryIcon = getCategoryIcon(topic.category);
          
          return (
            <div key={topic.id} className="flex flex-col">
              <Card className="flex-1 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge className={`${getDifficultyColor(topic.difficulty)}`}>
                      {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-purple-900">{topic.title}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <CategoryIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500 capitalize">{topic.category}</span>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0 ml-auto">
                            <Info className="h-4 w-4 text-gray-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">{topic.tooltipText}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-purple-600 font-medium">{userProgress[topic.id]}%</span>
                    </div>
                    <Progress value={userProgress[topic.id]} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleLearnMore(topic.id)} 
                    variant="outline" 
                    className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              
              {expandedCard === topic.id && (
                <Accordion type="single" collapsible className="mt-2 w-full bg-white rounded-lg shadow-md overflow-hidden">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="px-4 py-3 text-purple-700 hover:bg-purple-50">
                      Explore this topic
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="text-sm text-gray-700 mb-4">
                        {topic.expandedContent.summary}
                      </div>
                      
                      <h4 className="font-medium text-purple-900 mb-2">What you'll learn:</h4>
                      <ul className="list-disc pl-5 space-y-1 mb-4">
                        {topic.expandedContent.bulletPoints.map((point, idx) => (
                          <li key={idx} className="text-sm text-gray-600">{point}</li>
                        ))}
                      </ul>
                      
                      <div className="flex justify-between mt-4">
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          15 min read
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Continue Learning
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContentCards;
