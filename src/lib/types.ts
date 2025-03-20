export interface NewsItem {
  id: number;
  title: string;
  published_at: string;
  url: string;
  source: {
    title: string;
    region: string;
    domain: string;
  };
  currencies?: {
    code: string;
    title: string;
    slug: string;
    url: string;
  }[];
  votes: {
    negative: number;
    positive: number;
    important: number;
    liked: number;
    disliked: number;
    lol: number;
    toxic: number;
    saved: number;
    comments: number;
  };
  domain: string;
  slug?: string;
  description?: string;
  created_at: string;
  kind: string;
  published_at_unix?: number;
  metadata?: {
    image?: string;
    tags?: string[];
    author?: string;
  };
  sentiment?: string;
}

export interface NewsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

// Dil için tip tanımı (Türkçe ve İngilizce)
export type Language = 'en' | 'tr';

// Dil tabanlı içerik haritalaması için jenerik tip
export type LanguageMap<T> = {
  [key in Language]: T;
};

// Filtreleme seçenekleri
export interface FilterOptions {
  period?: string;
  source?: string;
  search?: string;
}

export type BookmarkStore = {
  bookmarks: NewsItem[];
};
