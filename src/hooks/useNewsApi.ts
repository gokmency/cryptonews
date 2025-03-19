
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL, API_KEY, calculateSentiment } from "@/lib/constants";
import { FilterOptions, NewsApiResponse, NewsItem } from "@/lib/types";
import { toast } from "sonner";

const fetchNews = async (filters: FilterOptions): Promise<NewsItem[]> => {
  try {
    const params = new URLSearchParams({
      auth_token: API_KEY,
      public: "true",
      // Enhanced API parameters
      currencies: "bitcoin,ethereum,litecoin,ripple", // Get news for major cryptocurrencies
      regions: "en,tr", // Include English and Turkish news
      kind: "news", // Only news, not posts or tweets
    });

    if (filters.period) {
      params.append("filter", filters.period);
    }

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data: NewsApiResponse = await response.json();
    
    // Add the sentiment property to each news item
    const enrichedData = data.results.map(item => ({
      ...item,
      sentiment: calculateSentiment(item.votes)
    }));

    // Filter by sentiment if specified
    let filteredResults = enrichedData;
    if (filters.sentiment) {
      filteredResults = filteredResults.filter(
        item => item.sentiment === filters.sentiment
      );
    }

    // Filter by source if specified
    if (filters.source) {
      filteredResults = filteredResults.filter(
        item => item.domain === filters.source
      );
    }

    // Filter by search term if specified
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredResults = filteredResults.filter(
        item => item.title.toLowerCase().includes(searchLower) || 
                (item.description?.toLowerCase().includes(searchLower))
      );
    }

    return filteredResults;
  } catch (error) {
    console.error("Error fetching news:", error);
    toast.error("Failed to fetch news. Please try again later.");
    return [];
  }
};

export const useNewsApi = (filters: FilterOptions) => {
  return useQuery({
    queryKey: ["cryptoNews", filters],
    queryFn: () => fetchNews(filters),
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
    refetchOnWindowFocus: true, // Refetch when window regains focus
    retry: 3, // Retry failed requests 3 times
  });
};
