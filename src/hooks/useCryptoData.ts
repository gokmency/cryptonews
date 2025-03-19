
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const fetchCryptoData = async (): Promise<CryptoCoin[]> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&api_key=CG-LkMLTpYPMgqgN6z5H6eRAMc9`
    );

    if (!response.ok) {
      throw new Error("API isteği başarısız");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Kripto para verileri alınamadı:", error);
    toast.error("Kripto para verileri alınamadı. Lütfen daha sonra tekrar deneyin.");
    return [];
  }
};

export const useCryptoData = () => {
  return useQuery({
    queryKey: ["cryptoData"],
    queryFn: fetchCryptoData,
    refetchInterval: 60 * 1000, // Her dakika güncelle
    staleTime: 30 * 1000, // 30 saniye sonra veriler bayat sayılır
  });
};
