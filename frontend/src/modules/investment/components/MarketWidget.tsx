
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight, RefreshCw } from "lucide-react";

const MarketWidget = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock data for market info
  const mockMarketData = {
    indices: [
      { name: "Nifty 50", value: "23,564.25", change: "+1.42%", isUp: true },
      { name: "Sensex", value: "77,351.55", change: "+1.36%", isUp: true },
      { name: "Nifty Bank", value: "51,245.90", change: "-0.18%", isUp: false },
      { name: "Nifty IT", value: "39,856.70", change: "+2.15%", isUp: true },
    ],
    mutualFunds: [
      { name: "Axis Bluechip Fund", nav: "48.67", change: "+0.87%", isUp: true },
      { name: "SBI Small Cap", nav: "122.34", change: "+1.52%", isUp: true },
      { name: "HDFC Midcap Opp", nav: "98.56", change: "-0.23%", isUp: false },
      { name: "Parag Parikh Flexi", nav: "57.89", change: "+1.04%", isUp: true },
    ],
    crypto: [
      { name: "Bitcoin", price: "₹58,34,765", change: "+3.21%", isUp: true },
      { name: "Ethereum", price: "₹3,12,456", change: "+2.76%", isUp: true },
      { name: "XRP", price: "₹56.43", change: "-1.24%", isUp: false },
      { name: "Solana", price: "₹10,235", change: "+4.57%", isUp: true },
    ]
  };
  
  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto mb-10 animated-card" style={{ animationDelay: "0.9s" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Market Updates</CardTitle>
        <button 
          className="text-gray-500 hover:text-finxpert-purple transition-colors"
          aria-label="Refresh market data"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="indices">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="indices">Indices</TabsTrigger>
            <TabsTrigger value="mutualFunds">Mutual Funds</TabsTrigger>
            <TabsTrigger value="crypto">Crypto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="indices" className="space-y-1">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between p-2">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              mockMarketData.indices.map((item, index) => (
                <div 
                  key={index}
                  className="flex justify-between py-2 px-2 border-b border-gray-100 last:border-0"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{item.value}</span>
                    <span className={`text-xs flex items-center ${item.isUp ? 'text-green-600' : 'text-red-600'}`}>
                      {item.isUp ? 
                        <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      }
                      {item.change}
                    </span>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="mutualFunds" className="space-y-1">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between p-2">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              mockMarketData.mutualFunds.map((item, index) => (
                <div 
                  key={index}
                  className="flex justify-between py-2 px-2 border-b border-gray-100 last:border-0"
                >
                  <span className="font-medium text-sm">{item.name}</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">₹{item.nav}</span>
                    <span className={`text-xs flex items-center ${item.isUp ? 'text-green-600' : 'text-red-600'}`}>
                      {item.isUp ? 
                        <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      }
                      {item.change}
                    </span>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          
          <TabsContent value="crypto" className="space-y-1">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between p-2">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              mockMarketData.crypto.map((item, index) => (
                <div 
                  key={index}
                  className="flex justify-between py-2 px-2 border-b border-gray-100 last:border-0"
                >
                  <span className="font-medium">{item.name}</span>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{item.price}</span>
                    <span className={`text-xs flex items-center ${item.isUp ? 'text-green-600' : 'text-red-600'}`}>
                      {item.isUp ? 
                        <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      }
                      {item.change}
                    </span>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketWidget;
