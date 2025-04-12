
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Home, BarChart4, BookOpen, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4 mr-2" /> },
    { name: 'AI Allocator', path: '/ai-allocator', icon: <BarChart4 className="w-4 h-4 mr-2" /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { name: 'Feedback', path: '/feedback', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">FinXpert</span>
              <span className="ml-2 text-xs py-0.5 px-2 bg-finxpert-light-purple text-finxpert-purple rounded-full">
                AI
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path} 
                className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-finxpert-light-purple hover:text-finxpert-purple transition-colors"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button className="gradient-button rounded-full px-6">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-finxpert-purple hover:bg-finxpert-light-purple"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 border-b border-gray-100">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-finxpert-light-purple hover:text-finxpert-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Button 
              className="gradient-button rounded-full px-6 w-full mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
