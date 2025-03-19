
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/useBookmarks";
import { NewsItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookmarkButtonProps {
  newsItem: NewsItem;
  className?: string;
  size?: "sm" | "default";
}

const BookmarkButton = ({ newsItem, className, size = "default" }: BookmarkButtonProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useLanguage();
  const bookmarked = isBookmarked(newsItem.id);

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "icon" : "default"}
      className={cn(
        "rounded-full transition-all btn-hover", 
        bookmarked ? "text-primary" : "text-muted-foreground",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(newsItem);
      }}
      aria-label={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
    >
      <Bookmark 
        className={cn(
          "transition-all",
          size === "sm" ? "h-4 w-4" : "h-5 w-5 mr-2",
          bookmarked && "fill-current"
        )} 
      />
      {size !== "sm" && <span>{bookmarked ? t("button.bookmarked") : t("button.bookmark")}</span>}
    </Button>
  );
};

export default BookmarkButton;
