
import { NewsItem } from "@/lib/types";
import NewsCard from "@/components/NewsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsListProps {
  news: NewsItem[];
  isLoading: boolean;
  className?: string;
  showSampleNews?: boolean;
}

// Örnek haberler
const sampleNews: NewsItem[] = [
  {
    id: 1,
    title: "Bitcoin 50.000 dolar seviyesini aşarak yeni bir rekor kırdı",
    published_at: new Date().toISOString(),
    url: "https://example.com/bitcoin-record",
    source: {
      title: "Kripto Haber",
      region: "tr",
      domain: "kriptohaber.com",
    },
    domain: "kriptohaber.com",
    created_at: new Date().toISOString(),
    kind: "news",
    votes: {
      negative: 5,
      positive: 45,
      important: 20,
      liked: 38,
      disliked: 3,
      lol: 0,
      toxic: 0,
      saved: 15,
      comments: 12
    },
    sentiment: "positive",
    description: "Bitcoin, son günlerdeki yükselişini sürdürerek 50.000 dolar seviyesini aştı. Analistler, kurumsal yatırımların artmasının fiyatı olumlu etkilediğini belirtiyor."
  },
  {
    id: 2,
    title: "Ethereum 2.0 güncellemesi için son hazırlıklar tamamlanıyor",
    published_at: new Date(Date.now() - 3600000).toISOString(),
    url: "https://example.com/ethereum-update",
    source: {
      title: "Blockchain Türkiye",
      region: "tr",
      domain: "blockchainturkiye.com",
    },
    domain: "blockchainturkiye.com",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    kind: "news",
    votes: {
      negative: 2,
      positive: 30,
      important: 25,
      liked: 28,
      disliked: 1,
      lol: 0,
      toxic: 0,
      saved: 22,
      comments: 8
    },
    sentiment: "positive",
    description: "Ethereum ekibi, 2.0 güncellemesi için son testleri tamamladı. Yeni güncelleme ile enerji tüketiminin %99 azalması bekleniyor."
  },
  {
    id: 3,
    title: "Kripto para dolandırıcılığında artış: Uzmanlar uyarıyor",
    published_at: new Date(Date.now() - 7200000).toISOString(),
    url: "https://example.com/crypto-scam",
    source: {
      title: "Finans Haberleri",
      region: "tr",
      domain: "finanshaberleri.com",
    },
    domain: "finanshaberleri.com",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    kind: "news",
    votes: {
      negative: 35,
      positive: 10,
      important: 40,
      liked: 12,
      disliked: 28,
      lol: 0,
      toxic: 3,
      saved: 30,
      comments: 25
    },
    sentiment: "negative",
    description: "Son aylarda kripto para dolandırıcılığında büyük artış gözlemleniyor. Uzmanlar, yatırımcıları dikkatli olmaları konusunda uyarıyor."
  }
];

const NewsList = ({ news, isLoading, className, showSampleNews = false }: NewsListProps) => {
  const { t } = useLanguage();
  
  // Örnek haberler gösterilecekse ve gerçek haberler yüklenmediyse
  const displayNews = showSampleNews && news.length === 0 ? sampleNews : news;
  
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
  if (displayNews.length === 0) {
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
        <h3 className="text-lg font-medium mb-1">{t("news.notFound")}</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          {t("news.noMatchingFilters")}
        </p>
      </div>
    );
  }

  // Render news items
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {displayNews.map((item) => (
        <NewsCard key={item.id} newsItem={item} />
      ))}
    </div>
  );
};

export default NewsList;
