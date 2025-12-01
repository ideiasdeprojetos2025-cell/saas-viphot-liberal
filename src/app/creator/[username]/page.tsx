"use client";

import { Navbar } from "@/components/custom/navbar";
import { Heart, Eye, Lock, MapPin, Calendar, Instagram, Twitter, Youtube, Globe, Share2, UserPlus, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CreatorPublicPage() {
  const params = useParams();
  const username = params?.username as string;
  const [profile, setProfile] = useState<any>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular busca do perfil pelo username
    const savedUsername = localStorage.getItem("viphot-username");
    
    if (savedUsername === username) {
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
    }
    
    setLoading(false);
  }, [username]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    // Aqui você implementaria a lógica real de seguir/deixar de seguir
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Perfil de ${profile?.name || "Criador"}`,
          text: `Confira o perfil exclusivo de ${profile?.name || "criador"} no VipHot!`,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Compartilhamento cancelado");
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copiado para a área de transferência!");
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0040] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold mb-2">Perfil não encontrado</h1>
          <p className="text-white/60 mb-6">
            O criador <span className="text-[#FF0040] font-semibold">@{username}</span> não foi encontrado.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 transition-colors duration-300"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }

  const adventures = Array.isArray(profile.adventures) ? profile.adventures : [];
  const freeAdventures = adventures.filter((adv: any) => !adv.isExclusive);
  const exclusiveCount = adventures.filter((adv: any) => adv.isExclusive).length;

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      <div className="pt-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
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
            </div>

            {/* Avatar + Info */}
            <div className="relative -mt-20 px-4 md:px-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-[#0D0D0D] shadow-2xl"
                />
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
                    <span>{freeAdventures.length} posts gratuitos</span>
                    {exclusiveCount > 0 && (
                      <span className="flex items-center gap-1 text-[#FF0040]">
                        <Lock className="w-4 h-4" />
                        {exclusiveCount} exclusivos
                      </span>
                    )}
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
                  <button
                    onClick={handleFollow}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isFollowing
                        ? "bg-white/5 border border-white/10 hover:bg-white/10"
                        : "bg-gradient-to-r from-[#FF0040] to-[#FF4060] hover:shadow-2xl hover:shadow-[#FF0040]/50"
                    }`}
                  >
                    <UserPlus className="w-5 h-5" />
                    {isFollowing ? "Seguindo" : "Seguir"}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Exclusive Content CTA */}
          {exclusiveCount > 0 && (
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#FF0040]/20 to-purple-500/20 border border-[#FF0040]/30 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Lock className="w-6 h-6 text-[#FF0040]" />
                    Conteúdo Exclusivo Disponível
                  </h3>
                  <p className="text-white/80">
                    {profile.name} tem <span className="text-[#FF0040] font-bold">{exclusiveCount} posts exclusivos</span> disponíveis apenas para assinantes.
                  </p>
                </div>
                <button className="px-8 py-4 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300 whitespace-nowrap">
                  Assinar Agora
                </button>
              </div>
            </div>
          )}

          {/* Free Content Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Conteúdo Gratuito</h2>
            
            {freeAdventures.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-[#1A1A1A] border border-white/10">
                <div className="text-6xl mb-4">📸</div>
                <h3 className="text-xl font-bold mb-2">Nenhum conteúdo gratuito ainda</h3>
                <p className="text-white/60">
                  {profile.name} ainda não publicou conteúdo gratuito. Siga para ser notificado!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {freeAdventures.map((adventure: any) => (
                  <div
                    key={adventure.id}
                    className="rounded-2xl bg-[#1A1A1A] border border-white/10 overflow-hidden hover:border-[#FF0040]/30 transition-all duration-300"
                  >
                    {/* Imagem */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={adventure.coverImage}
                        alt={adventure.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
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
        </div>
      </div>
    </div>
  );
}
