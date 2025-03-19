
import { useEffect, useRef, useState } from "react";
import { useCryptoData, CryptoCoin } from "@/hooks/useCryptoData";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const CryptoTicker = () => {
  const { data: coins, isLoading, isError } = useCryptoData();
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [autoplay, setAutoplay] = useState(true);

  // Otomatik kaydırma
  useEffect(() => {
    if (!autoplay || isLoading || isError || !coins?.length) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const element = carouselRef.current;
        const scrollAmount = element.scrollLeft + 200;
        
        if (scrollAmount >= element.scrollWidth - element.clientWidth) {
          element.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          element.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [autoplay, isLoading, isError, coins]);

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
      <div className="w-full bg-background/95 glass py-2 px-4 overflow-hidden border-y border-border/30">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs whitespace-nowrap bg-primary/10">
            {t("crypto.loading")}
          </Badge>
        </div>
      </div>
    );
  }

  if (isError || !coins?.length) {
    return (
      <div className="w-full bg-background/95 glass py-2 px-4 overflow-hidden border-y border-border/30">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs whitespace-nowrap bg-destructive/10 text-destructive">
            {t("error.loading")}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-background/95 glass py-2 px-4 overflow-hidden border-y border-border/30 backdrop-blur-sm"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <Carousel>
        <CarouselContent ref={carouselRef} className="gap-4">
          {coins.map((coin) => (
            <CarouselItem key={coin.id} className="basis-auto">
              <div className="flex items-center gap-2">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-5 h-5 object-contain"
                />
                <span className="font-medium text-sm">{coin.name}</span>
                <span className="text-sm">{formatPrice(coin.current_price)}</span>
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
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CryptoTicker;
