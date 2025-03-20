import { useState, useEffect } from "react";
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
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { getTimePeriods } from "@/lib/constants";
import { FilterOptions } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: Partial<FilterOptions>) => void;
  className?: string;
}

const FilterBar = ({ filters, onFilterChange, className }: FilterBarProps) => {
  const [open, setOpen] = useState(false);
  const { language, t } = useLanguage();
  
  const TIME_PERIODS = getTimePeriods(language);
  
  const activeFiltersCount = [
    filters.period
  ].filter(Boolean).length;

  // DropdownMenu'ler açık olduğunda body'ye overflow-fix sınıfı ekleyin
  useEffect(() => {
    // Bir dropdown açıksa body'ye overflow-fix ekleyin
    if (open) {
      document.documentElement.classList.add('overflow-fix');
    } else {
      document.documentElement.classList.remove('overflow-fix');
    }
    
    // Temizleme fonksiyonu
    return () => {
      document.documentElement.classList.remove('overflow-fix');
    };
  }, [open]);

  // Filtre değişikliklerini yönet
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ [key]: value });
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {/* Time Period Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "rounded-xl h-9 font-normal transition-all duration-200 btn-soft border-border/50",
              filters.period 
                ? "bg-accent/30 text-accent-foreground border-accent/30" 
                : "hover:border-accent/50 hover:bg-accent/10"
            )}
          >
            <span>{t("filter.time")}</span>
            {filters.period && (
              <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/70 text-xs text-accent-foreground shadow-sm">
                ✓
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent 
            align="start" 
            className="w-56 animate-fade-in z-50 rounded-xl shadow-soft"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
            }}
            avoidCollisions
            collisionPadding={10}
            forceMount
          >
            <DropdownMenuLabel className="text-foreground/80">{t("filter.time")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup 
              value={filters.period} 
              onValueChange={(value) => handleFilterChange("period", value)}
            >
              {TIME_PERIODS.map((period) => (
                <DropdownMenuRadioItem 
                  key={period.value} 
                  value={period.value}
                  className="cursor-pointer transition-colors hover:bg-accent/10 data-[state=checked]:bg-accent/20 data-[state=checked]:text-accent-foreground rounded-lg my-0.5"
                >
                  {period.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>

      {/* Reset Filter Button */}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="rounded-xl h-9 font-normal text-muted-foreground hover:text-foreground hover:bg-muted/30 btn-soft"
          onClick={() => {
            onFilterChange({ period: "" });
          }}
        >
          {t("filter.reset")}
        </Button>
      )}

      {/* Mobile Filters Button */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl h-9 font-normal md:hidden btn-soft border-border/50 hover:border-accent/50 hover:bg-accent/10"
          >
            <Filter className="mr-2 h-4 w-4" />
            <span>{t("filter.filters")}</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/70 text-xs text-accent-foreground shadow-sm">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent 
            align="end" 
            className="w-72 animate-fade-in z-50 rounded-xl shadow-soft"
            onCloseAutoFocus={(e) => {
              e.preventDefault();
            }}
            avoidCollisions
            collisionPadding={10}
            forceMount
          >
            <DropdownMenuLabel className="text-foreground/80">{t("filter.filters")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <div className="p-2">            
              <h3 className="text-sm font-medium mb-2 text-foreground/80">{t("filter.time")}</h3>
              <div className="flex flex-wrap gap-1">
                {TIME_PERIODS.map((period) => (
                  <Button
                    key={period.value}
                    variant={filters.period === period.value ? "secondary" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-xl h-8 btn-soft border-border/50",
                      filters.period === period.value 
                        ? "bg-accent/30 text-accent-foreground border-accent/30" 
                        : "hover:border-accent/50 hover:bg-accent/10"
                    )}
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
                className="rounded-xl h-8 btn-soft hover:bg-muted/30"
                onClick={() => {
                  onFilterChange({ period: "" });
                  setOpen(false);
                }}
              >
                {t("filter.reset")}
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                className="rounded-xl h-8 ml-2 btn-soft bg-accent/30 text-accent-foreground hover:bg-accent/40"
                onClick={() => setOpen(false)}
              >
                {t("filter.apply")}
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};

export default FilterBar;
