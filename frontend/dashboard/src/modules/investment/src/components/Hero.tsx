
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text leading-tight">
            Smarter Investing, Powered by You + AI
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Tell us your story — FinXpert will guide your wealth journey.
            No jargon, no complexity, just personalized investment plans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="gradient-button rounded-full px-8 py-6 text-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="rounded-full px-8 py-6 text-lg border-gray-300 hover:bg-gray-50"
            >
              Learn More
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-center">
            <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl px-6 py-4 w-36">
              <div className="text-3xl font-bold gradient-text">₹120L+</div>
              <div className="text-sm text-gray-600">Invested</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl px-6 py-4 w-36">
              <div className="text-3xl font-bold gradient-text">15.4%</div>
              <div className="text-sm text-gray-600">Avg. Returns</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl px-6 py-4 w-36">
              <div className="text-3xl font-bold gradient-text">20,000+</div>
              <div className="text-sm text-gray-600">Happy Users</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl px-6 py-4 w-36">
              <div className="text-3xl font-bold gradient-text">4.9/5</div>
              <div className="text-sm text-gray-600">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
