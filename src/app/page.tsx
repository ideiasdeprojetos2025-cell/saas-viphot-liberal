"use client";

import { useState } from "react";
import { Flame, Video, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [selectedType, setSelectedType] = useState<"criador" | "assinante" | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex">
      {/* Coluna Esquerda - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1A1A1A] to-[#0B0B0B] p-12 flex-col justify-center items-center relative overflow-hidden border-r border-[#FF0040]/20">
        {/* Efeitos de fundo neon */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#FF0040] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FF0040] rounded-full blur-[150px]"></div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Flame className="w-16 h-16 text-[#FF0040] drop-shadow-[0_0_15px_rgba(255,0,64,0.8)]" />
            <h1 className="text-6xl font-bold text-white tracking-tight">
              VipHot <span className="text-[#FF0040]">Liberal</span>
            </h1>
          </div>
          
          <h2 className="text-4xl font-bold text-white leading-tight">
            Bem-vindo à sua<br />
            plataforma de conteúdo<br />
            <span className="text-[#FF0040]">exclusivo</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-md mx-auto">
            Conecte criadores e fãs em uma experiência única e premium
          </p>

          <div className="flex items-center justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF0040]">10K+</div>
              <div className="text-gray-400">Criadores</div>
            </div>
            <div className="w-px h-12 bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF0040]">50K+</div>
              <div className="text-gray-400">Assinantes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna Direita - Formulário de Acesso */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Mobile */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Flame className="w-12 h-12 text-[#FF0040] drop-shadow-[0_0_15px_rgba(255,0,64,0.8)]" />
            <h1 className="text-4xl font-bold text-white">
              VipHot <span className="text-[#FF0040]">Liberal</span>
            </h1>
          </div>

          {/* Título */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">
              Escolha seu perfil
            </h2>
            <p className="text-gray-400">
              Selecione como você deseja acessar a plataforma
            </p>
          </div>

          {/* Opções de Perfil */}
          <div className="space-y-4">
            {/* Opção Criador */}
            <button
              onClick={() => setSelectedType("criador")}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                selectedType === "criador"
                  ? "border-[#FF0040] bg-[#FF0040]/10 shadow-lg shadow-[#FF0040]/20"
                  : "border-gray-800 bg-[#1A1A1A] hover:border-[#FF0040]/50 hover:bg-[#FF0040]/5"
              }`}
            >
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                selectedType === "criador" ? "bg-[#FF0040]" : "bg-gray-800"
              }`}>
                <Video className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-white mb-1">
                  Sou Criador de Conteúdo
                </h3>
                <p className="text-sm text-gray-400">
                  Publique e monetize suas aventuras
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedType === "criador"
                  ? "border-[#FF0040] bg-[#FF0040]"
                  : "border-gray-600"
              }`}>
                {selectedType === "criador" && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
            </button>

            {/* Opção Assinante */}
            <button
              onClick={() => setSelectedType("assinante")}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                selectedType === "assinante"
                  ? "border-[#FF0040] bg-[#FF0040]/10 shadow-lg shadow-[#FF0040]/20"
                  : "border-gray-800 bg-[#1A1A1A] hover:border-[#FF0040]/50 hover:bg-[#FF0040]/5"
              }`}
            >
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                selectedType === "assinante" ? "bg-[#FF0040]" : "bg-gray-800"
              }`}>
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-white mb-1">
                  Sou Assinante
                </h3>
                <p className="text-sm text-gray-400">
                  Acesse conteúdo exclusivo premium
                </p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedType === "assinante"
                  ? "border-[#FF0040] bg-[#FF0040]"
                  : "border-gray-600"
              }`}>
                {selectedType === "assinante" && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
            </button>
          </div>

          {/* Usuários de Teste */}
          {selectedType && (
            <div className="p-6 rounded-xl bg-[#1A1A1A] border border-gray-800 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#FF0040]" />
                Usuários de Teste
              </h3>
              
              {selectedType === "criador" ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[#0B0B0B] border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">Criador</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-[#FF0040]/20 text-[#FF0040] border border-[#FF0040]/30">
                        Teste
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div>Email: <span className="text-white">criador@teste.com</span></div>
                      <div>Senha: <span className="text-white">criador123</span></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[#0B0B0B] border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">Assinante</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-[#FF0040]/20 text-[#FF0040] border border-[#FF0040]/30">
                        Teste
                      </span>
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      <div>Email: <span className="text-white">assinante@teste.com</span></div>
                      <div>Senha: <span className="text-white">assinante123</span></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Botão de Continuar */}
          <Link
            href={selectedType === "criador" ? "/perfil" : "/feed"}
            className={`group w-full px-8 py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
              selectedType
                ? "bg-[#FF0040] hover:bg-[#FF0040]/90 hover:shadow-2xl hover:shadow-[#FF0040]/50 hover:scale-105"
                : "bg-gray-800 cursor-not-allowed opacity-50"
            }`}
            onClick={(e) => {
              if (!selectedType) {
                e.preventDefault();
              }
            }}
          >
            {selectedType ? "Continuar" : "Selecione uma opção"}
            {selectedType && (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </Link>

          {/* Link de Registro */}
          <div className="text-center text-sm text-gray-400">
            Não tem uma conta?{" "}
            <Link href="/registro" className="text-[#FF0040] hover:text-[#FF0040]/80 font-semibold transition-colors">
              Registre-se aqui
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
