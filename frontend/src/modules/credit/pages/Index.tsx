
import React from 'react';
import Header from '@/components/Header';
import CreditScore from '@/components/CreditScore';
import ImprovementTips from '@/components/ImprovementTips';
import ProgressTracker from '@/components/ProgressTracker';
import ActionButtons from '@/components/ActionButtons';
import SimulatorWidget from '@/components/SimulatorWidget';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-credit-soft-bg to-white/80">
      <Header />
      
      <main className="flex-grow py-6 px-4 md:py-10 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-credit-blue">
              Credit Optimizer
            </h1>
          </div>
          
          <CreditScore score={722} lastUpdated="April 12, 2025" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImprovementTips />
            <ProgressTracker />
          </div>
          
          {/* Added spacing above the ActionButtons section */}
          <div className="mt-12">
            <ActionButtons />
          </div>
          
          <SimulatorWidget />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
