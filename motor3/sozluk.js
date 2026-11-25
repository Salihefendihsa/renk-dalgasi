// sozluk.js: anlaticinin soyledigi nesne tam o kelimede ekranda belirir. Cumlede "goster": "elma" ile secilir, "goster": false ile kapanir.
// kok (yumusayan bicimi "|" ile) -> parca
export const SOZ = {
  'soğan': 'sogan', 'elma': 'elma', 'ekmek|ekmeğ': 'ekmek', 'balık|balığ': 'balik', 'kılıç|kılıc': 'kilic', 'taç|tac': 'tac', 'anahtar': 'anahtar', 'harita': 'harita', 'para': 'altin', 'hazine': 'hazine', 'sandık|sandığ': 'sandik', 'kalp|kalb': 'kalp', 'yumurta': 'yumurta', 'kitap|kitab': 'kitap', 'saat': 'saat', 'bomba': 'bomba', 'kemik|kemiğ': 'kemik', 'çiçek|çiçeğ': 'cicek', 'yıldız': 'yildizimsi', 'telefon': 'telefon', 'balon': 'balon', 'çorba': 'corba', 'gemi': 'gemi', 'mektup|mektub': 'mektup', 'yüzük|yüzüğ': 'halka', 'mum': 'mum', 'çekiç|çekic': 'cekic', 'fıçı': 'fici', 'fener': 'fener', 'nargile': 'nargile', 'roket': 'roket', 'kalkan': 'kalkan', 'küp': 'kup', 'kaktüs': 'kaktus', 'piramit|piramid': 'piramit',
  'köpek|köpeğ': 'kopek', 'kurt': 'kurt', 'kedi': 'kedi', 'koyun': 'koyun', 'papağan': 'papagan', 'tavuk|tavuğ': 'tavuk', 'penguen': 'penguen', 'yarasa': 'yarasa', 'kaplumbağa': 'kaplumbaga', 'yılan': 'yilan', 'ahtapot': 'ahtapot', 'ejderha': 'ejder', 'deve': 'deve', 'uzaylı': 'uzayli',
};
// kisa ve es sesli kokler yalnizca bu bicimlerde sayilir ("atladi", "topladi" yanlis yakalanmasin)
const TAM = { at: 'atı atın atına atını atlı', ok: 'oklar okları okun okunu', 'taş': 'taşın taşlar taşları taşlarla', 'altın': 'altın altını altının altınlar altınları altınlarla', taht: 'taht tahtı tahtın tahtına tahtında' }, TAM_P = { at: 'at', ok: 'ok', 'taş': 'tas', 'altın': 'altin', taht: 'taht' };
const EK = '(?:l[ae]r)?(?:[ıiuü]m|[ıiuü]n|s[ıiuü]|[ıiuü])?(?:n?[ıiuü]n|n?[ıiuü]|y[ıiuü]|n?[ae]|y[ae]|n?d[ae]n?|t[ae]n?|y?l[ae])?(?:ki|yd[ıiuü])?';
const LISTE = Object.entries(SOZ).map(([k, p]) => [new RegExp(`^(?:${k})${EK}$`), p]);
export function sozBul(kelime) { const s = kelime.toLocaleLowerCase('tr').replace(/[’'].*$/, '').replace(/[^\p{L}]/gu, ''); for (const [k, v] of Object.entries(TAM)) if (v.split(' ').includes(s)) return TAM_P[k]; return LISTE.find(([r]) => r.test(s))?.[1] || null; }
// zamanli liste: cumle basina en cok bir nesne; ayni nesne 6 sn icinde yinelenmez
export function sozNesneleri(h, Z) {
  if (h.sozNesne === false) return []; const L = [], son = {}; for (const c of Z.cumleler) {
    if (c.goster === false) continue; let i, p; if (c.goster) { const g = typeof c.goster === 'string' ? { p: c.goster } : c.goster; p = g.p; i = g.kelime ? g.kelime - 1 : c.kelimeler.findIndex(k => sozBul(k.s) === p); if (i < 0) i = 0; if (!c.kelimeler[i]) throw new Error(`${c.id}: gösterilecek kelime yok`); }
    else { i = c.kelimeler.findIndex(k => { const q = sozBul(k.s); return q && !(c.kelimeler[0].t0 - (son[q] ?? -99) < 6); }); if (i < 0) continue; p = sozBul(c.kelimeler[i].s); }
    const t = Math.max(0, c.kelimeler[i].t0 - .06); son[p] = t; L.push({ p, t0: t, t1: t + 1.55, cumle: c.id, kelime: c.kelimeler[i].s });
  } for (let i = 1; i < L.length; i++) if (L[i - 1].t1 > L[i].t0) L[i - 1].t1 = L[i].t0; return L.filter(x => x.t1 - x.t0 > .45);
}
// sahnenin kullanacagi esya: o sure icinde gecen, elde tasinabilir ilk nesne
const ELDE = new Set(['sogan', 'elma', 'ekmek', 'balik', 'kilic', 'tac', 'anahtar', 'harita', 'altin', 'kalp', 'yumurta', 'kitap', 'saat', 'bomba', 'kemik', 'cicek', 'telefon', 'balon', 'corba', 'mektup', 'halka', 'mum', 'cekic']);
export function sahneEsyasi(Z, t0, t1) { for (const c of Z.cumleler) if (c.t0 < t1 && c.t1 > t0 && c.goster !== false) for (const k of c.kelimeler) { const p = sozBul(k.s); if (ELDE.has(p)) return p; } return null; }
