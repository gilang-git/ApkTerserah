import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Heart, MapPin, Clock, Star, ExternalLink, Navigation, Share2, RefreshCw } from 'lucide-react';
import { Food, Branch } from '../types';
import { LocationService, Position } from '../services/locationService';

interface FoodDetailProps {
  food: Food;
  onBack: () => void;
  onRandomize: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  darkMode: boolean;
}

export default function FoodDetail({ food, onBack, onRandomize, isFavorite, onToggleFavorite, darkMode }: FoodDetailProps) {
  const [userLocation, setUserLocation] = useState<Position | null>(null);

  useEffect(() => {
    LocationService.getUserLocation().then(setUserLocation);
  }, []);

  const handleNavigate = (branch: Branch) => {
    LocationService.openBestAvailable(branch);
  };

  const calculateDistance = (branch: Branch) => {
    if (!userLocation) return null;
    return LocationService.calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      branch.lat,
      branch.lon
    ).toFixed(1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: food.nama,
          text: `Cek kuliner mantap di Malang: ${food.nama}. ${food.deskripsi}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${food.nama} - Cek di Terserah App: ${window.location.href}`);
      alert('Link disalin ke clipboard!');
    }
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F4FAF6]'}`}>
      {/* Hero Image */}
      <div className="relative h-96">
        <img src={food.foto_url} alt={food.nama} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-b from-black/50 via-transparent ${darkMode ? 'to-[#0F172A]' : 'to-[#F4FAF6]'}`}></div>
        
        {/* Top Buttons */}
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <button 
            onClick={onBack}
            className="p-3 bg-white/30 backdrop-blur-xl rounded-2xl text-white hover:bg-white/50 transition-all border border-white/20"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handleShare}
              className="p-3 bg-white/30 backdrop-blur-xl rounded-2xl text-white hover:bg-white/50 transition-all border border-white/20"
            >
              <Share2 size={24} />
            </button>
            <button 
              onClick={() => onToggleFavorite(food.id)}
              className={`p-3 backdrop-blur-xl rounded-2xl transition-all border border-white/20 ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-white/30 text-white hover:bg-white/50'
              }`}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-20 relative z-10">
        <div className={`rounded-[40px] p-8 shadow-2xl shadow-black/5 space-y-8 transition-colors ${darkMode ? 'bg-[#1E293B]' : 'bg-white'}`}>
          {/* Title & Rating */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h1 className={`text-3xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>{food.nama}</h1>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl border ${darkMode ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-yellow-50 border-yellow-100 text-yellow-700'}`}>
                  <Star size={16} className="fill-yellow-500" />
                  <span className="text-sm font-bold">{food.rating}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">1.2rb+ ulasan</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {food.tags.map(tag => (
              <span key={tag} className={`text-[10px] px-4 py-2 rounded-xl font-bold border ${darkMode ? 'bg-white/5 text-gray-400 border-white/5' : 'bg-gray-50 text-gray-500 border-black/5'}`}>#{tag}</span>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className={`font-bold flex items-center gap-2 text-lg ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>
              <ExternalLink size={20} className="text-[#1A9E5C]" />
              Kenapa Harus Coba?
            </h3>
            <p className={`text-sm leading-relaxed italic p-4 rounded-2xl border-l-4 border-[#1A9E5C] ${darkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
              "{food.deskripsi}"
            </p>
          </div>

          {/* Branches List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>Lokasi Cabang</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{food.cabang.length} Cabang</span>
            </div>
            
            <div className="space-y-4">
              {food.cabang.map((branch, index) => (
                <div key={index} className={`rounded-3xl p-5 border space-y-4 transition-colors ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>{branch.nama}</p>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <MapPin size={12} />
                        <p className="text-xs">{branch.alamatLengkap}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center justify-between pt-2 border-t ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={14} />
                      <span className="text-[10px] font-medium">{branch.jam_buka}</span>
                    </div>
                    <button 
                      onClick={() => handleNavigate(branch)}
                      className="bg-[#1A9E5C] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#1A9E5C]/20 active:scale-95 transition-transform"
                    >
                      <MapPin size={14} />
                      Lihat Lokasi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Randomize Button */}
          <button 
            onClick={onRandomize}
            className={`w-full py-6 font-bold flex items-center justify-center gap-2 transition-all border-t ${darkMode ? 'text-gray-500 border-white/5 hover:text-[#1A9E5C]' : 'text-gray-400 border-black/5 hover:text-[#1A9E5C]'}`}
          >
            <RefreshCw size={18} className="animate-spin-slow" />
            Ganti Makanan Lain
          </button>
        </div>
      </div>
    </div>
  );
}
