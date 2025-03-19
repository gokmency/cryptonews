
import { useState, useCallback, useEffect } from "react";
import { Bookmark, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import NewsList from "@/components/NewsList";
import { useNewsApi } from "@/hooks/useNewsApi";
import { FilterOptions } from "@/lib/types";
import { cn } from "@/lib/utils";

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    sentiment: "",
    source: "",
    period: "",
    search: "",
  });
  
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const { data: news, isLoading, isError, refetch, isRefetching } = useNewsApi(filters);
  
  // Update scroll button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleFilterChange = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  const handleSearch = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-10 px-4 md:px-10 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Crypto News</h1>
              <p className="text-muted-foreground">
                The latest updates from the crypto world
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full md:w-auto">
              <SearchBar onSearch={handleSearch} initialValue={filters.search} className="w-full sm:w-64" />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full h-10 btn-hover ml-auto sm:ml-0"
                onClick={() => refetch()}
                disabled={isRefetching}
              >
                <RefreshCw 
                  className={cn(
                    "h-4 w-4 mr-2",
                    isRefetching && "animate-spin"
                  )} 
                />
                Refresh
              </Button>
            </div>
          </div>
          
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          
          <NewsList 
            news={news || []} 
            isLoading={isLoading} 
            className="mb-10"
          />
          
          {isError && (
            <div className="text-center py-8">
              <p className="text-destructive">Error loading news data. Please try again later.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {showScrollButton && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed bottom-6 right-6 rounded-full shadow-md animate-fade-in z-20"
          onClick={scrollToTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m18 15-6-6-6 6"/>
          </svg>
        </Button>
      )}
    </div>
  );
};

export default Index;
