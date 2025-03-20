import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY } from "@/lib/constants";
import { FilterOptions, NewsApiResponse, NewsItem } from "@/lib/types";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Yeni API anahtarları
const LUNARCRUSH_API_KEY = import.meta.env.VITE_LUNARCRUSH_API_KEY;
const CRYPTOCOMPARE_API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;

// API seçenekleri enum'u
enum NewsApiSource {
  CRYPTOPANIC = "cryptopanic",
  CRYPTOCOMPARE = "cryptocompare",
  LUNARCRUSH = "lunarcrush",
  SAMPLE = "sample"
}

const SAMPLE_NEWS: NewsItem[] = [
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
    description: "Son aylarda kripto para dolandırıcılığında büyük artış gözlemleniyor. Uzmanlar, yatırımcıları dikkatli olmaları konusunda uyarıyor."
  }
];

// Ana haber çekme fonksiyonu - stratejileri yönetir
const fetchNews = async (filters: FilterOptions, language: 'en' | 'tr'): Promise<NewsItem[]> => {
  console.log("Fetching news with multiple API strategies...");
  
  // API Stratejileri listesi (sırayla denenecek)
  const apiStrategies = [
    { source: NewsApiSource.CRYPTOCOMPARE, fn: () => fetchCryptoCompareNews(language) },
    { source: NewsApiSource.CRYPTOPANIC, fn: () => fetchCryptoPanicNews(filters, language) },
    { source: NewsApiSource.LUNARCRUSH, fn: () => fetchLunarCrushNews() },
    { source: NewsApiSource.SAMPLE, fn: () => Promise.resolve(applySampleNewsFilters(SAMPLE_NEWS, filters)) }
  ];
  
  // Hata mesajları
  const errorMessages = {
    allFailed: {
      tr: "Hiçbir haber kaynağına ulaşılamadı. Örnek haberler gösteriliyor.",
      en: "Could not reach any news source. Showing sample news."
    }
  };
  
  // Her stratejiyi sırayla dene, başarılı olan ilk API'den haber listesini döndür
  for (const strategy of apiStrategies) {
    try {
      console.log(`Trying ${strategy.source} API...`);
      const news = await strategy.fn();
      
      if (news && news.length > 0) {
        console.log(`Successfully fetched ${news.length} news items from ${strategy.source}`);
        
        // Eğer CryptoPanic dışında bir stratejiden alındıysa filtrelemeleri uygula
        if (strategy.source !== NewsApiSource.CRYPTOPANIC) {
          return applyFilters(news, filters);
        }
        
        return news;
      }
      
      console.log(`${strategy.source} API returned no results, trying next strategy...`);
    } catch (error) {
      console.error(`Error with ${strategy.source} API:`, error);
    }
  }
  
  // Tüm stratejiler başarısız olursa örnek haberleri göster
  console.log("All API strategies failed, falling back to sample news.");
  toast.error(language === "tr" ? errorMessages.allFailed.tr : errorMessages.allFailed.en);
  return applySampleNewsFilters(SAMPLE_NEWS, filters);
};

// CryptoCompare API'den haber çekme
const fetchCryptoCompareNews = async (language: 'en' | 'tr'): Promise<NewsItem[]> => {
  if (!CRYPTOCOMPARE_API_KEY) {
    throw new Error("CryptoCompare API key not available");
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    // CryptoCompare API isteği
    const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=${language === 'tr' ? 'TR' : 'EN'}&api_key=${CRYPTOCOMPARE_API_KEY}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`CryptoCompare API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.Data || !Array.isArray(data.Data) || data.Data.length === 0) {
      throw new Error("No news found from CryptoCompare");
    }
    
    // CryptoCompare API yanıtını NewsItem formatına dönüştür
    return data.Data.map((item: any, index: number) => {
      // URL'den domain adını çıkar
      let domain = "";
      try {
        domain = new URL(item.url).hostname;
      } catch (e) {
        domain = item.source_info?.name || "unknown";
      }
      
      return {
        id: item.id || index + 1000,
        title: item.title,
        published_at: new Date(item.published_on * 1000).toISOString(),
        url: item.url,
        source: {
          title: item.source_info?.name || item.source,
          region: language,
          domain: domain
        },
        domain: domain,
        created_at: new Date(item.published_on * 1000).toISOString(),
        kind: "news",
        votes: {
          negative: 0,
          positive: item.upvotes || 0,
          important: 0,
          liked: item.upvotes || 0,
          disliked: 0,
          lol: 0,
          toxic: 0,
          saved: 0,
          comments: 0
        },
        description: item.body,
        metadata: {
          image: item.imageurl
        }
      };
    });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("CryptoCompare news fetch error:", error);
    throw error;
  }
};

// LunarCrush API'den haber çekme
const fetchLunarCrushNews = async (): Promise<NewsItem[]> => {
  if (!LUNARCRUSH_API_KEY) {
    throw new Error("LunarCrush API key not available");
  }
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  
  try {
    // LunarCrush API isteği
    const url = `https://lunarcrush.com/api3/news?key=${LUNARCRUSH_API_KEY}&limit=20`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`LunarCrush API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error("No news found from LunarCrush");
    }
    
    // LunarCrush API yanıtını NewsItem formatına dönüştür
    return data.data.map((item: any, index: number) => {
      // URL'den domain adını çıkar
      let domain = "";
      try {
        domain = new URL(item.url).hostname;
      } catch (e) {
        domain = item.site || "unknown";
      }
      
      return {
        id: item.id || index + 2000,
        title: item.title,
        published_at: new Date(item.time * 1000).toISOString(),
        url: item.url,
        source: {
          title: item.site,
          region: "en",
          domain: domain
        },
        domain: domain,
        created_at: new Date(item.time * 1000).toISOString(),
        kind: "news",
        votes: {
          negative: 0,
          positive: item.social_score || 0,
          important: 0,
          liked: item.social_score || 0,
          disliked: 0,
          lol: 0,
          toxic: 0,
          saved: 0,
          comments: 0
        },
        description: item.description || "",
        metadata: {
          image: item.image
        }
      };
    });
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("LunarCrush news fetch error:", error);
    throw error;
  }
};

// Orijinal CryptoPanic API'den haber çekme
const fetchCryptoPanicNews = async (filters: FilterOptions, language: 'en' | 'tr'): Promise<NewsItem[]> => {
  if (!API_KEY || !API_BASE_URL) {
    throw new Error("CryptoPanic API key or URL not available");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    // CryptoPanic API parametrelerini hazırla
    const params = new URLSearchParams({
      auth_token: API_KEY,
      public: "true",
      currencies: "bitcoin,ethereum,litecoin,ripple",
      regions: language === 'tr' ? 'tr' : 'en',
      kind: "news",
    });

    if (filters.period) {
      params.append("filter", filters.period);
    }

    // API isteğini gerçekleştir
    const apiUrl = `${API_BASE_URL}?${params.toString()}`;
    
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`CryptoPanic API Error: ${response.status} ${response.statusText}`);
    }

    const data: NewsApiResponse = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error("No news found from CryptoPanic");
    }
    
    return data.results;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("CryptoPanic news fetch error:", error);
    throw error;
  }
};

// Örnek haberlere filtreleri uygulayan yardımcı fonksiyon
const applySampleNewsFilters = (news: NewsItem[], filters: FilterOptions): NewsItem[] => {
  let filteredResults = [...news];
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredResults = filteredResults.filter(
      item => item.title.toLowerCase().includes(searchLower) || 
              (item.description?.toLowerCase().includes(searchLower))
    );
  }
  
  return filteredResults;
};

// API'den dönen haberleri filtreleme (CryptoPanic dışındaki API'ler için)
const applyFilters = (news: NewsItem[], filters: FilterOptions): NewsItem[] => {
  let filteredNews = [...news];
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredNews = filteredNews.filter(
      item => item.title.toLowerCase().includes(searchLower) || 
              (item.description?.toLowerCase().includes(searchLower))
    );
  }
  
  if (filters.source) {
    filteredNews = filteredNews.filter(
      item => item.domain === filters.source
    );
  }
  
  filteredNews.sort((a, b) => {
    const dateA = new Date(a.published_at);
    const dateB = new Date(b.published_at);
    return dateB.getTime() - dateA.getTime();
  });
  
  return filteredNews;
};

export const useNewsApi = (filters: FilterOptions) => {
  const { language } = useLanguage();
  
  return useQuery({
    queryKey: ['news', filters],
    queryFn: () => fetchNews(filters, language as 'en' | 'tr'),
    staleTime: 60 * 1000, // 1 dakika önbellekte tut
    refetchOnWindowFocus: false,
  });
};
