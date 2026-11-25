// tema-kadro.js: her temaya altı ek karakter (tema başına toplam 10).
// [kod, ad, imza, ten, goz, sac, sacRengi, ust, ustRengi, {ust ekleri}, alt, ayak, [ek], {diger}]
const K = { kirpik: true }, Y = { yas: 'yasli' }, C = { yas: 'cocuk', boy: .72 };
export const EK_KADRO = {
  korsan: [
    ['ahci', 'Aşçı Baharat', 'aşçı şapkası, geniş gövde', '#c8946a', '#4a3424', 'kisa', '#5a3a2a', 'onluk', '#8a5a7a', { ic: '#fff0d8', etek: 70, genis: 108 }, '#4a3a4a', '#2a1c20', ['asci', 'biyik'], { en: 1.2 }],
    ['dumenci', 'Dümenci Poyraz', 'kızıl örgüler, yeşil bandana', '#f2c8a8', '#3f8a9a', 'orgu', '#d8642f', 'tunik', '#e8d2a8', { vurgu: '#2f8f7a', etek: 50 }, '#3a4a6a', '#5a3424', ['bandana'], { bandana: '#2f8f7a', ...K }],
    ['gozcu', 'Gözcü Martı', 'uzun boy, pilot gözlüğü', '#e0b088', '#4a6a8a', 'ibik', '#e8c25a', 'korsan', '#34507a', { cizgi: '#34507a', etek: 40 }, '#6a5a4a', '#4a3028', ['pilotgozluk'], { boy: 1.14, en: .88 }],
    ['cerrah', 'Cerrah Dalga', 'uzun siyah ceket, yuvarlak gözlük', '#8f5a3a', '#8a5a2a', 'kisa', '#d8d2dc', 'palto', '#2f3440', { dugme: '#c8ced8', etek: 130, genis: 108 }, '#3a3444', '#1f1a24', ['gozluk', 'sakal'], { gozluk: '#c8ced8', ...Y }],
    ['amiral', 'Amiral Beyaz', 'apoletli lacivert, fötr', '#f0c4a0', '#3f5a8a', 'topuz', '#f0ecf0', 'takim', '#2a3f86', { dugme: '#f2c43f', ic: '#fff6e6', etek: 90 }, '#f0e6d4', '#2a1c20', ['korsansapka'], { baslik: '#2a3f86', pelerin: '#a82f3a', ...Y, ...K }],
    ['deniz', 'Deniz Kızı Lal', 'mercan saç, yosun elbise', '#e8b49a', '#2fa890', 'uzun', '#ff7a5a', 'elbise', '#2fa08a', { etek: 230, genis: 108, kusak: '#ffd24a', yaka: '#ffb0a0' }, '#2fa08a', '#2fa08a', ['cicek', 'kupe'], { boy: .95, ...K }]],
  ortacag: [
    ['okcu', 'Okçu Defne', 'yeşil pelerin, sarı örgü', '#f0c8a4', '#3f8a5a', 'orgu', '#e0b04a', 'tunik', '#6a8f4a', { vurgu: '#e8d2a0', etek: 70 }, '#5a4a34', '#4a3024', [], { pelerin: '#2f6a4a', ...K }],
    ['kesis', 'Keşiş Ambros', 'kahve cüppe, kel', '#e0a884', '#4a3a2a', 'kel', '#8a6a4a', 'cuppe', '#7a5a3f', { vurgu: '#7a5a3f', etek: 220, genis: 124 }, '#7a5a3f', '#5a3a24', ['sakal'], { en: 1.18, ...Y }],
    ['prens', 'Prens Baran', 'küçük taç, mor kaftan', '#c88e66', '#5a3a24', 'savruk', '#2a1c20', 'kaftan', '#6a3f9a', { serit2: '#f2d27a', kusak: '#f0b93f', etek: 120 }, '#3a2a54', '#5a3424', ['tac'], C],
    ['casus', 'Casus Gölge', 'siyah pelerin, maske', '#d8a884', '#7a8a3a', 'bob', '#1a1420', 'tunik', '#2a2a3c', { vurgu: '#5a5a74', etek: 50 }, '#1f1f2c', '#15151f', ['maske'], { maske: '#2a2a3c', pelerin: '#15152a', en: .9, ...K }],
    ['dev', 'Dev Muhafız Koç', 'dev beden, miğfer', '#a8744f', '#3a2a20', 'kisa', '#2a1c18', 'zirh', '#6a7490', { vurgu: '#c8303c', kol: '#8a5a44', etek: 60, genis: 108, omuz: 104 }, '#4a4a5c', '#3a3a4a', ['viking', 'sakal'], { boy: 1.16, en: 1.22 }],
    ['ozan', 'Ozan Melodi', 'tüylü şapka, turuncu tunik', '#8a5638', '#8a5a2a', 'afro', '#2a1a20', 'tunik', '#e0843f', { vurgu: '#3f8ab0', kol: '#f0d2a0', etek: 60 }, '#3f6a8a', '#5a3424', ['fotr'], { fotr: '#8a2f5a', ...K }]],
  misir: [
    ['komutan', 'Komutan Ramo', 'tunç zırh', '#a86e44', '#3a2a1c', 'bob', '#15101c', 'zirh', '#c88a3a', { kol: '#a86e44', vurgu: '#2a8f9a', etek: 60 }, '#f0e2c4', '#8a5a2a', [], { boy: 1.1, en: 1.1, pelerin: '#c8433a' }],
    ['kediseven', 'Kediseven Nefi', 'siyah elbise, altın kuşak', '#c8946a', '#4fb05a', 'bob', '#15101c', 'elbise', '#2a2438', { kusak: '#f0b93f', yaka: '#f0b93f', etek: 220, genis: 112 }, '#2a2438', '#e0a43f', ['kupe', 'cicek'], K],
    ['kasifm', 'Arkeolog Aylin', 'haki yelek, hasır şapka', '#f0c8a8', '#5a6a3a', 'kuyruk', '#b0643a', 'yelek', '#a8925a', { kol: '#f0e6cc', ic: '#f0e6cc', kravat: '#f0e6cc', etek: 40 }, '#8a7850', '#5a3424', ['hasirsapka', 'gozluk'], { gozluk: '#5a3a2a', ...K }],
    ['mumya', 'Mumya Bandoş', 'sargılı, solgun', '#e8dcc0', '#4fd8c8', 'kel', '#d8c8a8', 'kazak', '#e8dcc0', { serit: '#c8b890', etek: 40 }, '#e0d2b0', '#d0c09a', ['maske'], { maske: '#d8c8a0', en: .92 }],
    ['cocuk', 'Çırak Pep', 'yan örgü, küçük boy', '#b87c50', '#3a2a1c', 'kuyruk', '#15101c', 'misir', '#f6ecd6', { kol: '#b87c50', etek: 40 }, '#b87c50', '#8a5a34', [], C],
    ['tuccar', 'Tüccar Zahir', 'mor kaftan, kavuk', '#c08a5c', '#3a2a20', 'kisa', '#2a1c18', 'kaftan', '#7a3f8a', { serit2: '#f2c45c', kusak: '#2a8f9a', etek: 230, genis: 130 }, '#4a2a5a', '#8a5a2a', ['kavuk', 'sakal'], { kavuk: '#e0843f', en: 1.14 }]],
  bati: [
    ['demiryolcu', 'Makinist Kömür', 'çizgili tulum, kasket', '#8f5a3c', '#3a2a1c', 'kisa', '#2a1c20', 'tulum', '#3f5a8a', { ic: '#d8d2c8', kol: '#d8d2c8', etek: 34 }, '#3f5a8a', '#2a2024', ['kasket', 'biyik'], { kasket: '#3f5a8a', en: 1.1 }],
    ['kovboykiz', 'Binici Rüya', 'turkuaz fular, uzun örgü', '#d8a07a', '#4f7a8a', 'orgu', '#8a4a2a', 'kovboy', '#c88a4a', { kol: '#f0e2c8', fular: '#2fa8a8', etek: 30 }, '#4a6a9a', '#6a3a24', ['kovboysapka'], { baslik: '#e8d2a8', ...K }],
    ['doktor', 'Doktor Şişe', 'uzun redingot, silindir gövde', '#f0c4a0', '#5a4a3a', 'kisa', '#c8c2cc', 'palto', '#4a3a5a', { dugme: '#e8c06a', etek: 120 }, '#3a3444', '#2a1c20', ['fotr', 'gozluk'], { fotr: '#2a2434', boy: 1.12, en: .9, ...Y }],
    ['kazan', 'Aşçı Mama Biber', 'kırmızı elbise, önlük', '#8a5436', '#3a2a1c', 'topuz', '#2a1c20', 'onluk', '#c8403a', { ic: '#fff0d8', etek: 190, genis: 124 }, '#c8403a', '#4a2a24', ['bandana', 'kupe'], { bandana: '#f2c45c', en: 1.2, ...K }],
    ['cocuk', 'Gazeteci Çocuk Tik', 'kasket, askılı', '#f0c8a8', '#4a7a5a', 'kisa', '#d8843f', 'ciftci', '#e8d2b0', { kare: '#c8a07a', aski: '#6a4a34', etek: 24 }, '#6a5a44', '#4a3024', ['kasket'], { kasket: '#7a6a54', ...C }],
    ['kartal', 'Rehber Kartal', 'deri tunik, uzun siyah saç', '#b87448', '#2a1c14', 'uzun', '#15101a', 'tunik', '#a8703f', { vurgu: '#2fa8a8', kol: '#b87448', etek: 80 }, '#8a5a34', '#5a3424', [], { boy: 1.06 }]],
  japon: [
    ['usta', 'Usta Kenji', 'ak sakal, gri kimono', '#e0b48c', '#3a3a44', 'topuz', '#f0ecf0', 'kimono', '#8a8a9a', { vurgu: '#c8c8d8', obi: '#3a3a4a', etek: 220 }, '#8a8a9a', '#e8d2b0', ['sakal'], { boy: .86, ...Y }],
    ['cayci', 'Çaycı Hana', 'yeşil kimono, önlük', '#f4d0b0', '#5a3a2a', 'bob', '#2a1c20', 'kimono', '#4f9a6a', { vurgu: '#e8f0c8', obi: '#f2c45c', etek: 210 }, '#4f9a6a', '#e8d2b0', ['cicek'], { boy: .92, ...K }],
    ['sumo', 'Sumo Dağ', 'dev beden, topuz', '#e8bc94', '#3a2a24', 'topuz', '#1a1420', 'kimono', '#3f4f9a', { vurgu: '#e8b84a', obi: '#f2ead8', etek: 90, genis: 108, omuz: 104 }, '#e8bc94', '#8a6a44', [], { en: 1.36 }],
    ['ogrenci', 'Öğrenci Sora', 'lacivert ceket, kırmızı fular', '#f2ccaa', '#4a3a5a', 'kuyruk', '#3a2a34', 'takim', '#2a3460', { ic: '#f4f4fa', dugme: '#e0483c', etek: 40 }, '#3a4474', '#2a2030', [], { atki: '#e0483c', boy: .84, ...K }],
    ['prenses', 'Prenses Kiku', 'altın taç, kırmızı kimono', '#f6d6ba', '#3a2a34', 'uzun', '#15101a', 'kimono', '#c8304a', { vurgu: '#ffd86a', obi: '#f0b93f', etek: 250, genis: 132 }, '#c8304a', '#f0d2a0', ['tac', 'kupe'], K],
    ['maskeli', 'Tilki Maske', 'turuncu saç, beyaz maske', '#f0c8a0', '#e0843f', 'ibik', '#f0843f', 'kimono', '#f4ece0', { vurgu: '#e0843f', obi: '#2a2a3a', etek: 120 }, '#2a2a3a', '#e8d2b0', ['maske'], { maske: '#fff6ee', en: .92 }]],
  uzay: [
    ['muhendis', 'Mühendis Vida', 'sarı tulum, baret', '#c88a62', '#4a6a4a', 'kuyruk', '#5a2f2a', 'tulum', '#e0a83f', { ic: '#3a4468', kol: '#3a4468', etek: 34 }, '#e0a83f', '#3a3044', ['baret'], { baslik: '#eef2fa', ...K }],
    ['bitkici', 'Botanikçi Filiz', 'yeşil önlük, kıvırcık', '#8a5638', '#5a8a3a', 'afro', '#2a1a1c', 'doktor', '#e8f4ea', { ic: '#4fb06a', etek: 110 }, '#4a7a5a', '#e8e2d8', ['gozluk'], { gozluk: '#4fb06a', ...K }],
    ['imparator', 'İmparator Kozmo', 'altın taç, mor pelerin', '#a8b8e0', '#ff5f9a', 'kel', '#6a7ab0', 'kaftan', '#3a2f7a', { serit2: '#f2c43f', kusak: '#f2c43f', etek: 240, genis: 132 }, '#2a2050', '#f2c43f', ['tac'], { boy: 1.14, pelerin: '#8a2f9a' }],
    ['cocuk', 'Yıldız Çocuk Luna', 'mini uzay giysisi', '#f2ccaa', '#4a6ac8', 'bob', '#c88ae0', 'uzay', '#c8a8f0', { vurgu: '#ffd24a', etek: 60 }, '#b090e0', '#7a5ab0', ['uzaymigfer'], { baslikVurgu: '#ffd24a', ...C, ...K }],
    ['droid', 'Dev Droid TON', 'dev kırmızı robot', '#8a94b0', '#5fe0ff', 'kel', '#5a6484', 'zirh', '#c8483c', { vurgu: '#ffd24a', kol: '#6a7490', etek: 60, genis: 108, omuz: 106 }, '#5a6484', '#3a4468', ['vizor', 'anten'], { baslikVurgu: '#5fe0ff', boy: 1.16, en: 1.28 }],
    ['tuccar', 'Gezgin Tüccar Orbi', 'turuncu ten, kapüşon', '#f0a05a', '#2a2a5a', 'kel', '#c8703a', 'cuppe', '#5a6a5a', { vurgu: '#f0c25a', etek: 200, manset: '#c8703a' }, '#4a4a3a', '#3a3024', ['pilotgozluk'], { boy: .8, en: 1.2, pelerin: '#8a6a3a' }]],
  kutup: [
    ['doktor', 'Doktor Çiğ', 'beyaz parka, mercan örtü', '#e0a884', '#4a3a2a', 'ortu', '#e8685c', 'parka', '#f0f4fa', { etek: 100 }, '#4a5a7a', '#3a3044', [], K],
    ['kaptan', 'Buzkıran Kaptan', 'lacivert palto, kasket', '#e8b088', '#3f6a9a', 'kisa', '#f0ecf0', 'palto', '#263a66', { dugme: '#f2c43f', etek: 110 }, '#263a66', '#1a1a24', ['kasket', 'sakal'], { kasket: '#1f2f54', boy: 1.06, ...Y }],
    ['cocuk', 'Çocuk Pika', 'sarı mini parka', '#d8a078', '#3a2a1c', 'bob', '#15101a', 'parka', '#f2c43f', { etek: 80 }, '#8a5a3a', '#5a3a2a', ['kurk'], { ...C, ...K }],
    ['yeti', 'Yeti Pofu', 'dev beyaz kürk', '#b8d8f0', '#2a5aa8', 'afro', '#f6fbff', 'parka', '#eaf4fc', { etek: 120, genis: 112, omuz: 106, kol: '#f6fbff' }, '#eaf4fc', '#b8d0e4', ['sakal'], { boy: 1.2, en: 1.34 }],
    ['radyocu', 'Telsizci Sinyal', 'mor mont, kulaklık', '#8f5a3c', '#c88a3a', 'afro', '#2a1a1c', 'mont', '#7a4fb0', { etek: 50 }, '#3a3054', '#f0e8dc', ['kulaklik', 'mikrofon'], { kulaklik: '#ff7a4a' }],
    ['kizakci', 'Kızakçı Bora', 'yeşil atkı, bere', '#f2c8a8', '#4f7a4a', 'savruk', '#e0943f', 'kazak', '#c8503c', { serit: '#f4ece0', etek: 36 }, '#3f4f6a', '#5a3a2a', ['bere'], { bere: '#2f8f7a', atki: '#2f8f7a', en: .94 }]],
  siber: [
    ['patron', 'Patron Volt', 'altın takım, kel', '#c8946e', '#ffd84a', 'kel', '#2a2a34', 'takim', '#c89a2f', { ic: '#1a1a2c', dugme: '#1a1a2c', etek: 70, genis: 108 }, '#1f1f30', '#15151f', ['vizor'], { baslikVurgu: '#ffd84a', en: 1.22 }],
    ['dj', 'DJ Frekans', 'mor afro, dev kulaklık', '#8a5436', '#ff4fa8', 'afro', '#8a4fff', 'hoodie', '#1f1f3a', { amblem: '#4fffd0', etek: 50 }, '#4a2a7a', '#ff4fa8', ['kulaklik'], { kulaklik: '#4fffd0', ...K }],
    ['mekanik', 'Mekanik Pas', 'turuncu tulum, pilot gözlüğü', '#e0aa84', '#4a8a6a', 'orgu', '#e04f3f', 'tulum', '#e0703f', { ic: '#2a2a44', kol: '#2a2a44', etek: 34 }, '#e0703f', '#2a2434', ['pilotgozluk'], K],
    ['cocuk', 'Glitch', 'küçük boy, camgöbeği saç', '#f0c8a8', '#ff4fa8', 'savruk', '#4fe0ff', 'siber', '#3a2a6a', { vurgu: '#ff4fa8', etek: 40 }, '#1c1c3a', '#4fe0ff', ['maske'], { maske: '#1c1c3a', ...C }],
    ['muhafiz', 'Muhafız X9', 'dev zırh, kırmızı vizör', '#8a94b0', '#ff3f4a', 'kel', '#5a6484', 'zirh', '#3a3f5a', { vurgu: '#ff3f4a', kol: '#2a2f48', etek: 60, genis: 108, omuz: 106 }, '#2a2f48', '#1c2034', ['migfer', 'vizor'], { baslik: '#ff3f4a', baslikVurgu: '#ff3f4a', boy: 1.16, en: 1.24 }],
    ['kahin', 'Kâhin Neon', 'parlayan cüppe', '#d8b8e8', '#4fffd0', 'uzun', '#e8e0ff', 'cuppe', '#2f2460', { vurgu: '#4fffd0', etek: 240, genis: 130 }, '#1c1440', '#4fffd0', [], { pelerin: '#1c1440', ...Y, ...K }]],
  modern: [
    ['sofor', 'Şoför Rıza', 'kareli gömlek, bıyık', '#c88e66', '#4a3424', 'kisa', '#4a3a34', 'ciftci', '#5a8ab0', { kare: '#e8f0f4', aski: '#4a4a5a', etek: 34 }, '#4a4a5a', '#3a2a24', ['kasket', 'biyik'], { kasket: '#6a5a4a', en: 1.18 }],
    ['teyze', 'Nermin Teyze', 'çiçekli örtü, hırka', '#e8bc98', '#4a6a5a', 'ortu', '#c84f7a', 'hirka', '#5a8f7a', { ic: '#f4ead8', etek: 120, genis: 116 }, '#5a4a6a', '#4a3034', ['gozluk'], { gozluk: '#c88a3a', boy: .86, en: 1.12, ...Y, ...K }],
    ['sporcu', 'Sporcu Ateş', 'kırmızı mont, dikik saç', '#8f5a3c', '#3a2a1c', 'ibik', '#2a1a1c', 'mont', '#e0403a', { etek: 30 }, '#2a2a3c', '#f4f4fa', [], { boy: 1.12, en: .95 }],
    ['kiz', 'Küçük Derin', 'pembe elbise, sırma kuyruk', '#f4d0b4', '#5a8ac8', 'kuyruk', '#e0b85a', 'elbise', '#f07aa8', { kusak: '#ffffff', etek: 110, genis: 104 }, '#f4e0e8', '#f4f4fa', ['cicek'], { ...C, ...K }],
    ['sanatci', 'Ressam Mavi', 'bere, boyalı önlük', '#e0aa84', '#5a4a8a', 'bob', '#3f7ac8', 'onluk', '#f0c25a', { ic: '#f4f0e8', etek: 80 }, '#5a5a7a', '#8a4a3a', ['bere'], { bere: '#2a2a44', ...K }],
    ['bilge', 'Emekli Kazım', 'kahve yelek, baston duruşu', '#e8b490', '#5a6a7a', 'kisa', '#f0ecf0', 'yelek', '#7a5a44', { kol: '#f0e6d4', ic: '#f0e6d4', kravat: '#7a3f34', etek: 40 }, '#5a5048', '#3a2a24', ['gozluk', 'fotr'], { gozluk: '#3a3a4a', fotr: '#6a5244', boy: .9, ...Y }]],
  bilim: [
    ['robotcu', 'Robotçu Dişli', 'turuncu tulum, anten', '#8a5638', '#ff9a3f', 'kel', '#2a1a1c', 'tulum', '#f08a3f', { ic: '#e8e8f0', kol: '#e8e8f0', etek: 34 }, '#f08a3f', '#3a3044', ['anten', 'sakal'], { baslikVurgu: '#4fe08a', en: 1.1 }],
    ['kimyager', 'Kimyager Zümrüt', 'yeşil saç, önlük', '#f4d0b4', '#4fe08a', 'ibik', '#4fd88a', 'doktor', '#f0f6f4', { ic: '#2a2a44', etek: 120 }, '#2a2a44', '#4fd88a', ['pilotgozluk'], { en: .9 }],
    ['astronom', 'Astronom Gece', 'lacivert cüppe, yıldızlar', '#c88e66', '#8a7ae0', 'uzun', '#2a2a5a', 'cuppe', '#25306a', { vurgu: '#ffe07a', etek: 210 }, '#25306a', '#3a2a44', ['gozluk'], { gozluk: '#ffe07a', ...K }],
    ['mudur', 'Müdire Demir', 'gri takım, sıkı topuz', '#e8bc9a', '#5a5a6a', 'topuz', '#8a8a98', 'takim', '#6a6a7c', { ic: '#f4ead8', etek: 90 }, '#4a4a5a', '#2a2430', ['gozluk', 'kupe'], { gozluk: '#c8303c', boy: 1.08, ...Y, ...K }],
    ['dahi', 'Dahi Çocuk Pi', 'dev gözlük, papyonlu yelek', '#f0c8a8', '#4a7ac8', 'kivircik', '#c8642f', 'yelek', '#3f6ab0', { kol: '#f4f4fa', ic: '#f4f4fa', kravat: '#e0483c', etek: 24 }, '#5a5a6a', '#3a2a24', ['gozluk'], { gozluk: '#2a2a3a', ...C }],
    ['temizlikci', 'Görevli Şükrü', 'mavi tulum, kasket', '#b87c56', '#3a2a1c', 'kisa', '#5a5a64', 'tulum', '#4a7ab0', { ic: '#d8d2c8', kol: '#d8d2c8', etek: 34 }, '#4a7ab0', '#3a3a44', ['kasket', 'biyik'], { kasket: '#3a5a8a', boy: .94, en: 1.06, ...Y }]],
  masal: [
    ['prenses', 'Prenses Işıl', 'taç, pembe elbise', '#f4d2b8', '#4a8ac8', 'uzun', '#e8c25a', 'elbise', '#f08ab8', { kusak: '#ffe07a', etek: 240, genis: 144 }, '#f08ab8', '#ffe07a', ['tac', 'kupe'], K],
    ['sovalye', 'Kara Şövalye', 'siyah zırh, mor pelerin', '#c8a08a', '#c84f4f', 'kisa', '#1a1420', 'zirh', '#3a3a4e', { vurgu: '#8a4fc8', kol: '#2a2a3c', etek: 70, omuz: 102 }, '#2a2a3c', '#1f1f2c', ['migfer'], { baslik: '#8a4fc8', pelerin: '#4a2a7a', boy: 1.12 }],
    ['peri', 'Peri Çisem', 'minik, camgöbeği elbise', '#e0f0e8', '#2fa8c8', 'bob', '#7ae0e8', 'elbise', '#5ac8d8', { kusak: '#f4ffff', etek: 110, genis: 108 }, '#e0f0e8', '#5ac8d8', ['cicek'], { boy: .58, ...K }],
    ['ork', 'Ork Homur', 'yeşil ten, dev beden', '#7aa05a', '#e0a43f', 'kel', '#4a6a34', 'tunik', '#6a4a3a', { vurgu: '#a83f34', kol: '#7aa05a', etek: 70, genis: 108, omuz: 104 }, '#4a3a30', '#3a2a20', ['viking'], { boy: 1.14, en: 1.3 }],
    ['avci', 'Avcı Kızıl', 'kırmızı pelerin, örgü', '#f0c8a8', '#5a3a24', 'orgu', '#8a4a2a', 'tunik', '#f0e2c8', { vurgu: '#c8303c', etek: 90 }, '#5a4a3a', '#5a3424', ['kukuleta'], { pelerin: '#c8303c', ...K }],
    ['soytari', 'Kukla Pinti', 'tahta ten, sarı yelek', '#d8a868', '#3a2a1c', 'kisa', '#8a5a34', 'yelek', '#e0a83f', { kol: '#c8403a', ic: '#f4ead8', kravat: '#3f7ab0', etek: 30 }, '#3f7ab0', '#8a4a2a', ['sivrisapka'], { baslik: '#c8403a', boy: .8, en: .86 }]],
  antik: [
    ['sporcu', 'Koşucu Nike', 'kısa tunik, defne tacı', '#a86e48', '#3a2a1c', 'kuyruk', '#2a1c18', 'tunik', '#4fb0d8', { vurgu: '#ffffff', kol: '#a86e48', etek: 30 }, '#a86e48', '#e0c08a', ['defne'], { boy: 1.1, en: .9, ...K }],
    ['heykeltiras', 'Heykeltıraş Dion', 'önlük, kel, iri gövde', '#c8946a', '#4a5a6a', 'kel', '#4a3a30', 'onluk', '#d8c8a8', { ic: '#a89a84', etek: 90, genis: 106 }, '#8a7a64', '#6a4a34', ['sakal', 'bandana'], { bandana: '#a89a84', en: 1.22 }],
    ['kahin', 'Kâhin Pythia', 'mor örtü, pelerin', '#e0b090', '#6ad0c0', 'ortu', '#6a4a9a', 'cuppe', '#4a3a7a', { vurgu: '#f0d27a', etek: 240 }, '#4a3a7a', '#e0b87a', ['kupe'], { pelerin: '#2f2454', ...K }],
    ['cocuk', 'Çırak Ikaros', 'küçük boy, sarı kıvırcık', '#f0c8a4', '#4a8ac8', 'kivircik', '#e8c25a', 'tunik', '#f4ece0', { vurgu: '#e0843f', kol: '#f0c8a4', etek: 50 }, '#f0c8a4', '#a8704a', [], C],
    ['kral', 'Kral Midas', 'altın taç, altın kaftan', '#d8a078', '#5a4a2a', 'kisa', '#c8c2c8', 'kaftan', '#e0a82f', { serit2: '#fff0b8', kusak: '#8a2f4a', etek: 240, genis: 136 }, '#b8842a', '#f0c24a', ['tac', 'sakal'], { en: 1.16, ...Y }],
    ['balikci', 'Balıkçı Nereus', 'hasır şapka, çıplak kol', '#b87c50', '#3f8a9a', 'kisa', '#8a8a94', 'tunik', '#7a9a8a', { vurgu: '#e8dcc0', kol: '#b87c50', etek: 40 }, '#b87c50', '#8a6a4a', ['hasirsapka', 'biyik'], { boy: .92, ...Y }]],
};
