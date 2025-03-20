import { useCryptoData } from "@/hooks/useCryptoData";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";

const CryptoTicker = () => {
  const { data: coins, isLoading, isError } = useCryptoData();
  const { t } = useLanguage();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-background/80 backdrop-blur-md py-2 px-4 overflow-hidden border-b border-border/30 sticky top-0 z-50">
        <div className="flex items-center gap-6 max-w-7xl mx-auto overflow-x-auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2 shrink-0">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !coins?.length) {
    return (
      <div className="w-full bg-background/80 backdrop-blur-md py-2 px-4 overflow-hidden border-b border-border/30 sticky top-0 z-50">
        <div className="flex items-center justify-center">
          <p className="text-sm text-destructive">{t("error.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background/80 backdrop-blur-md py-2 overflow-hidden border-b border-border/30 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar pb-1">
          {coins.slice(0, 6).map((coin) => (
            <div 
              key={coin.id} 
              className="flex items-center gap-2 shrink-0"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-5 h-5 object-contain"
              />
              <span className="font-medium text-sm mr-1">{coin.symbol.toUpperCase()}</span>
              <span className="text-sm mr-1">{formatPrice(coin.current_price)}</span>
              <span
                className={cn(
                  "text-xs flex items-center",
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                )}
              >
                {coin.price_change_percentage_24h >= 0 ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoTicker;
