
import { useState } from "react";
import Hero from "@/components/Hero";
import InputPanel from "@/components/InputPanel";
import AllocationResults from "@/components/AllocationResults";
import PlanSuggestions from "@/components/PlanSuggestions";
import ROISimulator from "@/components/ROISimulator";
import SmartNudges from "@/components/SmartNudges";
import MarketWidget from "@/components/MarketWidget";

const Index = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleGeneratePlan = (data: any) => {
    setUserData(data);
    setShowResults(true);
    // Scroll to results after a short delay
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="py-2">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <InputPanel onGeneratePlan={handleGeneratePlan} />
            
            {showResults && (
              <div id="results" className="space-y-8">
                <AllocationResults data={userData} />
                <PlanSuggestions data={userData} />
                <ROISimulator />
                <MarketWidget />
              </div>
            )}
          </div>
          
          <div className="lg:w-1/4">
            <SmartNudges data={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
