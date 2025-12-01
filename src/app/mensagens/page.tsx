"use client";

import { Navbar } from "@/components/custom/navbar";
import { Send, Search, MoreVertical, Phone, Video, Image as ImageIcon, Smile, Paperclip } from "lucide-react";
import { useState } from "react";

const mockConversations = [
  {
    id: "1",
    name: "Sofia Martins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Obrigada pelo apoio! 💖",
    timestamp: "2 min",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Luna Silva",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "Quando vai postar novo conteúdo?",
    timestamp: "15 min",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Mia Costa",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    lastMessage: "Adorei seu último post!",
    timestamp: "1h",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "Ana Oliveira",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    lastMessage: "Você está online?",
    timestamp: "3h",
    unread: 1,
    online: false,
  },
];

const mockMessages = [
  {
    id: "1",
    senderId: "other",
    text: "Oi! Adorei seu conteúdo recente 😍",
    timestamp: "10:30",
  },
  {
    id: "2",
    senderId: "me",
    text: "Muito obrigada! Fico feliz que tenha gostado 💖",
    timestamp: "10:32",
  },
  {
    id: "3",
    senderId: "other",
    text: "Quando vai postar mais?",
    timestamp: "10:33",
  },
  {
    id: "4",
    senderId: "me",
    text: "Em breve! Estou preparando algo especial 🔥",
    timestamp: "10:35",
  },
  {
    id: "5",
    senderId: "other",
    text: "Mal posso esperar! 🤩",
    timestamp: "10:36",
  },
];

export default function MensagensPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      console.log("Enviando mensagem:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-0">
      <Navbar />

      <div className="pt-20 h-screen flex">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 flex gap-4 h-[calc(100vh-5rem)]">
          {/* Sidebar - Lista de Conversas */}
          <div className="w-full md:w-80 lg:w-96 flex flex-col rounded-2xl bg-[#1A1A1A] border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
              <h1 className="text-2xl font-bold mb-4">Mensagens</h1>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar conversas..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-all duration-300 border-l-4 ${
                    selectedConversation.id === conversation.id
                      ? "bg-white/5 border-[#FF0040]"
                      : "border-transparent"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conversation.avatar}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-[#1A1A1A]" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold truncate">{conversation.name}</h3>
                      <span className="text-xs text-white/60 whitespace-nowrap ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="w-6 h-6 bg-[#FF0040] rounded-full flex items-center justify-center text-xs font-bold">
                      {conversation.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex flex-1 flex-col rounded-2xl bg-[#1A1A1A] border border-white/10 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-[#1A1A1A]" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold">{selectedConversation.name}</h2>
                  <p className="text-sm text-white/60">
                    {selectedConversation.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300">
                  <Video className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-md px-4 py-3 rounded-2xl ${
                      message.senderId === "me"
                        ? "bg-[#FF0040] text-white"
                        : "bg-white/5 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10">
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    rows={1}
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 bottom-3 text-white/40 hover:text-white transition-colors duration-300"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="w-10 h-10 rounded-xl bg-[#FF0040] hover:bg-[#FF0040]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
