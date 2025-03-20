import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { NewsItem } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

const LOCAL_STORAGE_KEY = "crypto-vibe-bookmarks";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);
  const { language } = useLanguage();
  
  // Hata mesajları
  const errorMessages = {
    loadFailed: {
      tr: "Yer imleri yüklenemedi. Yerel depolama erişiminde sorun olabilir.",
      en: "Failed to load bookmarks. There might be an issue with local storage access."
    },
    saveFailed: {
      tr: "Yer imleri kaydedilemedi. Yerel depolama erişiminde sorun olabilir.",
      en: "Failed to save bookmarks. There might be an issue with local storage access."
    }
  };

  // Lokaldeki yer imlerini yükle
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error("Failed to load bookmarks from localStorage:", error);
      toast.error(language === "tr" ? errorMessages.loadFailed.tr : errorMessages.loadFailed.en);
    }
  }, [language]);

  // Yer imlerini kaydet
  useEffect(() => {
    if (bookmarks.length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookmarks));
      } catch (error) {
        console.error("Failed to save bookmarks to localStorage:", error);
        toast.error(language === "tr" ? errorMessages.saveFailed.tr : errorMessages.saveFailed.en);
      }
    }
  }, [bookmarks, language]);

  // Bir haberin yer imlerinde olup olmadığını kontrol et
  const isBookmarked = useCallback((id: number): boolean => {
    return bookmarks.some(bookmark => bookmark.id === id);
  }, [bookmarks]);

  // Yer imi ekle
  const addBookmark = useCallback((newsItem: NewsItem) => {
    try {
      if (!isBookmarked(newsItem.id)) {
        setBookmarks(prev => [...prev, newsItem]);
        toast.success(language === "tr" ? "Yer imi eklendi" : "Bookmark added");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to add bookmark:", error);
      toast.error(language === "tr" ? "Yer imi eklenemedi" : "Failed to add bookmark");
      return false;
    }
  }, [isBookmarked, language]);

  // Yer imini kaldır
  const removeBookmark = useCallback((id: number) => {
    try {
      setBookmarks(prev => {
        const newBookmarks = prev.filter(bookmark => bookmark.id !== id);
        // Eğer hiç yer imi kalmazsa localStorage'dan öğeyi kaldır
        if (newBookmarks.length === 0) {
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
        return newBookmarks;
      });
      toast.success(language === "tr" ? "Yer imi kaldırıldı" : "Bookmark removed");
      return true;
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
      toast.error(language === "tr" ? "Yer imi kaldırılamadı" : "Failed to remove bookmark");
      return false;
    }
  }, [language]);

  // Yer imi ekle/kaldır
  const toggleBookmark = useCallback((newsItem: NewsItem) => {
    if (isBookmarked(newsItem.id)) {
      return removeBookmark(newsItem.id);
    } else {
      return addBookmark(newsItem);
    }
  }, [isBookmarked, removeBookmark, addBookmark]);
  
  // Tüm yer imlerini temizle
  const clearAllBookmarks = useCallback(() => {
    try {
      setBookmarks([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      toast.success(language === "tr" ? "Tüm yer imleri temizlendi" : "All bookmarks cleared");
      return true;
    } catch (error) {
      console.error("Failed to clear bookmarks:", error);
      toast.error(language === "tr" ? "Yer imleri temizlenemedi" : "Failed to clear bookmarks");
      return false;
    }
  }, [language]);

  return {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    clearAllBookmarks,
    bookmarkCount: bookmarks.length
  };
};
