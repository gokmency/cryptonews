import React, { memo, useState, useCallback } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageMap, NewsItem } from "@/lib/types";
import { ChevronRight, Clock, ExternalLink, MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookmarkButton from "./BookmarkButton";
import { toast } from "sonner";

const getLocale = (language: "en" | "tr") => {
  return language === "tr" ? tr : enUS;
};

// Tarihi formatlarken kullanılan metin
const fromNowText: LanguageMap<string> = {
  en: "ago",
  tr: "önce",
};

// Default haber kapak resmi
const DEFAULT_NEWS_IMAGE = "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=2048&auto=format&fit=crop";

interface NewsCardProps {
  newsItem: NewsItem;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = memo(({ newsItem, className }) => {
  const { language } = useLanguage();
  const locale = getLocale(language as "en" | "tr");
  const [imageError, setImageError] = useState(false);
  
  // Haber kaynağı
  const sourceName = newsItem.source?.title || newsItem.domain || "Unknown Source";
  
  // Tarih formatı - hata yakalamayı ekleyelim
  let formattedDate = "";
  let timeAgo = "";
  
  try {
    formattedDate = format(new Date(newsItem.published_at), "d MMM yyyy", {
      locale,
    });
    
    // Kaç dakika/saat önce hesaplama
    timeAgo = formatDistanceToNow(new Date(newsItem.published_at), {
      addSuffix: false,
      locale,
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    formattedDate = "Tarih bilgisi yok";
    timeAgo = "";
  }
  
  // Açıklama metnini kontrol et
  const description = newsItem.description || (language === "tr" ? "Açıklama bulunmuyor." : "No description available.");
  
  // Gösterilecek resim URL'si
  const imageUrl = (imageError ? DEFAULT_NEWS_IMAGE : (newsItem.metadata?.image || DEFAULT_NEWS_IMAGE));
  
  // Yorum sayısı
  const comments = newsItem.votes?.comments || 0;
  
  // Dış bağlantıyı açma fonksiyonu
  const handleNewsClick = useCallback(() => {
    try {
      if (newsItem.url) {
        window.open(newsItem.url, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
      toast.error(language === "tr" ? "Bağlantı açılamadı" : "Failed to open link");
    }
  }, [newsItem.url, language]);
  
  // Resim yükleme hatası işleme
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Duygu durumuna göre badge renk sınıfı ve içerik
  const getSentimentDisplay = () => {
    if (!newsItem.sentiment) return null;
    
    let badgeClass = "";
    let icon = null;
    let label = newsItem.sentiment;
    
    switch (newsItem.sentiment.toLowerCase()) {
      case "positive":
      case "olumlu":
        badgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/70 dark:text-emerald-200 dark:border-emerald-800/50 border";
        icon = <ThumbsUp className="h-3 w-3 mr-1" />;
        label = language === 'tr' ? 'Olumlu' : 'Positive';
        break;
        
      case "negative":
      case "olumsuz":
        badgeClass = "bg-rose-100 text-rose-800 dark:bg-rose-900/70 dark:text-rose-200 dark:border-rose-800/50 border";
        icon = <ThumbsDown className="h-3 w-3 mr-1" />;
        label = language === 'tr' ? 'Olumsuz' : 'Negative';
        break;
        
      default:
        badgeClass = "bg-slate-100 text-slate-800 dark:bg-slate-800/70 dark:text-slate-200 dark:border-slate-700/50 border";
        label = language === 'tr' ? 'Nötr' : 'Neutral';
    }
    
    return { badgeClass, icon, label };
  };
  
  const sentimentDisplay = getSentimentDisplay();
  
  return (
    <Card 
      className={`group h-full flex flex-col overflow-hidden card-soft ${className} border-border/30 hover:border-primary/30 shadow-soft dark:border-border/50`}
    >
      {/* Haber Resmi */}
      <div className="relative w-full h-44 overflow-hidden bg-accent/30 dark:bg-accent/10 rounded-t-lg">
        <img 
          src={imageUrl} 
          alt={newsItem.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
        {comments > 0 && (
          <Badge className="absolute top-3 right-3 bg-black/70 hover:bg-black/80 text-white backdrop-blur-sm">
            <MessageCircle className="h-3 w-3 mr-1" /> {comments}
          </Badge>
        )}
        
        {/* Duygu durumu badge'i */}
        {sentimentDisplay && (
          <Badge 
            className={`absolute top-3 left-3 ${sentimentDisplay.badgeClass} backdrop-blur-sm font-medium flex items-center px-2 py-1`}
          >
            {sentimentDisplay.icon}
            {sentimentDisplay.label}
          </Badge>
        )}
      </div>
      
      <CardHeader className="p-4 pb-2 flex flex-col">
        <div className="flex items-center text-xs text-muted-foreground mb-1 justify-between">
          <span className="font-medium truncate dark:text-muted-foreground/90">{sourceName}</span>
          <span className="shrink-0 opacity-75 dark:text-muted-foreground/90">{formattedDate}</span>
        </div>
        <CardTitle 
          className="text-lg font-bold line-clamp-2 group-hover:text-primary cursor-pointer transition-colors dark:text-foreground"
          onClick={handleNewsClick}
        >
          {newsItem.title}
        </CardTitle>
        {timeAgo && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3 mr-1 opacity-70" />
            <span className="opacity-75 dark:text-muted-foreground/90">{timeAgo} {language === "tr" ? "önce" : "ago"}</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <CardDescription className="line-clamp-3 text-sm text-balance dark:text-muted-foreground">
          {description}
        </CardDescription>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <BookmarkButton newsItem={newsItem} size="sm" />
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs font-medium text-primary dark:text-primary-foreground/90 hover:bg-primary/10 dark:hover:bg-primary/20 p-2 h-8 rounded-lg btn-hover"
          onClick={handleNewsClick}
        >
          {language === "tr" ? "Devamını Oku" : "Read More"} 
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
});

NewsCard.displayName = "NewsCard";

export default NewsCard;
