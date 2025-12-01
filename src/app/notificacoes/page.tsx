"use client";

import { Navbar } from "@/components/custom/navbar";
import { Bell, Heart, MessageCircle, UserPlus, DollarSign, Eye, Check, X } from "lucide-react";
import { useState } from "react";

const mockNotifications = [
  {
    id: "1",
    type: "like",
    user: {
      name: "Ana Silva",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    content: "curtiu seu post 'Paris Fashion Week 2024'",
    timestamp: "2 min atrás",
    read: false,
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Carlos Santos",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    content: "comentou: 'Incrível! Quando vai postar mais?'",
    timestamp: "15 min atrás",
    read: false,
    icon: MessageCircle,
    color: "text-blue-500",
  },
  {
    id: "3",
    type: "follower",
    user: {
      name: "Maria Costa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    content: "começou a seguir você",
    timestamp: "1h atrás",
    read: false,
    icon: UserPlus,
    color: "text-green-500",
  },
  {
    id: "4",
    type: "subscription",
    user: {
      name: "João Oliveira",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    content: "assinou seu conteúdo premium",
    timestamp: "3h atrás",
    read: true,
    icon: DollarSign,
    color: "text-yellow-500",
  },
  {
    id: "5",
    type: "view",
    user: {
      name: "Beatriz Lima",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    },
    content: "visualizou seu perfil",
    timestamp: "5h atrás",
    read: true,
    icon: Eye,
    color: "text-purple-500",
  },
  {
    id: "6",
    type: "like",
    user: {
      name: "Pedro Alves",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    content: "curtiu seu post 'Sunset in Santorini'",
    timestamp: "1 dia atrás",
    read: true,
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: "7",
    type: "comment",
    user: {
      name: "Juliana Rocha",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    content: "comentou: 'Adorei as fotos! 😍'",
    timestamp: "1 dia atrás",
    read: true,
    icon: MessageCircle,
    color: "text-blue-500",
  },
  {
    id: "8",
    type: "follower",
    user: {
      name: "Rafael Mendes",
      avatar: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=100&h=100&fit=crop",
    },
    content: "começou a seguir você",
    timestamp: "2 dias atrás",
    read: true,
    icon: UserPlus,
    color: "text-green-500",
  },
];

export default function NotificacoesPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      <div className="pt-24 px-4 md:px-6 container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF0040]/10 flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#FF0040]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Notificações</h1>
                <p className="text-white/60">
                  {unreadCount > 0 ? `${unreadCount} não lida${unreadCount > 1 ? "s" : ""}` : "Tudo em dia!"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Marcar todas como lidas
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === "all"
                  ? "bg-[#FF0040] text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === "unread"
                  ? "bg-[#FF0040] text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Não lidas
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-[#1A1A1A] border border-white/10">
              <Bell className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Nenhuma notificação</h3>
              <p className="text-white/60">
                {filter === "unread"
                  ? "Você está em dia com todas as notificações!"
                  : "Você ainda não tem notificações"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`rounded-2xl border transition-all duration-300 hover:border-[#FF0040]/30 ${
                    notification.read
                      ? "bg-[#1A1A1A] border-white/10"
                      : "bg-[#FF0040]/5 border-[#FF0040]/20"
                  }`}
                >
                  <div className="p-4 flex items-start gap-4">
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.name}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <Icon className={`w-4 h-4 mt-1 flex-shrink-0 ${notification.color}`} />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-semibold">{notification.user.name}</span>{" "}
                            <span className="text-white/70">{notification.content}</span>
                          </p>
                          <span className="text-xs text-white/60">{notification.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
                          title="Marcar como lida"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-colors duration-300 text-white/60 hover:text-red-500"
                        title="Excluir"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
