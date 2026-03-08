import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Sparkles, MapPin, Clock, Bell, ChevronRight, Battery, Zap } from 'lucide-react';
import { Food, BatteryData } from '../types';
import { foods } from '../data/foods';

interface DashboardProps {
  battery: BatteryData;
  onRandomClick: () => void;
  onFoodClick: (food: Food) => void;
  onSeeAll: (type: 'recommended' | 'trending') => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
}

export default function Dashboard({ 
  battery, 
  onRandomClick, 
  onFoodClick,
  onSeeAll,
  notificationsEnabled,
  onToggleNotifications
}: DashboardProps) {
  const [trending, setTrending] = useState<Food[]>([]);
  const [recommended, setRecommended] = useState<Food[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bannerIndex, setBannerIndex] = useState(0);

  const bannerFoods = foods.filter(f => f.trending).slice(0, 3);

  const [activeTimeOfDay, setActiveTimeOfDay] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setBannerIndex(prev => (prev + 1) % bannerFoods.length);
    }, 3000);
    return () => clearInterval(bannerTimer);
  }, [bannerFoods.length]);

  useEffect(() => {
    // Get trending
    setTrending([...foods].filter(f => f.trending).slice(0, 4));
    
    // Get recommended based on time
    const hours = currentTime.getHours();
    let timeOfDay = 'malam';
    if (hours >= 5 && hours < 11) timeOfDay = 'pagi';
    else if (hours >= 11 && hours < 15) timeOfDay = 'siang';
    else if (hours >= 15 && hours < 18) timeOfDay = 'sore';
    else if (hours >= 18 && hours < 22) timeOfDay = 'malam';
    else timeOfDay = 'tengah_malam';
    
    if (timeOfDay !== activeTimeOfDay) {
      const recs = foods.filter(f => 
        f.cocok_waktu.includes(timeOfDay)
      ).sort(() => Math.random() - 0.5).slice(0, 8);
      setRecommended(recs);
      setActiveTimeOfDay(timeOfDay);
    }
  }, [currentTime, activeTimeOfDay]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 10) return "🌅 Pagi yang lapar!";
    if (hour >= 10 && hour < 14) return "☀️ Waktunya makan siang!";
    if (hour >= 14 && hour < 17) return "🌤️ Cemilan sore yuk~";
    if (hour >= 17 && hour < 20) return "🌑 Dinner time bestie!";
    if (hour >= 20 && hour < 24) return "🌙 Makan malam dulu~";
    return "🌃 Laper tengah malam?";
  };

  return (
    <div className="pb-8">
      {/* Header */}
      <header className="bg-white dark:bg-[#1E293B] px-6 pt-8 pb-4 space-y-4 transition-colors duration-300">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-400">Halo, mau makan apa? 👋</p>
            <h1 className="text-xl font-bold text-white">{getGreeting()}</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onToggleNotifications}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all relative ${notificationsEnabled ? 'bg-[#1A9E5C]/10 text-[#1A9E5C] border-[#1A9E5C]/20' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 border-black/5 dark:border-white/5'}`}
            >
              <Bell size={20} />
              {notificationsEnabled && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1E293B]"></span>}
            </button>
          </div>
        </div>

        {/* Context Chips */}
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-full text-[10px] font-bold text-[#1A9E5C] whitespace-nowrap">
            <MapPin size={12} />
            Malang
          </div>
          
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-bold text-gray-600 dark:text-gray-400 whitespace-nowrap">
            <Clock size={12} />
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-[10px] font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
            {battery.isCharging ? <Zap size={12} className="text-yellow-500" /> : <Battery size={12} />}
            {battery.level}%
          </div>
        </div>
      </header>

      <div className="px-6 space-y-8 mt-4">
        {/* Banner Carousel */}
        <section className="relative h-52 rounded-[32px] overflow-hidden shadow-xl shadow-[#1A9E5C]/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={bannerIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => onFoodClick(bannerFoods[bannerIndex])}
            >
              <img 
                src={bannerFoods[bannerIndex].foto_url} 
                alt={bannerFoods[bannerIndex].nama} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-[#22C56E] text-[10px] font-bold uppercase tracking-widest mb-1">Rekomendasi Hari Ini</span>
                <h2 className="text-white text-2xl font-bold leading-tight">{bannerFoods[bannerIndex].nama}</h2>
                <div className="flex items-center gap-1 text-white/70 text-[10px] mt-1">
                  <MapPin size={10} />
                  <span>{bannerFoods[bannerIndex].cabang.length} lokasi di Malang</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-6 flex gap-1.5">
            {bannerFoods.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${i === bannerIndex ? 'w-4 bg-[#22C56E]' : 'w-1.5 bg-white/50'}`} 
              />
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <h3 className="font-bold text-lg flex items-center gap-2 dark:text-white">
                <Sparkles size={18} className="text-yellow-500" />
                Cocok Buat Sekarang
              </h3>
              <p className="text-[10px] text-gray-400 font-medium italic">Rekomendasi AI buat anak Malang 🕐</p>
            </div>
            <button 
              onClick={() => onSeeAll('recommended')}
              className="flex items-center gap-1 text-[10px] font-bold text-[#1A9E5C] uppercase tracking-widest"
            >
              Lihat Semua <ChevronRight size={12} />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {recommended.map(food => (
              <div key={food.id} className="min-w-[160px]">
                <FoodCard food={food} onClick={() => onFoodClick(food)} />
              </div>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg flex items-center gap-2 dark:text-white">
              <TrendingUp size={18} className="text-[#1A9E5C]" />
              Lagi Trending 🔥
            </h3>
            <button 
              onClick={() => onSeeAll('trending')}
              className="flex items-center gap-1 text-[10px] font-bold text-[#1A9E5C] uppercase tracking-widest"
            >
              Lihat Semua <ChevronRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {trending.map(food => (
              <FoodCard key={food.id} food={food} onClick={() => onFoodClick(food)} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function FoodCard({ food, onClick }: { food: Food, onClick: () => void, key?: React.Key }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="bg-white dark:bg-[#1E293B] rounded-[24px] overflow-hidden shadow-sm border border-black/5 dark:border-white/5 cursor-pointer transition-colors duration-300"
    >
      <div className="relative h-32">
        <img src={food.foto_url} alt={food.nama} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-[#1A9E5C]">
          ⭐ {food.rating}
        </div>
      </div>
      <div className="p-3 space-y-1">
        <h4 className="font-bold text-sm truncate dark:text-white">{food.nama}</h4>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-medium">{food.cabang.length} Cabang</span>
        </div>
      </div>
    </motion.div>
  );
}
