
import { useState, useEffect } from "react";
import { LOCAL_STORAGE_KEYS } from "@/lib/constants";
import { NewsItem } from "@/lib/types";
import { toast } from "sonner";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);

  // Load bookmarks from localStorage on initial load
  useEffect(() => {
    const storedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKMARKS);
    if (storedBookmarks) {
      try {
        setBookmarks(JSON.parse(storedBookmarks));
      } catch (error) {
        console.error("Error parsing bookmarks:", error);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.BOOKMARKS);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id: number) => {
    return bookmarks.some(bookmark => bookmark.id === id);
  };

  const addBookmark = (newsItem: NewsItem) => {
    if (!isBookmarked(newsItem.id)) {
      setBookmarks(prev => [...prev, newsItem]);
      toast.success("Article bookmarked");
    }
  };

  const removeBookmark = (id: number) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
    toast.success("Bookmark removed");
  };

  const toggleBookmark = (newsItem: NewsItem) => {
    if (isBookmarked(newsItem.id)) {
      removeBookmark(newsItem.id);
    } else {
      addBookmark(newsItem);
    }
  };

  return {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
  };
};
