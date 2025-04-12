
import React from 'react';
import { CreditCard, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-gray-800">
              <span className="text-credit-blue">Fin</span>Xpert
            </h2>
            <p className="text-sm text-gray-600 mt-1">Empowering your financial journey</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <CreditCard size={16} className="text-credit-blue mr-2" />
              <span className="text-sm text-gray-700">Credit Services</span>
            </div>
            <div className="flex items-center">
              <Shield size={16} className="text-credit-blue mr-2" />
              <span className="text-sm text-gray-700">256-bit Encryption</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} FinXpert. All rights reserved. FinXpert is not a financial advisor. 
            The information provided is for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
