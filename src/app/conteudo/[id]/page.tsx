"use client";

import { Navbar } from "@/components/custom/navbar";
import { Heart, Eye, MessageCircle, Share2, Lock, Play, ArrowLeft, Download, Flag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

// Mock data - em produção viria de uma API
const mockContent = {
  id: "1",
  title: "Paris Fashion Week 2024",
  description: "Uma semana incrível explorando a moda parisiense, visitando as principais passarelas e descobrindo os segredos da alta costura francesa. Foi uma experiência única que me permitiu conhecer designers incríveis e ver de perto as tendências que vão dominar o próximo ano.",
  date: "2024-03-15",
  isExclusive: true,
  likes: 2340,
  views: 8920,
  comments: 156,
  isLiked: false,
  author: {
    name: "Sofia Martins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    followers: 12500,
  },
  images: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop",
  ],
  videos: [],
};

const mockComments = [
  {
    id: "1",
    user: {
      name: "Ana Silva",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    text: "Incrível! Adorei as fotos 😍",
    timestamp: "2h atrás",
    likes: 12,
  },
  {
    id: "2",
    user: {
      name: "Carlos Santos",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    text: "Quando vai postar mais conteúdo de Paris?",
    timestamp: "5h atrás",
    likes: 8,
  },
  {
    id: "3",
    user: {
      name: "Maria Costa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    text: "Que experiência maravilhosa! 🔥",
    timestamp: "1 dia atrás",
    likes: 15,
  },
];

export default function ConteudoDetailPage() {
  const params = useParams();
  const [content, setContent] = useState(mockContent);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const handleLike = () => {
    setContent({
      ...content,
      isLiked: !content.isLiked,
      likes: content.isLiked ? content.likes - 1 : content.likes + 1,
    });
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: content.title,
          text: content.description,
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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: String(comments.length + 1),
        user: {
          name: "Você",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
        },
        text: newComment,
        timestamp: "Agora",
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("pt-BR");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      <div className="pt-20">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          {/* Back Button */}
          <Link
            href="/feed"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Feed
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 overflow-hidden">
                {/* Main Image */}
                <div className="relative aspect-[16/10] bg-black">
                  <img
                    src={content.images[selectedImage]}
                    alt={content.title}
                    className="w-full h-full object-contain"
                  />
                  {content.isExclusive && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FF0040]/90 backdrop-blur-sm rounded-lg text-sm font-bold flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      EXCLUSIVO
                    </div>
                  )}
                  <button
                    onClick={handleShare}
                    className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-black/80 transition-colors duration-300"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Thumbnails */}
                {content.images.length > 1 && (
                  <div className="p-4 flex gap-2 overflow-x-auto">
                    {content.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                          selectedImage === index ? "ring-2 ring-[#FF0040]" : "opacity-60 hover:opacity-100"
                        } transition-all duration-300`}
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Info */}
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
                <h1 className="text-3xl font-bold mb-3">{content.title}</h1>
                <p className="text-white/70 leading-relaxed mb-6">{content.description}</p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 transition-colors duration-300 ${
                        content.isLiked ? "text-[#FF0040]" : "hover:text-[#FF0040]"
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${content.isLiked ? "fill-current" : ""}`} />
                      <span className="font-semibold">{formatNumber(content.likes)}</span>
                    </button>
                    <div className="flex items-center gap-2 text-white/60">
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-semibold">{content.comments}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Eye className="w-6 h-6" />
                      <span className="font-semibold">{formatNumber(content.views)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300">
                      <Flag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
                <h2 className="text-2xl font-bold mb-6">Comentários ({comments.length})</h2>

                {/* Add Comment */}
                <form onSubmit={handleAddComment} className="mb-6">
                  <div className="flex gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                      alt="Você"
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Adicione um comentário..."
                        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300"
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="px-6 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="p-4 rounded-xl bg-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{comment.user.name}</h4>
                            <span className="text-xs text-white/60">{comment.timestamp}</span>
                          </div>
                          <p className="text-white/80 text-sm">{comment.text}</p>
                        </div>
                        <button className="mt-2 text-sm text-white/60 hover:text-[#FF0040] transition-colors duration-300 flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {comment.likes > 0 && <span>{comment.likes}</span>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Card */}
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={content.author.avatar}
                    alt={content.author.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{content.author.name}</h3>
                    <p className="text-sm text-white/60">{formatNumber(content.author.followers)} seguidores</p>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300">
                  Seguir
                </button>
              </div>

              {/* Post Info */}
              <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6">
                <h3 className="font-bold mb-4">Informações</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Publicado em</span>
                    <span className="font-semibold">{formatDate(content.date)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Visualizações</span>
                    <span className="font-semibold">{formatNumber(content.views)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Curtidas</span>
                    <span className="font-semibold">{formatNumber(content.likes)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Comentários</span>
                    <span className="font-semibold">{content.comments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Tipo</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      content.isExclusive
                        ? "bg-[#FF0040]/20 text-[#FF0040]"
                        : "bg-white/10 text-white/80"
                    }`}>
                      {content.isExclusive ? "EXCLUSIVO" : "GRATUITO"}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              {content.isExclusive && (
                <div className="rounded-2xl bg-gradient-to-br from-[#FF0040]/20 to-purple-500/20 border border-[#FF0040]/30 p-6">
                  <Lock className="w-8 h-8 text-[#FF0040] mb-3" />
                  <h3 className="font-bold text-lg mb-2">Conteúdo Exclusivo</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Este conteúdo está disponível apenas para assinantes premium.
                  </p>
                  <button className="w-full px-6 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 transition-all duration-300">
                    Assinar Agora
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
