"use client";

import { Navbar } from "@/components/custom/navbar";
import { Heart, Eye, Lock, MapPin, Calendar, Sparkles, Instagram, Twitter, Youtube, Globe, Play, Image as ImageIcon, MessageCircle, Share2, Users, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock data do criador (visão do assinante)
const creatorProfile = {
  name: "Sofia Martins",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=400&fit=crop",
  bio: "Criadora de conteúdo premium | Viajante | Amante de aventuras",
  location: "São Paulo, Brasil",
  joinedDate: "Janeiro 2024",
  followers: 12500,
  following: 340,
  isFollowing: true,
  isSubscribed: true,
  socialLinks: {
    instagram: "https://instagram.com/sofia",
    twitter: "https://twitter.com/sofia",
    youtube: "https://youtube.com/@sofia",
    website: "https://sofia.com",
  },
  recentFollowers: [
    { id: 1, name: "Ana Silva", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { id: 2, name: "Carlos Santos", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    { id: 3, name: "Maria Costa", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
    { id: 4, name: "João Oliveira", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { id: 5, name: "Beatriz Lima", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop" },
  ],
  adventures: [
    {
      id: "1",
      title: "Paris Fashion Week 2024",
      description: "Uma semana incrível explorando a moda parisiense, visitando as principais passarelas e descobrindo os segredos da alta costura francesa.",
      date: "2024-03-15",
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop",
      ],
      videos: [],
      isExclusive: true,
      likes: 2340,
      views: 8920,
      comments: 156,
      isLiked: false,
    },
    {
      id: "2",
      title: "Sunset in Santorini",
      description: "Capturando os pores do sol mais deslumbrantes da Grécia, explorando vilas brancas e azuis, e vivendo a experiência mediterrânea completa.",
      date: "2024-02-28",
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&h=300&fit=crop",
      ],
      videos: [],
      isExclusive: false,
      likes: 1890,
      views: 6540,
      comments: 89,
      isLiked: true,
    },
    {
      id: "3",
      title: "Tokyo Nights",
      description: "Explorando a vibrante vida noturna de Tokyo, desde os néons de Shibuya até os templos iluminados de Asakusa.",
      date: "2024-01-20",
      coverImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop",
      ],
      videos: [],
      isExclusive: true,
      likes: 3120,
      views: 11450,
      comments: 234,
      isLiked: false,
    },
  ],
};

export default function AssinantePage() {
  const [profile, setProfile] = useState(creatorProfile);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedAdventures = [...profile.adventures].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR');
  };

  const handleLike = (adventureId: string) => {
    setProfile({
      ...profile,
      adventures: profile.adventures.map(adv => 
        adv.id === adventureId 
          ? { ...adv, isLiked: !adv.isLiked, likes: adv.isLiked ? adv.likes - 1 : adv.likes + 1 }
          : adv
      )
    });
  };

  const handleFollow = () => {
    setProfile({
      ...profile,
      isFollowing: !profile.isFollowing,
      followers: profile.isFollowing ? profile.followers - 1 : profile.followers + 1,
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      {/* Main Content - SEM SIDEBAR */}
      <div className="pt-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Profile Header Compacto */}
          <div className="mb-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover ring-2 ring-[#FF0040]/50"
              />
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{profile.name}</h1>
                <p className="text-sm text-white/60 mb-2">{profile.bio}</p>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {profile.location}
                  </span>
                  <span>{formatNumber(profile.followers)} seguidores</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleFollow}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    profile.isFollowing
                      ? "bg-white/5 border border-white/10 hover:bg-white/10"
                      : "bg-gradient-to-r from-[#FF0040] to-[#FF4060] hover:shadow-2xl hover:shadow-[#FF0040]/50"
                  }`}
                >
                  <UserPlus className="w-4 h-4" />
                  {profile.isFollowing ? "Seguindo" : "Seguir"}
                </button>
                {profile.isSubscribed && (
                  <div className="px-4 py-1.5 bg-[#FF0040]/20 border border-[#FF0040]/50 rounded-lg text-xs font-bold text-center">
                    <Lock className="w-3 h-3 inline mr-1" />
                    ASSINANTE
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Layout: Feed + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Feed Principal */}
            <div className="lg:col-span-2 space-y-6">
              {sortedAdventures.map((adventure) => (
                <div
                  key={adventure.id}
                  className="rounded-2xl bg-[#1A1A1A] border border-white/10 overflow-hidden hover:border-[#FF0040]/30 transition-all duration-300"
                >
                  {/* Imagem Grande */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={adventure.coverImage}
                      alt={adventure.title}
                      className="w-full h-full object-cover"
                    />
                    {adventure.isExclusive && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FF0040]/90 backdrop-blur-sm rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        EXCLUSIVO
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold">{adventure.title}</h3>
                      <span className="text-xs text-white/60 whitespace-nowrap">
                        {formatDate(adventure.date)}
                      </span>
                    </div>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-4">
                      {adventure.description}
                    </p>

                    {/* Ações */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => handleLike(adventure.id)}
                          className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                            adventure.isLiked ? "text-[#FF0040]" : "hover:text-[#FF0040]"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${adventure.isLiked ? "fill-current" : ""}`} />
                          <span>{formatNumber(adventure.likes)}</span>
                        </button>
                        <button className="flex items-center gap-2 text-sm hover:text-[#FF0040] transition-colors duration-300">
                          <MessageCircle className="w-5 h-5" />
                          <span>{adventure.comments}</span>
                        </button>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Eye className="w-5 h-5" />
                          <span>{formatNumber(adventure.views)}</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 text-sm hover:text-[#FF0040] transition-colors duration-300">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Direita */}
            <div className="space-y-6">
              {/* Seguidores Recentes */}
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#FF0040]" />
                  Seguidores Recentes
                </h3>
                <div className="space-y-3">
                  {profile.recentFollowers.map((follower) => (
                    <div key={follower.id} className="flex items-center gap-3">
                      <img
                        src={follower.avatar}
                        alt={follower.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="text-sm font-medium flex-1 truncate">{follower.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Histórico de Atualizações */}
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FF0040]" />
                  Últimas Atualizações
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {sortedAdventures.slice(0, 6).map((adventure) => (
                    <Link
                      key={adventure.id}
                      href={`/conteudo/${adventure.id}`}
                      className="aspect-square rounded-lg overflow-hidden bg-white/5 hover:ring-2 hover:ring-[#FF0040]/50 transition-all duration-300 relative"
                    >
                      <img
                        src={adventure.coverImage}
                        alt={adventure.title}
                        className="w-full h-full object-cover"
                      />
                      {adventure.isExclusive && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-[#FF0040]/90 rounded-md flex items-center justify-center">
                          <Lock className="w-3 h-3" />
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
                <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
                <div className="flex items-center gap-3">
                  {profile.socialLinks.instagram && (
                    <a
                      href={profile.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF0040]/20 hover:border-[#FF0040]/50 transition-all duration-300"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {profile.socialLinks.twitter && (
                    <a
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF0040]/20 hover:border-[#FF0040]/50 transition-all duration-300"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {profile.socialLinks.youtube && (
                    <a
                      href={profile.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF0040]/20 hover:border-[#FF0040]/50 transition-all duration-300"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                  {profile.socialLinks.website && (
                    <a
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF0040]/20 hover:border-[#FF0040]/50 transition-all duration-300"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
