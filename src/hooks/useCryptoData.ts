import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// API anahtarı ve URL'yi çevre değişkenlerinden al
const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
const COINGECKO_API_BASE_URL = import.meta.env.VITE_COINGECKO_API_BASE_URL;

export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

// Veri alınamadığında gösterilecek örnek kripto para verileri
const SAMPLE_CRYPTO_DATA: CryptoCoin[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 69420,
    price_change_percentage_24h: 2.5
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 3500,
    price_change_percentage_24h: 1.2
  },
  {
    id: "litecoin",
    symbol: "ltc",
    name: "Litecoin",
    image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
    current_price: 120,
    price_change_percentage_24h: 0.8
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.65,
    price_change_percentage_24h: -1.2
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.45,
    price_change_percentage_24h: -0.5
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 130,
    price_change_percentage_24h: 3.2
  }
];

const fetchCryptoData = async (): Promise<CryptoCoin[]> => {
  try {
    console.log("Fetching crypto data...");
    console.log("CoinGecko API Key:", COINGECKO_API_KEY ? "Available" : "Not available");
    console.log("CoinGecko API URL:", COINGECKO_API_BASE_URL);

    // API anahtarları var mı kontrol et
    if (!COINGECKO_API_KEY || !COINGECKO_API_BASE_URL) {
      console.warn("CoinGecko API key or URL not available, returning sample data");
      return SAMPLE_CRYPTO_DATA;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye timeout

    const apiUrl = `${COINGECKO_API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&api_key=${COINGECKO_API_KEY}`;
    
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`CoinGecko API Error: ${response.status} ${response.statusText}`);
      throw new Error("API isteği başarısız");
    }

    const data = await response.json();
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.warn("CoinGecko API returned no results, using sample data");
      return SAMPLE_CRYPTO_DATA;
    }
    
    console.log("CoinGecko API response success, got", data.length, "coins");
    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error("CoinGecko request timed out:", error);
      toast.error("Kripto verileri için istek zaman aşımına uğradı. Örnek veriler gösteriliyor.");
    } else {
      console.error("Kripto para verileri alınamadı:", error);
      toast.error("Kripto para verileri alınamadı. Örnek veriler gösteriliyor.");
    }
    return SAMPLE_CRYPTO_DATA;
  }
};

export const useCryptoData = () => {
  return useQuery({
    queryKey: ["cryptoData"],
    queryFn: fetchCryptoData,
    refetchInterval: 60 * 1000, // Her dakika güncelle
    staleTime: 30 * 1000, // 30 saniye sonra veriler bayat sayılır
    retry: 2, // Başarısız istekleri 2 kez tekrar dene
    retryDelay: 1000, // 1 saniye bekleme
  });
};
