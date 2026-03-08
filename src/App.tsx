import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Search, MessageCircle, Heart, Settings as SettingsIcon, Dice5, RotateCw } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import Randomizer from './components/Randomizer';
import { Favorites } from './components/Favorites';
import SearchScreen from './components/SearchScreen';
import FoodDetail from './components/FoodDetail';
import { Settings } from './components/Settings';
import { ResetDataScreen } from './components/ResetDataScreen';
import { SpinWheel } from './components/SpinWheel';
import { SplashScreen } from './components/SplashScreen';
import { Food, BatteryData, ChatSession } from './types';
import { foods } from './data/foods';

import { BatteryService } from './services/batteryService';
import { StorageService } from './services/storageService';

import { App as CapApp } from '@capacitor/app';

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [navStack, setNavStack] = useState<string[]>(['home']);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [favorites, setFavorites] = useState<string[]>(StorageService.getFavorites());
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(StorageService.getChatHistory());
  const [darkMode, setDarkMode] = useState(StorageService.getSettings().darkMode);
  const [notificationsEnabled, setNotificationsEnabled] = useState(StorageService.getSettings().notificationsEnabled);
  const [lastNotificationHour, setLastNotificationHour] = useState<number | null>(null);
  const [showDiceMenu, setShowDiceMenu] = useState(false);

  const navigateTo = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setNavStack(prev => [...prev, tab]);
  };

  const goBack = () => {
    if (navStack.length > 1) {
      const newStack = [...navStack];
      newStack.pop(); // Remove current
      const previousTab = newStack[newStack.length - 1];
      setActiveTab(previousTab);
      setNavStack(newStack);
    } else {
      // If at home and no more history, maybe exit or do nothing
      if (activeTab === 'home') {
        CapApp.exitApp();
      } else {
        setActiveTab('home');
        setNavStack(['home']);
      }
    }
  };

  // Back button handling for Capacitor
  useEffect(() => {
    const backHandler = CapApp.addListener('backButton', () => {
      goBack();
    });

    return () => {
      backHandler.then(h => h.remove());
    };
  }, [navStack, activeTab]);

  const [battery, setBattery] = useState<BatteryData>({
    level: 100,
    isCharging: false
  });
  const [history, setHistory] = useState<string[]>([]);

  const resetAllData = () => {
    StorageService.resetAllData();
    setFavorites([]);
    setChatHistory([]);
    setHistory([]);
    alert('Seluruh data (History Chat & Favorit) telah dihapus secara permanen!');
  };

  const deleteFavorites = () => {
    StorageService.deleteFavorites();
    setFavorites([]);
    alert('Database Favorit telah dihapus secara permanen!');
  };

  const deleteChatHistory = () => {
    StorageService.deleteChatHistory();
    setChatHistory([]);
    alert('History ChatBot telah dihapus secara permanen!');
  };

  // Time-based notifications
  useEffect(() => {
    if (!notificationsEnabled) return;

    const checkNotification = () => {
      const now = new Date();
      const hour = now.getHours();

      if (hour !== lastNotificationHour) {
        let message = '';
        if (hour === 5) message = "Selamat pagi! Bingung nih mau makan apa? Sini saya bantu cariin di Terserah App 🌅";
        else if (hour === 12) message = "Sudah jam makan siang lho! Yuk cari menu mantap di Terserah App ☀️";
        else if (hour === 16) message = "Waktunya nyemil sore! Cek rekomendasi asik di Terserah App 🌤️";
        else if (hour === 19) message = "Malam-malam gini enaknya makan apa ya? Cari di Terserah App yuk! 🌙";
        else if (hour === 0) message = "Laper tengah malam? Tenang, Terserah App punya solusinya! 🌃";

        if (message) {
          console.log('NOTIFICATION:', message);
          setLastNotificationHour(hour);
        }
      }
    };

    const timer = setInterval(checkNotification, 60000);
    checkNotification(); // Initial check
    return () => clearInterval(timer);
  }, [notificationsEnabled, lastNotificationHour]);

  // Save settings when they change
  useEffect(() => {
    StorageService.saveSettings({ notificationsEnabled, darkMode });
  }, [notificationsEnabled, darkMode]);

  // Save favorites when they change
  useEffect(() => {
    StorageService.saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    BatteryService.subscribeToBatteryChanges(setBattery);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleFavorite = (foodId: string) => {
    setFavorites(prev => 
      prev.includes(foodId) ? prev.filter(id => id !== foodId) : [...prev, foodId]
    );
  };

  const addToHistory = (foodId: string) => {
    setHistory(prev => [foodId, ...prev.slice(0, 19)]);
  };

  const handleFoodClick = (food: Food) => {
    setSelectedFood(food);
    navigateTo('detail');
  };

  const handleSeeAll = (type: 'recommended' | 'trending') => {
    // For now, we'll just navigate to search with a query or filter
    navigateTo('search');
  };

  if (!isSplashFinished) {
    return <SplashScreen onFinish={() => setIsSplashFinished(true)} />;
  }

  const renderContent = () => {
    if (activeTab === 'detail' && selectedFood) {
      return (
        <FoodDetail 
          food={selectedFood} 
          onBack={goBack} 
          onRandomize={() => navigateTo('random')}
          isFavorite={favorites.includes(selectedFood.id)}
          onToggleFavorite={toggleFavorite}
          darkMode={darkMode}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <Dashboard 
            battery={battery}
            onRandomClick={() => navigateTo('random')}
            onFoodClick={handleFoodClick}
            onSeeAll={handleSeeAll}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        );
      case 'search':
        return <SearchScreen onFoodClick={handleFoodClick} />;
      case 'chat':
        return (
          <ChatBot 
            onFoodClick={handleFoodClick} 
            history={chatHistory}
            onSaveSession={(session) => {
              StorageService.addChatSession(session);
              setChatHistory(StorageService.getChatHistory());
            }}
          />
        );
      case 'favorites':
        return (
          <Favorites 
            onBack={goBack}
            favorites={favorites} 
            toggleFavorite={toggleFavorite} 
            onFoodClick={handleFoodClick}
            onNavigateToSearch={() => navigateTo('search')}
            darkMode={darkMode}
          />
        );
      case 'settings':
        return (
          <Settings 
            onBack={goBack} 
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
            favorites={favorites}
            onNavigateToFavorites={() => navigateTo('favorites')}
            onNavigateToReset={() => navigateTo('reset')}
          />
        );
      case 'reset':
        return (
          <ResetDataScreen
            onBack={goBack}
            onDeleteFavorites={deleteFavorites}
            onDeleteChatHistory={deleteChatHistory}
            onDeleteAll={resetAllData}
            favoritesCount={favorites.length}
            chatHistoryCount={chatHistory.length}
            darkMode={darkMode}
          />
        );
      case 'random':
        return (
          <Randomizer 
            onClose={goBack}
            onSelect={(food) => {
              addToHistory(food.id);
              setSelectedFood(food);
              navigateTo('detail');
            }}
            onNavigateToSpin={() => navigateTo('spin')}
          />
        );
      case 'spin':
        return (
          <SpinWheel
            onBack={goBack}
            darkMode={darkMode}
          />
        );
      default:
        return (
          <Dashboard 
            battery={battery} 
            onRandomClick={() => navigateTo('random')} 
            onFoodClick={handleFoodClick}
            onSeeAll={handleSeeAll}
            notificationsEnabled={notificationsEnabled}
            onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0F172A] text-white' : 'bg-[#F4FAF6] text-[#1A1A2E]'} font-sans pb-24 max-w-md mx-auto shadow-2xl relative overflow-hidden transition-colors duration-300`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab === 'detail' ? `detail-${selectedFood?.id}` : activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      {activeTab !== 'detail' && activeTab !== 'random' && activeTab !== 'spin' && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#1E293B] border-t border-white/5 px-4 py-3 flex justify-between items-center z-50 transition-colors duration-300">
          <NavButton active={activeTab === 'home'} onClick={() => navigateTo('home')} icon={<Home size={22} />} label="Beranda" darkMode={true} />
          <NavButton active={activeTab === 'search'} onClick={() => navigateTo('search')} icon={<Search size={22} />} label="Cari" darkMode={true} />
          
          {/* Special Dice Button */}
          <div className="relative -top-6">
            <AnimatePresence>
              {showDiceMenu && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowDiceMenu(false)}
                    className="fixed inset-0 bg-black/20 z-40"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-row gap-3 z-50 w-auto whitespace-nowrap"
                  >
                    <button
                      onClick={() => {
                        setShowDiceMenu(false);
                        navigateTo('random');
                      }}
                      className="bg-[#1E293B] border border-white/10 text-white py-3 px-4 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold active:scale-95 transition-all"
                    >
                      <Dice5 size={16} className="text-[#1A9E5C]" />
                      Terserah
                    </button>
                    <button
                      onClick={() => {
                        setShowDiceMenu(false);
                        navigateTo('spin');
                      }}
                      className="bg-[#1E293B] border border-white/10 text-white py-3 px-4 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold active:scale-95 transition-all"
                    >
                      <RotateCw size={16} className="text-yellow-500" />
                      Spin Wheel
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <button 
              onClick={() => setShowDiceMenu(!showDiceMenu)}
              className={`bg-[#1A9E5C] text-white p-4 rounded-full shadow-lg shadow-[#1A9E5C]/40 active:scale-95 transition-all z-50 relative ${showDiceMenu ? 'rotate-180' : ''}`}
            >
              <Dice5 size={28} />
            </button>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#1A9E5C] uppercase tracking-tighter">Terserah</span>
          </div>

          <NavButton active={activeTab === 'chat'} onClick={() => navigateTo('chat')} icon={<MessageCircle size={22} />} label="Bot" darkMode={true} />
          <NavButton active={activeTab === 'settings'} onClick={() => navigateTo('settings')} icon={<SettingsIcon size={22} />} label="Setelan" darkMode={true} />
        </nav>
      )}
    </div>
  );
}

function NavButton({ active, onClick, icon, label, darkMode }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, darkMode: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-[#1A9E5C]' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
