
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Mail, 
  Calculator, 
  FileText, 
  BookOpen,
  Twitter,
  Facebook,
  Instagram,
  Linkedin
} from "lucide-react";

const ResourceFooter = () => {
  return (
    <footer className="bg-purple-900 text-white py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FinXpert</h3>
            <p className="text-purple-200 mb-6">
              Empowering you with knowledge and tools for a brighter financial future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">External Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Consumer Financial Protection Bureau
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Investor.gov
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  MyMoney.gov
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Financial Planning Association
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  Retirement Calculator
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  Mortgage Calculator
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Budget Template
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Debt Reduction Planner
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Financial Blogs</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Navigating Market Volatility
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  5 Steps to Build an Emergency Fund
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Understanding Credit Score Factors
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-purple-200 hover:text-white transition-colors flex items-center gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Tax-Efficient Investing Strategies
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-purple-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Subscribe to Our Newsletter
              </h3>
              <div className="flex max-w-md">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-r-none bg-purple-800 border-purple-700 text-white placeholder:text-purple-300 focus-visible:ring-purple-500"
                />
                <Button className="rounded-l-none bg-purple-600 hover:bg-purple-500">
                  Subscribe
                </Button>
              </div>
              <p className="text-purple-300 text-xs mt-2">
                Get weekly financial tips, resources, and updates delivered to your inbox.
              </p>
            </div>
            
            <div className="text-right text-purple-300 text-sm hidden md:block">
              <p>© 2025 FinXpert. All rights reserved.</p>
              <div className="mt-2 space-x-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-purple-300 text-sm md:hidden">
            <p>© 2025 FinXpert. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResourceFooter;
