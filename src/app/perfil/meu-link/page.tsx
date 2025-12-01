"use client";

import { Navbar } from "@/components/custom/navbar";
import { Link2, Copy, Check, Share2, QrCode, ExternalLink, ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import QRCodeStyling from "qr-code-styling";

export default function MeuLinkPage() {
  const [profile, setProfile] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [username, setUsername] = useState("");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [qrCode, setQrCode] = useState<any>(null);

  useEffect(() => {
    const savedProfile = localStorage.getItem("viphot-profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(parsed);
      
      // Gerar username a partir do nome (se não existir)
      const savedUsername = localStorage.getItem("viphot-username");
      if (savedUsername) {
        setUsername(savedUsername);
      } else {
        const generatedUsername = parsed.name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, "")
          .substring(0, 20);
        setUsername(generatedUsername);
        localStorage.setItem("viphot-username", generatedUsername);
      }
    }
  }, []);

  useEffect(() => {
    if (username && typeof window !== "undefined") {
      const profileUrl = `${window.location.origin}/creator/${username}`;
      
      const qr = new QRCodeStyling({
        width: 300,
        height: 300,
        data: profileUrl,
        dotsOptions: {
          color: "#FF0040",
          type: "rounded"
        },
        backgroundOptions: {
          color: "#1A1A1A",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10
        },
        cornersSquareOptions: {
          color: "#FF0040",
          type: "extra-rounded"
        },
        cornersDotOptions: {
          color: "#FF0040",
          type: "dot"
        }
      });

      setQrCode(qr);

      const qrContainer = document.getElementById("qr-code-container");
      if (qrContainer) {
        qrContainer.innerHTML = "";
        qr.append(qrContainer);
      }
    }
  }, [username]);

  const profileUrl = typeof window !== "undefined" ? `${window.location.origin}/creator/${username}` : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUsername = () => {
    if (username.trim()) {
      const cleanUsername = username
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "")
        .substring(0, 20);
      
      setUsername(cleanUsername);
      localStorage.setItem("viphot-username", cleanUsername);
      setIsEditingUsername(false);
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Perfil de ${profile?.name || "Criador"}`,
          text: `Confira meu perfil exclusivo no VipHot!`,
          url: profileUrl,
        });
      } catch (error) {
        console.log("Compartilhamento cancelado");
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQR = () => {
    if (qrCode) {
      qrCode.download({
        name: `qrcode-${username}`,
        extension: "png"
      });
    }
  };

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

      <div className="pt-24 px-4 md:px-6 container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/perfil"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Perfil
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Meu Link de Divulgação</h1>
          <p className="text-white/60">Compartilhe seu perfil exclusivo com seus seguidores</p>
        </div>

        {/* Preview Card */}
        <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-20 h-20 rounded-xl object-cover ring-2 ring-[#FF0040]/50"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
              <p className="text-white/60 text-sm">{profile.bio}</p>
            </div>
          </div>

          {/* Username Editor */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white/80 mb-2 block">
              Seu Nome de Usuário
            </label>
            {isEditingUsername ? (
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-white/60">{typeof window !== "undefined" ? window.location.origin : ""}/creator/</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="flex-1 bg-transparent text-white focus:outline-none"
                    placeholder="seuusuario"
                  />
                </div>
                <button
                  onClick={handleSaveUsername}
                  className="px-6 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 transition-colors duration-300"
                >
                  Salvar
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/80">
                  {typeof window !== "undefined" ? window.location.origin : ""}/creator/<span className="text-[#FF0040] font-semibold">{username}</span>
                </div>
                <button
                  onClick={() => setIsEditingUsername(true)}
                  className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300"
                >
                  Editar
                </button>
              </div>
            )}
          </div>

          {/* Link Display */}
          <div className="mb-6">
            <label className="text-sm font-semibold text-white/80 mb-2 block">
              Link Completo
            </label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/80 font-mono text-sm overflow-x-auto">
                {profileUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="px-6 py-3 bg-[#FF0040] rounded-xl font-semibold hover:bg-[#FF0040]/90 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar Link
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={handleShareNative}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
              Compartilhar
            </button>
            
            <Link
              href={`/creator/${username}`}
              target="_blank"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5" />
              Perfil Público
            </Link>

            <Link
              href="/perfil/preview"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-[#FF0040] rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              <Eye className="w-5 h-5" />
              Visão Assinante
            </Link>

            <button
              onClick={handleDownloadQR}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
            >
              <QrCode className="w-5 h-5" />
              Baixar QR Code
            </button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="rounded-2xl bg-[#1A1A1A] border border-white/10 p-6 md:p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF0040]/10 rounded-2xl mb-4">
              <QrCode className="w-8 h-8 text-[#FF0040]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">QR Code do Seu Perfil</h3>
            <p className="text-white/60 mb-6">
              Compartilhe este QR Code em suas redes sociais ou imprima para divulgar seu perfil
            </p>
            
            <div className="flex justify-center mb-6">
              <div 
                id="qr-code-container"
                className="p-6 bg-[#1A1A1A] rounded-2xl border-2 border-white/10"
              ></div>
            </div>

            <p className="text-sm text-white/60">
              Escaneie o QR Code com a câmera do celular para acessar o perfil
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#FF0040]/10 to-purple-500/10 border border-[#FF0040]/20 p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-[#FF0040]" />
            Dicas para Divulgar Seu Link
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <span className="text-[#FF0040] mt-1">•</span>
              <span>Adicione o link na bio das suas redes sociais (Instagram, Twitter, TikTok)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF0040] mt-1">•</span>
              <span>Compartilhe nos seus stories e posts para alcançar mais seguidores</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF0040] mt-1">•</span>
              <span>Use o QR Code em materiais impressos ou apresentações</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF0040] mt-1">•</span>
              <span>Personalize seu username para algo fácil de lembrar e digitar</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
