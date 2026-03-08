import React from 'react';
import { ChevronLeft, Trash2, MessageCircle, Heart, AlertTriangle, Search } from 'lucide-react';

interface ResetDataScreenProps {
  onBack: () => void;
  onDeleteFavorites: () => void;
  onDeleteChatHistory: () => void;
  onDeleteAll: () => void;
  favoritesCount: number;
  chatHistoryCount: number;
  darkMode: boolean;
}

export const ResetDataScreen: React.FC<ResetDataScreenProps> = ({
  onBack,
  onDeleteFavorites,
  onDeleteChatHistory,
  onDeleteAll,
  favoritesCount,
  chatHistoryCount,
  darkMode
}) => {
  const [showConfirm, setShowConfirm] = React.useState<{ type: string, action: () => void } | null>(null);

  const handleConfirm = () => {
    if (showConfirm) {
      showConfirm.action();
      setShowConfirm(null);
    }
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F4FAF6]'}`}>
      {/* Custom Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-xs rounded-[32px] p-6 space-y-6 shadow-2xl ${darkMode ? 'bg-[#1E293B] text-white' : 'bg-white text-[#1A1A2E]'}`}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-red-500/10 text-red-500 rounded-full">
                <AlertTriangle size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Konfirmasi Hapus</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Apakah Anda yakin ingin menghapus <span className="text-red-500 font-bold">{showConfirm.type}</span> secara permanen? Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirm(null)}
                className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-colors ${darkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}
              >
                Batal
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-sm transition-colors shadow-lg shadow-red-500/20"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`px-6 pt-12 pb-6 space-y-2 shadow-sm border-b transition-colors ${darkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-black/5'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className={`p-2 rounded-xl transition-colors ${darkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-gray-100 text-[#1A1A2E]'}`}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>Reset Data</h1>
        </div>
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-[0.2em] pl-12">Kelola database aplikasi</p>
      </div>

      <div className="p-6 space-y-8">
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex gap-4 items-start">
          <AlertTriangle className="text-orange-500 shrink-0" size={20} />
          <p className="text-xs text-orange-400 leading-relaxed">
            Hati-hati! Menghapus data di sini akan menghilangkan data tersebut secara permanen dari perangkat Anda.
          </p>
        </div>

        {/* Group Favorite */}
        <div className="space-y-4">
          <h3 className={`text-[10px] font-bold uppercase tracking-widest px-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Group Favorite</h3>
          <div className={`rounded-[32px] overflow-hidden border transition-colors ${darkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-black/5'}`}>
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors ${darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'}`}>
                  <Heart size={20} />
                </div>
                <div>
                  <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>Database Favorit</p>
                  <p className="text-[10px] text-gray-400 font-medium">{favoritesCount} item tersimpan</p>
                </div>
              </div>
              <button 
                onClick={() => setShowConfirm({ type: 'semua favorit', action: onDeleteFavorites })}
                disabled={favoritesCount === 0}
                className={`p-3 rounded-xl transition-colors ${favoritesCount === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-red-500/10 text-red-500'}`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Group Chat Bot */}
        <div className="space-y-4">
          <h3 className={`text-[10px] font-bold uppercase tracking-widest px-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Group Chat Bot</h3>
          <div className={`rounded-[32px] overflow-hidden border transition-colors ${darkMode ? 'bg-[#1E293B] border-white/5' : 'bg-white border-black/5'}`}>
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl transition-colors ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-[#1A1A2E]'}`}>History ChatBot</p>
                  <p className="text-[10px] text-gray-400 font-medium">{chatHistoryCount} sesi tersimpan</p>
                </div>
              </div>
              <button 
                onClick={() => setShowConfirm({ type: 'semua history chat', action: onDeleteChatHistory })}
                disabled={chatHistoryCount === 0}
                className={`p-3 rounded-xl transition-colors ${chatHistoryCount === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-emerald-500/10 text-emerald-500'}`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Delete All Button */}
        <button 
          onClick={() => setShowConfirm({ type: 'SELURUH data aplikasi', action: onDeleteAll })}
          disabled={favoritesCount === 0 && chatHistoryCount === 0}
          className={`w-full p-5 rounded-[32px] flex items-center justify-center gap-3 font-bold text-sm transition-all ${
            favoritesCount === 0 && chatHistoryCount === 0
              ? 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
              : 'bg-red-500 text-white shadow-lg shadow-red-500/20 active:scale-95'
          }`}
        >
          <Trash2 size={20} />
          Hapus Semua Data
        </button>
      </div>
    </div>
  );
};
