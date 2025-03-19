
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookmarkButton from "@/components/BookmarkButton";
import { NewsItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  newsItem: NewsItem;
  className?: string;
}

const NewsCard = ({ newsItem, className }: NewsCardProps) => {
  const { title, published_at, url, source, sentiment, votes } = newsItem;
  const domain = source?.domain || newsItem.domain;
  
  const handleCardClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getSentimentColor = (sentiment: string | undefined) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300";
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-300";
    }
  };

  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer card-hover animate-fade-in",
        className
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <Badge 
            variant="outline" 
            className={cn(
              "mb-2 text-xs font-normal capitalize",
              getSentimentColor(sentiment)
            )}
          >
            {sentiment || "neutral"}
          </Badge>
          <BookmarkButton newsItem={newsItem} size="sm" />
        </div>
        
        <h3 className="font-medium text-base mb-2 line-clamp-3 text-balance leading-tight">
          {title}
        </h3>
        
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="truncate max-w-[180px]">{domain}</span>
          <span className="mx-1">•</span>
          <span>{formatDistanceToNow(new Date(published_at), { addSuffix: true })}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-xs">
          <span className="flex items-center">
            <span className="text-green-500 mr-1">↑</span> {votes.positive || 0}
          </span>
          <span className="flex items-center">
            <span className="text-red-500 mr-1">↓</span> {votes.negative || 0}
          </span>
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors">
          <span className="mr-1">Read</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
