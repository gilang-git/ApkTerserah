import React from 'react';
import { User, History, Settings, LogOut, ChevronRight, Award, Sparkles } from 'lucide-react';
import { foods } from '../data/foods';

interface ProfileProps {
  history: string[];
}

export default function Profile({ history }: ProfileProps) {
  const historyFoods = history.map(id => foods.find(f => f.id === id)).filter(Boolean);

  return (
    <div className="p-6 space-y-8">
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 bg-[#FFD93D] rounded-[32px] flex items-center justify-center text-[#1A1A2E] shadow-xl">
            <User size={48} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-[#FF6B35] text-white p-2 rounded-2xl border-4 border-[#FAFAFA]">
            <Award size={20} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold font-poppins">Bestie Kuliner ✨</h2>
          <p className="text-gray-400 text-xs">aibuildingyt@gmail.com</p>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-black/5 shadow-sm text-center">
          <p className="text-2xl font-bold text-[#FF6B35]">{history.length}</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Riwayat</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-black/5 shadow-sm text-center">
          <p className="text-2xl font-bold text-[#FFD93D]">12</p>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Voucher</p>
        </div>
      </section>

      {/* Fun Stat */}
      <section className="bg-gradient-to-br from-[#FF6B35] to-[#FFD93D] p-5 rounded-[32px] text-white shadow-lg shadow-[#FF6B35]/20">
        <div className="flex items-center gap-3">
          <Sparkles size={24} />
          <div>
            <h4 className="font-bold text-sm">Statistik Lucu 🤪</h4>
            <p className="text-[10px] opacity-90">Bulan ini kamu udah makan mie {Math.floor(Math.random() * 10) + 5} kali lho! Hati-hati jadi keriting ya bestie~</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-bold flex items-center gap-2">
          <History size={18} className="text-gray-400" />
          Riwayat Terakhir
        </h3>
        <div className="space-y-3">
          {historyFoods.length === 0 ? (
            <p className="text-center py-4 text-gray-400 text-xs italic">Belum ada riwayat makan.</p>
          ) : (
            historyFoods.slice(0, 3).map((food, i) => (
              <div key={i} className="bg-white p-3 rounded-2xl border border-black/5 flex items-center gap-3">
                <img src={food?.foto_url} className="w-10 h-10 rounded-xl object-cover" />
                <span className="text-sm font-medium flex-1">{food?.nama}</span>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            ))
          )}
        </div>
      </section>

      <section className="space-y-2">
        <MenuButton icon={<Settings size={18} />} label="Pengaturan Akun" />
        <MenuButton icon={<LogOut size={18} />} label="Keluar" color="text-red-500" />
      </section>
    </div>
  );
}

function MenuButton({ icon, label, color = "text-gray-600" }: { icon: React.ReactNode, label: string, color?: string }) {
  return (
    <button className="w-full bg-white p-4 rounded-2xl border border-black/5 flex items-center justify-between group active:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`${color}`}>{icon}</div>
        <span className={`text-sm font-bold ${color}`}>{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-400" />
    </button>
  );
}
