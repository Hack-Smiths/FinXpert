
import { useState } from "react";
import { 
  Layout, 
  Hero, 
  TopicNavigation, 
  ContentCards, 
  InteractiveCalculators,
  RealStories,
  ResourceFooter,
  SearchBar
} from "../components/financialEducation";

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Layout>
        <Hero />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <TopicNavigation activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          
          <ContentCards activeFilter={activeFilter} searchQuery={searchQuery} />
          
          <div className="my-16">
            <InteractiveCalculators />
          </div>
          
          <div className="my-16">
            <RealStories />
          </div>
        </div>
        
        <ResourceFooter />
      </Layout>
    </div>
  );
};

export default Index;
