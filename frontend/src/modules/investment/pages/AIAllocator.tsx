
import { useState } from "react";
import InputPanel from "@/components/InputPanel";
import AllocationResults from "@/components/AllocationResults";
import PlanSuggestions from "@/components/PlanSuggestions";
import SmartNudges from "@/components/SmartNudges";

const AIAllocator = () => {
  const [userData, setUserData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleGeneratePlan = (data: any) => {
    setUserData(data);
    setShowResults(true);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">AI Investment Allocator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our AI analyzes your financial profile and goals to create a personalized investment allocation plan.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <InputPanel onGeneratePlan={handleGeneratePlan} />
          
          {showResults && (
            <div className="space-y-8">
              <AllocationResults data={userData} />
              <PlanSuggestions data={userData} />
            </div>
          )}
        </div>
        
        <div className="lg:w-1/4">
          <SmartNudges data={userData} />
        </div>
      </div>
    </div>
  );
};

export default AIAllocator;
