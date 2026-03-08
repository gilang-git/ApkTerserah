import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Moon, 
  Sun, 
  Bell, 
  Info, 
  Heart,
  ChevronRight,
  LogOut,
  Trash2
} from 'lucide-react';
import { Food } from '../types';

interface SettingsProps {
  onBack: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
  favorites: string[];
  onNavigateToFavorites: () => void;
  onNavigateToReset: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ 
  onBack, 
  darkMode, 
  onToggleDarkMode, 
  notificationsEnabled, 
  onToggleNotifications,
  favorites,
  onNavigateToFavorites,
  onNavigateToReset
}) => {
  const creationDate = "Maret 2026";
  const copyrightYear = "2026";

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
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>Setelan</h1>
        </div>
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em] pl-12">Atur pengalaman kulinermu</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest px-2 text-gray-500">Notifikasi</h3>
          <div className="rounded-[32px] overflow-hidden border transition-colors bg-[#1E293B] border-white/5">
            <button 
              onClick={onToggleNotifications}
              className="w-full p-5 flex items-center justify-between transition-colors hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl transition-colors bg-emerald-500/10 text-emerald-400">
                  <Bell size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-white">Notifikasi Aplikasi</p>
                  <p className="text-[10px] text-gray-400 font-medium">Update makanan hits Malang</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${notificationsEnabled ? 'bg-[#1A9E5C]' : 'bg-gray-200'}`}>
                <motion.div 
                  animate={{ x: notificationsEnabled ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="space-y-4">
          <h3 className={`text-[10px] font-bold uppercase tracking-widest px-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Koleksi</h3>
          <div className={`rounded-[32px] overflow-hidden border transition-colors ${darkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-black/5'}`}>
            <button 
              onClick={onNavigateToFavorites}
              className={`w-full p-5 flex items-center justify-between transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors ${darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'}`}>
                  <Heart size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-white">Favorit Saya</p>
                  <p className="text-[10px] text-gray-400 font-medium">{favorites.length} makanan yang kamu sukai</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* Reset Data Section */}
        <div className="space-y-4">
          <h3 className={`text-[10px] font-bold uppercase tracking-widest px-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Data & Privasi</h3>
          <div className={`rounded-[32px] overflow-hidden border transition-colors ${darkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-black/5'}`}>
            <button 
              onClick={onNavigateToReset}
              className={`w-full p-5 flex items-center justify-between transition-colors ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors ${darkMode ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'}`}>
                  <Trash2 size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm text-white">Reset Data</p>
                  <p className="text-[10px] text-gray-400 font-medium">Hapus history chat & favorit</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4">
          <h3 className={`text-[10px] font-bold uppercase tracking-widest px-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Tentang Aplikasi</h3>
          <div className={`rounded-[32px] p-6 border space-y-4 transition-colors ${darkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-black/5'}`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl transition-colors ${darkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Info size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Terserah App</p>
                <p className="text-[10px] text-gray-400 font-medium">Dibuat pada {creationDate}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Aplikasi ini dibuat untuk teman-teman di Malang yang bingung mencari makanan. 
                Semoga bermanfaat ya!
              </p>
              <p className="text-[10px] text-gray-500 font-bold mt-4">
                © {copyrightYear} Tim Terserah. Hak Cipta Dilindungi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
