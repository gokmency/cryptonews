import { memo } from "react";
import { NewsItem } from "@/lib/types";
import NewsCard from "./NewsCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface NewsListProps {
  news: NewsItem[];
  isLoading: boolean;
  error: Error | null;
}

const LoadingState = memo(() => (
  <div className="w-full min-h-[300px] grid place-items-center">
    <div className="flex flex-col items-center gap-2">
      <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
      <p className="text-sm text-muted-foreground animate-pulse">Haberler yükleniyor...</p>
    </div>
  </div>
));

const ErrorState = memo(({ error, language }: { error: Error, language: string }) => (
  <Alert variant="destructive" className="animate-fade-in">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>
      {language === "tr" ? "Hata" : "Error"}
    </AlertTitle>
    <AlertDescription>
      {language === "tr" 
        ? "Haberler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin." 
        : "An error occurred while loading news. Please try again later."}
      {error && <div className="text-xs mt-1 opacity-75">{error.message}</div>}
    </AlertDescription>
  </Alert>
));

const EmptyState = memo(({ language }: { language: string }) => (
  <Alert variant="default" className="bg-yellow-50 border-yellow-200 animate-fade-in">
    <AlertCircle className="h-4 w-4 text-yellow-600" />
    <AlertTitle className="text-yellow-800">
      {language === "tr" ? "Sonuç Bulunamadı" : "No Results Found"}
    </AlertTitle>
    <AlertDescription className="text-yellow-700">
      {language === "tr" 
        ? "Aramanıza uygun haber bulunamadı. Lütfen filtrelerinizi değiştirin." 
        : "No news found matching your criteria. Please adjust your filters."}
    </AlertDescription>
  </Alert>
));

const NewsList = ({ news, isLoading, error }: NewsListProps) => {
  const { language } = useLanguage();
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState error={error} language={language} />;
  }
  
  if (news.length === 0) {
    return <EmptyState language={language} />;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {news.map((item) => (
        <NewsCard key={item.id} newsItem={item} />
      ))}
    </div>
  );
};

export default memo(NewsList);
