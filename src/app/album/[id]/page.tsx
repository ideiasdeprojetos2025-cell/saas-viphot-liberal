"use client";

import { use, useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark, Lock, Crown, X, ChevronLeft, ChevronRight, Play, Download, ArrowLeft, Eye, UserPlus, Star, Send } from "lucide-react";
import Link from "next/link";

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  subscribers: number;
}

interface Media {
  id: string;
  type: "photo" | "video";
  url: string;
  thumbnail?: string;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVip: boolean;
  };
  text: string;
  date: string;
  likes: number;
}

interface Album {
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
  media: Media[];
  price?: number;
}

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isSubscribed, setIsSubscribed] = useState(true); // Usuário já é assinante
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Mock comments
    setComments([
      {
        id: "1",
        user: {
          name: "Carlos Silva",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
          isVip: true,
        },
        text: "Que fotos incríveis! Adorei cada momento desse álbum 😍",
        date: "2024-01-15T10:30:00",
        likes: 24,
      },
      {
        id: "2",
        user: {
          name: "Marina Costa",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
          isVip: false,
        },
        text: "Simplesmente perfeito! Mal posso esperar pelo próximo álbum 🔥",
        date: "2024-01-15T11:45:00",
        likes: 18,
      },
      {
        id: "3",
        user: {
          name: "Pedro Santos",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
          isVip: true,
        },
        text: "Conteúdo de altíssima qualidade como sempre! Vale muito a pena a assinatura 👏",
        date: "2024-01-15T14:20:00",
        likes: 31,
      },
    ]);
  }, []);

  // Mock data - criador
  const mockCreator: Creator = {
    id: "1",
    name: "Ana Silva",
    username: "anasilva",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    isVerified: true,
    subscribers: 15420,
  };

  // Mock data - álbum com 25 fotos
  const mockAlbum: Album = {
    id: id,
    creator: mockCreator,
    title: "Aventuras na Praia 🏖️",
    description: "Um dia incrível aproveitando o sol e o mar. Momentos únicos capturados especialmente para vocês! Este álbum contém fotos e vídeos exclusivos dessa experiência maravilhosa.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    isExclusive: id === "2" || id === "4" || id === "6",
    likes: 2847,
    comments: 156,
    views: 18420,
    date: "2024-01-15",
    price: 29.90,
    media: [
      { id: "1", type: "photo", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop" },
      { id: "2", type: "photo", url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop" },
      { id: "3", type: "video", url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop", thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop" },
      { id: "4", type: "photo", url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop" },
      { id: "5", type: "photo", url: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&h=800&fit=crop" },
      { id: "6", type: "video", url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop", thumbnail: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop" },
      { id: "7", type: "photo", url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&h=800&fit=crop" },
      { id: "8", type: "photo", url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=800&fit=crop" },
      { id: "9", type: "photo", url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop" },
      { id: "10", type: "photo", url: "https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=1200&h=800&fit=crop" },
      { id: "11", type: "video", url: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=1200&h=800&fit=crop", thumbnail: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=400&h=300&fit=crop" },
      { id: "12", type: "photo", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop" },
      { id: "13", type: "photo", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop" },
      { id: "14", type: "photo", url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1200&h=800&fit=crop" },
      { id: "15", type: "photo", url: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&h=800&fit=crop" },
      { id: "16", type: "video", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop", thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop" },
      { id: "17", type: "photo", url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop" },
      { id: "18", type: "photo", url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop" },
      { id: "19", type: "photo", url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop" },
      { id: "20", type: "photo", url: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&h=800&fit=crop" },
      { id: "21", type: "video", url: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop", thumbnail: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=300&fit=crop" },
      { id: "22", type: "photo", url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200&h=800&fit=crop" },
      { id: "23", type: "photo", url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=800&fit=crop" },
      { id: "24", type: "photo", url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop" },
      { id: "25", type: "photo", url: "https://images.unsplash.com/photo-1484821582734-6c6c9f99a672?w=1200&h=800&fit=crop" },
    ],
  };

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
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  };

  const formatCommentDate = (dateString: string) => {
    if (!mounted) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "Agora";
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays}d atrás`;
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  };

  const openLightbox = (index: number) => {
    if (mockAlbum.isExclusive && !isSubscribed) {
      setShowSubscribeModal(true);
      return;
    }
    setSelectedMediaIndex(index);
  };

  const closeLightbox = () => {
    setSelectedMediaIndex(null);
  };

  const nextMedia = () => {
    if (selectedMediaIndex !== null && selectedMediaIndex < mockAlbum.media.length - 1) {
      setSelectedMediaIndex(selectedMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (selectedMediaIndex !== null && selectedMediaIndex > 0) {
      setSelectedMediaIndex(selectedMediaIndex - 1);
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setShowSubscribeModal(false);
    setTimeout(() => {
      window.location.href = "/assinante/perfil";
    }, 500);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: "Você",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
        isVip: true,
      },
      text: commentText,
      date: new Date().toISOString(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const visibleMedia = mockAlbum.isExclusive && !isSubscribed ? mockAlbum.media.slice(0, 3) : mockAlbum.media;

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
              href="/assinante/perfil"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar ao Perfil
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

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
        {/* Creator Info */}
        <div className="flex items-center justify-between mb-8 p-6 rounded-2xl bg-[#1A1A1A] border border-white/10">
          <div className="flex items-center gap-4">
            <img
              src={mockAlbum.creator.avatar}
              alt={mockAlbum.creator.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold">{mockAlbum.creator.name}</h3>
                {mockAlbum.creator.isVerified && (
                  <div className="w-5 h-5 bg-[#FF0040] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                {isSubscribed && (
                  <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-lg text-xs font-bold flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    VIP
                  </span>
                )}
              </div>
              <p className="text-white/60 text-sm">@{mockAlbum.creator.username}</p>
              <p className="text-white/60 text-sm">{formatNumber(mockAlbum.creator.subscribers)} assinantes</p>
            </div>
          </div>

          {!isSubscribed && (
            <button
              onClick={() => setShowSubscribeModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300 flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Assinar
            </button>
          )}

          {isSubscribed && (
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-[#FF0040]/20 border border-purple-500/30 rounded-xl">
              <Star className="w-5 h-5 text-purple-400 fill-purple-400" />
              <span className="font-semibold">Você é assinante VIP</span>
            </div>
          )}
        </div>

        {/* Album Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{mockAlbum.title}</h1>
                {mockAlbum.isExclusive && (
                  <span className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-lg font-bold text-sm flex items-center gap-1.5">
                    <Crown className="w-4 h-4" />
                    EXCLUSIVO
                  </span>
                )}
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-4">{mockAlbum.description}</p>
              <div className="flex items-center gap-6 text-sm text-white/60">
                <span>{formatDate(mockAlbum.date)}</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {formatNumber(mockAlbum.views)} visualizações
                </span>
                <span>📸 {mockAlbum.media.filter(m => m.type === "photo").length} fotos</span>
                <span>🎥 {mockAlbum.media.filter(m => m.type === "video").length} vídeos</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 border rounded-xl transition-all duration-300 ${
                isLiked 
                  ? "bg-[#FF0040]/10 border-[#FF0040] text-[#FF0040]" 
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#FF0040]/50"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-[#FF0040]" : ""}`} />
              <span className="font-semibold">{formatNumber(mockAlbum.likes + (isLiked ? 1 : 0))}</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#FF0040]/50 transition-all duration-300">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">{formatNumber(mockAlbum.comments + comments.length)}</span>
            </button>
          </div>
        </div>

        {/* Exclusive Content Lock Banner */}
        {mockAlbum.isExclusive && !isSubscribed && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-[#FF0040]/20 border border-purple-500/30">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Conteúdo Exclusivo VIP</h3>
                <p className="text-white/70 mb-3">
                  Este álbum contém {mockAlbum.media.length} mídias exclusivas. Assine agora por apenas R$ {mockAlbum.price?.toFixed(2)}/mês para desbloquear todo o conteúdo premium!
                </p>
                <button
                  onClick={() => setShowSubscribeModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300"
                >
                  Assinar Agora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Media Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Álbum Completo ({mockAlbum.media.length} mídias)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleMedia.map((media, index) => (
              <button
                key={media.id}
                onClick={() => openLightbox(index)}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={media.type === "video" ? media.thumbnail : media.url}
                  alt={`Media ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                
                {/* Video Indicator */}
                {media.type === "video" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-sm font-semibold">
                    {media.type === "video" ? "Vídeo" : "Foto"} {index + 1}
                  </span>
                </div>
              </button>
            ))}

            {/* Locked Media Placeholders */}
            {mockAlbum.isExclusive && !isSubscribed && mockAlbum.media.slice(3).map((_, index) => (
              <button
                key={`locked-${index}`}
                onClick={() => setShowSubscribeModal(true)}
                className="relative aspect-square rounded-xl overflow-hidden bg-[#1A1A1A] border-2 border-dashed border-purple-500/30 flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors"
              >
                <div className="text-center">
                  <Lock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-xs text-white/60">Bloqueado</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Comentários ({comments.length})</h2>
          
          {/* Comment Input */}
          {isSubscribed && (
            <div className="mb-8 p-6 rounded-2xl bg-[#1A1A1A] border border-white/10">
              <div className="flex gap-4">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
                  alt="Você"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10 flex-shrink-0"
                />
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Deixe seu comentário..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-white/60">
                      Seu badge VIP será exibido no comentário
                    </span>
                    <button
                      onClick={handleSubmitComment}
                      disabled={!commentText.trim()}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Comentar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-6 rounded-2xl bg-[#1A1A1A] border border-white/10">
                <div className="flex gap-4">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{comment.user.name}</span>
                      {comment.user.isVip && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded text-xs font-bold flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          VIP
                        </span>
                      )}
                      <span className="text-white/40 text-sm">•</span>
                      <span className="text-white/60 text-sm">{formatCommentDate(comment.date)}</span>
                    </div>
                    <p className="text-white/80 leading-relaxed mb-3">{comment.text}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-white/60 hover:text-[#FF0040] transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                      <button className="text-white/60 hover:text-white transition-colors text-sm">
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isSubscribed && (
            <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-[#FF0040]/10 border border-purple-500/20 text-center">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Assine para comentar</h3>
              <p className="text-white/70 mb-6">
                Torne-se assinante VIP para deixar comentários e interagir com o criador
              </p>
              <button
                onClick={() => setShowSubscribeModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300"
              >
                Assinar Agora
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMediaIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          {selectedMediaIndex > 0 && (
            <button
              onClick={prevMedia}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {selectedMediaIndex < mockAlbum.media.length - 1 && (
            <button
              onClick={nextMedia}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Media Display */}
          <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
            {mockAlbum.media[selectedMediaIndex].type === "video" ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={mockAlbum.media[selectedMediaIndex].url}
                  alt="Video thumbnail"
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#FF0040] rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-white fill-white" />
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={mockAlbum.media[selectedMediaIndex].url}
                alt={`Media ${selectedMediaIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>

          {/* Media Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-sm">
            {selectedMediaIndex + 1} / {mockAlbum.media.length}
          </div>
        </div>
      )}

      {/* Subscribe Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowSubscribeModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Torne-se Assinante VIP</h2>
              <p className="text-white/70">
                Desbloqueie todo o conteúdo exclusivo de {mockAlbum.creator.name}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold">Conteúdo Exclusivo</p>
                  <p className="text-sm text-white/60">Acesso a todos os álbuns VIP</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold">Mensagens Diretas</p>
                  <p className="text-sm text-white/60">Chat privado com o criador</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold">Badge VIP</p>
                  <p className="text-sm text-white/60">Destaque especial nos comentários</p>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-[#FF0040]/20 border border-purple-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70">Assinatura Mensal</span>
                <span className="text-2xl font-bold">R$ {mockAlbum.price?.toFixed(2)}</span>
              </div>
              <p className="text-xs text-white/60">Cancele quando quiser, sem compromisso</p>
            </div>

            <button
              onClick={handleSubscribe}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-bold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300"
            >
              Assinar Agora
            </button>

            <p className="text-xs text-white/60 text-center mt-4">
              Ao assinar, você concorda com nossos Termos de Serviço
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
