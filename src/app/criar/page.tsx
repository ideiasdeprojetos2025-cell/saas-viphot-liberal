"use client";

import { Navbar } from "@/components/custom/navbar";
import { useState } from "react";
import { Upload, Image as ImageIcon, Lock, Globe, Sparkles, X, Video, Play } from "lucide-react";

export default function CriarPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExclusive, setIsExclusive] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
      if (!previewImage && newImages.length > 0) {
        setPreviewImage(newImages[0]);
      }
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newVideos = Array.from(files).map(file => URL.createObjectURL(file));
      setVideos([...videos, ...newVideos]);
      if (!previewVideo && newVideos.length > 0) {
        setPreviewVideo(newVideos[0]);
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    if (previewImage === images[index]) {
      setPreviewImage(newImages[0] || null);
    }
  };

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
    if (previewVideo === videos[index]) {
      setPreviewVideo(newVideos[0] || null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de submit
    console.log({ title, description, isExclusive, images, videos });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white pb-24 md:pb-8">
      <Navbar />

      <div className="pt-24 md:pt-32 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF0040]/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#FF0040]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Criar Conteúdo</h1>
                <p className="text-white/60">Compartilhe suas aventuras com o mundo</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Cover Image/Video Upload */}
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border-2 border-dashed border-white/20 hover:border-[#FF0040]/50 transition-all duration-300">
              {previewVideo ? (
                <div className="relative w-full h-full">
                  <video
                    src={previewVideo}
                    className="w-full h-full object-cover"
                    controls
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#FF0040]/90 backdrop-blur-sm rounded-lg text-sm font-semibold flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    VÍDEO
                  </div>
                </div>
              ) : previewImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <label className="absolute inset-0 flex items-center justify-center cursor-pointer group">
                    <div className="px-6 py-3 bg-[#FF0040]/90 rounded-xl font-semibold group-hover:bg-[#FF0040] transition-colors duration-300">
                      Alterar Mídia
                    </div>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files) {
                          Array.from(files).forEach(file => {
                            if (file.type.startsWith('image/')) {
                              handleImageUpload(e);
                            } else if (file.type.startsWith('video/')) {
                              handleVideoUpload(e);
                            }
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full cursor-pointer group">
                  <Upload className="w-12 h-12 text-[#FF0040] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-lg font-semibold mb-2">Upload de Imagem ou Vídeo</span>
                  <span className="text-sm text-white/60 text-center px-4">
                    Clique ou arraste suas imagens e vídeos aqui
                  </span>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="px-4 py-2 bg-white/5 rounded-lg text-sm flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Imagens
                    </div>
                    <div className="px-4 py-2 bg-white/5 rounded-lg text-sm flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Vídeos
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        Array.from(files).forEach(file => {
                          const reader = new FileReader();
                          reader.onload = () => {
                            const url = URL.createObjectURL(file);
                            if (file.type.startsWith('image/')) {
                              setImages(prev => [...prev, url]);
                              if (!previewImage) setPreviewImage(url);
                            } else if (file.type.startsWith('video/')) {
                              setVideos(prev => [...prev, url]);
                              if (!previewVideo) setPreviewVideo(url);
                            }
                          };
                          reader.readAsDataURL(file);
                        });
                      }
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Media Gallery */}
            {(images.length > 0 || videos.length > 0) && (
              <div className="space-y-4">
                {/* Images */}
                {images.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Imagens ({images.length})
                    </h3>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                          onClick={() => setPreviewImage(img)}
                        >
                          <img
                            src={img}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 ring-2 ${previewImage === img ? 'ring-[#FF0040]' : 'ring-transparent'} transition-all duration-300`} />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {videos.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Vídeos ({videos.length})
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {videos.map((vid, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer"
                          onClick={() => setPreviewVideo(vid)}
                        >
                          <video
                            src={vid}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white" />
                          </div>
                          <div className={`absolute inset-0 ring-2 ${previewVideo === vid ? 'ring-[#FF0040]' : 'ring-transparent'} transition-all duration-300`} />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeVideo(index);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/80">Título</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dê um título atrativo para seu conteúdo"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/80">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conte sua história, descreva sua aventura..."
                rows={6}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#FF0040]/50 focus:bg-white/10 transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Content Type Toggle */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {isExclusive ? (
                    <div className="w-10 h-10 rounded-xl bg-[#FF0040]/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-[#FF0040]" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white/60" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">
                      {isExclusive ? "Conteúdo Exclusivo" : "Conteúdo Gratuito"}
                    </div>
                    <div className="text-sm text-white/60">
                      {isExclusive
                        ? "Apenas para assinantes premium"
                        : "Visível para todos os usuários"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExclusive(!isExclusive)}
                  className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                    isExclusive ? "bg-[#FF0040]" : "bg-white/20"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                      isExclusive ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Preview Badge */}
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-sm text-white/60 mb-2">Preview no Feed:</div>
                <div className="flex items-center gap-2">
                  {isExclusive ? (
                    <div className="px-3 py-1.5 bg-[#FF0040]/20 border border-[#FF0040]/50 rounded-lg text-sm font-semibold text-[#FF0040] flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      EXCLUSIVO
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white/80 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      GRATUITO
                    </div>
                  )}
                  {videos.length > 0 && (
                    <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm font-semibold text-white/80 flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      VÍDEO
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-[#FF0040] to-[#FF4060] rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-[#FF0040]/50 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Publicar Conteúdo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
