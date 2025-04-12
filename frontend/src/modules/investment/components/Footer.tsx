
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold gradient-text">FinXpert</span>
              <span className="ml-2 text-xs py-0.5 px-2 bg-finxpert-light-purple text-finxpert-purple rounded-full">
                AI
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              FinXpert transforms wealth management with AI-powered investment planning 
              and allocation, making financial growth accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-finxpert-purple transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-finxpert-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-finxpert-purple transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-finxpert-purple">Home</Link></li>
                <li><Link to="/ai-allocator" className="text-gray-600 hover:text-finxpert-purple">AI Allocator</Link></li>
                <li><Link to="/market-watch" className="text-gray-600 hover:text-finxpert-purple">Market Watch</Link></li>
                <li><Link to="/learn" className="text-gray-600 hover:text-finxpert-purple">Learn Finance</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Investment Types</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Mutual Funds</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Fixed Deposits</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Stocks</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Gold</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">API Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-finxpert-purple">Disclaimers</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-100">
          <div className="text-center md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-500">
              © 2025 FinXpert. All rights reserved.
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button 
                className="gradient-button rounded-full"
              >
                Start Investing Smarter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>
              Powered by FinXpert Copilot AI. Mock API Endpoints: 
              <code className="ml-1 text-finxpert-purple">/api/allocate</code>,
              <code className="ml-1 text-finxpert-purple">/api/suggest-plan</code>,
              <code className="ml-1 text-finxpert-purple">/api/roi-simulate</code>
            </p>
            <p className="mt-1">
              This is a demo application. Not financial advice. Investments are subject to market risks.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
