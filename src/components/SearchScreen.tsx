import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, X, Filter, ChevronRight, MapPin } from 'lucide-react';
import { foods } from '../data/foods';
import { Food } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface SearchScreenProps {
  onFoodClick: (food: Food) => void;
}

export default function SearchScreen({ onFoodClick }: SearchScreenProps) {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const categories = [
    "Semua", "Mie", "Nasi", "Bakso", "Soto", "Ayam", "Pedas",
    "Nasgor", "Seafood", "Bebek", "Sate", "Rawon",
    "Pecel", "Es/Cold", "Kopi", "Boba", "Ramen",
    "Korean", "Western", "Sarapan", "Malam", "Rice Box",
    "Lalapan", "Bakar", "Goreng", "Berkuah", "UMKM"
  ];

  const filteredFoods = foods.filter(f => {
    const matchesQuery = f.nama.toLowerCase().includes(query.toLowerCase()) ||
                        f.jenis.some(j => j.toLowerCase().includes(query.toLowerCase())) ||
                        f.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
    
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.includes("Semua") ||
                          selectedFilters.some(filter => 
                            f.jenis.some(j => j.toLowerCase() === filter.toLowerCase()) ||
                            f.tags.some(t => t.toLowerCase() === filter.toLowerCase())
                          );
    
    return matchesQuery && matchesFilters;
  });

  const toggleFilter = (filter: string) => {
    if (filter === "Semua") {
      setSelectedFilters([]);
      return;
    }
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="bg-[#F4FAF6] dark:bg-[#0F172A] min-h-screen pb-24 transition-colors duration-300">
      {/* Search Header */}
      <div className="bg-white dark:bg-[#1E293B] px-6 pt-8 pb-6 space-y-4 shadow-sm border-b border-black/5 dark:border-white/5 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">Cari Kuliner 🔍</h1>
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mau makan apa hari ini?"
            className="w-full bg-gray-50 dark:bg-gray-800 border border-black/5 dark:border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-[#1A9E5C] transition-all outline-none dark:text-white"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <FilterChip 
                key={cat} 
                label={cat} 
                active={selectedFilters.includes(cat)} 
                onClick={() => toggleFilter(cat)} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <section className="px-6 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-gray-400 uppercase tracking-widest">
            {query || selectedFilters.length > 0 ? 'Hasil Pencarian' : 'Rekomendasi Buat Kamu'}
          </h3>
          <span className="text-[10px] font-bold text-gray-400 bg-white dark:bg-[#1E293B] px-2 py-1 rounded-lg border border-black/5 dark:border-white/5 shadow-sm">
            {filteredFoods.length} ditemukan
          </span>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((food, index) => (
                <motion.div 
                  key={food.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onFoodClick(food)}
                  className="bg-white dark:bg-[#1E293B] p-4 rounded-3xl flex gap-4 items-center shadow-sm border border-black/5 dark:border-white/5 active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <div className="relative">
                    <img src={food.foto_url} className="w-20 h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                    <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded-lg shadow-sm border border-black/5 dark:border-white/5 text-[8px] font-bold text-[#1A9E5C]">
                      ⭐ {food.rating}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-sm text-[#1A1A2E] dark:text-white">{food.nama}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                        <MapPin size={10} />
                        {food.cabang.length} Cabang
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {food.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[8px] text-gray-400">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1A9E5C] transition-colors" />
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="text-6xl">😕</div>
                <div className="space-y-1">
                  <p className="font-bold text-gray-500">Yah, tidak ketemu...</p>
                  <p className="text-xs text-gray-400">Coba cari kata kunci lain atau hapus filter.</p>
                </div>
                <button 
                  onClick={() => { setQuery(''); setSelectedFilters([]); }}
                  className="text-sm font-bold text-[#1A9E5C] underline"
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

function FilterChip({ label, active, onClick, variant = 'category' }: { label: string, active: boolean, onClick: () => void, variant?: 'category' | 'budget', key?: React.Key }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
        active 
          ? 'bg-[#1A9E5C] text-white border-[#1A9E5C] shadow-md shadow-[#1A9E5C]/20' 
          : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-black/5 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );
}
