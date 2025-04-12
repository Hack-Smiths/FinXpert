
import React from 'react';
import { Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm animate-fade-in">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">
            <span className="text-credit-blue">Fin</span>Xpert
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <Bell size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition-opacity">
            <div className="h-9 w-9 bg-credit-blue rounded-full flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:inline">Alex Johnson</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
