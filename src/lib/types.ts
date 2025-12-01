// Tipos do VipHot Liberal

export interface Content {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  isExclusive: boolean;
  createdAt: Date;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  views: number;
}

export interface Adventure {
  id: string;
  title: string;
  description: string;
  images: string[];
  date: Date;
  location?: string;
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  tiktok?: string;
  youtube?: string;
  onlyfans?: string;
  website?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  bio: string;
  followers: number;
  following: number;
  contents: Content[];
  adventures: Adventure[];
  socialLinks?: SocialLinks;
}
