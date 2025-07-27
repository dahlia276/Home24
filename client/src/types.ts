export interface Category {
  name: string;
  categoryArticles: CategoryArticle;
  articleCount: number;
  childrenCategories: ChildCategory;
}

export interface Article {
  id: string;
  name: string;
  prices: Prices;
  images: Image[];
}

export interface ChildCategory {
  list: ChildCategoryItem[];
}

export interface ChildCategoryItem {
  name: string;
  urlPath: string;
}

export interface Prices {
  currency: string;
  regular: RegularPrice;
}

export interface RegularPrice {
  value: number;
}

export interface Image {
  path: string;
  alt: string;
}

export interface CategoryArticle {
  articles: Article[];
}
