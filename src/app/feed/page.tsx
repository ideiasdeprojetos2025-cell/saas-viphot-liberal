"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Lock, Crown, Search, Filter, TrendingUp, Flame, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  subscribers: number;
}

interface Post {
  id: string;
  creator: Creator;
  title: string;
  description: string;
  coverImage: string;
  isExclusive: boolean;
  likes: number;
  comments: number;
  views: number;
  date: string;
  albumPhotos?: number;
  albumVideos?: number;
}

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<"all" | "following" | "trending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data - criadores
  const mockCreators: Creator[] = [
    {
      id: "1",
      name: "Ana Silva",
      username: "anasilva",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      isVerified: true,
      subscribers: 15420,
    },
    {
      id: "2",
      name: "Mariana Costa",
      username: "marianacosta",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      isVerified: true,
      subscribers: 28350,
    },
    {
      id: "3",
      name: "Julia Santos",
      username: "juliasantos",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      isVerified: true,
      subscribers: 42180,
    },
  ];

  // Mock data - posts com álbuns
  const mockPosts: Post[] = [
    {
      id: "1",
      creator: mockCreators[0],
      title: "Aventuras na Praia 🏖️",
      description: "Um dia incrível aproveitando o sol e o mar. Momentos únicos capturados especialmente para vocês!",
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      isExclusive: false,
      likes: 2847,
      comments: 156,
      views: 18420,
      date: "2024-01-15",
      albumPhotos: 12,
      albumVideos: 2,
    },
    {
      id: "2",
      creator: mockCreators[1],
      title: "Ensaio Exclusivo VIP 👑",
      description: "Conteúdo premium e exclusivo para meus assinantes VIP. Acesse agora e veja tudo!",
      coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
      isExclusive: true,
      likes: 5234,
      comments: 342,
      views: 32150,
      date: "2024-01-14",
      albumPhotos: 25,
      albumVideos: 5,
    },
    {
      id: "3",
      creator: mockCreators[2],
      title: "Viagem dos Sonhos ✈️",
      description: "Explorando lugares incríveis pelo mundo. Vem comigo nessa jornada!",
      coverImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
      isExclusive: false,
      likes: 4156,
      comments: 287,
      views: 25680,
      date: "2024-01-13",
      albumPhotos: 18,
      albumVideos: 3,
    },
    {
      id: "4",
      creator: mockCreators[0],
      title: "Sessão Fotográfica Premium 📸",
      description: "Conteúdo exclusivo com fotos profissionais. Apenas para assinantes VIP!",
      coverImage: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=600&fit=crop",
      isExclusive: true,
      likes: 6892,
      comments: 421,
      views: 41230,
      date: "2024-01-12",
      albumPhotos: 30,
      albumVideos: 8,
    },
    {
      id: "5",
      creator: mockCreators[1],
      title: "Dia de Spa & Relaxamento 💆‍♀️",
      description: "Momentos de autocuidado e bem-estar. Vem relaxar comigo!",
      coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop",
      isExclusive: false,
      likes: 3421,
      comments: 198,
      views: 19870,
      date: "2024-01-11",
      albumPhotos: 15,
      albumVideos: 2,
    },
    {
      id: "6",
      creator: mockCreators[2],
      title: "Noite Especial VIP 🌙",
      description: "Uma noite inesquecível registrada em detalhes. Conteúdo exclusivo para assinantes!",
      coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
      isExclusive: true,
      likes: 7654,
      comments: 512,
      views: 48920,
      date: "2024-01-10",
      albumPhotos: 35,
      albumVideos: 10,
    },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    if (!mounted) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Hoje";
    if (diffDays === 2) return "Ontem";
    if (diffDays <= 7) return `${diffDays} dias atrás`;
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </Link>
              <div className="flex items-center gap-2">
                <Flame className="w-8 h-8 text-[#FF0040]" />
                <h1 className="text-2xl font-bold">
                  VipHot <span className="text-[#FF0040]">Feed</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Buscar criadores ou conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 transition-colors"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-[#FF0040] to-[#FF4060] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "following"
                  ? "bg-gradient-to-r from-[#FF0040] to-[#FF4060] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Seguindo
            </button>
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === "trending"
                  ? "bg-gradient-to-r from-[#FF0040] to-[#FF4060] text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Em Alta
            </button>
          </div>
        </div>
      </div>

      {/* Feed Content */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPosts.map((post) => (
            <Link
              key={post.id}
              href={`/album/${post.id}`}
              className={`group rounded-2xl bg-[#1A1A1A] border overflow-hidden hover:border-[#FF0040]/50 transition-all duration-300 hover:scale-[1.02] ${
                post.isExclusive
                  ? "border-purple-500/30 ring-2 ring-purple-500/20"
                  : "border-white/10"
              }`}
            >
              {/* Cover Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay com info do álbum */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 text-sm text-white">
                      <span className="flex items-center gap-1 bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        📸 {post.albumPhotos} fotos
                      </span>
                      <span className="flex items-center gap-1 bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        🎥 {post.albumVideos} vídeos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badge Exclusivo */}
                {post.isExclusive && (
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-xl">
                    <Crown className="w-3.5 h-3.5" />
                    VIP
                  </div>
                )}

                {/* Lock Overlay para conteúdo exclusivo */}
                {post.isExclusive && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-white mb-2 mx-auto" />
                      <p className="text-white font-semibold text-sm">Conteúdo VIP</p>
                      <p className="text-white/70 text-xs">Assine para desbloquear</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={post.creator.avatar}
                    alt={post.creator.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-sm truncate">{post.creator.name}</h4>
                      {post.creator.isVerified && (
                        <div className="w-4 h-4 bg-[#FF0040] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px]">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-white/60">@{post.creator.username}</p>
                  </div>
                  <span className="text-xs text-white/60 whitespace-nowrap">
                    {formatDate(post.date)}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold mb-2 line-clamp-1">{post.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-4">
                  {post.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-sm hover:text-[#FF0040] transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(post.likes)}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-sm hover:text-[#FF0040] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{formatNumber(post.comments)}</span>
                    </button>
                    <span className="flex items-center gap-1.5 text-sm text-white/60">
                      <Eye className="w-4 h-4" />
                      <span>{formatNumber(post.views)}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300 font-semibold">
            Carregar mais conteúdo
          </button>
        </div>
      </div>
    </div>
  );
}
