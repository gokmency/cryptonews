import { memo } from "react";
import { NewsItem } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Clock, ArrowUpRight, CalendarDays, Bookmark } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import BookmarkButton from "./BookmarkButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProNewsListProps {
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

const getLocale = (language: "en" | "tr") => {
  return language === "tr" ? tr : enUS;
};

const ProNewsItem = memo(({ newsItem }: { newsItem: NewsItem }) => {
  const { language } = useLanguage();
  const locale = getLocale(language as "en" | "tr");
  
  // Tarih formatı
  let formattedDate = "";
  let timeAgo = "";
  
  try {
    formattedDate = format(new Date(newsItem.published_at), "d MMM", {
      locale,
    });
    
    timeAgo = formatDistanceToNow(new Date(newsItem.published_at), {
      addSuffix: false,
      locale,
    });
  } catch (error) {
    formattedDate = "N/A";
    timeAgo = "";
  }
  
  // Haber kaynağı
  const sourceName = newsItem.source?.title || newsItem.domain || "Unknown Source";
  
  // URL'yi açma fonksiyonu
  const handleNewsClick = () => {
    try {
      if (newsItem.url) {
        window.open(newsItem.url, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
      toast.error(language === "tr" ? "Bağlantı açılamadı" : "Failed to open link");
    }
  };
  
  return (
    <div 
      className="border-b border-border last:border-0 py-3 hover:bg-secondary/30 transition-colors rounded-lg px-3 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Badge variant="outline" className="px-2 h-5 text-[10px] font-medium">
              {sourceName}
            </Badge>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> 
              {timeAgo} {language === "tr" ? "önce" : "ago"}
            </span>
          </div>
          
          <h3 
            className="text-base font-medium line-clamp-2 group-hover:text-primary cursor-pointer"
            onClick={handleNewsClick}
          >
            {newsItem.title}
          </h3>
          
          {/* Kısa açıklama - sadece bir cümle göster */}
          {newsItem.description && (
            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
              {getFirstSentence(newsItem.description)}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1 shrink-0">
          <BookmarkButton 
            newsItem={newsItem} 
            size="sm" 
            className="h-7 w-7"
          />
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7 rounded-full"
            onClick={handleNewsClick}
          >
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
});

// Yardımcı fonksiyon: Metnin ilk cümlesini alır
function getFirstSentence(text: string): string {
  const sentences = text.split(/[.!?]+/);
  if (sentences.length === 0) return "";
  return sentences[0].trim() + ".";
}

ProNewsItem.displayName = "ProNewsItem";

const ProNewsList = ({ news, isLoading, error }: ProNewsListProps) => {
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
    <div className="bg-card rounded-lg border border-border shadow-sm animate-fade-in">
      <div className="bg-muted p-3 rounded-t-lg border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-medium">
            {language === "tr" ? "Anlık Haberler" : "Live News Feed"}
          </h2>
        </div>
        <Badge variant="outline" className="text-xs">
          {news.length} {language === "tr" ? "haber" : "news"}
        </Badge>
      </div>
      
      <div className="divide-y divide-border">
        {news.map((item) => (
          <ProNewsItem key={item.id} newsItem={item} />
        ))}
      </div>
    </div>
  );
};

export default memo(ProNewsList); 