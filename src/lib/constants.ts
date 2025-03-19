
import { translations } from '@/contexts/LanguageContext';

export const API_KEY = "e585b361b54288e672ed198f61592937093138b7";
export const API_BASE_URL = "https://cryptopanic.com/api/v1/posts/";

export const getSentiments = (language: 'en' | 'tr') => [
  { label: translations[language]["sentiment.all"], value: "" },
  { label: translations[language]["sentiment.positive"], value: "positive" },
  { label: translations[language]["sentiment.neutral"], value: "neutral" },
  { label: translations[language]["sentiment.negative"], value: "negative" },
];

export const getTimePeriods = (language: 'en' | 'tr') => [
  { label: translations[language]["time.latest"], value: "" },
  { label: translations[language]["time.24h"], value: "24h" },
  { label: translations[language]["time.week"], value: "week" },
];

export const getNewsSources = (language: 'en' | 'tr') => [
  { label: translations[language]["source.all"], value: "" },
  { label: translations[language]["source.coindesk"], value: "coindesk.com" },
  { label: translations[language]["source.cointelegraph"], value: "cointelegraph.com" },
  { label: translations[language]["source.decrypt"], value: "decrypt.co" },
  { label: translations[language]["source.bitcoinmagazine"], value: "bitcoinmagazine.com" },
  { label: translations[language]["source.theblock"], value: "theblockcrypto.com" },
];

export const LOCAL_STORAGE_KEYS = {
  BOOKMARKS: "crypto-news-bookmarks",
  LANGUAGE: "language",
  THEME: "theme",
};

export const calculateSentiment = (votes: any): "positive" | "negative" | "neutral" => {
  if (votes.positive > votes.negative) return "positive";
  if (votes.negative > votes.positive) return "negative";
  return "neutral";
};
