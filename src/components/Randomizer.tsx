import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dice5, X, Sparkles, MapPin, Star, RefreshCw, Target, Plus, Filter } from 'lucide-react';
import { Food } from '../types';
import { foods } from '../data/foods';
import { StorageService } from '../services/storageService';

interface RandomizerProps {
  onClose: () => void;
  onSelect: (food: Food) => void;
  onNavigateToSpin?: () => void;
}

export default function Randomizer({ onClose, onSelect, onNavigateToSpin }: RandomizerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Food | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [spinWheelItems, setSpinWheelItems] = useState<string[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [filter, setFilter] = useState<'semua' | 'makanan' | 'minuman'>('semua');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, []);

  const filteredFoods = foods.filter(food => {
    if (filter === 'semua') return true;
    if (filter === 'makanan') return food.jenis.includes('makanan');
    if (filter === 'minuman') return food.jenis.includes('minuman');
    return true;
  });

  const addToSpinWheel = (name: string) => {
    setShowOptionsModal(true);
  };

  const confirmAddToSpinWheel = () => {
    if (!result) return;
    
    if (spinWheelItems.includes(result.nama)) {
      setShowOptionsModal(false);
      return;
    }
    
    const newItems = [...spinWheelItems, result.nama];
    setSpinWheelItems(newItems);
    StorageService.saveSpinWheelItems(newItems);
    setShowAddPopup(true);
    setTimeout(() => setShowAddPopup(false), 2000);
    setShowOptionsModal(false);
  };

  const startSpinning = () => {
    setHasStarted(true);
    spin();
  };

  const spin = () => {
    setIsSpinning(true);
    setResult(null);
    
    if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    
    // Shuffle the array for true randomness feel
    const shuffled = [...filteredFoods].sort(() => Math.random() - 0.5);
    let iterations = 0;
    const maxIterations = 25;
    
    spinIntervalRef.current = setInterval(() => {
      // During animation, show random items
      const tempIndex = Math.floor(Math.random() * filteredFoods.length);
      setResult(filteredFoods[tempIndex]);
      iterations++;
      
      if (iterations >= maxIterations) {
        if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
        spinIntervalRef.current = null;
        // Final result is picked from the shuffled array to ensure it's different each time
        const finalResult = shuffled[Math.floor(Math.random() * shuffled.length)];
        setResult(finalResult);
        setIsSpinning(false);
      }
    }, 80);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#1A9E5C] flex flex-col items-center justify-center p-8">
      <AnimatePresence>
        {showAddPopup && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-20 z-[110] bg-white text-[#1A9E5C] px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2"
          >
            <Plus size={18} />
            Berhasil ditambahkan!
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 bg-white/20 rounded-2xl text-white hover:bg-white/30 transition-all z-[105]"
      >
        <X size={24} />
      </button>

      {/* Filter UI */}
      <div className="absolute top-8 left-8 z-[110]">
        <button
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          className="p-3 bg-white/20 rounded-2xl text-white hover:bg-white/30 transition-all border border-white/30 flex items-center justify-center"
        >
          <Filter size={20} />
        </button>

        <AnimatePresence>
          {showFilterMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl overflow-hidden py-2"
            >
              {(['semua', 'makanan', 'minuman'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
                    spinIntervalRef.current = null;
                    setFilter(f);
                    setResult(null);
                    setHasStarted(false);
                    setIsSpinning(false);
                    setShowFilterMenu(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-wider transition-all ${
                    filter === f 
                      ? 'bg-[#1A9E5C] text-white' 
                      : 'text-[#1A9E5C] hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showOptionsModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-xs bg-white rounded-[40px] p-8 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1A9E5C] to-yellow-400"></div>
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-[#1A9E5C]/10 text-[#1A9E5C] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E]">Spin Wheel</h3>
                <p className="text-xs text-gray-400">Pilih aksi untuk daftar makananmu:</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={confirmAddToSpinWheel}
                  className="w-full py-4 bg-[#1A9E5C] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[#1A9E5C]/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  TAMBAH KE SPIN WHEEL
                </button>
                
                <button
                  disabled={spinWheelItems.length < 2}
                  onClick={onNavigateToSpin}
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                    spinWheelItems.length >= 2 
                      ? 'bg-yellow-400 text-[#1A9E5C] shadow-yellow-400/20 active:scale-95' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Target size={18} />
                  SPIN SEKARANG ({spinWheelItems.length})
                </button>

                <button
                  onClick={() => setShowOptionsModal(false)}
                  className="w-full py-3 text-gray-400 font-bold text-xs"
                >
                  TUTUP
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="text-center space-y-12 w-full max-w-xs">
        <div className="space-y-2">
          <motion.div
            animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
            transition={isSpinning ? { repeat: Infinity, duration: 0.5, ease: "linear" } : { type: "spring" }}
            className="inline-block p-6 bg-white rounded-[40px] shadow-2xl shadow-black/20"
          >
            <Dice5 size={64} className="text-[#1A9E5C]" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white pt-4">Terserah Aja Deh!</h2>
          <p className="text-white/70 text-sm font-medium">Biar AI yang pilihin buat kamu...</p>
        </div>

        <div className="relative h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!hasStarted ? (
              <motion.div
                key="start-screen"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-6"
              >
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto border-4 border-white/20 animate-pulse">
                  <Dice5 size={64} className="text-white" />
                </div>
                <button
                  onClick={startSpinning}
                  className="bg-white text-[#1A9E5C] px-10 py-4 rounded-3xl font-black text-xl shadow-2xl active:scale-95 transition-all"
                >
                  MULAI CARI!
                </button>
              </motion.div>
            ) : result && (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="bg-white rounded-[40px] p-6 w-full shadow-2xl space-y-4"
              >
                <img src={result.foto_url} className="w-full h-32 rounded-3xl object-cover shadow-sm" />
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-[#1A1A2E] text-lg leading-tight">{result.nama}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{result.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {isSpinning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {!isSpinning && result && hasStarted && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 w-full"
          >
            <div className="flex gap-3 items-center">
              <button 
                onClick={() => onSelect(result)}
                className="flex-1 bg-white text-[#1A9E5C] py-5 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Sparkles size={20} />
                Gaskeun!
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => addToSpinWheel(result.nama)}
                  className="p-5 bg-white/20 text-white rounded-2xl shadow-xl active:scale-95 transition-all border border-white/30"
                >
                  <Target size={24} />
                </button>
                {spinWheelItems.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 text-[#1A9E5C] rounded-full flex items-center justify-center text-[10px] font-black shadow-lg border-2 border-white">
                    {spinWheelItems.length}
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={spin}
              className="w-full py-2 text-white/80 font-bold flex items-center justify-center gap-2 hover:text-white transition-all text-sm"
            >
              <RefreshCw size={16} />
              Coba Lagi
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
