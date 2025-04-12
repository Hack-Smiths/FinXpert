
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  CreditCard, 
  Shield, 
  Clock, 
  Calculator, 
  Layers, 
  Landmark, 
  Home, 
  Briefcase, 
  Stars, 
  Building, 
  Coins 
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface TopicNavigationProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

// Investment products (prioritized)
const investmentProducts = [
  { id: "mutual-funds", label: "Mutual Funds", icon: Layers },
  { id: "stock-market", label: "Stock Market", icon: TrendingUp },
  { id: "fixed-deposits", label: "Fixed Deposits", icon: Landmark },
  { id: "real-estate", label: "Real Estate", icon: Home },
  { id: "ppf", label: "PPF", icon: Briefcase },
  { id: "elss", label: "ELSS", icon: Stars },
  { id: "nps", label: "NPS", icon: Building },
  { id: "gold-bonds", label: "Gold Bonds", icon: Coins },
];

// Financial categories (shown after investment products)
const categories = [
  { id: "all", label: "All Topics" },
  { id: "investing", label: "General Investing", icon: TrendingUp },
  { id: "debt", label: "Debt Management", icon: CreditCard },
  { id: "credit", label: "Credit Score", icon: Shield },
  { id: "retirement", label: "Retirement", icon: Clock },
  { id: "planning", label: "Financial Planning", icon: Calculator },
];

// Combine all categories with All Topics first, then investment products, then other categories
const allCategories = [
  categories[0], // All Topics
  ...investmentProducts,
  ...categories.slice(1) // Other general categories
];

const TopicNavigation = ({ activeFilter, onFilterChange }: TopicNavigationProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-center text-purple-900 mb-6">
        Explore Financial Topics
      </h2>
      
      <div className="hidden md:block">
        <Tabs 
          defaultValue="all" 
          value={activeFilter} 
          onValueChange={onFilterChange}
          className="w-full"
        >
          <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
            {allCategories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id} 
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 flex gap-2 items-center"
              >
                {category.icon && <category.icon className="h-4 w-4" />}
                <span className="hidden sm:inline">{category.label}</span>
                <span className="sm:hidden">{category.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {/* Mobile view */}
      <div className="md:hidden">
        <Tabs 
          defaultValue="all" 
          value={activeFilter} 
          onValueChange={onFilterChange}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 gap-2 mb-4">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              All Topics
            </TabsTrigger>
            <TabsTrigger value="investing" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 flex gap-2 items-center">
              <TrendingUp className="h-4 w-4" />
              <span>Investing</span>
            </TabsTrigger>
            {investmentProducts.map(product => (
              <TabsTrigger
                key={product.id}
                value={product.id}
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 flex gap-2 items-center"
              >
                <product.icon className="h-4 w-4" />
                <span>{product.label.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
            <TabsTrigger value="debt" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 flex gap-2 items-center">
              <CreditCard className="h-4 w-4" />
              <span>Debt</span>
            </TabsTrigger>
            <TabsTrigger value="credit" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 flex gap-2 items-center">
              <Shield className="h-4 w-4" />
              <span>Credit</span>
            </TabsTrigger>
            <TabsTrigger value="retirement" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 flex gap-2 items-center">
              <Clock className="h-4 w-4" />
              <span>Retirement</span>
            </TabsTrigger>
            <TabsTrigger value="planning" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 flex gap-2 items-center">
              <Calculator className="h-4 w-4" />
              <span>Planning</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default TopicNavigation;
