import React from "react";
import { useFilters } from "@/hooks/useFilters";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, Search, Filter, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Filtre seçenekleri için arayüz metinleri
const filterLabels = {
  en: {
    sentiment: {
      label: "Sentiment",
      options: {
        all: "All Sentiments",
        positive: "Bullish",
        negative: "Bearish",
        neutral: "Neutral",
      },
    },
    period: {
      label: "Period",
      options: {
        all: "All Time",
        h1: "Last Hour",
        h24: "Last 24 Hours",
        h12: "Last 12 Hours",
        d7: "Last 7 Days",
        d30: "Last 30 Days",
      },
    },
    search: {
      placeholder: "Search news...",
      button: "Search",
    },
    reset: "Reset Filters",
  },
  tr: {
    sentiment: {
      label: "Duygu Durumu",
      options: {
        all: "Tüm Haberler",
        positive: "Olumlu",
        negative: "Olumsuz",
        neutral: "Nötr",
      },
    },
    period: {
      label: "Zaman Aralığı",
      options: {
        all: "Tüm Zamanlar",
        h1: "Son 1 Saat",
        h24: "Son 24 Saat",
        h12: "Son 12 Saat",
        d7: "Son 7 Gün",
        d30: "Son 30 Gün",
      },
    },
    search: {
      placeholder: "Haberlerde ara...",
      button: "Ara",
    },
    reset: "Filtreleri Sıfırla",
  },
};

const FilterPanel: React.FC = () => {
  const { filters, updateFilters, resetFilters } = useFilters();
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = React.useState(filters.search || "");
  
  // Dil metinleri
  const texts = filterLabels[language as "en" | "tr"];
  
  // Arama işlemi
  const handleSearch = () => {
    updateFilters({ search: searchTerm });
  };
  
  // Enter tuşuna basıldığında arama yap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  // Arama terimini temizle
  const clearSearch = () => {
    setSearchTerm("");
    updateFilters({ search: "" });
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        {/* Arama alanı */}
        <div className="flex-grow flex gap-2">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder={texts.search.placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-8"
            />
            {searchTerm && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            {texts.search.button}
          </Button>
        </div>
        
        {/* Filtreler */}
        <div className="flex flex-wrap gap-2">
          {/* Duygu Durumu Filtresi */}
          <Select
            value={filters.sentiment || "all"}
            onValueChange={(value) => updateFilters({ 
              sentiment: value === "all" ? undefined : value as "positive" | "negative" | "neutral" 
            })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={texts.sentiment.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{texts.sentiment.options.all}</SelectItem>
              <SelectItem value="positive">{texts.sentiment.options.positive}</SelectItem>
              <SelectItem value="negative">{texts.sentiment.options.negative}</SelectItem>
              <SelectItem value="neutral">{texts.sentiment.options.neutral}</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Zaman Aralığı Filtresi */}
          <Select
            value={filters.period || "all"}
            onValueChange={(value) => updateFilters({ period: value === "all" ? undefined : value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder={texts.period.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{texts.period.options.all}</SelectItem>
              <SelectItem value="h1">{texts.period.options.h1}</SelectItem>
              <SelectItem value="h12">{texts.period.options.h12}</SelectItem>
              <SelectItem value="h24">{texts.period.options.h24}</SelectItem>
              <SelectItem value="d7">{texts.period.options.d7}</SelectItem>
              <SelectItem value="d30">{texts.period.options.d30}</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Filtreleri Sıfırla Butonu */}
          <Button 
            variant="outline" 
            size="icon"
            onClick={resetFilters}
            title={texts.reset}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Aktif Filtreler */}
      {(filters.sentiment || filters.period || filters.search) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.sentiment && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {texts.sentiment.options[filters.sentiment as keyof typeof texts.sentiment.options]}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilters({ sentiment: undefined })}
              />
            </Badge>
          )}
          
          {filters.period && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {texts.period.options[filters.period as keyof typeof texts.period.options]}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => updateFilters({ period: undefined })}
              />
            </Badge>
          )}
          
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              "{filters.search}"
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  setSearchTerm("");
                  updateFilters({ search: undefined });
                }}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel; 