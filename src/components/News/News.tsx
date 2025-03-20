import React from "react";
import { useNewsApi } from "@/hooks/useNewsApi";
import NewsCard from "../NewsCard";
import FilterPanel from "@/components/News/FilterPanel";
import { useFilters } from "@/hooks/useFilters";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

const LoadingState = () => {
  const { language } = useLanguage();
  const loadingText = language === "tr" ? "Haberler Yükleniyor..." : "Loading News...";
  
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[300px] py-10">
      <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
      <h3 className="text-lg font-medium text-gray-700">{loadingText}</h3>
    </div>
  );
};

const EmptyState = () => {
  const { language } = useLanguage();
  const emptyText = language === "tr" 
    ? "Aramanıza uygun haber bulunamadı. Lütfen filtrelerinizi değiştirin." 
    : "No news found matching your criteria. Please adjust your filters.";
  
  return (
    <Alert variant="default" className="my-6 bg-yellow-50 border-yellow-200">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-800">
        {language === "tr" ? "Sonuç Bulunamadı" : "No Results Found"}
      </AlertTitle>
      <AlertDescription className="text-yellow-700">
        {emptyText}
      </AlertDescription>
    </Alert>
  );
};

const News: React.FC = () => {
  const { filters, resetFilters } = useFilters();
  const { data: newsItems, isLoading, isError, error, refetch } = useNewsApi(filters);
  const { language } = useLanguage();

  // Hata mesajı
  const errorMessage = language === "tr" 
    ? "Haberler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin." 
    : "An error occurred while loading news. Please try again later.";

  // Yenile butonu metni
  const refreshText = language === "tr" ? "Yenile" : "Refresh";

  // Fonksiyonel yenileme işlemi
  const handleRefresh = () => {
    refetch();
    toast.success(language === "tr" ? "Haberler yenileniyor..." : "Refreshing news...");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <FilterPanel />
      </div>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <div className="my-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {language === "tr" ? "Hata" : "Error"}
            </AlertTitle>
            <AlertDescription className="mb-2">
              {errorMessage}
              {error instanceof Error && <div className="text-xs mt-1 opacity-75">{error.message}</div>}
            </AlertDescription>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="mt-2 bg-white hover:bg-gray-100"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {refreshText}
            </Button>
          </Alert>
        </div>
      ) : newsItems && newsItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <NewsCard key={item.id} newsItem={item} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default News; 