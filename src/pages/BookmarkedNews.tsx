
import { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import NewsList from "@/components/NewsList";
import { useBookmarks } from "@/hooks/useBookmarks";
import { FilterOptions, NewsItem } from "@/lib/types";

const BookmarkedNews = () => {
  const { bookmarks } = useBookmarks();
  
  const [filters, setFilters] = useState<FilterOptions>({
    sentiment: "",
    source: "",
    period: "",
    search: "",
  });
  
  const handleFilterChange = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  const handleSearch = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, []);
  
  // Apply filters to bookmarks
  const filteredBookmarks = bookmarks.filter((bookmark: NewsItem) => {
    let matches = true;
    
    // Filter by sentiment
    if (filters.sentiment && bookmark.sentiment !== filters.sentiment) {
      matches = false;
    }
    
    // Filter by source
    if (filters.source && bookmark.domain !== filters.source && bookmark.source?.domain !== filters.source) {
      matches = false;
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const titleMatches = bookmark.title.toLowerCase().includes(searchLower);
      const descriptionMatches = bookmark.description ? bookmark.description.toLowerCase().includes(searchLower) : false;
      
      if (!titleMatches && !descriptionMatches) {
        matches = false;
      }
    }
    
    return matches;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-10 px-4 md:px-10 max-w-7xl mx-auto w-full animate-fade-in">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full mr-1" 
                asChild
              >
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Bookmarked News</h1>
                <p className="text-muted-foreground">
                  Your saved crypto news articles
                </p>
              </div>
            </div>
            
            <SearchBar onSearch={handleSearch} initialValue={filters.search} className="w-full md:w-64" />
          </div>
          
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          
          {bookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 text-center p-4 animate-fade-in">
              <div className="bg-muted rounded-full p-4 mb-4">
                <Bookmark className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No bookmarks yet</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                You haven't bookmarked any articles yet. Navigate to the dashboard and bookmark articles to see them here.
              </p>
              <Button className="mt-4" asChild>
                <Link to="/">Browse News</Link>
              </Button>
            </div>
          ) : (
            <NewsList 
              news={filteredBookmarks} 
              isLoading={false} 
              className="mb-10"
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default BookmarkedNews;
