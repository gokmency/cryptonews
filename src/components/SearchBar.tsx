
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
  className?: string;
}

const SearchBar = ({ onSearch, initialValue = "", className }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  
  // Update local state when initialValue changes
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div 
      className={cn(
        "relative flex items-center transition-all duration-300 glass rounded-full overflow-hidden",
        isFocused ? "ring-2 ring-primary/20" : "",
        className
      )}
    >
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="border-0 focus-visible:ring-0 bg-transparent pl-10 h-10 pr-12 w-full"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-8 p-0 h-5 w-5 rounded-full hover:bg-muted"
          onClick={clearSearch}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 text-muted-foreground hover:text-foreground"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
