import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'tr';
  setLanguage: (lang: 'en' | 'tr') => void;
  t: (key: string) => string;
}

const defaultLanguage: 'en' | 'tr' = 'tr';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Header
    "app.name": "CryptoVibe",
    "nav.dashboard": "Dashboard",
    "nav.bookmarks": "Bookmarks",
    
    // Main sections
    "index.title": "Crypto News",
    "bookmarks.title": "Bookmarked News",
    "bookmarks.subtitle": "Your saved crypto news articles",
    
    // UI elements
    "search.placeholder": "Search news...",
    "search.button": "Search",
    "filter.sentiment": "Sentiment",
    "filter.source": "Source",
    "filter.time": "Time",
    "filter.filters": "Filters",
    "filter.clearAll": "Clear All",
    "filter.reset": "Reset All",
    "filter.apply": "Apply Filters",
    
    // Sentiments
    "sentiment.all": "All",
    "sentiment.positive": "Positive",
    "sentiment.neutral": "Neutral",
    "sentiment.negative": "Negative",
    
    // Time periods
    "time.latest": "Latest",
    "time.24h": "Past 24 Hours",
    "time.week": "Past Week",
    
    // Sources
    "source.all": "All Sources",
    "source.coindesk": "CoinDesk",
    "source.cointelegraph": "CoinTelegraph",
    "source.decrypt": "Decrypt",
    "source.bitcoinmagazine": "Bitcoin Magazine",
    "source.theblock": "The Block",
    
    // Buttons
    "button.refresh": "Refresh",
    "button.retry": "Retry",
    "button.bookmark": "Bookmark",
    "button.bookmarked": "Bookmarked",
    "button.read": "Read",
    "button.browseNews": "Browse News",
    
    // Empty states
    "empty.bookmarks.title": "No bookmarks yet",
    "empty.bookmarks.description": "You haven't bookmarked any articles yet. Navigate to the dashboard and bookmark articles to see them here.",
    "error.loading": "Error loading news data. Please try again later.",
  },
  tr: {
    // Header
    "app.name": "KriptoVibe",
    "nav.dashboard": "Ana Sayfa",
    "nav.bookmarks": "Kaydedilenler",
    
    // Main sections
    "index.title": "Kripto Haberleri",
    "bookmarks.title": "Kaydedilen Haberler",
    "bookmarks.subtitle": "Kaydettiğiniz kripto haber makaleleri",
    
    // UI elements
    "search.placeholder": "Haberlerde ara...",
    "search.button": "Ara",
    "filter.sentiment": "Duygu",
    "filter.source": "Kaynak",
    "filter.time": "Zaman",
    "filter.filters": "Filtreler",
    "filter.clearAll": "Hepsini Temizle",
    "filter.reset": "Tümünü Sıfırla",
    "filter.apply": "Filtreleri Uygula",
    
    // Sentiments
    "sentiment.all": "Tümü",
    "sentiment.positive": "Olumlu",
    "sentiment.neutral": "Nötr",
    "sentiment.negative": "Olumsuz",
    
    // Time periods
    "time.latest": "En Yeni",
    "time.24h": "Son 24 Saat",
    "time.week": "Geçen Hafta",
    
    // Sources
    "source.all": "Tüm Kaynaklar",
    "source.coindesk": "CoinDesk",
    "source.cointelegraph": "CoinTelegraph",
    "source.decrypt": "Decrypt",
    "source.bitcoinmagazine": "Bitcoin Magazine",
    "source.theblock": "The Block",
    
    // Buttons
    "button.refresh": "Yenile",
    "button.retry": "Tekrar Dene",
    "button.bookmark": "Kaydet",
    "button.bookmarked": "Kaydedildi",
    "button.read": "Oku",
    "button.browseNews": "Haberlere Göz At",
    
    // Empty states
    "empty.bookmarks.title": "Henüz kaydedilmiş haber yok",
    "empty.bookmarks.description": "Henüz hiç makale kaydetmediniz. Ana sayfaya giderek haberleri kaydedebilirsiniz.",
    "error.loading": "Haber verileri yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.",
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'tr'>(defaultLanguage);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'tr' | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: 'en' | 'tr') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
