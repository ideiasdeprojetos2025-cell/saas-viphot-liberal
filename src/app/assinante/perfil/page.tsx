"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Crown, Eye, ArrowLeft, UserPlus, Star, Lock, Play, Image as ImageIcon, Video, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  isVerified: boolean;
  subscribers: number;
  posts: number;
  likes: number;
}

interface Adventure {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  date: string;
  photosCount: number;
  videosCount: number;
  isExclusive: boolean;
}

interface RecentPhoto {
  id: string;
  url: string;
  likes: number;
  isVideo: boolean;
}

interface RecentSubscriber {
  id: string;
  name: string;
  avatar: string;
  subscribedAt: string;
}

export default function AssinantePerfilPage() {
  const [activeTab, setActiveTab] = useState<"aventuras" | "fotos" | "videos">("aventuras");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock data - Criador
  const creator: Creator = {
    id: "1",
    name: "Ana Silva",
    username: "anasilva",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=600&fit=crop",
    bio: "Criadora de conteúdo exclusivo 🔥 | Aventuras pelo mundo 🌎 | Lifestyle & Travel ✈️",
    isVerified: true,
    subscribers: 15420,
    posts: 342,
    likes: 1250000,
  };

  // Mock data - Últimas Aventuras
  const recentAdventures: Adventure[] = [
    {
      id: "1",
      title: "Aventuras na Praia 🏖️",
      description: "Um dia incrível aproveitando o sol e o mar. Momentos únicos capturados especialmente para vocês!",
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      date: "2024-01-15",
      photosCount: 12,
      videosCount: 2,
      isExclusive: false,
    },
    {
      id: "2",
      title: "Ensaio Exclusivo VIP 👑",
      description: "Sessão fotográfica premium com looks incríveis e cenários deslumbrantes. Conteúdo exclusivo para assinantes VIP!",
      coverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
      date: "2024-01-14",
      photosCount: 25,
      videosCount: 5,
      isExclusive: true,
    },
    {
      id: "3",
      title: "Viagem dos Sonhos ✈️",
      description: "Explorando destinos paradisíacos e compartilhando cada momento dessa jornada incrível com vocês.",
      coverImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop",
      date: "2024-01-13",
      photosCount: 18,
      videosCount: 3,
      isExclusive: false,
    },
    {
      id: "4",
      title: "Sessão Fotográfica Premium 📸",
      description: "Ensaio profissional com produção completa. Fotos e vídeos de alta qualidade exclusivos para meus assinantes.",
      coverImage: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=600&fit=crop",
      date: "2024-01-12",
      photosCount: 30,
      videosCount: 8,
      isExclusive: true,
    },
  ];

  // Mock data - Fotos Recentes
  const recentPhotos: RecentPhoto[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
      likes: 2847,
      isVideo: false,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=400&fit=crop",
      likes: 3156,
      isVideo: false,
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop",
      likes: 4521,
      isVideo: true,
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=400&fit=crop",
      likes: 2198,
      isVideo: false,
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=400&h=400&fit=crop",
      likes: 3842,
      isVideo: false,
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop",
      likes: 5123,
      isVideo: true,
    },
  ];

  // Mock data - Seguidores Recentes
  const recentSubscribers: RecentSubscriber[] = [
    {
      id: "1",
      name: "Carlos Silva",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      subscribedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Marina Costa",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      subscribedAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Pedro Santos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      subscribedAt: "2024-01-14",
    },
    {
      id: "4",
      name: "Julia Oliveira",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
      subscribedAt: "2024-01-14",
    },
    {
      id: "5",
      name: "Rafael Lima",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      subscribedAt: "2024-01-13",
    },
    {
      id: "6",
      name: "Amanda Souza",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
      subscribedAt: "2024-01-13",
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
          <div className="flex items-center justify-between">
            <Link
              href="/feed"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Feed
            </Link>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={creator.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-transparent" />
      </div>

      {/* Profile Section */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative -mt-20 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-[#0D0D0D] shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-full flex items-center justify-center ring-4 ring-[#0D0D0D]">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{creator.name}</h1>
                {creator.isVerified && (
                  <div className="w-8 h-8 bg-[#FF0040] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
                <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-lg font-bold text-sm flex items-center gap-1.5">
                  <Crown className="w-4 h-4" />
                  ASSINANTE VIP
                </span>
              </div>
              <p className="text-white/60 text-lg mb-4">@{creator.username}</p>
              <p className="text-white/80 text-lg leading-relaxed mb-6 max-w-2xl">
                {creator.bio}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div>
                  <p className="text-2xl font-bold">{formatNumber(creator.posts)}</p>
                  <p className="text-white/60 text-sm">Posts</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatNumber(creator.subscribers)}</p>
                  <p className="text-white/60 text-sm">Assinantes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatNumber(creator.likes)}</p>
                  <p className="text-white/60 text-sm">Curtidas</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button className="px-6 py-3 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300 flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Enviar Mensagem
              </button>
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300 flex items-center justify-center gap-2">
                <Star className="w-5 h-5" />
                Favoritar
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("aventuras")}
            className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
              activeTab === "aventuras"
                ? "border-[#FF0040] text-white"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            Aventuras
          </button>
          <button
            onClick={() => setActiveTab("fotos")}
            className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
              activeTab === "fotos"
                ? "border-[#FF0040] text-white"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            Fotos Recentes
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-3 font-semibold transition-all duration-300 border-b-2 ${
              activeTab === "videos"
                ? "border-[#FF0040] text-white"
                : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            Seguidores
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Ocupa 3 colunas */}
          <div className="lg:col-span-3">
            {activeTab === "aventuras" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-[#FF0040]" />
                  Últimas Aventuras
                </h2>
                {/* Layout de 1 coluna com imagens maiores */}
                <div className="space-y-8">
                  {recentAdventures.map((adventure) => (
                    <Link
                      key={adventure.id}
                      href={`/album/${adventure.id}`}
                      className={`group block rounded-2xl bg-[#1A1A1A] border overflow-hidden hover:border-[#FF0040]/50 transition-all duration-300 hover:scale-[1.01] ${
                        adventure.isExclusive
                          ? "border-purple-500/30 ring-2 ring-purple-500/20"
                          : "border-white/10"
                      }`}
                    >
                      {/* Descrição acima da imagem */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-2xl font-bold flex-1">{adventure.title}</h3>
                          {adventure.isExclusive && (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-lg font-bold text-sm flex items-center gap-1.5 flex-shrink-0 ml-3">
                              <Crown className="w-4 h-4" />
                              VIP
                            </span>
                          )}
                        </div>
                        <p className="text-white/70 text-base leading-relaxed mb-4">
                          {adventure.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-white/60">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(adventure.date)}
                          </span>
                          <span className="flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            {adventure.photosCount} fotos
                          </span>
                          <span className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            {adventure.videosCount} vídeos
                          </span>
                        </div>
                      </div>

                      {/* Imagem maior - aspect ratio mais amplo */}
                      <div className="relative aspect-[21/9] overflow-hidden">
                        <img
                          src={adventure.coverImage}
                          alt={adventure.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        
                        {/* Overlay no hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                            <span className="text-white font-bold text-lg">Ver álbum completo</span>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-2 bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm font-semibold">
                                {adventure.photosCount + adventure.videosCount} mídias
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "fotos" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-[#FF0040]" />
                  Fotos Recentes
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {recentPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={photo.url}
                        alt="Photo"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Video Indicator */}
                      {photo.isVideo && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-white" />
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <div className="flex items-center gap-2 text-white">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm font-semibold">{formatNumber(photo.likes)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-[#FF0040]" />
                  Seguidores Recentes
                </h2>
                <div className="space-y-4">
                  {recentSubscribers.map((subscriber) => (
                    <div
                      key={subscriber.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-[#1A1A1A] border border-white/10 hover:border-[#FF0040]/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={subscriber.avatar}
                          alt={subscriber.name}
                          className="w-14 h-14 rounded-full object-cover ring-2 ring-white/10"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">{subscriber.name}</h4>
                          <p className="text-white/60 text-sm">
                            Assinou {formatDate(subscriber.subscribedAt)}
                          </p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300 font-semibold text-sm">
                        Ver Perfil
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Compacta, ocupa 1 coluna */}
          <div className="space-y-4">
            {/* VIP Benefits - Compacto */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-[#FF0040]/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-lg flex items-center justify-center">
                  <Crown className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold">Benefícios VIP</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-xs text-white/70">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span>Conteúdo exclusivo</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-white/70">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span>Mensagens diretas</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-white/70">
                  <span className="text-purple-400 flex-shrink-0">✓</span>
                  <span>Badge VIP</span>
                </li>
              </ul>
            </div>

            {/* Quick Stats - Compacto */}
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10">
              <h3 className="text-sm font-bold mb-3">Estatísticas</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Conteúdos</span>
                  <span className="font-bold text-[#FF0040]">{creator.posts}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Álbuns VIP</span>
                  <span className="font-bold text-purple-400">48</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Mensagens</span>
                  <span className="font-bold text-[#FF0040]">127</span>
                </div>
              </div>
            </div>

            {/* Subscription Info - Compacto */}
            <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10">
              <h3 className="text-sm font-bold mb-3">Assinatura</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Status</span>
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-semibold">
                    Ativa
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Próxima cobrança</span>
                  <span className="font-semibold">15 Fev</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Valor</span>
                  <span className="font-bold text-[#FF0040]">R$ 29,90</span>
                </div>
              </div>
              <button className="w-full mt-3 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300 font-semibold text-xs">
                Gerenciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
