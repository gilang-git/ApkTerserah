import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, RefreshCw, MapPin, Star, History, Plus, ChevronLeft, Trash2, Clock, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { foods } from '../data/foods';
import { Food, ChatSession, ChatMessage } from '../types';
import SecretChess from './SecretChess';

interface Message extends ChatMessage {
  id: string;
  suggestedFoods?: Food[];
  isChessTrigger?: boolean;
}

interface ChatBotProps {
  onFoodClick: (food: Food) => void;
  history: ChatSession[];
  onSaveSession: (session: ChatSession) => void;
}

export default function ChatBot({ onFoodClick, history, onSaveSession }: ChatBotProps) {
  const [currentSessionId, setCurrentSessionId] = useState<string>(Date.now().toString());
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Halo! Bingung mau makan apa? Sini aku kasih saran yang paling mantap di Malang! 😎",
      role: 'model',
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showChess, setShowChess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save session whenever messages change
  useEffect(() => {
    if (messages.length > 1) {
      const session: ChatSession = {
        id: currentSessionId,
        title: messages.find(m => m.role === 'user')?.text.slice(0, 30) || 'Percakapan Baru',
        messages: messages.map(({ id, suggestedFoods, ...rest }) => rest),
        lastUpdated: Date.now()
      };
      onSaveSession(session);
    }
  }, [messages, currentSessionId]);

  const startNewChat = () => {
    setCurrentSessionId(Date.now().toString());
    setMessages([
      {
        id: '1',
        text: "Halo! Bingung mau makan apa? Sini aku kasih saran yang paling mantap di Malang! 😎",
        role: 'model',
        timestamp: Date.now(),
      }
    ]);
    setShowHistory(false);
  };

  const loadSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages.map((m, i) => ({
      ...m,
      id: `${session.id}-${i}`
    })));
    setShowHistory(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      role: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Check for Chess Trigger (prioritize even when offline)
    const chessKeywords = ['catur', 'chess', 'main catur', 'play chess', 'play catur'];
    const isChessTrigger = chessKeywords.some(kw => input.toLowerCase().includes(kw));

    if (isChessTrigger) {
      setIsLoading(true);
      setTimeout(() => {
        const chessMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "♟️ Wah, kamu menemukan **Secret Game**! 🎉\nIni adalah permainan tersembunyi yang hanya bisa dimainkan di sini — bisa online maupun offline!\nKlik tombol di bawah untuk mulai bermain:",
          role: 'model',
          timestamp: Date.now(),
          isChessTrigger: true
        };
        setMessages(prev => [...prev, chessMessage]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Offline / no API key fallback
    const apiKey = process.env.GEMINI_API_KEY || '';
    const hasApiKey = Boolean(apiKey.trim());

    if (!hasApiKey && !offlineMode) {
      setOfflineMode(true);
    }

    const offlineTriggers = ['rekomendasi', 'mau makan', 'saran', 'menu', 'makanan', 'kuliner', 'makan'];
    const lowerInput = input.toLowerCase();
    const isOfflineTrigger = offlineTriggers.some(kw => lowerInput.includes(kw));

    if (offlineMode || !hasApiKey) {
      setIsLoading(true);
      setTimeout(() => {
        const randomFoods = [...foods].sort(() => Math.random() - 0.5).slice(0, 3);

        const botText = isOfflineTrigger
          ? `Server sedang offline, tapi aku tetap bisa bantu. Coba deh:
${randomFoods.map(f => `- ${f.nama} (${f.jenis})`).join('\n')}

Ketik lagi "rekomendasi makanan" atau "mau makan" untuk saran lain.`
          : "Server saat ini offline. Kamu hanya bisa mengetik 'rekomendasi makanan' atau 'mau makan' agar aku bisa kasih saran menu.";

        const suggestedFoods = isOfflineTrigger ? randomFoods : [];

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botText,
          role: 'model',
          timestamp: Date.now(),
          suggestedFoods: suggestedFoods.length > 0 ? suggestedFoods : undefined,
        };

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 500);
      return;
    }

    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `
        Kamu adalah "Terserah AI", asisten kuliner paling gaul di Malang.
        Gunakan bahasa Indonesia yang santai dan ramah khas Gen Z.
        Tugasmu adalah merekomendasikan makanan dari database kami berdasarkan keinginan user.
        
        Database Makanan Kami:
        ${JSON.stringify(foods.map(f => ({ id: f.id, nama: f.nama, jenis: f.jenis, tags: f.tags })))}
        
        Aturan:
        1. Jika user bingung, tanyakan mood atau budgetnya.
        2. Jika merekomendasikan, sebutkan minimal 1-2 makanan dari database di atas.
        3. Berikan alasan kenapa makanan itu cocok (misal: "Lagi hujan enak makan bakso nih!").
        4. Jangan merekomendasikan makanan di luar database kecuali sebagai pelengkap.
        5. Format jawabanmu harus ramah, seru, dan informatif.
        6. Selalu gunakan Bahasa Indonesia.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: [
          { role: 'user', parts: [{ text: systemInstruction }] },
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: input }] }
        ],
      });

      const botText = response.text || "Waduh, koneksi lagi lambat nih. Coba lagi ya!";
      
      const suggestedFoods = foods.filter(f => 
        botText.toLowerCase().includes(f.nama.toLowerCase()) ||
        f.tags.some(t => botText.toLowerCase().includes(t.toLowerCase()))
      ).slice(0, 3);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        role: 'model',
        timestamp: Date.now(),
        suggestedFoods: suggestedFoods.length > 0 ? suggestedFoods : undefined
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      setOfflineMode(true);

      const offlineMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Aduh, server lagi offline nih. Ketik 'rekomendasi makanan' atau 'mau makan' untuk dapat saran menu dari database lokal.",
        role: 'model',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, offlineMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-black text-[#1A9E5C]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  if (showHistory) {
    return (
      <div className="flex flex-col h-screen max-h-[calc(100vh-96px)] bg-[#0F172A]">
        <div className="px-6 py-4 bg-[#1E293B] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowHistory(false)} className="p-2 -ml-2 text-gray-400 hover:text-white">
              <ChevronLeft size={24} />
            </button>
            <h2 className="font-bold text-white">History Chat</h2>
          </div>
          <button onClick={startNewChat} className="p-2 bg-[#1A9E5C] text-white rounded-xl">
            <Plus size={20} />
          </button>
        </div>

        <div className="p-6 bg-orange-500/10 border-b border-orange-500/20">
          <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider flex items-center gap-2">
            <Clock size={12} />
            Pemberitahuan Penting
          </p>
          <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
            Aplikasi hanya menyimpan 10 percakapan terakhir. Percakapan lama akan dihapus secara otomatis dan permanen.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {history.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="text-4xl">💬</div>
              <p className="text-sm text-gray-500 font-medium">Belum ada riwayat chat.</p>
            </div>
          ) : (
            history.map(session => (
              <button
                key={session.id}
                onClick={() => loadSession(session)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                  currentSessionId === session.id 
                    ? 'bg-[#1A9E5C]/10 border-[#1A9E5C]/30' 
                    : 'bg-[#1E293B] border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-bold text-sm text-white truncate">{session.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {new Date(session.lastUpdated).toLocaleDateString()} · {session.messages.length} pesan
                  </p>
                </div>
                <ChevronLeft size={16} className="text-gray-600 rotate-180 group-hover:text-white transition-colors" />
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-h-[calc(100vh-96px)] bg-inherit">
      {/* Header */}
      <div className="px-6 py-4 bg-[#1E293B] border-b border-white/5 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1A9E5C] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#1A9E5C]/20">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold text-white">Terserah AI</h2>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full animate-pulse ${offlineMode ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                {offlineMode ? 'Offline (mode terbatas)' : 'Online & Siap Membantu'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowHistory(true)} className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:text-white transition-colors">
            <History size={20} />
          </button>
          <button onClick={startNewChat} className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:text-white transition-colors">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#1A9E5C] text-white rounded-tr-none' 
                  : 'bg-[#1E293B] text-white rounded-tl-none border border-white/5'
              }`}>
                {msg.isChessTrigger ? (
                  <div className="space-y-4">
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5">
                      <img 
                        src="https://images.unsplash.com/photo-1586165368502-1bad197a6461?q=80&w=800&auto=format&fit=crop" 
                        className="w-full h-full object-cover"
                        alt="Chess Banner"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <p className="text-white font-black text-lg tracking-tighter">SECRET CHESS</p>
                      </div>
                    </div>
                    <p className="whitespace-pre-wrap">{renderText(msg.text)}</p>
                    <button
                      onClick={() => setShowChess(true)}
                      className="w-full py-4 bg-yellow-400 text-[#0F172A] rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-95 transition-all"
                    >
                      <Play size={18} fill="currentColor" />
                      PLAY CHESS
                    </button>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{renderText(msg.text)}</div>
                )}
              </div>
              
              {msg.suggestedFoods && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
                  {msg.suggestedFoods.map(food => (
                    <motion.div
                      key={food.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onFoodClick(food)}
                      className="flex-shrink-0 bg-[#1E293B] p-2 rounded-2xl border border-white/5 shadow-sm flex items-center gap-3 cursor-pointer hover:border-[#1A9E5C] transition-all"
                    >
                      <img src={food.foto_url} className="w-10 h-10 rounded-xl object-cover" />
                      <div className="pr-2">
                        <p className="text-[10px] font-bold text-white whitespace-nowrap">{food.nama}</p>
                        <div className="flex items-center gap-1 text-[8px] text-gray-400">
                          <Star size={8} className="text-yellow-500 fill-yellow-500" />
                          {food.rating}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              <span className="text-[8px] text-gray-400 font-medium px-2">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#1E293B] p-4 rounded-3xl rounded-tl-none border border-white/5 flex gap-1">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chess Game Overlay */}
      <AnimatePresence>
        {showChess && (
          <SecretChess onClose={() => setShowChess(false)} />
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="px-6 py-6 bg-[#1E293B] border-t border-white/5 transition-colors">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanya apa saja..."
            className="flex-1 bg-[#2D3748] border border-white/10 text-white rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1A9E5C] transition-all outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-4 rounded-2xl transition-all shadow-lg ${
              isLoading || !input.trim()
                ? 'bg-gray-800 text-gray-400'
                : 'bg-[#1A9E5C] text-white shadow-[#1A9E5C]/20 active:scale-95'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
