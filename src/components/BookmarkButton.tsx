import { useState, useEffect, memo, useCallback } from "react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Bookmark } from "lucide-react";
import { NewsItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface BookmarkButtonProps {
  newsItem: NewsItem;
  className?: string;
  size?: "default" | "sm" | "lg";
}

const BookmarkButton = memo(({ newsItem, className, size = "default" }: BookmarkButtonProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [isAnimating, setIsAnimating] = useState(false);
  const { language } = useLanguage();
  
  const bookmarked = isBookmarked(newsItem.id);
  
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    try {
      // Animasyon efekti ekle
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
      
      // Yer imini değiştir
      toggleBookmark(newsItem);
      
      // Bildirim göster
      if (bookmarked) {
        toast.success(language === "tr" ? "Yer imi kaldırıldı" : "Bookmark removed");
      } else {
        toast.success(language === "tr" ? "Yer imi eklendi" : "Bookmark added");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error(
        language === "tr" 
          ? "Yer imi işlemi sırasında hata oluştu" 
          : "Error during bookmark operation"
      );
    }
  }, [bookmarked, language, newsItem, toggleBookmark]);
  
  const sizeClasses = {
    sm: "h-7 w-7",
    default: "h-9 w-9",
    lg: "h-11 w-11",
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={`rounded-full ${className} ${isAnimating ? 'animate-ping-once' : ''}`}
    >
      <Bookmark 
        className={`${sizeClasses[size]} ${bookmarked ? 'fill-primary text-primary' : 'text-gray-500'}`} 
      />
      <span className="sr-only">{bookmarked ? "Remove bookmark" : "Add bookmark"}</span>
    </Button>
  );
});

BookmarkButton.displayName = "BookmarkButton";

export default BookmarkButton;
