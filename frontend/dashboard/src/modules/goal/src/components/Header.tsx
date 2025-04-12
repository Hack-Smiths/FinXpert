
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, User, Bell, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-100 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-finxpert-primary flex items-center justify-center mr-2">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-finxpert-primary">FinXpert</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-finxpert-light text-finxpert-primary rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
