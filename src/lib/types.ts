
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
  sentiment?: "positive" | "negative" | "neutral";
  metadata?: {
    image: string | null;
  };
}

export interface NewsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

export type FilterOptions = {
  sentiment: string;
  source: string;
  period: string;
  search: string;
};

export type BookmarkStore = {
  bookmarks: NewsItem[];
};
