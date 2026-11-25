// ortam.js: her mekanin kendi canlisi, ortam sesi, yuruyus zemini ve calgisi.
// canli: yol = daire (uzakta doner), gecis (karsidan karsiya), ucus (yakinda dolanir), yer (yerde gider), atla (sudan atlar)
import { ekle as mekanEkle } from './ek-mekan.js';
const c = (p, yol, n, o = {}) => ({ p, yol, n, ...o });
export const ORTAM = {
  korsan: { tini: 'akordeon', guverte: { ses: 'deniz', zemin: 'ahsap', canli: [c('marti', 'daire', 5, { y: 5, r: 7, z: -8, s: 1.3 }), c('yunus', 'atla', 2, { x: -7, z: -14, s: 1.6, y: -2.4 })] }, ada: { ses: 'deniz', zemin: 'kum', canli: [c('marti', 'daire', 4, { y: 4.5, r: 6, z: -7, s: 1.2 }), c('kelebek', 'ucus', 3, { y: 1.6, renk: '#ffd24a' })] } },
  ortacag: { tini: 'ud', kale: { ses: 'cayir', zemin: 'cim', canli: [c('karga', 'daire', 5, { y: 6.5, r: 8, z: -11, s: 1.3 }), c('kelebek', 'ucus', 4, { y: 1.2, renk: '#fff0a0' })] }, salon: { ses: 'salon', zemin: 'tas', canli: [c('yarasa', 'daire', 2, { y: 4.6, r: 2.6, z: -2, s: .45 })] } },
  misir: { tini: 'flut', col: { ses: 'col', zemin: 'kum', canli: [c('akbaba', 'daire', 4, { y: 7, r: 9, z: -14, s: 1.7 }), c('bokbocegi', 'yer', 2, { z: 1.4, s: .6 })] }, tapinak: { ses: 'magara', zemin: 'tas', canli: [c('bokbocegi', 'yer', 3, { z: 1.2, s: .6 })] } },
  bati: { tini: 'banjo', kasaba: { ses: 'col', zemin: 'kum', canli: [c('calitopu', 'yer', 2, { z: -1.6, s: 1.1, yuvar: 1, hiz: 1.1 }), c('akbaba', 'daire', 3, { y: 7, r: 8, z: -13, s: 1.6 })] }, demiryolu: { ses: 'gece', zemin: 'kum', canli: [c('calitopu', 'yer', 3, { z: -1.2, s: 1, yuvar: 1, hiz: 1 }), c('akbaba', 'daire', 3, { y: 6, r: 8, z: -12, s: 1.5 })] } },
  japon: { tini: 'koto', bahce: { ses: 'bahce', zemin: 'cim', canli: [c('kelebek', 'ucus', 6, { y: 1.5, renk: '#ff9ac0' }), c('turna', 'gecis', 3, { y: 4.6, z: -9, s: 1.1 })] }, sokak: { ses: 'gece', zemin: 'tas', canli: [c('atesbocegi', 'ucus', 9, { y: 1.6 })] } },
  uzay: { tini: 'sentez', gezegen: { ses: 'uzay', zemin: 'kum', canli: [c('ufo', 'gecis', 2, { y: 5.4, z: -14, s: 1.6 })] }, gemi: { ses: 'makine', zemin: 'metal', canli: [c('drone', 'ucus', 2, { y: 2.6, s: .6 })] } },
  kutup: { tini: 'can', buz: { ses: 'kutup', zemin: 'kar', canli: [c('baykus', 'daire', 3, { y: 5, r: 7, z: -10, s: 1.4 }), c('yunus', 'atla', 1, { x: 8, z: -16, s: 2, y: -1.4 })] }, kamp: { ses: 'kutup', zemin: 'kar', canli: [c('baykus', 'daire', 2, { y: 4.4, r: 6, z: -8, s: 1.3 })] } },
  siber: { tini: 'sentez', cadde: { ses: 'neon', zemin: 'metal', canli: [c('ucan_araba', 'gecis', 5, { y: 5, z: -10, s: 1.3, hiz: 3 }), c('drone', 'ucus', 2, { y: 3.2, s: .6 })] }, cati: { ses: 'neon', zemin: 'metal', canli: [c('ucan_araba', 'gecis', 5, { y: 3.4, z: -12, s: 1.4, hiz: 3 }), c('drone', 'ucus', 2, { y: 3, s: .6 })] } },
  modern: { tini: 'piyano', cadde: { ses: 'sehir', zemin: 'tas', canli: [c('guvercin', 'daire', 6, { y: 4.6, r: 5, z: -6, s: 1 })] }, ofis: { ses: 'ofis', zemin: 'tas', canli: [c('kagit_ucak', 'gecis', 2, { y: 2.4, z: -2, s: .7, hiz: 1.6 })] } },
  bilim: { tini: 'can', lab: { ses: 'lab', zemin: 'tas', canli: [c('drone', 'ucus', 2, { y: 2.8, s: .6 })] }, sinif: { ses: 'ofis', zemin: 'ahsap', canli: [c('kagit_ucak', 'gecis', 3, { y: 2.2, z: -1.6, s: .7, hiz: 1.8 })] } },
  masal: { tini: 'flut', orman: { ses: 'orman', zemin: 'cim', canli: [c('kelebek', 'ucus', 7, { y: 1.4, renk: '#c88aff' }), c('atesbocegi', 'ucus', 8, { y: 1.8 })] }, kulube: { ses: 'orman', zemin: 'ahsap', canli: [c('atesbocegi', 'ucus', 10, { y: 1.6 })] } },
  antik: { tini: 'ud', agora: { ses: 'cekirge', zemin: 'tas', canli: [c('kelebek', 'ucus', 4, { y: 1.5, renk: '#8ad0ff' }), c('marti', 'daire', 3, { y: 6, r: 7, z: -10, s: 1.2 })] }, liman: { ses: 'deniz', zemin: 'ahsap', canli: [c('marti', 'daire', 6, { y: 4.8, r: 7, z: -9, s: 1.3 }), c('yunus', 'atla', 2, { x: 6, z: -13, s: 1.5, y: -1.4 })] } },
};
mekanEkle(ORTAM, (t, ad, x) => { t[ad] = { ses: x.ses, zemin: x.zemin, canli: x.canli }; });
export const ORTAM_AD = { deniz: 'dalga ve martı', cayir: 'rüzgâr ve karga', salon: 'taş salon yankısı', col: 'çöl rüzgârı', magara: 'mağara damlaları', gece: 'gece böcekleri', bahce: 'su ve rüzgâr çanı', uzay: 'uzay uğultusu', makine: 'makine uğultusu', kutup: 'kar fırtınası', neon: 'neon uğultusu ve yağmur', sehir: 'trafik ve güvercin', ofis: 'ofis uğultusu', lab: 'kabarcık ve cihaz', orman: 'orman kuşları', cekirge: 'ağustos böcekleri' };
export const TINI_AD = { piyano: 'piyano', akordeon: 'akordeon', ud: 'telli çalgı', flut: 'flüt', banjo: 'banjo', koto: 'koto', sentez: 'sentezleyici', can: 'çan' };
export const ZEMIN_AD = { ahsap: 'ahşap', kum: 'kum', cim: 'çimen', tas: 'taş', metal: 'metal', kar: 'kar' };
export const ortamAl = (m, hTema) => ORTAM[m?.tema || hTema]?.[m?.mekan] || null;
// bir canlinin t anindaki yeri: yalnizca t'ye bagli
export function canliYer(k, i, t) {
  const f = i * 2.399 + (k.tohum || 0), h = k.hiz || 1, n = k.n || 1;
  if (k.yol === 'daire') { const a = t * .28 * h + f, r = k.r * (.6 + .4 * ((i * 7 % 5) / 4)); return { x: (k.x || 0) + Math.cos(a) * r, y: k.y + Math.sin(t * .7 + f) * .5 + i * .35, z: k.z + Math.sin(a) * r * .45, yon: Math.atan2(-Math.sin(a), Math.cos(a) * .45), egim: 0 }; }
  if (k.yol === 'gecis') { const w = 24, yo = i % 2 ? -1 : 1, q = ((t * h * 1.3 + i * w / n * 1.3) % w + w) % w; return { x: yo * (q - w / 2), y: k.y + i % 3 * .7 + Math.sin(t + f) * .15, z: k.z - i % 2 * 2, yon: yo * 1.571 }; }
  if (k.yol === 'yer') { const w = 13, yo = i % 2 ? -1 : 1, q = ((t * h * .55 + i * w / n) % w + w) % w; return { x: yo * (q - w / 2), y: k.yuvar ? Math.abs(Math.sin(t * 2.4 + f)) * .25 : 0, z: k.z - i * .9, yon: yo * 1.571, don: k.yuvar ? -yo * t * 3 : 0 }; }
  if (k.yol === 'atla') { const q = ((t * .4 * h + i * .5) % 1.6) / 1.6, u = Math.min(1, q * 1.7); return { x: (k.x || 0) + u * 3 + i * 2, y: k.y + Math.sin(u * Math.PI) * 2, z: k.z - i, yon: 1.571, yunus: Math.cos(u * Math.PI), gizli: q > .59 }; }
  const a = t * .5 * h + f; return { x: Math.sin(a * 1.1 + f) * 2.6, y: k.y + Math.sin(a * 1.7) * .45, z: -1.9 + Math.cos(a * .9 + f * 2) * .9, yon: a };
}
