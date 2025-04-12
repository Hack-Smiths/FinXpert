
import React from 'react';
import { ArrowRight, CreditCard, Search, Wallet, ChevronRight, ArrowUpRight, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  color: string;
  preApproved?: boolean;
  preApprovedAmount?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  color,
  preApproved,
  preApprovedAmount
}) => {
  return (
    <div className="credit-card p-6 flex flex-col h-full relative overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-4px]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(135deg,#33C3F0_25%,transparent_25%),linear-gradient(225deg,#33C3F0_25%,transparent_25%),linear-gradient(45deg,#33C3F0_25%,transparent_25%),linear-gradient(315deg,#33C3F0_25%,transparent_25%)] bg-[length:20px_20px]"></div>
      
      {preApproved && (
        <Badge className="absolute top-4 right-4 bg-credit-excellent/10 text-credit-excellent border border-credit-excellent/20 shadow-sm">
          Pre-approved
        </Badge>
      )}
      
      <div className="relative">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} mb-4 shadow-md group-hover:shadow-lg transition-all duration-300`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-6 flex-grow">{description}</p>
        
        {preApproved && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700">You're pre-approved for:</p>
            <p className="text-lg font-semibold text-credit-excellent flex items-center">
              <IndianRupee size={18} />
              {preApprovedAmount}
            </p>
          </div>
        )}
        
        <Button className="w-full justify-between group-hover:gap-4 transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm">
          {buttonText}
          <ArrowUpRight size={16} className="text-credit-blue transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Button>
      </div>
    </div>
  );
};

const ActionButtons: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-slide-in" style={{ animationDelay: '0.3s' }}>
      <ActionButton 
        icon={<CreditCard size={24} className="text-white" />}
        title="Apply for Credit Products"
        description="Find credit cards and loans tailored to your credit profile with pre-qualification."
        buttonText="Explore Products"
        color="bg-gradient-to-br from-credit-blue to-blue-700"
        preApproved={true}
        preApprovedAmount="50,000"
      />
      
      <ActionButton 
        icon={<Search size={24} className="text-white" />}
        title="Check Loan Eligibility"
        description="See which loans you qualify for without affecting your credit score."
        buttonText="Check Eligibility"
        color="bg-gradient-to-br from-credit-good to-green-600"
        preApproved={true}
        preApprovedAmount="1,25,000"
      />
      
      <ActionButton 
        icon={<Wallet size={24} className="text-white" />}
        title="Credit Score Simulator"
        description="See how different actions might impact your credit score before you take them."
        buttonText="Try Simulator"
        color="bg-gradient-to-br from-credit-fair to-yellow-600"
      />
    </div>
  );
};

export default ActionButtons;
