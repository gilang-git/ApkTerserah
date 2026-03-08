import { Food } from '../types';

export const foods: Food[] = [
  {
    id: "mie_001",
    nama: "MIE GACOAN",
    foto_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Mie pedas viral khas anak muda Malang dengan level kepedasan 1 sampai 8. Kuah kaldu gurih dengan toping seafood pilihan. Wajib coba buat yang suka tantangan pedas.",
    jenis: ["mie", "pedas", "makanan"],
    cocok_waktu: ["siang", "malam", "tengah_malam"],
    tags: ["pedas", "viral", "hits"],
    rating: 4.7,
    trending: true,
    cabang: [
      {
        nama: "Mie Gacoan Dinoyo",
        alamatLengkap: "Jl. MT. Haryono No.195, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Mie Gacoan Dinoyo Malang",
        jam_buka: "11.00-01.00",
        lat: -7.9521,
        lon: 112.6140
      },
      {
        nama: "Mie Gacoan Soekarno Hatta",
        alamatLengkap: "Jl. Soekarno Hatta No.6, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Mie Gacoan Soekarno Hatta Malang",
        jam_buka: "11.00-01.00",
        lat: -7.9389,
        lon: 112.6178
      },
      {
        nama: "Mie Gacoan Sulfat",
        alamatLengkap: "Jl. Sulfat No.39, Purwantoro, Kec. Blimbing, Kota Malang",
        namaPencarian: "Mie Gacoan Sulfat Malang",
        jam_buka: "11.00-01.00",
        lat: -7.9552,
        lon: 112.6521
      },
      {
        nama: "Mie Gacoan Sawojajar",
        alamatLengkap: "Jl. Danau Toba No.1, Sawojajar, Kec. Kedungkandang, Kota Malang",
        namaPencarian: "Mie Gacoan Sawojajar Malang",
        jam_buka: "11.00-01.00",
        lat: -7.9748,
        lon: 112.6612
      }
    ]
  },
  {
    id: "mie_002",
    nama: "CWIE MIE ORA ONO",
    foto_url: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Mie tipis halus khas Malang dengan topping ayam cincang berbumbu dan pangsit goreng renyah. Salah satu kuliner legendaris yang wajib dicoba kalau ke Malang.",
    jenis: ["mie", "makanan"],
    cocok_waktu: ["pagi", "siang"],
    tags: ["legendaris", "khas-malang", "sarapan"],
    rating: 4.7,
    trending: true,
    cabang: [
      {
        nama: "Cwie Mie Ora Ono Kawi",
        alamatLengkap: "Jl. Kawi No.6, Bareng, Kec. Klojen, Kota Malang",
        namaPencarian: "Cwie Mie Ora Ono Kawi Malang",
        jam_buka: "07.00-16.00",
        lat: -7.9791,
        lon: 112.6217
      },
      {
        nama: "Cwie Mie Ora Ono Semeru",
        alamatLengkap: "Jl. Semeru No.8, Oro-oro Dowo, Kec. Klojen, Kota Malang",
        namaPencarian: "Cwie Mie Malang Ora Ono Semeru",
        jam_buka: "07.00-15.00",
        lat: -7.9812,
        lon: 112.6198
      }
    ]
  },
  {
    id: "mie_003",
    nama: "MIE AYAM PAK NDUT",
    foto_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Mie ayam dengan porsi jumbo dan bumbu kecap manis gurih khas Malang. Topping ayam cincang berbumbu melimpah dengan kuah kaldu yang ringan menyegarkan.",
    jenis: ["mie", "makanan"],
    cocok_waktu: ["pagi", "siang"],
    tags: ["porsi-besar", "mengenyangkan", "murah-meriah"],
    rating: 4.6,
    trending: false,
    cabang: [
      {
        nama: "Mie Ayam Pak Ndut Mergan",
        alamatLengkap: "Jl. Mergan Lori No.5, Merjosari, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Mie Ayam Pak Ndut Mergan Malang",
        jam_buka: "07.00-15.00",
        lat: -7.9461,
        lon: 112.6093
      },
      {
        nama: "Mie Ayam Pak Ndut Soehat",
        alamatLengkap: "Jl. Soekarno Hatta, Jatimulyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Mie Ayam Pak Ndut Soehat Malang",
        jam_buka: "07.00-14.00",
        lat: -7.9398,
        lon: 112.6156
      }
    ]
  },
  {
    id: "mie_004",
    nama: "MIE AYAM AREMA 86",
    foto_url: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Mie ayam favorit mahasiswa Universitas Brawijaya dan sekitarnya. Porsi mengenyangkan dengan rasa yang konsisten dan lokasi strategis dekat kampus.",
    jenis: ["mie", "makanan"],
    cocok_waktu: ["pagi", "siang"],
    tags: ["mahasiswa", "kampus", "terjangkau"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Mie Ayam Arema 86 Veteran",
        alamatLengkap: "Jl. Veteran No.10, Ketawanggede, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Mie Ayam Arema 86 Veteran Malang",
        jam_buka: "07.00-16.00",
        lat: -7.9519,
        lon: 112.6136
      },
      {
        nama: "Mie Ayam Arema 86 Dinoyo",
        alamatLengkap: "Jl. MT. Haryono No.100, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Mie Ayam Arema 86 Dinoyo Malang",
        jam_buka: "07.00-15.00",
        lat: -7.9531,
        lon: 112.6148
      }
    ]
  },
  {
    id: "mie_005",
    nama: "MIE KOCOK MALANG",
    foto_url: "https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Mie dengan kikil sapi empuk dalam kuah kaldu sapi pekat yang gurih. Topping kikil lembut penuh kolagen dengan taburan bawang goreng dan seledri segar.",
    jenis: ["mie", "berkuah", "makanan"],
    cocok_waktu: ["siang", "malam", "hujan", "tengah_malam"],
    tags: ["kikil", "berkuah", "hangat"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Mie Kocok Malang Klojen",
        alamatLengkap: "Jl. Zainul Arifin No.12, Kasin, Kec. Klojen, Kota Malang",
        namaPencarian: "Mie Kocok Malang Klojen",
        jam_buka: "08.00-17.00",
        lat: -7.9854,
        lon: 112.6287
      }
    ]
  },
  {
    id: "mie_006",
    nama: "RAMEN SETO MALANG",
    foto_url: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Ramen lokal Malang dengan kuah tonkotsu buatan sendiri yang kaya rasa. Topping chashu babi diganti ayam, telur ajitsuke, dan nori. Pengalaman ramen autentik dengan harga lokal.",
    jenis: ["mie", "berkuah", "makanan"],
    cocok_waktu: ["siang", "malam", "tengah_malam"],
    tags: ["ramen", "lokal", "tonkotsu"],
    rating: 4.6,
    trending: false,
    cabang: [
      {
        nama: "Ramen Seto Malang Lowokwaru",
        alamatLengkap: "Jl. Simpang Gajayana No.5, Merjosari, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Ramen Seto Malang",
        jam_buka: "11.00-21.00",
        lat: -7.9441,
        lon: 112.6071
      }
    ]
  },
  {
    id: "mie_007",
    nama: "MIE ACEH MALANG",
    foto_url: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Mie Aceh goreng atau rebus dengan seafood segar and bumbu rempah kuat khas Aceh. Pilihan topping udang, kepiting, atau daging sapi dengan level pedas yang bisa disesuaikan.",
    jenis: ["mie", "berkuah", "pedas", "makanan", "seafood"],
    cocok_waktu: ["siang", "malam"],
    tags: ["aceh", "rempah", "seafood"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Mie Aceh Malang Klojen",
        alamatLengkap: "Jl. Jaksa Agung Suprapto No.26, Klojen, Kota Malang",
        namaPencarian: "Mie Aceh Malang Klojen",
        jam_buka: "10.00-22.00",
        lat: -7.9832,
        lon: 112.6301
      }
    ]
  },
  {
    id: "bks_008",
    nama: "BAKSO KOTA CAK MAN",
    foto_url: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Bakso paling legendaris di Malang sejak tahun 1950-an. Kuah kaldu sapi pekat yang kaya rasa dengan bakso urat jumbo super kenyal dan mie kuning yang sempurna. Ikon kuliner Malang yang tidak boleh dilewatkan.",
    jenis: ["bakso", "berkuah", "makanan"],
    cocok_waktu: ["siang", "malam", "hujan", "tengah_malam"],
    tags: ["legendaris", "wajib-coba", "bakso"],
    rating: 4.8,
    trending: true,
    cabang: [
      {
        nama: "Bakso Kota Cak Man Pusat",
        alamatLengkap: "Jl. Batanghari No.5, Rampalcelaket, Kec. Klojen, Kota Malang",
        namaPencarian: "Bakso Kota Cak Man Batanghari Malang",
        jam_buka: "09.00-21.00",
        lat: -7.9797,
        lon: 112.6304
      },
      {
        nama: "Bakso Cak Man Sawojajar",
        alamatLengkap: "Jl. Danau Ranau No.1, Sawojajar, Kec. Kedungkandang, Kota Malang",
        namaPencarian: "Bakso Kota Cak Man Sawojajar Malang",
        jam_buka: "09.00-21.00",
        lat: -7.9748,
        lon: 112.6601
      },
      {
        nama: "Bakso Cak Man Sulfat",
        alamatLengkap: "Jl. Sulfat No.47, Purwantoro, Kec. Blimbing, Kota Malang",
        namaPencarian: "Bakso Kota Cak Man Sulfat Malang",
        jam_buka: "09.00-20.00",
        lat: -7.9543,
        lon: 112.6518
      }
    ]
  },
  {
    id: "bks_009",
    nama: "BAKSO PRESIDENT MALANG",
    foto_url: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Bakso kenyal dengan isian daging sapi pilihan dalam kuah kaldu bening yang jernih dan gurih. Salah satu bakso tertua di Malang dengan cita rasa yang konsisten sejak puluhan tahun lalu.",
    jenis: ["bakso", "berkuah", "makanan"],
    cocok_waktu: ["siang", "malam", "hujan"],
    tags: ["legendaris", "bakso", "gurih"],
    rating: 4.7,
    trending: false,
    cabang: [
      {
        nama: "Bakso President Pusat",
        alamatLengkap: "Jl. Batanghari No.26, Rampalcelaket, Kec. Klojen, Kota Malang",
        namaPencarian: "Bakso President Malang Batanghari",
        jam_buka: "09.00-21.00",
        lat: -7.9801,
        lon: 112.6308
      },
      {
        nama: "Bakso President Cabang Dinoyo",
        alamatLengkap: "Jl. MT. Haryono No.167, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Bakso President Dinoyo Malang",
        jam_buka: "09.00-20.00",
        lat: -7.9527,
        lon: 112.6143
      }
    ]
  },
  {
    id: "bks_010",
    nama: "BAKSO AREMA MALANG",
    foto_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Bakso khas arek Malang dengan porsi besar and kuah kaya rempah yang menghangatkan. Tersedia berbagai pilihan topping bakso dari bakso halus, urat, hingga telor.",
    jenis: ["bakso", "berkuah", "makanan"],
    cocok_waktu: ["siang", "malam", "hujan"],
    tags: ["khas-malang", "arema", "porsi-besar"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Bakso Arema Malang Klojen",
        alamatLengkap: "Jl. Majapahit No.4, Klojen, Kota Malang",
        namaPencarian: "Bakso Arema Malang Klojen",
        jam_buka: "08.00-21.00",
        lat: -7.9839,
        lon: 112.6273
      }
    ]
  },
  {
    id: "rwn_011",
    nama: "RAWON NGULING",
    foto_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Rawon paling legendaris di Malang dengan kuah kluwek hitam pekat yang kaya rasa. Daging sapi empuk dalam kuah beraroma kuat dengan taoge pendek segar dan telur asin. Sudah berdiri puluhan tahun dan selalu ramai pengunjung.",
    jenis: ["rawon", "berkuah", "makanan"],
    cocok_waktu: ["siang", "malam", "hujan", "tengah_malam"],
    tags: ["legendaris", "rawon", "khas-jatim"],
    rating: 4.8,
    trending: true,
    cabang: [
      {
        nama: "Rawon Nguling Malang Pusat",
        alamatLengkap: "Jl. Wahid Hasyim No.3, Oro-oro Dowo, Kec. Klojen, Kota Malang",
        namaPencarian: "Rawon Nguling Malang Wahid Hasyim",
        jam_buka: "07.00-21.00",
        lat: -7.9789,
        lon: 112.6221
      },
      {
        nama: "Rawon Nguling Cabang Soehat",
        alamatLengkap: "Jl. Soekarno Hatta No.10, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Rawon Nguling Soekarno Hatta Malang",
        jam_buka: "07.00-20.00",
        lat: -7.9384,
        lon: 112.6172
      }
    ]
  },
  {
    id: "rwn_012",
    nama: "RAWON SETAN MALANG",
    foto_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Rawon dengan level kepedasan ekstrem and sambal dadak yang dibuat fresh setiap hari. Porsi jumbo dengan daging sapi melimpah dalam kuah kluwek hitam yang super pekat dan berani.",
    jenis: ["rawon", "berkuah", "pedas", "makanan"],
    cocok_waktu: ["siang", "malam", "hujan", "tengah_malam"],
    tags: ["pedas", "rawon", "porsi-jumbo"],
    rating: 4.6,
    trending: false,
    cabang: [
      {
        nama: "Rawon Setan Malang Klojen",
        alamatLengkap: "Jl. Jaksa Agung Suprapto No.18, Rampalcelaket, Kec. Klojen, Kota Malang",
        namaPencarian: "Rawon Setan Malang Klojen",
        jam_buka: "08.00-21.00",
        lat: -7.9821,
        lon: 112.6295
      },
      {
        nama: "Rawon Setan Cabang Sulfat",
        alamatLengkap: "Jl. Sulfat No.22, Purwantoro, Kec. Blimbing, Kota Malang",
        namaPencarian: "Rawon Setan Sulfat Malang",
        jam_buka: "08.00-20.00",
        lat: -7.9549,
        lon: 112.6511
      }
    ]
  },
  {
    id: "sto_013",
    nama: "SOTO LOMBOK PAK SHOLEH",
    foto_url: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Soto berkuah santan ringan khas Malang dengan lauk pilihan yang lengkap. Kuah gurih berwarna kuning keemasan dengan ayam suwir dan bahan pelengkap segar. Sudah menjadi langganan warga Malang selama puluhan tahun.",
    jenis: ["soto", "berkuah", "makanan"],
    cocok_waktu: ["pagi", "siang", "tengah_malam"],
    tags: ["legendaris", "soto", "santan"],
    rating: 4.7,
    trending: true,
    cabang: [
      {
        nama: "Soto Lombok Pak Sholeh Pusat",
        alamatLengkap: "Jl. Lombok No.2, Rampalcelaket, Kec. Klojen, Kota Malang",
        namaPencarian: "Soto Lombok Pak Sholeh Malang",
        jam_buka: "06.00-14.00",
        lat: -7.9823,
        lon: 112.6318
      },
      {
        nama: "Soto Lombok Pak Sholeh Cabang Blimbing",
        alamatLengkap: "Jl. Borobudur No.7, Purwodadi, Kec. Blimbing, Kota Malang",
        namaPencarian: "Soto Lombok Pak Sholeh Blimbing Malang",
        jam_buka: "06.00-13.00",
        lat: -7.9498,
        lon: 112.6467
      }
    ]
  },
  {
    id: "sop_014",
    nama: "SOP IGA BU TINI",
    foto_url: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Sop iga sapi rumahan dari UMKM lokal dengan daging iga empuk lepas dari tulang dalam kuah bening yang harum rempah. Disajikan dengan nasi putih hangat dan sambal rawit segar.",
    jenis: ["berkuah", "makanan"],
    cocok_waktu: ["siang", "malam", "hujan"],
    tags: ["iga", "sop", "UMKM", "empuk"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Sop Iga Bu Tini Malang",
        alamatLengkap: "Jl. Candi Panggung No.12, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Sop Iga Bu Tini Malang",
        jam_buka: "09.00-20.00",
        lat: -7.9362,
        lon: 112.6143
      }
    ]
  },
  {
    id: "sop_015",
    nama: "SOP BUNTUT PREMIUM MALANG",
    foto_url: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Sop buntut sapi dengan daging buntut empuk and kuah bening harum yang dimasak berjam-jam. Disajikan sebagai hidangan istimewa dengan pelengkap emping dan acar segar.",
    jenis: ["berkuah", "makanan"],
    cocok_waktu: ["siang", "malam"],
    tags: ["buntut", "premium", "sajian-istimewa"],
    rating: 4.6,
    trending: false,
    cabang: [
      {
        nama: "Sop Buntut Waroeng Kita Malang",
        alamatLengkap: "Jl. Simpang Gajayana No.1, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Waroeng Kita Sop Buntut Malang",
        jam_buka: "10.00-21.00",
        lat: -7.9449,
        lon: 112.6079
      },
      {
        nama: "Sop Buntut Kedai Kita Malang",
        alamatLengkap: "Jl. Soekarno Hatta No.3, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Sop Buntut Kedai Kita Soehat Malang",
        jam_buka: "10.00-21.00",
        lat: -7.9392,
        lon: 112.6161
      }
    ]
  },
  {
    id: "nsi_016",
    nama: "NASI PECEL BU BUDI",
    foto_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Nasi pecel legendaris Malang dengan sayuran segar rebus dan sambal kacang khas yang gurih manis pedas. Selalu disajikan dengan rempeyek kacang renyah dan lauk pilihan. Sudah menjadi ikon sarapan warga Malang.",
    jenis: ["nasi", "makanan"],
    cocok_waktu: ["pagi", "siang", "tengah_malam"],
    tags: ["legendaris", "pecel", "khas-malang"],
    rating: 4.7,
    trending: true,
    cabang: [
      {
        nama: "Nasi Pecel Bu Budi Semeru",
        alamatLengkap: "Jl. Semeru No.15, Oro-oro Dowo, Kec. Klojen, Kota Malang",
        namaPencarian: "Nasi Pecel Bu Budi Semeru Malang",
        jam_buka: "06.00-14.00",
        lat: -7.9812,
        lon: 112.6198
      },
      {
        nama: "Nasi Pecel Bu Budi Cabang Soehat",
        alamatLengkap: "Jl. Soekarno Hatta No.77, Jatimulyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Nasi Pecel Bu Budi Soehat Malang",
        jam_buka: "06.00-13.00",
        lat: -7.9411,
        lon: 112.6149
      }
    ]
  },
  {
    id: "nsi_017",
    nama: "NASI PECEL BU TINUK",
    foto_url: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Nasi pecel UMKM dengan rempeyek kacang renyah buatan sendiri and bumbu kacang khas yang berbeda dari kebanyakan. Porsi melimpah dengan harga yang sangat terjangkau.",
    jenis: ["nasi", "makanan"],
    cocok_waktu: ["pagi", "siang"],
    tags: ["UMKM", "pecel", "rempeyek"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Nasi Pecel Bu Tinuk Soekarno Hatta",
        alamatLengkap: "Jl. Soekarno Hatta No.39, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Nasi Pecel Bu Tinuk Soekarno Hatta Malang",
        jam_buka: "06.00-12.00",
        lat: -7.9388,
        lon: 112.6175
      }
    ]
  },
  {
    id: "nsi_018",
    nama: "NASI BEBEK PAK NDUT",
    foto_url: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Bebek goreng renyah dengan bumbu hitam meresap sampai ke dalam dagingnya. Disajikan dengan sambal pencit mangga muda yang segar dan nasi putih panas. Sudah menjadi ikon kuliner bebek Malang.",
    jenis: ["nasi", "ayam", "makanan"],
    cocok_waktu: ["siang", "malam"],
    tags: ["bebek", "renyah", "ikonik"],
    rating: 4.6,
    trending: false,
    cabang: [
      {
        nama: "Nasi Bebek Pak Ndut Pusat",
        alamatLengkap: "Jl. Candi Mendut No.3, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Nasi Bebek Pak Ndut Malang",
        jam_buka: "10.00-22.00",
        lat: -7.9341,
        lon: 112.6121
      },
      {
        nama: "Nasi Bebek Pak Ndut Cabang Soehat",
        alamatLengkap: "Jl. Soekarno Hatta No.45, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Nasi Bebek Pak Ndut Soehat Malang",
        jam_buka: "10.00-22.00",
        lat: -7.9395,
        lon: 112.6166
      }
    ]
  },
  {
    id: "nsi_019",
    nama: "NASI BEBEK H. SLAMET",
    foto_url: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Bebek goreng dengan bumbu hitam khas Madura yang meresap sempurna dengan daging empuk and kulit renyah. Salah satu warung bebek paling terkenal di Malang dengan penggemar setia.",
    jenis: ["nasi", "ayam", "makanan"],
    cocok_waktu: ["siang", "malam"],
    tags: ["bebek", "madura", "empuk"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Bebek Goreng H. Slamet Sulfat",
        alamatLengkap: "Jl. Sulfat No.31, Purwantoro, Kec. Blimbing, Kota Malang",
        namaPencarian: "Bebek Goreng H Slamet Sulfat Malang",
        jam_buka: "10.00-22.00",
        lat: -7.9551,
        lon: 112.6514
      },
      {
        nama: "Bebek Goreng H. Slamet Soehat",
        alamatLengkap: "Jl. Soekarno Hatta No.55, Jatimulyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Bebek Goreng H Slamet Soehat Malang",
        jam_buka: "10.00-22.00",
        lat: -7.9403,
        lon: 112.6153
      }
    ]
  },
  {
    id: "nsi_020",
    nama: "RICE BOX AYAM GEPREK",
    foto_url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Rice box praktis dengan ayam geprek crispy yang disiram sambal bawang segar. Cocok untuk makan siang cepat atau dibawa pulang. Tersedia di banyak titik di seluruh Malang.",
    jenis: ["nasi", "ayam", "pedas", "makanan"],
    cocok_waktu: ["siang", "malam"],
    tags: ["geprek", "rice-box", "praktis"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Geprek Bensu Soekarno Hatta Malang",
        alamatLengkap: "Jl. Soekarno Hatta No.6, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Geprek Bensu Soekarno Hatta Malang",
        jam_buka: "10.00-22.00",
        lat: -7.9389,
        lon: 112.6178
      },
      {
        nama: "Geprek Bensu Sulfat Malang",
        alamatLengkap: "Jl. Sulfat No.15, Purwantoro, Kec. Blimbing, Kota Malang",
        namaPencarian: "Geprek Bensu Sulfat Malang",
        jam_buka: "10.00-22.00",
        lat: -7.9547,
        lon: 112.6509
      },
      {
        nama: "Ayam Geprek Bu Rum Malang",
        alamatLengkap: "Jl. Simpang Gajayana No.3, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Ayam Geprek Bu Rum Malang",
        jam_buka: "09.00-21.00",
        lat: -7.9451,
        lon: 112.6083
      }
    ]
  },
  {
    id: "aym_021",
    nama: "AYAM GEPREK BU RUM",
    foto_url: "https://images.unsplash.com/photo-1623961990059-28356e226a77?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Ayam geprek crispy dengan sambal bawang merah segar yang digeprek langsung di depan pembeli. Tersedia berbagai level kepedasan dengan lalapan segar and nasi hangat. Favorit anak muda Malang.",
    jenis: ["ayam", "lalapan", "pedas", "makanan"],
    cocok_waktu: ["siang", "malam"],
    tags: ["geprek", "crispy", "sambal-bawang"],
    rating: 4.6,
    trending: true,
    cabang: [
      {
        nama: "Ayam Geprek Bu Rum Dinoyo",
        alamatLengkap: "Jl. Simpang Gajayana No.3, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Ayam Geprek Bu Rum Dinoyo Malang",
        jam_buka: "09.00-21.00",
        lat: -7.9451,
        lon: 112.6083
      },
      {
        nama: "Ayam Geprek Bu Rum Soehat",
        alamatLengkap: "Jl. Soekarno Hatta No.88, Jatimulyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Ayam Geprek Bu Rum Soehat Malang",
        jam_buka: "09.00-21.00",
        lat: -7.9418,
        lon: 112.6141
      }
    ]
  },
  {
    id: "aym_022",
    nama: "NASI BEBEK SINJAI MALANG",
    foto_url: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Bebek goreng empuk dengan bumbu rempah khas Sinjai Sulawesi yang kini hadir di Malang. Bumbu meresap sempurna dengan tekstur luar renyah and dalam yang juicy.",
    jenis: ["ayam", "nasi", "makanan"],
    cocok_waktu: ["siang", "malam"],
    tags: ["bebek", "sinjai", "rempah"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Bebek Sinjai Malang Lowokwaru",
        alamatLengkap: "Jl. Candi Panggung No.5, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Bebek Sinjai Malang Lowokwaru",
        jam_buka: "10.00-21.00",
        lat: -7.9358,
        lon: 112.6138
      }
    ]
  },
  {
    id: "bkr_023",
    nama: "IGA BAKAR MADU",
    foto_url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Iga sapi premium dibakar dengan olesan madu and kecap hingga karamelisasi sempurna. Daging juicy and empuk dengan aroma bakar yang menggugah selera. Tersedia berbagai pilihan saus pendamping.",
    jenis: ["makanan", "bakar"],
    cocok_waktu: ["siang", "malam"],
    tags: ["iga", "bakar", "madu", "premium"],
    rating: 4.6,
    trending: false,
    cabang: [
      {
        nama: "Iga Bakar Madu Malang Soehat",
        alamatLengkap: "Jl. Soekarno Hatta No.11, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Iga Bakar Madu Soehat Malang",
        jam_buka: "11.00-22.00",
        lat: -7.9385,
        lon: 112.6169
      },
      {
        nama: "Iga Bakar Madu Cabang Sulfat",
        alamatLengkap: "Jl. Sulfat No.55, Purwantoro, Kec. Blimbing, Kota Malang",
        namaPencarian: "Iga Bakar Madu Sulfat Malang",
        jam_buka: "11.00-22.00",
        lat: -7.9557,
        lon: 112.6522
      }
    ]
  },
  {
    id: "srp_024",
    nama: "BUBUR AYAM MALANG",
    foto_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Bubur nasi lembut dengan topping ayam suwir berbumbu, cakwe renyah, kerupuk, and kuah kaldu ayam yang disiram panas. Sarapan favorit warga Malang yang menyehatkan dan mengenyangkan.",
    jenis: ["makanan", "sarapan"],
    cocok_waktu: ["pagi"],
    tags: ["bubur", "sarapan", "hangat"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Bubur Ayam Malang Veteran",
        alamatLengkap: "Jl. Veteran No.8, Ketawanggede, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Bubur Ayam Malang Veteran",
        jam_buka: "05.30-11.00",
        lat: -7.9517,
        lon: 112.6131
      },
      {
        nama: "Bubur Ayam Malang Klojen",
        alamatLengkap: "Jl. Zainul Arifin No.3, Kasin, Kec. Klojen, Kota Malang",
        namaPencarian: "Bubur Ayam Malang Klojen",
        jam_buka: "05.30-11.00",
        lat: -7.9851,
        lon: 112.6281
      }
    ]
  },
  {
    id: "srp_025",
    nama: "NASI KUNING PAGI MALANG",
    foto_url: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Nasi kuning kunyit yang harum and gurih dengan lauk lengkap khas Malang. Tersedia berbagai pilihan lauk dari telur balado, ayam goreng, tempe orek, hingga acar segar. Hanya dijual di pagi hari.",
    jenis: ["nasi", "sarapan", "makanan"],
    cocok_waktu: ["pagi"],
    tags: ["nasi-kuning", "sarapan", "tradisional"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Nasi Kuning Pagi Ibu Sari Malang",
        alamatLengkap: "Jl. Candi Gebang No.4, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Nasi Kuning Pagi Ibu Sari Lowokwaru Malang",
        jam_buka: "05.30-10.00",
        lat: -7.9349,
        lon: 112.6127
      },
      {
        nama: "Nasi Kuning Bu Nanik Malang",
        alamatLengkap: "Jl. Simpang Gajayana No.7, Merjosari, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Nasi Kuning Bu Nanik Malang",
        jam_buka: "05.30-10.00",
        lat: -7.9443,
        lon: 112.6069
      }
    ]
  },
  {
    id: "mlm_026",
    nama: "ANGKRINGAN MALANG",
    foto_url: "https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Angkringan khas Malang dengan nasi kucing berbungkus daun pisang berisi berbagai lauk, gorengan hangat, and minuman wedang. Suasana lesehan santai dengan harga sangat terjangkau untuk nongkrong malam.",
    jenis: ["makanan", "cemilan", "minuman"],
    cocok_waktu: ["malam", "tengah_malam"],
    tags: ["angkringan", "malam", "nasi-kucing"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Angkringan Mas Bro Malang",
        alamatLengkap: "Jl. Veteran No.22, Ketawanggede, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Angkringan Mas Bro Veteran Malang",
        jam_buka: "17.00-02.00",
        lat: -7.9523,
        lon: 112.6139
      },
      {
        nama: "Angkringan Dinoyo Malang",
        alamatLengkap: "Jl. MT. Haryono No.210, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Angkringan Dinoyo Malang",
        jam_buka: "18.00-02.00",
        lat: -7.9535,
        lon: 112.6151
      },
      {
        nama: "Angkringan Klojen Malang",
        alamatLengkap: "Jl. Semeru No.20, Oro-oro Dowo, Kec. Klojen, Kota Malang",
        namaPencarian: "Angkringan Klojen Semeru Malang",
        jam_buka: "18.00-01.00",
        lat: -7.9815,
        lon: 112.6202
      }
    ]
  },
  {
    id: "mlm_027",
    nama: "WEDANG RONDE MALANG",
    foto_url: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Minuman hangat berisi bola-bola ketan isi kacang tanah dalam kuah jahe panas yang menghangatkan badan. Sempurna untuk malam dingin di Malang. Penjual keliling yang sudah menjadi tradisi kuliner malam Malang.",
    jenis: ["minuman", "cemilan"],
    cocok_waktu: ["malam", "hujan"],
    tags: ["wedang", "hangat", "malam-dingin"],
    rating: 4.6,
    trending: false,
    cabang: [
      {
        nama: "Wedang Ronde Pak Mirin Malang",
        alamatLengkap: "Jl. Semeru No.1, Oro-oro Dowo, Kec. Klojen, Kota Malang",
        namaPencarian: "Wedang Ronde Pak Mirin Malang",
        jam_buka: "19.00-23.00",
        lat: -7.9809,
        lon: 112.6195
      },
      {
        nama: "Wedang Ronde Alun-alun Malang",
        alamatLengkap: "Jl. Merdeka Barat, Kauman, Kec. Klojen, Kota Malang",
        namaPencarian: "Wedang Ronde Alun-alun Malang",
        jam_buka: "19.00-24.00",
        lat: -7.9797,
        lon: 112.6282
      }
    ]
  },
  {
    id: "min_028",
    nama: "BOBA MILK TEA MALANG",
    foto_url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Milk tea dengan boba kenyal dalam berbagai rasa pilihan dari taro, matcha, coklat, hingga original. Boba dimasak fresh setiap hari dengan tekstur kenyal sempurna.",
    jenis: ["minuman"],
    cocok_waktu: ["siang", "sore", "malam", "tengah_malam"],
    tags: ["boba", "kekinian", "milk-tea"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Xing Fu Tang Malang Town Square",
        alamatLengkap: "Malang Town Square Lt.1, Jl. Veteran No.2, Penanggungan, Kec. Klojen, Kota Malang",
        namaPencarian: "Xing Fu Tang Malang Town Square",
        jam_buka: "10.00-22.00",
        lat: -7.9698,
        lon: 112.6315
      },
      {
        nama: "Chatime Malang Matos",
        alamatLengkap: "Malang Town Square Lt.2, Jl. Veteran No.2, Penanggungan, Kec. Klojen, Kota Malang",
        namaPencarian: "Chatime Malang Town Square",
        jam_buka: "10.00-22.00",
        lat: -7.9699,
        lon: 112.6316
      },
      {
        nama: "Mixue Malang Soekarno Hatta",
        alamatLengkap: "Jl. Soekarno Hatta No.9, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Mixue Soekarno Hatta Malang",
        jam_buka: "10.00-22.00",
        lat: -7.9387,
        lon: 112.6176
      }
    ]
  },
  {
    id: "min_029",
    nama: "KOPI MALANG BLEND",
    foto_url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Kopi single origin dari perkebunan kopi Malang Raya dengan cita rasa lokal yang khas. Tersedia berbagai metode seduh dari V60, pour over, hingga espresso based di kafe-kafe lokal terbaik Malang.",
    jenis: ["minuman", "kopi"],
    cocok_waktu: ["pagi", "siang", "sore", "malam"],
    tags: ["kopi", "single-origin", "kafe-lokal"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Kafe Ijen Malang",
        alamatLengkap: "Jl. Ijen No.15, Gading Kasri, Kec. Klojen, Kota Malang",
        namaPencarian: "Kafe Ijen Malang",
        jam_buka: "07.00-22.00",
        lat: -7.9751,
        lon: 112.6143
      },
      {
        nama: "One Eighty Coffee Malang",
        alamatLengkap: "Jl. Gajayana No.4, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "One Eighty Coffee Malang",
        jam_buka: "08.00-23.00",
        lat: -7.9492,
        lon: 112.6108
      }
    ]
  },
  {
    id: "kor_030",
    nama: "KOREAN FRIED CHICKEN MALANG",
    foto_url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Ayam goreng ala Korea dengan tekstur double-fried yang super crispy dibalut saus buldak pedas atau honey garlic manis. Viral di kalangan Gen Z Malang dengan berbagai pilihan level pedas.",
    jenis: ["ayam", "korean", "makanan"],
    cocok_waktu: ["siang", "malam"],
    tags: ["korean", "crispy", "pedas-manis"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Bonchon Malang Matos",
        alamatLengkap: "Malang Town Square Lt.1, Jl. Veteran No.2, Penanggungan, Kec. Klojen, Kota Malang",
        namaPencarian: "Bonchon Malang Town Square",
        jam_buka: "10.00-22.00",
        lat: -7.9697,
        lon: 112.6314
      },
      {
        nama: "KFC Malang Matos",
        alamatLengkap: "Malang Town Square, Jl. Veteran No.2, Kec. Klojen, Kota Malang",
        namaPencarian: "KFC Malang Town Square",
        jam_buka: "10.00-22.00",
        lat: -7.9700,
        lon: 112.6317
      }
    ]
  },
  {
    id: "kor_031",
    nama: "TTEOKBOKKI MALANG",
    foto_url: "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Kue beras kenyal dengan saus gochujang pedas manis khas Korea yang viral di Malang. Tersedia berbagai topping dari telur, fish cake, hingga ramen. Camilan favorit anak muda pecinta kuliner Korea.",
    jenis: ["korean", "cemilan", "makanan"],
    cocok_waktu: ["sore", "malam"],
    tags: ["korea", "viral", "pedas-manis"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Ttaeng Malang Dinoyo",
        alamatLengkap: "Jl. MT. Haryono No.150, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Ttaeng Tteokbokki Dinoyo Malang",
        jam_buka: "11.00-22.00",
        lat: -7.9529,
        lon: 112.6146
      },
      {
        nama: "Yori Korean Food Malang",
        alamatLengkap: "Jl. Gajayana No.10, Dinoyo, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Yori Korean Food Malang",
        jam_buka: "11.00-21.00",
        lat: -7.9488,
        lon: 112.6112
      }
    ]
  },
  {
    id: "prm_032",
    nama: "STEAK WAGYU LOKAL MALANG",
    foto_url: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Wagyu grade lokal dengan marbling sempurna dimasak sesuai tingkat kematangan pilihan dengan saus mushroom atau blackpepper house-made. Pengalaman steak premium dengan harga lebih terjangkau dari restoran hotel.",
    jenis: ["makanan", "western", "premium"],
    cocok_waktu: ["siang", "malam"],
    tags: ["steak", "wagyu", "premium"],
    rating: 4.7,
    trending: false,
    cabang: [
      {
        nama: "Warung Steak Malang",
        alamatLengkap: "Jl. Soekarno Hatta No.15, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Warung Steak Malang Soehat",
        jam_buka: "11.00-22.00",
        lat: -7.9383,
        lon: 112.6170
      },
      {
        nama: "Steak 21 Malang",
        alamatLengkap: "Jl. Kawi No.24, Bareng, Kec. Klojen, Kota Malang",
        namaPencarian: "Steak 21 Malang",
        jam_buka: "11.00-22.00",
        lat: -7.9788,
        lon: 112.6214
      }
    ]
  },
  {
    id: "prm_033",
    nama: "AYCE BBQ KOREA MALANG",
    foto_url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop",
    deskripsi: "All you can eat BBQ Korea dengan berbagai pilihan daging premium dari wagyu lokal, samgyeopsal, hingga galbi. Panggang sendiri di atas arang dengan berbagai saus dan banchan khas Korea yang melimpah.",
    jenis: ["makanan", "korean", "premium"],
    cocok_waktu: ["siang", "malam"],
    tags: ["all-you-can-eat", "BBQ", "korea"],
    rating: 4.6,
    trending: false,
    cabang: [
      {
        nama: "Gyu-Kaku Malang",
        alamatLengkap: "Jl. Veteran No.2, Penanggungan, Kec. Klojen, Kota Malang",
        namaPencarian: "Gyu-Kaku Malang",
        jam_buka: "11.00-22.00",
        lat: -7.9695,
        lon: 112.6312
      },
      {
        nama: "Pochajjang Korean BBQ Malang",
        alamatLengkap: "Jl. Soekarno Hatta No.1, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Pochajjang Korean BBQ Malang",
        jam_buka: "11.00-22.00",
        lat: -7.9381,
        lon: 112.6167
      }
    ]
  },
  {
    id: "min_034",
    nama: "ES TELER MALANG",
    foto_url: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Es teler segar dengan isian alpukat mentega, nangka harum, kelapa muda, dan siraman susu kental manis serta santan gurih. Pencuci mulut favorit warga Malang di siang hari.",
    jenis: ["minuman", "cemilan"],
    cocok_waktu: ["siang", "sore"],
    tags: ["segar", "es-teler", "buah"],
    rating: 4.6,
    trending: true,
    cabang: [
      {
        nama: "Es Teler Dempo",
        alamatLengkap: "Jl. Gede No.7, Oro-oro Dowo, Kec. Klojen, Kota Malang",
        namaPencarian: "Es Teler Dempo Malang",
        jam_buka: "09.00-16.00",
        lat: -7.9732,
        lon: 112.6215
      }
    ]
  },
  {
    id: "min_035",
    nama: "JUS BUAH SEGAR",
    foto_url: "https://images.unsplash.com/photo-1536599424071-0b215a388ba7?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Berbagai pilihan jus buah segar dari alpukat, mangga, sirsak, hingga naga merah. Dibuat langsung dari buah pilihan berkualitas untuk menjaga kesegaran dan vitaminnya.",
    jenis: ["minuman"],
    cocok_waktu: ["pagi", "siang", "sore"],
    tags: ["sehat", "jus", "buah"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Jus Buah Soehat",
        alamatLengkap: "Jl. Soekarno Hatta No.12, Mojolangu, Kec. Lowokwaru, Kota Malang",
        namaPencarian: "Jus Buah Soehat Malang",
        jam_buka: "08.00-22.00",
        lat: -7.9385,
        lon: 112.6172
      }
    ]
  },
  {
    id: "min_036",
    nama: "KOPI KENANGAN MALANG",
    foto_url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Kopi susu kekinian dengan gula aren asli yang memberikan rasa manis gurih yang pas. Menjadi favorit anak muda Malang untuk menemani aktivitas sehari-hari.",
    jenis: ["minuman", "kopi"],
    cocok_waktu: ["pagi", "siang", "sore"],
    tags: ["kopi", "kekinian", "gula-aren"],
    rating: 4.7,
    trending: true,
    cabang: [
      {
        nama: "Kopi Kenangan Matos",
        alamatLengkap: "Malang Town Square Lt. Dasar, Jl. Veteran No.2, Kota Malang",
        namaPencarian: "Kopi Kenangan Malang Town Square",
        jam_buka: "10.00-22.00",
        lat: -7.9696,
        lon: 112.6313
      }
    ]
  },
  {
    id: "min_037",
    nama: "ES CAMPUR LEGENDARIS",
    foto_url: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Es campur dengan isian komplit dari kolang-kaling, cincau, roti tawar, hingga mutiara. Disiram sirup merah khas dan susu kental manis yang melimpah.",
    jenis: ["minuman", "cemilan"],
    cocok_waktu: ["siang", "sore"],
    tags: ["segar", "tradisional", "es-campur"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Es Campur Bunul",
        alamatLengkap: "Jl. Hamid Rusdi No.10, Bunulrejo, Kec. Blimbing, Kota Malang",
        namaPencarian: "Es Campur Bunul Malang",
        jam_buka: "09.00-17.00",
        lat: -7.9612,
        lon: 112.6435
      }
    ]
  },
  {
    id: "min_038",
    nama: "THAI TEA MALANG",
    foto_url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Teh khas Thailand dengan campuran susu yang creamy dan aroma teh yang kuat. Tersedia varian original, green tea, hingga coffee thai tea.",
    jenis: ["minuman"],
    cocok_waktu: ["siang", "sore", "malam"],
    tags: ["thai-tea", "segar", "creamy"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Dum Dum Thai Tea Matos",
        alamatLengkap: "Malang Town Square Lt.3, Jl. Veteran No.2, Kota Malang",
        namaPencarian: "Dum Dum Thai Tea Malang Town Square",
        jam_buka: "10.00-22.00",
        lat: -7.9698,
        lon: 112.6315
      }
    ]
  },
  {
    id: "min_039",
    nama: "LEMON TEA SEGAR",
    foto_url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Teh segar dengan perasan lemon asli yang memberikan rasa asam manis yang menyegarkan. Cocok diminum saat cuaca panas di Malang.",
    jenis: ["minuman"],
    cocok_waktu: ["siang", "sore"],
    tags: ["lemon-tea", "segar", "asam-manis"],
    rating: 4.3,
    trending: false,
    cabang: [
      {
        nama: "Lemon Tea Soehat",
        alamatLengkap: "Jl. Soekarno Hatta No.15, Malang",
        namaPencarian: "Lemon Tea Soehat Malang",
        jam_buka: "10.00-22.00",
        lat: -7.9389,
        lon: 112.6178
      }
    ]
  },
  {
    id: "min_040",
    nama: "ES JERUK PERAS",
    foto_url: "https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Jeruk peras asli yang segar dengan tambahan es batu. Minuman klasik yang selalu disukai semua kalangan.",
    jenis: ["minuman"],
    cocok_waktu: ["siang", "sore"],
    tags: ["jeruk", "segar", "klasik"],
    rating: 4.5,
    trending: false,
    cabang: [
      {
        nama: "Es Jeruk Alun-alun",
        alamatLengkap: "Sekitar Alun-alun Malang",
        namaPencarian: "Es Jeruk Alun-alun Malang",
        jam_buka: "09.00-21.00",
        lat: -7.9797,
        lon: 112.6282
      }
    ]
  },
  {
    id: "min_041",
    nama: "SODA GEMBIRA",
    foto_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
    deskripsi: "Campuran air soda, susu kental manis, dan sirup merah yang memberikan sensasi ceria di setiap tegukan.",
    jenis: ["minuman"],
    cocok_waktu: ["siang", "malam"],
    tags: ["soda", "ceria", "manis"],
    rating: 4.4,
    trending: false,
    cabang: [
      {
        nama: "Soda Gembira Klojen",
        alamatLengkap: "Jl. Pattimura No.5, Malang",
        namaPencarian: "Soda Gembira Klojen Malang",
        jam_buka: "11.00-22.00",
        lat: -7.9750,
        lon: 112.6350
      }
    ]
  }
];

