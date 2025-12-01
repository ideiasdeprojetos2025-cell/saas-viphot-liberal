"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Grid, User, Sparkles, Send } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const links = [
    { href: "/", icon: Home, label: "Início" },
    { href: "/criar", icon: PlusCircle, label: "Criar", action: () => setIsPublishModalOpen(true) },
    { href: "/feed", icon: Grid, label: "Feed" },
    { href: "/perfil", icon: User, label: "Perfil" },
  ];

  const handleLinkClick = (link: typeof links[0], e: React.MouseEvent) => {
    if (link.action) {
      e.preventDefault();
      link.action();
      // Dispara evento customizado para abrir modal na página de perfil
      window.dispatchEvent(new CustomEvent('openPublishModal'));
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-lg border-b border-[#FF0040]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Sparkles className="w-8 h-8 text-[#FF0040] group-hover:scale-110 transition-transform duration-300" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FF0040] to-[#FF4060] bg-clip-text text-transparent">
                VipHot Liberal
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link, e)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-[#FF0040]/20 text-[#FF0040]"
                        : "text-white/70 hover:text-[#FF0040] hover:bg-[#FF0040]/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-lg border-t border-[#FF0040]/20">
        <div className="flex items-center justify-around px-4 py-3">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(link, e)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-[#FF0040]"
                    : "text-white/70"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "scale-110" : ""} transition-transform duration-300`} />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
