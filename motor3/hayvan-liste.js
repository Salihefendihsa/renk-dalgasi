// hayvan-liste.js: hayvanlarin adi, sesi, olcegi (tarayicisiz da okunur). s: yoldas olcegi, dev: canavar sahnesindeki olcek
export const HAYVAN = {
  korsan_papagan: { ad: 'Kaptan papağan', ses: 'cik', s: 1.1 }, maymun: { ad: 'Bandanalı maymun', ses: 'maymun', ayak: 1 }, kraken: { ad: 'Kraken', ses: 'kukreme', dev: 2.6 },
  zirhli_at: { ad: 'Zırhlı at', ses: 'kisne', ayak: 1, s: .85 }, kuzgun: { ad: 'Kuzgun', ses: 'gak', s: 1.2 }, kizil_ejder: { ad: 'Kızıl ejderha', ses: 'kukreme', dev: 2.3 },
  suslu_deve: { ad: 'Süslü deve', ses: 'bogur', ayak: 1, s: .8 }, kutsal_kedi: { ad: 'Kutsal kedi', ses: 'miyav' }, dev_kobra: { ad: 'Dev kobra', ses: 'tisla', dev: 2.7 },
  eyerli_at: { ad: 'Eyerli at', ses: 'kisne', ayak: 1, s: .85 }, cakal: { ad: 'Çakal', ses: 'uluma', ayak: 1 }, dev_akrep: { ad: 'Dev akrep', ses: 'tikirti', dev: 2.6 },
  sans_kedisi: { ad: 'Şans kedisi', ses: 'miyav', s: 1.1 }, turna: { ad: 'Turna', ses: 'cik', s: 1.1 }, bulut_ejderi: { ad: 'Bulut ejderi', ses: 'kukreme', dev: 2.3 },
  kubbeli_uzayli: { ad: 'Kubbeli uzaylı', ses: 'bip', s: .9 }, gezgin: { ad: 'Gezgin robot', ses: 'bip' }, yildiz_solucani: { ad: 'Yıldız solucanı', ses: 'kukreme', dev: 2.3 },
  bereli_penguen: { ad: 'Bereli penguen', ses: 'cik', s: .95 }, kizak_kopegi: { ad: 'Kızak köpeği', ses: 'havla', ayak: 1 }, yeti: { ad: 'Yeti', ses: 'kukreme', dev: 1.9 },
  neon_kopek: { ad: 'Neon robot köpek', ses: 'bip', ayak: 1, s: .9 }, holo_kedi: { ad: 'Hologram kedi', ses: 'miyav' }, dev_mecha: { ad: 'Dev mecha', ses: 'robot', dev: 1.75 },
  kasketli_kopek: { ad: 'Kasketli köpek', ses: 'havla', ayak: 1, s: 1.1 }, sokak_kedisi: { ad: 'Sokak kedisi', ses: 'miyav' }, dev_supurge: { ad: 'Dev robot süpürge', ses: 'robot', dev: 2.8 },
  gozluklu_tavuk: { ad: 'Gözlüklü tavuk', ses: 'gidak' }, deney_faresi: { ad: 'Deney faresi', ses: 'cik', s: 1.3 }, balcik: { ad: 'Balçık canavarı', ses: 'kabarcik', dev: 2.5 },
  cicekli_koyun: { ad: 'Çiçekli koyun', ses: 'mele', ayak: 1, s: 1.1 }, tilki: { ad: 'Tilki', ses: 'havla', ayak: 1, s: 1.1 }, agac_canavari: { ad: 'Ağaç canavarı', ses: 'kukreme', dev: 1.8 },
  vazolu_kaplumbaga: { ad: 'Vazo desenli kaplumbağa', ses: 'tikirti', s: 1.2 }, keci: { ad: 'Defneli keçi', ses: 'mele', ayak: 1 }, hydra: { ad: 'Üç başlı Hydra', ses: 'kukreme', dev: 2 },
  // sade hayvanlar: her temada kullanilabilir
  at: { ad: 'At', ses: 'kisne', ayak: 1 }, deve: { ad: 'Deve', ses: 'bogur', ayak: 1 }, kopek: { ad: 'Köpek', ses: 'havla', ayak: 1 }, kurt: { ad: 'Kurt', ses: 'uluma', ayak: 1 }, kedi: { ad: 'Kedi', ses: 'miyav' }, koyun: { ad: 'Koyun', ses: 'mele', ayak: 1 },
  robokopek: { ad: 'Robot köpek', ses: 'bip', ayak: 1 }, papagan: { ad: 'Papağan', ses: 'cik' }, tavuk: { ad: 'Tavuk', ses: 'gidak' }, penguen: { ad: 'Penguen', ses: 'cik' }, yarasa: { ad: 'Yarasa', ses: 'cik' }, kaplumbaga: { ad: 'Kaplumbağa', ses: 'tikirti' },
  yilan: { ad: 'Yılan', ses: 'tisla', dev: 2.6 }, ahtapot: { ad: 'Ahtapot', ses: 'kabarcik', dev: 2.6 }, kopekbaligi: { ad: 'Köpek balığı', ses: 'kukreme', dev: 2.6 }, ejder: { ad: 'Ejderha', ses: 'kukreme', dev: 2.3 }, uzayli: { ad: 'Uzaylı yaratık', ses: 'bip', dev: 2.6 },
};
// tema: [yoldas, ikinci hayvan, dev canavar]
export const TEMA_HAYVAN = { korsan: ['korsan_papagan', 'maymun', 'kraken'], ortacag: ['zirhli_at', 'kuzgun', 'kizil_ejder'], misir: ['suslu_deve', 'kutsal_kedi', 'dev_kobra'], bati: ['eyerli_at', 'cakal', 'dev_akrep'], japon: ['sans_kedisi', 'turna', 'bulut_ejderi'], uzay: ['kubbeli_uzayli', 'gezgin', 'yildiz_solucani'], kutup: ['bereli_penguen', 'kizak_kopegi', 'yeti'], siber: ['neon_kopek', 'holo_kedi', 'dev_mecha'], modern: ['kasketli_kopek', 'sokak_kedisi', 'dev_supurge'], bilim: ['gozluklu_tavuk', 'deney_faresi', 'balcik'], masal: ['cicekli_koyun', 'tilki', 'agac_canavari'], antik: ['vazolu_kaplumbaga', 'keci', 'hydra'] };
// binilebilen hayvan: sirt yuksekligi (olceksiz)
export const BINEK_Y = { zirhli_at: 1.5, eyerli_at: 1.5, at: 1.4, suslu_deve: 1.5, deve: 1.5, cicekli_koyun: .95, koyun: .9, kizak_kopegi: .82, kopek: .68, kurt: .95, neon_kopek: 1, robokopek: .95, gezgin: .75, vazolu_kaplumbaga: .72, kaplumbaga: .66, gozluklu_tavuk: .82, tavuk: .78, tilki: .62, keci: .84, dev_supurge: .5, bulut_ejderi: 1.35, kizil_ejder: 1.2, ejder: 1.2, kopekbaligi: 1.2, sans_kedisi: 1.02 };
// tema: [binek, olcek]
export const TEMA_BINEK = { korsan: ['kopekbaligi', 1], ortacag: ['zirhli_at', .85], misir: ['suslu_deve', .8], bati: ['eyerli_at', .85], japon: ['bulut_ejderi', .9], uzay: ['gezgin', 1.3], kutup: ['kizak_kopegi', 1.35], siber: ['neon_kopek', 1.2], modern: ['dev_supurge', 1.1], bilim: ['gozluklu_tavuk', 1.7], masal: ['cicekli_koyun', 1.35], antik: ['vazolu_kaplumbaga', 1.8] };
