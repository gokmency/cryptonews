import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { RefreshCw, Newspaper, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";
import NewsList from "@/components/NewsList";
import ProNewsList from "@/components/ProNewsList";
import CryptoTicker from "@/components/CryptoTicker";
import Footer from "@/components/Footer";
import { useNewsApi } from "@/hooks/useNewsApi";
import { FilterOptions } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const { t, language } = useLanguage();
  const [filters, setFilters] = useState<FilterOptions>({
    source: "",
    period: "",
    search: "",
  });
  
  // Pro mod durumu
  const [isProMode, setIsProMode] = useState(false);
  
  const [showScrollButton, setShowScrollButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  
  const { data: news, isLoading, isError, refetch, isRefetching } = useNewsApi(filters);
  
  // Sayfa scroll işlemleri
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      scrollPositionRef.current = currentPosition;
      setShowScrollButton(currentPosition > 300);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Filtre değişikliğini etkili şekilde yönet
  const handleFilterChange = useCallback((newFilters: Partial<FilterOptions>) => {
    // Mevcut scroll pozisyonunu kaydet
    const currentScrollPos = window.scrollY;
    
    // Filtreleri güncelle
    setFilters(prev => ({ ...prev, ...newFilters }));
    
    // Pozisyonu koru
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollPos);
    });
  }, []);
  
  const handleSearch = useCallback((searchTerm: string) => {
    // Mevcut scroll pozisyonunu kaydet
    const currentScrollPos = window.scrollY;
    
    setFilters(prev => ({ ...prev, search: searchTerm }));
    
    // Pozisyonu koru
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollPos);
    });
  }, []);
  
  const handleRefresh = useCallback(() => {
    toast.info(t("news.refreshing"));
    refetch();
  }, [refetch, t]);
  
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  
  // Pro mod değişikliğini yönet
  const toggleProMode = useCallback(() => {
    setIsProMode(prev => !prev);
    // Kullanıcıya bildiri göster
    if (!isProMode) {
      toast.success(language === "tr" ? "Pro Mod aktif edildi" : "Pro Mode activated");
    } else {
      toast.info(language === "tr" ? "Standart görünüme geçildi" : "Switched to standard view");
    }
  }, [isProMode, language]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fiyat Şeridi */}
      <CryptoTicker />
      
      {/* Header */}
      <Header />
      
      <main className="flex-1 pt-6 pb-10 px-4 md:px-10 max-w-7xl mx-auto w-full animate-fade-in" ref={contentRef}>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Newspaper className="h-6 w-6 text-primary" />
              <div className="hidden">
                <h1 className="text-2xl font-semibold tracking-tight">{t("index.title")}</h1>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center w-full md:w-auto">
              <SearchBar onSearch={handleSearch} initialValue={filters.search} className="w-full sm:w-64" />
              
              <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center gap-1.5 bg-secondary rounded-full py-1 px-3">
                  <Switch 
                    checked={isProMode} 
                    onCheckedChange={toggleProMode} 
                    id="promode-switch"
                    className="data-[state=checked]:bg-primary"
                  />
                  <Badge variant={isProMode ? "default" : "outline"} className={cn(
                    "px-2 py-0 h-6 rounded-full font-medium transition-all",
                    isProMode && "bg-primary text-primary-foreground"
                  )}>
                    <Zap className={cn("h-3.5 w-3.5 mr-1", isProMode ? "text-primary-foreground" : "text-muted-foreground")} />
                    {language === "tr" ? "Pro Mod" : "Pro Mode"}
                  </Badge>
                </div>
              
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full h-10 btn-hover"
                  onClick={handleRefresh}
                  disabled={isRefetching}
                >
                  <RefreshCw 
                    className={cn(
                      "h-4 w-4 mr-2",
                      isRefetching && "animate-spin"
                    )} 
                  />
                  {t("button.refresh")}
                </Button>
              </div>
            </div>
          </div>
          
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          
          {isProMode ? (
            <ProNewsList 
              news={news || []} 
              isLoading={isLoading} 
              error={isError ? new Error("Failed to load news") : null}
            />
          ) : (
            <NewsList 
              news={news || []} 
              isLoading={isLoading} 
              error={isError ? new Error("Failed to load news") : null}
            />
          )}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to top button */}
      {showScrollButton && (
        <Button
          className="fixed bottom-24 right-4 rounded-full h-10 w-10 shadow-lg z-40"
          size="icon"
          onClick={scrollToTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </Button>
      )}
    </div>
  );
};

export default Index;
