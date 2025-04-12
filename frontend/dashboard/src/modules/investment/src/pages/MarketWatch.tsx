
import MarketWidget from "@/components/MarketWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const MarketWatch = () => {
  // Mock data for stock chart
  const stockData = [
    { date: "Jan", nifty: 18000, sensex: 60000, bank: 44000 },
    { date: "Feb", nifty: 18500, sensex: 61500, bank: 45000 },
    { date: "Mar", nifty: 18200, sensex: 61000, bank: 44500 },
    { date: "Apr", nifty: 19000, sensex: 63000, bank: 46000 },
    { date: "May", nifty: 19500, sensex: 64500, bank: 47000 },
    { date: "Jun", nifty: 20000, sensex: 66000, bank: 48000 },
    { date: "Jul", nifty: 20800, sensex: 68000, bank: 49500 },
    { date: "Aug", nifty: 21500, sensex: 71000, bank: 50800 },
    { date: "Sep", nifty: 22000, sensex: 73000, bank: 51200 },
    { date: "Oct", nifty: 22800, sensex: 75000, bank: 51800 },
    { date: "Nov", nifty: 23200, sensex: 76500, bank: 52000 },
    { date: "Dec", nifty: 24000, sensex: 78000, bank: 52500 },
  ];

  // Mock news data
  const marketNews = [
    {
      id: 1,
      title: "RBI maintains repo rate, Indian markets respond positively",
      date: "Apr 7, 2025",
      category: "Economy",
      snippet: "The Reserve Bank of India has maintained the repo rate at 6.50%, leading to a positive response from Indian equity markets.",
    },
    {
      id: 2,
      title: "Tech stocks rally after strong quarterly earnings",
      date: "Apr 5, 2025",
      category: "Technology",
      snippet: "IT sector stocks surged following better-than-expected quarterly results from major companies, boosting market sentiment.",
    },
    {
      id: 3,
      title: "Government announces new policy for renewable energy sector",
      date: "Apr 3, 2025",
      category: "Policy",
      snippet: "The Indian government has unveiled a new policy framework for renewable energy, aimed at attracting investments worth $20 billion.",
    },
    {
      id: 4,
      title: "Gold prices hit new high amid global uncertainties",
      date: "Apr 1, 2025",
      category: "Commodities",
      snippet: "Gold prices have reached a new high of ₹68,000 per 10 grams as investors seek safe-haven assets amid global economic uncertainties.",
    },
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">Market Watch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest market trends, news, and performance of key financial instruments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Market Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stockData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}`, '']}
                      labelFormatter={(label) => `Month: ${label}`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="nifty" stroke="#9b87f5" name="Nifty 50" />
                    <Line type="monotone" dataKey="sensex" stroke="#33C3F0" name="Sensex" />
                    <Line type="monotone" dataKey="bank" stroke="#FEC6A1" name="Bank Nifty" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <MarketWidget />
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Market News & Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="latest">
            <TabsList className="mb-4">
              <TabsTrigger value="latest">Latest</TabsTrigger>
              <TabsTrigger value="economy">Economy</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="latest" className="space-y-4">
              {marketNews.map((news) => (
                <div key={news.id} className="p-4 border-b last:border-0">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{news.title}</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{news.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{news.snippet}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{news.date}</span>
                    <a href="#" className="text-xs text-finxpert-purple font-medium hover:underline">Read more</a>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="economy">
              <div className="p-4 text-center text-gray-500">
                Economy news will appear here
              </div>
            </TabsContent>
            
            <TabsContent value="corporate">
              <div className="p-4 text-center text-gray-500">
                Corporate news will appear here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketWatch;
