
export const API_KEY = "e585b361b54288e672ed198f61592937093138b7";
export const API_BASE_URL = "https://cryptopanic.com/api/v1/posts/";

export const SENTIMENTS = [
  { label: "All", value: "" },
  { label: "Positive", value: "positive" },
  { label: "Neutral", value: "neutral" },
  { label: "Negative", value: "negative" },
];

export const TIME_PERIODS = [
  { label: "Latest", value: "" },
  { label: "Past 24 Hours", value: "24h" },
  { label: "Past Week", value: "week" },
];

export const NEWS_SOURCES = [
  { label: "All Sources", value: "" },
  { label: "CoinDesk", value: "coindesk.com" },
  { label: "CoinTelegraph", value: "cointelegraph.com" },
  { label: "Decrypt", value: "decrypt.co" },
  { label: "Bitcoin Magazine", value: "bitcoinmagazine.com" },
  { label: "The Block", value: "theblockcrypto.com" },
];

export const LOCAL_STORAGE_KEYS = {
  BOOKMARKS: "crypto-news-bookmarks",
};

export const calculateSentiment = (votes: NewsItem["votes"]): "positive" | "negative" | "neutral" => {
  if (votes.positive > votes.negative) return "positive";
  if (votes.negative > votes.positive) return "negative";
  return "neutral";
};
