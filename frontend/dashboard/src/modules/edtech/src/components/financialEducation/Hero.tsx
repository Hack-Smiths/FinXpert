
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-100 to-blue-50">
      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center"></div>
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24 lg:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6">
            Welcome to Your Financial Education Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Master the basics of money, investing, debt management, and more. Start your journey to financial wellness today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg">
              Start Learning
            </Button>
            <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-lg text-lg">
              Explore Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
