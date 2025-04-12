
import React, { ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-purple-900">
              FinXpert
            </h1>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="#investing" className="px-4 py-2 rounded hover:bg-purple-50 transition-colors">Investing Basics</a>
                  <a href="#debt" className="px-4 py-2 rounded hover:bg-purple-50 transition-colors">Managing Debt</a>
                  <a href="#credit" className="px-4 py-2 rounded hover:bg-purple-50 transition-colors">Credit Scores</a>
                  <a href="#retirement" className="px-4 py-2 rounded hover:bg-purple-50 transition-colors">Saving for Retirement</a>
                  <a href="#planning" className="px-4 py-2 rounded hover:bg-purple-50 transition-colors">Financial Planning</a>
                  <a href="#stories" className="px-4 py-2 rounded hover:bg-purple-50 transition-colors">Real Stories</a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            <a href="#investing" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Investing Basics</a>
            <a href="#debt" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Managing Debt</a>
            <a href="#credit" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Credit Scores</a>
            <a href="#retirement" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Saving for Retirement</a>
            <a href="#planning" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Financial Planning</a>
            <a href="#stories" className="text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors">Real Stories</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
