
import { useState } from "react";
import { Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SENTIMENTS, TIME_PERIODS, NEWS_SOURCES } from "@/lib/constants";
import { FilterOptions } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
  className?: string;
}

const FilterBar = ({ filters, onFilterChange, className }: FilterBarProps) => {
  const [open, setOpen] = useState(false);
  
  const activeFiltersCount = [
    filters.sentiment,
    filters.source,
    filters.period
  ].filter(Boolean).length;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {/* Sentiment Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "rounded-full h-9 font-normal",
              filters.sentiment && "bg-secondary"
            )}
          >
            <span>Sentiment</span>
            {filters.sentiment && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                ✓
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 animate-fade-in">
          <DropdownMenuLabel>Filter by Sentiment</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={filters.sentiment} 
            onValueChange={(value) => onFilterChange({ sentiment: value })}
          >
            {SENTIMENTS.map((sentiment) => (
              <DropdownMenuRadioItem 
                key={sentiment.value} 
                value={sentiment.value}
                className="cursor-pointer"
              >
                {sentiment.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Source Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "rounded-full h-9 font-normal",
              filters.source && "bg-secondary"
            )}
          >
            <span>Source</span>
            {filters.source && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                ✓
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 animate-fade-in">
          <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={filters.source} 
            onValueChange={(value) => onFilterChange({ source: value })}
          >
            {NEWS_SOURCES.map((source) => (
              <DropdownMenuRadioItem 
                key={source.value} 
                value={source.value}
                className="cursor-pointer"
              >
                {source.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Time Period Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "rounded-full h-9 font-normal",
              filters.period && "bg-secondary"
            )}
          >
            <span>Time</span>
            {filters.period && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                ✓
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 animate-fade-in">
          <DropdownMenuLabel>Filter by Time</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={filters.period} 
            onValueChange={(value) => onFilterChange({ period: value })}
          >
            {TIME_PERIODS.map((period) => (
              <DropdownMenuRadioItem 
                key={period.value} 
                value={period.value}
                className="cursor-pointer"
              >
                {period.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* All Filters Button (Mobile) */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full h-9 font-normal md:hidden"
          >
            <Filter className="mr-2 h-4 w-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 animate-fade-in">
          <DropdownMenuLabel>All Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <div className="p-2">
            <h3 className="text-sm font-medium mb-2">Sentiment</h3>
            <div className="flex flex-wrap gap-1 mb-4">
              {SENTIMENTS.map((sentiment) => (
                <Button
                  key={sentiment.value}
                  variant={filters.sentiment === sentiment.value ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full h-8"
                  onClick={() => {
                    onFilterChange({ sentiment: sentiment.value });
                  }}
                >
                  {sentiment.label}
                  {filters.sentiment === sentiment.value && (
                    <Check className="ml-1 h-3 w-3" />
                  )}
                </Button>
              ))}
            </div>
            
            <h3 className="text-sm font-medium mb-2">Source</h3>
            <div className="flex flex-wrap gap-1 mb-4">
              {NEWS_SOURCES.map((source) => (
                <Button
                  key={source.value}
                  variant={filters.source === source.value ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full h-8"
                  onClick={() => {
                    onFilterChange({ source: source.value });
                  }}
                >
                  {source.label}
                  {filters.source === source.value && (
                    <Check className="ml-1 h-3 w-3" />
                  )}
                </Button>
              ))}
            </div>
            
            <h3 className="text-sm font-medium mb-2">Time Period</h3>
            <div className="flex flex-wrap gap-1">
              {TIME_PERIODS.map((period) => (
                <Button
                  key={period.value}
                  variant={filters.period === period.value ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full h-8"
                  onClick={() => {
                    onFilterChange({ period: period.value });
                  }}
                >
                  {period.label}
                  {filters.period === period.value && (
                    <Check className="ml-1 h-3 w-3" />
                  )}
                </Button>
              ))}
            </div>
          </div>
          
          <DropdownMenuSeparator />
          <div className="flex justify-between p-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onFilterChange({
                  sentiment: "",
                  source: "",
                  period: "",
                });
                setOpen(false);
              }}
            >
              Reset All
            </Button>
            <Button
              size="sm"
              onClick={() => setOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reset All Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full h-9 font-normal"
          onClick={() => 
            onFilterChange({
              sentiment: "",
              source: "",
              period: "",
            })
          }
        >
          Clear All
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
