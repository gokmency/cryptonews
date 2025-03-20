import { translations } from '@/contexts/LanguageContext';
import { SentimentType } from '@/lib/types';

export const API_KEY = import.meta.env.VITE_CRYPTOPANIC_API_KEY;
export const API_BASE_URL = 'https://cryptopanic.com/api/v1/posts/';

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

export const calculateSentiment = (votes: { positive: number; negative: number }): SentimentType => {
  if (votes.positive > votes.negative) {
    return "positive";
  } else if (votes.negative > votes.positive) {
    return "negative";
  } else {
    return "neutral";
  }
};

export const randomImage = (cryptoName: string) => {
  const imageOptions = [
    `https://www.coingecko.com/coins/images/1/large/bitcoin.png`,
    `https://cryptologos.cc/logos/${cryptoName.toLowerCase()}-${cryptoName.toLowerCase()}-logo.png`,
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=2048&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1629339942248-45d4b10c8c2f?q=80&w=1978&auto=format&fit=crop"
  ];

  const hash = cryptoName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + acc;
  }, 0);
  
  const index = hash % imageOptions.length;
  return imageOptions[index];
};
