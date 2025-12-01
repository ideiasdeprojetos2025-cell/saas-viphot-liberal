"use client";

import { Navbar } from "@/components/custom/navbar";
import { Heart, Eye, Lock, Settings, MapPin, Calendar, Sparkles, X, Upload, Instagram, Twitter, Youtube, Globe, Play, Image as ImageIcon, Link2, DollarSign, Bell, Users, Wallet, CreditCard, UserX, Shield, Key, Menu, Send, Video, MessageCircle, Share2, Trash2, Edit, Unlock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock data inicial - REMOVIDO TODOS OS ADVENTURES EXISTENTES
const initialProfile = {
  name: "Sofia Martins",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=400&fit=crop",
  bio: "Criadora de conteúdo premium | Viajante | Amante de aventuras",
  location: "São Paulo, Brasil",
  joinedDate: "Janeiro 2024",
  followers: 12500,
  following: 340,
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
      id: "album-1",
      title: "Verão na Praia 2024",
      description: "Álbum gratuito com as melhores fotos do verão na praia. Sol, mar e muita diversão!",
      date: new Date().toISOString().split('T')[0],
      coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop",
      ],
      videos: [],
      isExclusive: false,
      likes: 0,
      views: 0,
      comments: 0,
    },
    {
      id: "album-2",
      title: "Aventuras na Montanha",
      description: "Álbum gratuito explorando trilhas incríveis e paisagens de tirar o fôlego nas montanhas.",
      date: new Date().toISOString().split('T')[0],
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      ],
      videos: [],
      isExclusive: false,
      likes: 0,
      views: 0,
      comments: 0,
    },
    {
      id: "album-3",
      title: "Noites na Cidade",
      description: "Álbum gratuito capturando a energia vibrante da vida noturna urbana com luzes e cores incríveis.",
      date: new Date().toISOString().split('T')[0],
      coverImage: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop",
      ],
      videos: [],
      isExclusive: false,
      likes: 0,
      views: 0,
      comments: 0,
    },
  ],
};

// Função auxiliar para salvar no localStorage com compressão de dados
const saveToLocalStorage = (key: string, data: any) => {
  try {
    // Criar versão comprimida removendo dados desnecessários
    const compressedData = {
      ...data,
      adventures: data.adventures.map((adv: any) => {
        // Garantir que images e videos sejam sempre arrays
        const images = Array.isArray(adv.images) ? adv.images : [];
        const videos = Array.isArray(adv.videos) ? adv.videos : [];
        
        return {
          id: adv.id,
          title: adv.title,
          description: adv.description,
          date: adv.date,
          coverImage: adv.coverImage,
          // Limitar imagens para evitar exceder quota
          images: images.slice(0, 5), // Máximo 5 imagens por adventure
          videos: videos.slice(0, 2), // Máximo 2 vídeos por adventure
          isExclusive: adv.isExclusive,
          likes: adv.likes || 0,
          views: adv.views || 0,
          comments: adv.comments || 0,
        };
      }),
    };
    
    const jsonString = JSON.stringify(compressedData);
    
    // Verificar tamanho antes de salvar (limite típico é 5MB)
    const sizeInBytes = new Blob([jsonString]).size;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    
    if (sizeInMB > 4.5) {
      console.warn(`⚠️ Dados muito grandes (${sizeInMB.toFixed(2)}MB). Limitando adventures...`);
      // Se muito grande, manter apenas os 10 adventures mais recentes
      compressedData.adventures = compressedData.adventures.slice(0, 10);
      localStorage.setItem(key, JSON.stringify(compressedData));
    } else {
      localStorage.setItem(key, jsonString);
    }
    
    console.log(`✅ Dados salvos: ${sizeInMB.toFixed(2)}MB`);
  } catch (error: any) {
    if (error.name === 'QuotaExceededError') {
      console.error('❌ Quota excedida! Limpando dados antigos...');
      // Tentar salvar apenas os dados essenciais
      const minimalData = {
        ...data,
        adventures: data.adventures.slice(0, 5).map((adv: any) => {
          const images = Array.isArray(adv.images) ? adv.images : [];
          return {
            id: adv.id,
            title: adv.title,
            description: adv.description,
            date: adv.date,
            coverImage: adv.coverImage,
            images: [images[0] || adv.coverImage], // Apenas primeira imagem
            videos: [],
            isExclusive: adv.isExclusive,
            likes: 0,
            views: 0,
            comments: 0,
          };
        }),
      };
      try {
        localStorage.setItem(key, JSON.stringify(minimalData));
        alert('⚠️ Espaço de armazenamento limitado. Mantendo apenas os 5 posts mais recentes.');
      } catch (e) {
        alert('❌ Erro ao salvar: espaço de armazenamento insuficiente. Por favor, exclua alguns posts antigos.');
      }
    } else {
      console.error('Erro ao salvar:', error);
    }
  }
};

export default function PerfilPage() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isEditingAdventure, setIsEditingAdventure] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    avatar: profile.avatar,
    cover: profile.cover,
    instagram: profile.socialLinks.instagram,
    twitter: profile.socialLinks.twitter,
    youtube: profile.socialLinks.youtube,
    website: profile.socialLinks.website,
  });

  const [publishForm, setPublishForm] = useState({
    title: "",
    description: "",
    contentType: "free" as "free" | "exclusive",
    images: [] as string[],
    videos: [] as string[],
  });

  const [albumForm, setAlbumForm] = useState({
    title: "",
    description: "",
    contentType: "free" as "free" | "exclusive",
    coverImage: "",
    images: [] as string[],
  });

  const [editAdventureForm, setEditAdventureForm] = useState({
    id: "",
    title: "",
    description: "",
    contentType: "free" as "free" | "exclusive",
    coverImage: "",
    images: [] as string[],
    videos: [] as string[],
  });

  useEffect(() => {
    setMounted(true);
    const savedProfile = localStorage.getItem("viphot-profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        // Garantir que adventures sempre seja um array E que cada adventure tenha images/videos como arrays
        const validAdventures = Array.isArray(parsed.adventures) 
          ? parsed.adventures.map((adv: any) => ({
              ...adv,
              images: Array.isArray(adv.images) ? adv.images : [],
              videos: Array.isArray(adv.videos) ? adv.videos : [],
            }))
          : [];
        
        const validProfile = {
          ...parsed,
          adventures: validAdventures,
          recentFollowers: Array.isArray(parsed.recentFollowers) ? parsed.recentFollowers : initialProfile.recentFollowers,
        };
        setProfile(validProfile);
        setEditForm({
          name: validProfile.name,
          bio: validProfile.bio,
          location: validProfile.location,
          avatar: validProfile.avatar,
          cover: validProfile.cover,
          instagram: validProfile.socialLinks.instagram,
          twitter: validProfile.socialLinks.twitter,
          youtube: validProfile.socialLinks.youtube,
          website: validProfile.socialLinks.website,
        });
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    }

    const handleOpenPublishModal = () => {
      setIsPublishModalOpen(true);
    };

    window.addEventListener('openPublishModal', handleOpenPublishModal);

    return () => {
      window.removeEventListener('openPublishModal', handleOpenPublishModal);
    };
  }, []);

  // Garantir que adventures sempre seja um array válido
  const adventures = Array.isArray(profile.adventures) ? profile.adventures : [];
  const sortedAdventures = [...adventures].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, cover: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      ...profile,
      name: editForm.name,
      bio: editForm.bio,
      location: editForm.location,
      avatar: editForm.avatar,
      cover: editForm.cover,
      socialLinks: {
        instagram: editForm.instagram,
        twitter: editForm.twitter,
        youtube: editForm.youtube,
        website: editForm.website,
      },
    };
    
    setProfile(updatedProfile);
    saveToLocalStorage("viphot-profile", updatedProfile);
    setIsEditModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublishImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      let filesProcessed = 0;

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          filesProcessed++;
          
          if (filesProcessed === files.length) {
            setPublishForm({
              ...publishForm,
              images: [...publishForm.images, ...newImages],
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handlePublishVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newVideos: string[] = [];
      let filesProcessed = 0;

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newVideos.push(reader.result as string);
          filesProcessed++;
          
          if (filesProcessed === files.length) {
            setPublishForm({
              ...publishForm,
              videos: [...publishForm.videos, ...newVideos],
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemovePublishImage = (index: number) => {
    setPublishForm({
      ...publishForm,
      images: publishForm.images.filter((_, i) => i !== index),
    });
  };

  const handleRemovePublishVideo = (index: number) => {
    setPublishForm({
      ...publishForm,
      videos: publishForm.videos.filter((_, i) => i !== index),
    });
  };

  const handlePublishContent = () => {
    if (!publishForm.title || !publishForm.description || (publishForm.images.length === 0 && publishForm.videos.length === 0)) {
      alert("Por favor, preencha todos os campos e adicione pelo menos uma imagem ou vídeo.");
      return;
    }

    const newAdventure = {
      id: Date.now().toString(),
      title: publishForm.title,
      description: publishForm.description,
      date: new Date().toISOString().split('T')[0],
      coverImage: publishForm.images.length > 0 ? publishForm.images[0] : "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      images: publishForm.images,
      videos: publishForm.videos,
      isExclusive: publishForm.contentType === "exclusive",
      likes: 0,
      views: 0,
      comments: 0,
    };

    const updatedProfile = {
      ...profile,
      adventures: [newAdventure, ...adventures],
    };

    setProfile(updatedProfile);
    saveToLocalStorage("viphot-profile", updatedProfile);

    setPublishForm({
      title: "",
      description: "",
      contentType: "free",
      images: [],
      videos: [],
    });

    setIsPublishModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAlbumCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAlbumForm({ ...albumForm, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAlbumImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      let filesProcessed = 0;

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          filesProcessed++;
          
          if (filesProcessed === files.length) {
            setAlbumForm({
              ...albumForm,
              images: [...albumForm.images, ...newImages],
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveAlbumImage = (index: number) => {
    setAlbumForm({
      ...albumForm,
      images: albumForm.images.filter((_, i) => i !== index),
    });
  };

  const handleCreateAlbum = () => {
    if (!albumForm.title || !albumForm.description || albumForm.images.length === 0) {
      alert("Por favor, preencha todos os campos e adicione pelo menos uma imagem.");
      return;
    }

    const newAlbum = {
      id: Date.now().toString(),
      title: albumForm.title,
      description: albumForm.description,
      date: new Date().toISOString().split('T')[0],
      coverImage: albumForm.coverImage || albumForm.images[0],
      images: albumForm.images,
      videos: [],
      isExclusive: albumForm.contentType === "exclusive",
      likes: 0,
      views: 0,
      comments: 0,
    };

    const updatedProfile = {
      ...profile,
      adventures: [newAlbum, ...adventures],
    };

    setProfile(updatedProfile);
    saveToLocalStorage("viphot-profile", updatedProfile);

    setAlbumForm({
      title: "",
      description: "",
      contentType: "free",
      coverImage: "",
      images: [],
    });

    setIsAlbumModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAdventure = (adventureId: string) => {
    if (!confirm("Tem certeza que deseja excluir este conteúdo permanentemente?")) {
      return;
    }

    // Filtrar adventures removendo o item com o ID especificado
    const updatedAdventures = profile.adventures.filter(
      (adv: any) => adv.id !== adventureId
    );
    
    // Criar novo objeto de perfil com adventures atualizado
    const updatedProfile = {
      ...profile,
      adventures: updatedAdventures,
    };

    // Atualizar estado React
    setProfile(updatedProfile);
    
    // Salvar no localStorage com função otimizada
    saveToLocalStorage("viphot-profile", updatedProfile);
    
    console.log("✅ Conteúdo excluído:", adventureId);
    console.log("📊 Adventures restantes:", updatedAdventures.length);
  };

  const handleOpenEditAdventure = (adventure: any) => {
    setEditAdventureForm({
      id: adventure.id,
      title: adventure.title,
      description: adventure.description,
      contentType: adventure.isExclusive ? "exclusive" : "free",
      coverImage: adventure.coverImage,
      images: Array.isArray(adventure.images) ? adventure.images : [],
      videos: Array.isArray(adventure.videos) ? adventure.videos : [],
    });
    setIsEditingAdventure(adventure.id);
  };

  const handleEditAdventureImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      let filesProcessed = 0;

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          filesProcessed++;
          
          if (filesProcessed === files.length) {
            setEditAdventureForm({
              ...editAdventureForm,
              images: [...editAdventureForm.images, ...newImages],
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveEditAdventureImage = (index: number) => {
    setEditAdventureForm({
      ...editAdventureForm,
      images: editAdventureForm.images.filter((_, i) => i !== index),
    });
  };

  const handleSaveEditAdventure = () => {
    if (!editAdventureForm.title || !editAdventureForm.description) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const updatedAdventures = profile.adventures.map(adv => {
      if (adv.id === editAdventureForm.id) {
        // Garantir que images e videos sejam sempre arrays
        const images = Array.isArray(editAdventureForm.images) ? editAdventureForm.images : [];
        const videos = Array.isArray(editAdventureForm.videos) ? editAdventureForm.videos : [];
        
        return {
          ...adv,
          title: editAdventureForm.title,
          description: editAdventureForm.description,
          isExclusive: editAdventureForm.contentType === "exclusive",
          coverImage: editAdventureForm.coverImage || images[0] || adv.coverImage,
          images: images,
          videos: videos,
        };
      }
      return adv;
    });

    const updatedProfile = {
      ...profile,
      adventures: updatedAdventures,
    };

    setProfile(updatedProfile);
    saveToLocalStorage("viphot-profile", updatedProfile);
    setIsEditingAdventure(null);
    alert("Conteúdo atualizado com sucesso!");
  };

  const handleToggleExclusive = (adventureId: string) => {
    const updatedAdventures = profile.adventures.map(adv => {
      if (adv.id === adventureId) {
        return {
          ...adv,
          isExclusive: !adv.isExclusive,
        };
      }
      return adv;
    });

    const updatedProfile = {
      ...profile,
      adventures: updatedAdventures,
    };

    setProfile(updatedProfile);
    saveToLocalStorage("viphot-profile", updatedProfile);
    
    const adventure = profile.adventures.find(adv => adv.id === adventureId);
    if (adventure) {
      alert(`Conteúdo alterado para ${!adventure.isExclusive ? 'EXCLUSIVO' : 'GRATUITO'}!`);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Formatação manual consistente para evitar hydration mismatch
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace('.', ',') + 'M';
    }
    if (num >= 1000) {
      return Math.floor(num / 1000) + '.' + String(num % 1000).padStart(3, '0');
    }
    return num.toString();
  };

  const menuItems = [
    { icon: Link2, label: "Meu Link", href: "/perfil/meu-link" },
    { icon: DollarSign, label: "Saldo", href: "/perfil/saldo" },
    { icon: Settings, label: "Editar Perfil", action: () => {
      setEditForm({
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
        avatar: profile.avatar,
        cover: profile.cover,
        instagram: profile.socialLinks.instagram,
        twitter: profile.socialLinks.twitter,
        youtube: profile.socialLinks.youtube,
        website: profile.socialLinks.website,
      });
      setIsEditModalOpen(true);
      setIsSidebarOpen(false);
    }},
    { icon: Key, label: "Senhas", href: "/perfil/senhas" },
    { icon: Shield, label: "Privacidade", href: "/perfil/privacidade" },
    { icon: Bell, label: "Notificações", href: "/perfil/notificacoes" },
    { icon: Users, label: "Meus Assinantes", href: "/perfil/assinantes" },
    { icon: Wallet, label: "Meus Saques", href: "/perfil/saques" },
    { icon: CreditCard, label: "Dados Bancários", href: "/perfil/dados-bancarios" },
    { icon: UserX, label: "Usuários Bloqueados", href: "/perfil/bloqueados" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-24 left-4 z-40 md:hidden w-12 h-12 bg-[#FF0040] rounded-xl flex items-center justify-center shadow-lg shadow-[#FF0040]/50"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Floating Publish Buttons */}
      <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 flex flex-col gap-3">
        <button
          onClick={() => setIsAlbumModalOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform duration-300"
          title="Criar Álbum de Fotos"
        >
          <ImageIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-full flex items-center justify-center shadow-2xl shadow-[#FF0040]/50 hover:scale-110 transition-transform duration-300"
          title="Publicar Conteúdo"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-20 left-0 h-[calc(100vh-5rem)] w-72 bg-[#1A1A1A] border-r border-white/10 z-50 transition-transform duration-300 overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6">
          {/* Profile Summary */}
          <div className="mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#FF0040]/50"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate">{profile.name}</h3>
                <p className="text-xs text-white/60">Criador de Conteúdo</p>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <div>
                <span className="font-bold text-[#FF0040]" suppressHydrationWarning>{formatNumber(profile.followers)}</span>
                <span className="text-white/60 ml-1">Seguidores</span>
              </div>
              <div>
                <span className="font-bold text-[#FF0040]">{adventures.length}</span>
                <span className="text-white/60 ml-1">Posts</span>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              
              if (item.action) {
                return (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-white/60 group-hover:text-[#FF0040] transition-colors duration-300" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={index}
                  href={item.href || "#"}
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-all duration-300 group"
                >
                  <Icon className="w-5 h-5 text-white/60 group-hover:text-[#FF0040] transition-colors duration-300" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-72 pt-20">
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
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.name}</h1>
                  <p className="text-white/70 mb-3">{profile.bio}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </span>
                    <span suppressHydrationWarning>{formatNumber(profile.followers)} seguidores</span>
                    <span>{adventures.length} posts</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEditForm({
                      name: profile.name,
                      bio: profile.bio,
                      location: profile.location,
                      avatar: profile.avatar,
                      cover: profile.cover,
                      instagram: profile.socialLinks.instagram,
                      twitter: profile.socialLinks.twitter,
                      youtube: profile.socialLinks.youtube,
                      website: profile.socialLinks.website,
                    });
                    setIsEditModalOpen(true);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <Settings className="w-5 h-5" />
                  Editar Perfil
                </button>
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
                    <Link href={`/album/${adventure.id}`}>
                      <img
                        src={adventure.coverImage}
                        alt={adventure.title}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    {adventure.isExclusive && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FF0040]/90 backdrop-blur-sm rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" />
                        EXCLUSIVO
                      </div>
                    )}
                    
                    {/* Botões de Ação no Canto Superior Direito */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleExclusive(adventure.id);
                        }}
                        className="w-10 h-10 bg-blue-500/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 z-50"
                        title={adventure.isExclusive ? "Tornar Gratuito" : "Tornar Exclusivo"}
                      >
                        {adventure.isExclusive ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleOpenEditAdventure(adventure);
                        }}
                        className="w-10 h-10 bg-yellow-500/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-yellow-600 transition-colors duration-300 z-50"
                        title="Editar conteúdo"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteAdventure(adventure.id);
                        }}
                        className="w-10 h-10 bg-red-500/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-300 z-50"
                        title="Excluir conteúdo"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <Link href={`/album/${adventure.id}`} className="flex-1">
                        <h3 className="text-xl font-bold hover:text-[#FF0040] transition-colors duration-300 cursor-pointer">
                          {adventure.title}
                        </h3>
                      </Link>
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
                        <button className="flex items-center gap-2 text-sm hover:text-[#FF0040] transition-colors duration-300">
                          <Heart className="w-5 h-5" />
                          <span suppressHydrationWarning>{formatNumber(adventure.likes)}</span>
                        </button>
                        <button className="flex items-center gap-2 text-sm hover:text-[#FF0040] transition-colors duration-300">
                          <MessageCircle className="w-5 h-5" />
                          <span>{adventure.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-sm hover:text-[#FF0040] transition-colors duration-300">
                          <Eye className="w-5 h-5" />
                          <span suppressHydrationWarning>{formatNumber(adventure.views)}</span>
                        </button>
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
                  {(profile.recentFollowers || []).map((follower) => (
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
                <Link
                  href="/perfil/assinantes"
                  className="block mt-4 text-center text-sm text-[#FF0040] hover:underline"
                >
                  Ver todos
                </Link>
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
                      href={`/album/${adventure.id}`}
                      className="aspect-square rounded-lg overflow-hidden bg-white/5 hover:ring-2 hover:ring-[#FF0040]/50 transition-all duration-300"
                    >
                      <img
                        src={adventure.coverImage}
                        alt={adventure.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] rounded-2xl border border-white/10">
            <div className="sticky top-0 bg-[#1A1A1A] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">Editar Perfil</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Imagem de Capa
                </label>
                <div className="relative h-40 rounded-xl overflow-hidden bg-white/5 border-2 border-dashed border-white/20 hover:border-[#FF0040]/50 transition-all duration-300">
                  <img
                    src={editForm.cover}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/40 hover:bg-black/60 transition-colors duration-300">
                    <div className="px-4 py-2 bg-[#FF0040]/90 rounded-lg font-semibold flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Alterar Capa
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Foto de Perfil
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={editForm.avatar}
                    alt="Avatar preview"
                    className="w-24 h-24 rounded-xl object-cover ring-2 ring-white/10"
                  />
                  <label className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 cursor-pointer transition-all duration-300 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Alterar Avatar
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Nome
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Biografia
                </label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Localização
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Redes Sociais</h3>
                
                <div>
                  <label className="text-sm font-semibold text-white/80 mb-2 block flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={editForm.instagram}
                    onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                    placeholder="https://instagram.com/seu-usuario"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white/80 mb-2 block flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={editForm.twitter}
                    onChange={(e) => setEditForm({ ...editForm, twitter: e.target.value })}
                    placeholder="https://twitter.com/seu-usuario"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white/80 mb-2 block flex items-center gap-2">
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={editForm.youtube}
                    onChange={(e) => setEditForm({ ...editForm, youtube: e.target.value })}
                    placeholder="https://youtube.com/@seu-canal"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-white/80 mb-2 block flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={editForm.website}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    placeholder="https://seu-site.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#1A1A1A] border-t border-white/10 p-6 flex gap-3 z-10">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Content Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] rounded-2xl border border-white/10">
            <div className="sticky top-0 bg-[#1A1A1A] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">Publicar Conteúdo</h2>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Título
                </label>
                <input
                  type="text"
                  value={publishForm.title}
                  onChange={(e) => setPublishForm({ ...publishForm, title: e.target.value })}
                  placeholder="Digite o título do conteúdo"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Descrição
                </label>
                <textarea
                  value={publishForm.description}
                  onChange={(e) => setPublishForm({ ...publishForm, description: e.target.value })}
                  rows={4}
                  placeholder="Descreva seu conteúdo..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-3 block">
                  Tipo de Conteúdo
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPublishForm({ ...publishForm, contentType: "free" })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      publishForm.contentType === "free"
                        ? "border-[#FF0040] bg-[#FF0040]/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Heart className={`w-6 h-6 mx-auto mb-2 ${publishForm.contentType === "free" ? "text-[#FF0040]" : "text-white/60"}`} />
                    <div className="font-bold text-sm">Gratuito</div>
                    <div className="text-xs text-white/60 mt-1">Todos podem ver</div>
                  </button>

                  <button
                    onClick={() => setPublishForm({ ...publishForm, contentType: "exclusive" })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      publishForm.contentType === "exclusive"
                        ? "border-[#FF0040] bg-[#FF0040]/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Lock className={`w-6 h-6 mx-auto mb-2 ${publishForm.contentType === "exclusive" ? "text-[#FF0040]" : "text-white/60"}`} />
                    <div className="font-bold text-sm">Exclusivo</div>
                    <div className="text-xs text-white/60 mt-1">Apenas assinantes</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Imagens ({publishForm.images.length})
                </label>
                
                {publishForm.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {publishForm.images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                        <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleRemovePublishImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="block w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-[#FF0040]/50 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-white/60" />
                    <div className="font-semibold text-sm mb-1">Adicionar Imagens</div>
                    <div className="text-xs text-white/60">Clique ou arraste imagens aqui</div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePublishImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Vídeos ({publishForm.videos.length})
                </label>
                
                {publishForm.videos.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {publishForm.videos.map((video, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-white/5">
                        <video src={video} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Play className="w-12 h-12 text-white/80" />
                        </div>
                        <button
                          onClick={() => handleRemovePublishVideo(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="block w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-[#FF0040]/50 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300">
                  <div className="text-center">
                    <Video className="w-8 h-8 mx-auto mb-2 text-white/60" />
                    <div className="font-semibold text-sm mb-1">Adicionar Vídeos</div>
                    <div className="text-xs text-white/60">Clique ou arraste vídeos aqui</div>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handlePublishVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#1A1A1A] border-t border-white/10 p-6 flex gap-3 z-10">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handlePublishContent}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Publicar Conteúdo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Album Modal */}
      {isAlbumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] rounded-2xl border border-white/10">
            <div className="sticky top-0 bg-[#1A1A1A] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">Criar Álbum de Fotos</h2>
              <button
                onClick={() => setIsAlbumModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Título do Álbum
                </label>
                <input
                  type="text"
                  value={albumForm.title}
                  onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })}
                  placeholder="Digite o título do álbum"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Descrição
                </label>
                <textarea
                  value={albumForm.description}
                  onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })}
                  rows={4}
                  placeholder="Descreva seu álbum..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-3 block">
                  Tipo de Conteúdo
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAlbumForm({ ...albumForm, contentType: "free" })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      albumForm.contentType === "free"
                        ? "border-[#FF0040] bg-[#FF0040]/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Heart className={`w-6 h-6 mx-auto mb-2 ${albumForm.contentType === "free" ? "text-[#FF0040]" : "text-white/60"}`} />
                    <div className="font-bold text-sm">Gratuito</div>
                    <div className="text-xs text-white/60 mt-1">Todos podem ver</div>
                  </button>

                  <button
                    onClick={() => setAlbumForm({ ...albumForm, contentType: "exclusive" })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      albumForm.contentType === "exclusive"
                        ? "border-[#FF0040] bg-[#FF0040]/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Lock className={`w-6 h-6 mx-auto mb-2 ${albumForm.contentType === "exclusive" ? "text-[#FF0040]" : "text-white/60"}`} />
                    <div className="font-bold text-sm">Exclusivo</div>
                    <div className="text-xs text-white/60 mt-1">Apenas assinantes</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Capa do Álbum (Opcional)
                </label>
                {albumForm.coverImage ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 mb-3">
                    <img src={albumForm.coverImage} alt="Capa" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setAlbumForm({ ...albumForm, coverImage: "" })}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : null}
                <label className="block w-full p-6 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300">
                  <div className="text-center">
                    <ImageIcon className="w-6 h-6 mx-auto mb-2 text-white/60" />
                    <div className="font-semibold text-xs mb-1">Adicionar Capa</div>
                    <div className="text-xs text-white/60">Se não adicionar, usaremos a primeira foto</div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAlbumCoverUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Fotos do Álbum ({albumForm.images.length})
                </label>
                
                {albumForm.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {albumForm.images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                        <img src={img} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleRemoveAlbumImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="block w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-white/60" />
                    <div className="font-semibold text-sm mb-1">Adicionar Fotos</div>
                    <div className="text-xs text-white/60">Clique ou arraste fotos aqui</div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAlbumImagesUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#1A1A1A] border-t border-white/10 p-6 flex gap-3 z-10">
              <button
                onClick={() => setIsAlbumModalOpen(false)}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateAlbum}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-5 h-5" />
                Criar Álbum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Adventure Modal */}
      {isEditingAdventure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] rounded-2xl border border-white/10">
            <div className="sticky top-0 bg-[#1A1A1A] border-b border-white/10 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold">Editar Conteúdo</h2>
              <button
                onClick={() => setIsEditingAdventure(null)}
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Título
                </label>
                <input
                  type="text"
                  value={editAdventureForm.title}
                  onChange={(e) => setEditAdventureForm({ ...editAdventureForm, title: e.target.value })}
                  placeholder="Digite o título"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Descrição
                </label>
                <textarea
                  value={editAdventureForm.description}
                  onChange={(e) => setEditAdventureForm({ ...editAdventureForm, description: e.target.value })}
                  rows={4}
                  placeholder="Descreva o conteúdo..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-3 block">
                  Tipo de Conteúdo
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setEditAdventureForm({ ...editAdventureForm, contentType: "free" })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      editAdventureForm.contentType === "free"
                        ? "border-[#FF0040] bg-[#FF0040]/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Heart className={`w-6 h-6 mx-auto mb-2 ${editAdventureForm.contentType === "free" ? "text-[#FF0040]" : "text-white/60"}`} />
                    <div className="font-bold text-sm">Gratuito</div>
                    <div className="text-xs text-white/60 mt-1">Todos podem ver</div>
                  </button>

                  <button
                    onClick={() => setEditAdventureForm({ ...editAdventureForm, contentType: "exclusive" })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      editAdventureForm.contentType === "exclusive"
                        ? "border-[#FF0040] bg-[#FF0040]/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Lock className={`w-6 h-6 mx-auto mb-2 ${editAdventureForm.contentType === "exclusive" ? "text-[#FF0040]" : "text-white/60"}`} />
                    <div className="font-bold text-sm">Exclusivo</div>
                    <div className="text-xs text-white/60 mt-1">Apenas assinantes</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 mb-2 block">
                  Imagens ({editAdventureForm.images.length})
                </label>
                
                {editAdventureForm.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {editAdventureForm.images.map((img, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-white/5">
                        <img src={img} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => handleRemoveEditAdventureImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <label className="block w-full p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-[#FF0040]/50 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-white/60" />
                    <div className="font-semibold text-sm mb-1">Adicionar Imagens</div>
                    <div className="text-xs text-white/60">Clique ou arraste imagens aqui</div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleEditAdventureImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#1A1A1A] border-t border-white/10 p-6 flex gap-3 z-10">
              <button
                onClick={() => setIsEditingAdventure(null)}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEditAdventure}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Edit className="w-5 h-5" />
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
