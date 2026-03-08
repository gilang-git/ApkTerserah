export type FoodTime = 'sarapan' | 'siang' | 'sore' | 'malam' | 'cemilan' | 'tengah_malam';

export interface Branch {
  nama: string;
  alamatLengkap: string;
  namaPencarian: string;
  placeId?: string;
  jam_buka: string;
  lat: number;
  lon: number;
  jarakKm?: number;
}

export interface Food {
  id: string;
  nama: string;
  foto_url: string;
  deskripsi: string;
  kategori_harga?: string;
  jenis: string[];
  cocok_waktu: string[];
  tags: string[];
  rating: number;
  trending: boolean;
  cabang: Branch[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastUpdated: number;
}

export interface BatteryData {
  level: number;
  isCharging: boolean;
}
