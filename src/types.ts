export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  createdAt: any;
  updatedAt: any;
}

export interface WebLink {
  id: string;
  siteName: string;
  url: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  favicon?: string;
  thumbnail?: string;
  tags: string[];
  categoryId: string;
  views: number;
  featured: boolean;
  verified: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt: any;
  updatedAt: any;
  publishedAt?: any;
  authorId?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  thumbnailAlt?: string;
  authorId: string;
  published: boolean;
  views: number;
  createdAt: any;
  updatedAt: any;
  publishedAt?: any;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt: any;
  updatedAt: any;
}

export interface Bookmark {
  id: string;
  userId: string;
  weblinkId: string;
  createdAt: any;
}
