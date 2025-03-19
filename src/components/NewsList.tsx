
import { NewsItem } from "@/lib/types";
import NewsCard from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface NewsListProps {
  news: NewsItem[];
  isLoading: boolean;
  className?: string;
}

const NewsList = ({ news, isLoading, className }: NewsListProps) => {
  // Render loading skeletons
  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="card bg-card border rounded-lg p-4 space-y-3 animate-pulse">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // When no news items match the filters
  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-60 text-center p-4 animate-fade-in">
        <div className="bg-muted rounded-full p-4 mb-4">
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
            className="h-6 w-6 text-muted-foreground"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-1">No news found</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          No articles match your current filters. Try adjusting your search criteria or check back later for new content.
        </p>
      </div>
    );
  }

  // Render news items
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {news.map((item) => (
        <NewsCard key={item.id} newsItem={item} />
      ))}
    </div>
  );
};

export default NewsList;
