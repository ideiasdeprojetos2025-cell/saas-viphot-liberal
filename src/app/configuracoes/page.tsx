"use client";

import { Navbar } from "@/components/custom/navbar";
import { User, Lock, Bell, CreditCard, Shield, Globe, Eye, EyeOff, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ConfiguracoesPage() {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("perfil");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newFollowers: true,
    newComments: true,
    newLikes: false,
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("viphot-profile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSaveProfile = () => {
    if (profile) {
      localStorage.setItem("viphot-profile", JSON.stringify(profile));
      alert("Perfil atualizado com sucesso!");
    }
  };

  const handleSaveNotifications = () => {
    localStorage.setItem("viphot-notifications", JSON.stringify(notifications));
    alert("Preferências de notificação salvas!");
  };

  const tabs = [
    { id: "perfil", label: "Perfil", icon: User },
    { id: "seguranca", label: "Segurança", icon: Lock },
    { id: "notificacoes", label: "Notificações", icon: Bell },
    { id: "privacidade", label: "Privacidade", icon: Shield },
  ];

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF0040] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      <div className="pt-24 px-4 md:px-6 container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/perfil"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Perfil
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Configurações</h1>
          <p className="text-white/60">Gerencie suas preferências e configurações da conta</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de Tabs */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-[#FF0040] text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6 md:p-8">
              {/* Tab: Perfil */}
              {activeTab === "perfil" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Informações do Perfil</h2>
                    <p className="text-white/60 text-sm">Atualize suas informações pessoais</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-white/80 mb-2 block">Nome</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-white/80 mb-2 block">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300 resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-white/80 mb-2 block">Localização</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-white/80 mb-2 block">Email</label>
                      <input
                        type="email"
                        value={profile.email || "criador@teste.com"}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="w-full md:w-auto px-8 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                  </button>
                </div>
              )}

              {/* Tab: Segurança */}
              {activeTab === "seguranca" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Segurança da Conta</h2>
                    <p className="text-white/60 text-sm">Gerencie senha e autenticação</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-white/80 mb-2 block">Senha Atual</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-300"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-white/80 mb-2 block">Nova Senha</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-white/80 mb-2 block">Confirmar Nova Senha</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#FF0040]/10 border border-[#FF0040]/30 p-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-[#FF0040]" />
                      Autenticação de Dois Fatores
                    </h3>
                    <p className="text-sm text-white/70 mb-3">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                    <button className="px-6 py-2 bg-[#FF0040] rounded-lg font-semibold text-sm hover:bg-[#FF0040]/90 transition-colors duration-300">
                      Ativar 2FA
                    </button>
                  </div>

                  <button className="w-full md:w-auto px-8 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 transition-all duration-300 flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Atualizar Senha
                  </button>
                </div>
              )}

              {/* Tab: Notificações */}
              {activeTab === "notificacoes" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Preferências de Notificação</h2>
                    <p className="text-white/60 text-sm">Escolha como deseja ser notificado</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <h3 className="font-semibold mb-1">Notificações por Email</h3>
                        <p className="text-sm text-white/60">Receba atualizações por email</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                          notifications.email ? "bg-[#FF0040]" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            notifications.email ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <h3 className="font-semibold mb-1">Notificações Push</h3>
                        <p className="text-sm text-white/60">Receba notificações no navegador</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                          notifications.push ? "bg-[#FF0040]" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            notifications.push ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <h3 className="font-semibold mb-1">Novos Seguidores</h3>
                        <p className="text-sm text-white/60">Quando alguém começar a seguir você</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, newFollowers: !notifications.newFollowers })}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                          notifications.newFollowers ? "bg-[#FF0040]" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            notifications.newFollowers ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <h3 className="font-semibold mb-1">Novos Comentários</h3>
                        <p className="text-sm text-white/60">Quando comentarem em seus posts</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, newComments: !notifications.newComments })}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                          notifications.newComments ? "bg-[#FF0040]" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            notifications.newComments ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <h3 className="font-semibold mb-1">Curtidas</h3>
                        <p className="text-sm text-white/60">Quando curtirem seu conteúdo</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, newLikes: !notifications.newLikes })}
                        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                          notifications.newLikes ? "bg-[#FF0040]" : "bg-white/20"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                            notifications.newLikes ? "translate-x-7" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveNotifications}
                    className="w-full md:w-auto px-8 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Salvar Preferências
                  </button>
                </div>
              )}

              {/* Tab: Privacidade */}
              {activeTab === "privacidade" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Privacidade e Dados</h2>
                    <p className="text-white/60 text-sm">Controle quem pode ver seu conteúdo</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="font-semibold mb-2">Visibilidade do Perfil</h3>
                      <p className="text-sm text-white/60 mb-3">Quem pode ver seu perfil público</p>
                      <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300">
                        <option value="public">Público (todos)</option>
                        <option value="followers">Apenas seguidores</option>
                        <option value="subscribers">Apenas assinantes</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="font-semibold mb-2">Mensagens Diretas</h3>
                      <p className="text-sm text-white/60 mb-3">Quem pode enviar mensagens para você</p>
                      <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF0040]/50 transition-all duration-300">
                        <option value="everyone">Qualquer pessoa</option>
                        <option value="followers">Apenas seguidores</option>
                        <option value="subscribers">Apenas assinantes</option>
                        <option value="none">Ninguém</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                      <h3 className="font-semibold mb-2 text-red-400">Zona de Perigo</h3>
                      <p className="text-sm text-white/60 mb-3">Ações irreversíveis</p>
                      <div className="space-y-2">
                        <button className="w-full px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl font-semibold text-red-400 hover:bg-red-500/30 transition-all duration-300">
                          Desativar Conta Temporariamente
                        </button>
                        <button className="w-full px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-xl font-semibold text-red-400 hover:bg-red-500/30 transition-all duration-300">
                          Excluir Conta Permanentemente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
