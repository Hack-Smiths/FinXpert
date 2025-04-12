
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder="Search for financial topics, tools, or resources..."
          className="w-full py-3 pl-12 pr-4 rounded-full border-purple-200 focus-visible:ring-purple-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-r-full transition-colors"
        >
          Search
        </button>
      </form>
      
      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        <button 
          onClick={() => {
            setQuery("retirement planning");
            onSearch("retirement planning");
          }}
          className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
        >
          Retirement Planning
        </button>
        <button 
          onClick={() => {
            setQuery("debt repayment");
            onSearch("debt repayment");
          }}
          className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
        >
          Debt Repayment
        </button>
        <button 
          onClick={() => {
            setQuery("investment strategies");
            onSearch("investment strategies");
          }}
          className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
        >
          Investment Strategies
        </button>
        <button 
          onClick={() => {
            setQuery("credit score");
            onSearch("credit score");
          }}
          className="text-xs px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
        >
          Credit Score
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
