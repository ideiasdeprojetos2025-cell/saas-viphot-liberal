"use client";

import { Navbar } from "@/components/custom/navbar";
import { Heart, Eye, Lock, MapPin, Calendar, Instagram, Twitter, Youtube, Globe, Share2, UserPlus, MessageCircle, ArrowLeft, Crown, Star } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProfilePreviewPage() {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"all" | "free" | "exclusive">("all");

  useEffect(() => {
    const savedProfile = localStorage.getItem("viphot-profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      // Garantir que adventures seja array válido
      const validAdventures = Array.isArray(parsed.adventures) 
        ? parsed.adventures.map((adv: any) => ({
            ...adv,
            images: Array.isArray(adv.images) ? adv.images : [],
            videos: Array.isArray(adv.videos) ? adv.videos : [],
          }))
        : [];
      
      setProfile({
        ...parsed,
        adventures: validAdventures,
      });
    }
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace('.', ',') + 'M';
    }
    if (num >= 1000) {
      return Math.floor(num / 1000) + '.' + String(num % 1000).padStart(3, '0');
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0040] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Carregando prévia...</p>
        </div>
      </div>
    );
  }

  const adventures = Array.isArray(profile.adventures) ? profile.adventures : [];
  const freeAdventures = adventures.filter((adv: any) => !adv.isExclusive);
  const exclusiveAdventures = adventures.filter((adv: any) => adv.isExclusive);
  
  const filteredAdventures = 
    activeTab === "all" ? adventures :
    activeTab === "free" ? freeAdventures :
    exclusiveAdventures;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      <div className="pt-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          {/* Header com botão voltar */}
          <div className="mb-6">
            <Link
              href="/perfil/meu-link"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar para Meu Link
            </Link>
          </div>

          {/* Banner de Prévia */}
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-[#FF0040]/20 border border-purple-500/30 p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Modo Prévia - Visão do Assinante</h3>
                <p className="text-sm text-white/70">
                  Esta é a visualização completa do seu perfil como um assinante veria, incluindo todo o conteúdo exclusivo desbloqueado.
                </p>
              </div>
            </div>
          </div>

          {/* Cover Image + Avatar */}
          <div className="mb-8">
            {/* Cover Image */}
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
              <img
                src={profile.cover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Badge de Assinante */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-xl font-bold text-sm flex items-center gap-2 shadow-2xl">
                <Crown className="w-5 h-5" />
                ASSINANTE VIP
              </div>
            </div>

            {/* Avatar + Info */}
            <div className="relative -mt-20 px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-[#0D0D0D] shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-xl flex items-center justify-center shadow-xl">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{profile.name}</h1>
                    <span className="px-3 py-1 bg-[#FF0040]/20 text-[#FF0040] text-xs font-bold rounded-lg">
                      CRIADOR
                    </span>
                  </div>
                  <p className="text-white/70 mb-3">{profile.bio}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </span>
                    <span suppressHydrationWarning>{formatNumber(profile.followers)} seguidores</span>
                    <span>{adventures.length} posts totais</span>
                    <span className="flex items-center gap-1 text-purple-400">
                      <Lock className="w-4 h-4" />
                      {exclusiveAdventures.length} exclusivos desbloqueados
                    </span>
                  </div>

                  {/* Social Links */}
                  {(profile.socialLinks.instagram || profile.socialLinks.twitter || profile.socialLinks.youtube || profile.socialLinks.website) && (
                    <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                      {profile.socialLinks.instagram && (
                        <a
                          href={profile.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {profile.socialLinks.twitter && (
                        <a
                          href={profile.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {profile.socialLinks.youtube && (
                        <a
                          href={profile.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300"
                        >
                          <Youtube className="w-5 h-5" />
                        </a>
                      )}
                      {profile.socialLinks.website && (
                        <a
                          href={profile.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50">
                    <Crown className="w-5 h-5" />
                    Assinante VIP
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs de Filtro */}
          <div className="mb-8">
            <div className="flex gap-2 p-1 bg-[#1A1A1A] border border-white/10 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-[#FF0040] to-[#FF4060] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Todos ({adventures.length})
              </button>
              <button
                onClick={() => setActiveTab("free")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === "free"
                    ? "bg-gradient-to-r from-[#FF0040] to-[#FF4060] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                Gratuitos ({freeAdventures.length})
              </button>
              <button
                onClick={() => setActiveTab("exclusive")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === "exclusive"
                    ? "bg-gradient-to-r from-purple-500 to-[#FF0040] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Lock className="w-4 h-4" />
                Exclusivos ({exclusiveAdventures.length})
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div>
            {filteredAdventures.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-[#1A1A1A] border border-white/10">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-xl font-bold mb-2">Nenhum conteúdo nesta categoria</h3>
                <p className="text-white/60">
                  Você ainda não tem posts {activeTab === "free" ? "gratuitos" : activeTab === "exclusive" ? "exclusivos" : ""}.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAdventures.map((adventure: any) => (
                  <div
                    key={adventure.id}
                    className={`rounded-2xl bg-[#1A1A1A] border overflow-hidden hover:border-[#FF0040]/30 transition-all duration-300 ${
                      adventure.isExclusive 
                        ? "border-purple-500/30 ring-2 ring-purple-500/20" 
                        : "border-white/10"
                    }`}
                  >
                    {/* Imagem */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={adventure.coverImage}
                        alt={adventure.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {adventure.isExclusive && (
                        <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-xl">
                          <Crown className="w-3.5 h-3.5" />
                          EXCLUSIVO
                        </div>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold line-clamp-1">
                          {adventure.title}
                        </h3>
                        <span className="text-xs text-white/60 whitespace-nowrap">
                          {formatDate(adventure.date)}
                        </span>
                      </div>
                      
                      <p className="text-white/70 text-sm leading-relaxed line-clamp-2 mb-4">
                        {adventure.description}
                      </p>

                      {adventure.isExclusive && (
                        <div className="mb-4 px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <p className="text-xs text-purple-300 flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5" />
                            Conteúdo desbloqueado para assinantes VIP
                          </p>
                        </div>
                      )}

                      {/* Ações */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1 text-sm hover:text-[#FF0040] transition-colors duration-300">
                            <Heart className="w-4 h-4" />
                            <span suppressHydrationWarning>{formatNumber(adventure.likes)}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm hover:text-[#FF0040] transition-colors duration-300">
                            <MessageCircle className="w-4 h-4" />
                            <span>{adventure.comments}</span>
                          </button>
                          <span className="flex items-center gap-1 text-sm text-white/60">
                            <Eye className="w-4 h-4" />
                            <span suppressHydrationWarning>{formatNumber(adventure.views)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-[#FF0040]/10 border border-purple-500/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Sobre esta Prévia</h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Esta é uma simulação de como seus assinantes VIP verão seu perfil. Todo o conteúdo exclusivo aparece desbloqueado, 
                  permitindo que você visualize a experiência completa que oferece aos seus apoiadores. Visitantes não assinantes 
                  verão apenas o conteúdo gratuito e receberão convites para se tornarem assinantes VIP.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
