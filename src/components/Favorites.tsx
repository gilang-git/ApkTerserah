import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Heart,
  Star,
  MapPin,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { Food } from '../types';
import { foods } from '../data/foods';

interface FavoritesProps {
  onBack: () => void;
  favorites: string[];
  onFoodClick: (food: Food) => void;
  toggleFavorite: (id: string) => void;
  onNavigateToSearch: () => void;
  darkMode: boolean;
}

export function Favorites({ 
  onBack, 
  favorites, 
  onFoodClick, 
  toggleFavorite,
  onNavigateToSearch,
  darkMode 
}: FavoritesProps) {
  const favoriteFoods = foods.filter(f => favorites.includes(f.id));

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F4FAF6]'}`}>
      {/* Header */}
      <div className={`px-6 pt-12 pb-6 space-y-2 shadow-sm border-b transition-colors ${darkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-black/5'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className={`p-2 rounded-xl transition-colors ${darkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-gray-100 text-[#1A1A2E]'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>Favorit Saya</h1>
        </div>
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em] pl-12">Koleksi makanan pilihanmu</p>
      </div>

      <div className="p-6 space-y-4">
        <AnimatePresence mode="popLayout">
          {favoriteFoods.length > 0 ? (
            favoriteFoods.map((food, index) => (
              <motion.div
                key={food.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-[32px] flex gap-4 items-center shadow-sm border transition-colors group bg-[#1E293B] border-white/5"
              >
                <div 
                  className="flex-1 flex gap-4 items-center cursor-pointer"
                  onClick={() => onFoodClick(food)}
                >
                  <img src={food.foto_url} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                  <div className="flex-1 space-y-1">
                    <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>{food.nama}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[10px] font-bold">{food.rating}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                        <MapPin size={10} />
                        {food.cabang.length} Cabang
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {food.tags.slice(0, 2).map(tag => (
                        <span key={tag} className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${darkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(food.id);
                  }}
                  className={`p-3 rounded-2xl transition-colors ${darkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`py-24 text-center space-y-6 rounded-[48px] border transition-colors ${darkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-black/5'}`}
            >
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-colors ${darkMode ? 'bg-white/5 text-gray-700' : 'bg-gray-50 text-gray-200'}`}>
                <Heart size={40} />
              </div>
              <div className="space-y-2">
                <p className="font-bold text-white">Belum ada favorit!</p>
                <p className="text-xs text-gray-400 px-12 leading-relaxed">
                  Klik ikon hati di detail makanan untuk menyimpan makanan yang kamu sukai di sini.
                </p>
              </div>
              <button 
                onClick={onNavigateToSearch}
                className="px-8 py-3 bg-[#1A9E5C] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[#1A9E5C]/20 active:scale-95 transition-all"
              >
                Cari Makanan
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
