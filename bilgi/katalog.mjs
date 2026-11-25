import { readFileSync } from 'node:fs';
import { TEMA, TEMA_KADRO } from '../motor3/temalar.js';
import { SAHNE } from '../motor3/sahneler.js';
import { ILHAM } from '../motor3/ilham.js';
import { KANCA } from '../motor3/kanca.js';
import { HAYVAN, TEMA_HAYVAN } from '../motor3/hayvan-liste.js';
import { ORTAM, ORTAM_AD, TINI_AD, ZEMIN_AD } from '../motor3/ortam.js';
import { AYAR, ayarHata } from '../motor3/ayar.js';

const yeni = JSON.parse(readFileSync(new URL('./kurgu.json', import.meta.url), 'utf8'));
const kayitlar = [];
function ekle(tur, kod, ad, detay, tema) {
  kayitlar.push({ tur, kod, ad, ...(tema ? { tema } : {}), detay });
}
for (const [tema, t] of Object.entries(TEMA)) {
  ekle('tema', tema, t.ad, { calgi: TINI_AD[ORTAM[tema].tini] }, tema);
  for (const kod of t.kadro) {
    const k = TEMA_KADRO[kod];
    ekle('karakter', kod, k.ad, { gorunum: k.imza }, tema);
  }
  for (const kod of Object.keys(t.mekanlar)) {
    const m = ORTAM[tema][kod];
    ekle('mekan', kod, kod, { ses: ORTAM_AD[m.ses], zemin: ZEMIN_AD[m.zemin], canlilar: m.canli.map(x => x.p) }, tema);
  }
  TEMA_HAYVAN[tema].forEach((kod, i) => ekle('hayvan', kod, HAYVAN[kod].ad, { rol: ['yoldaş','ikinci hayvan','canavar'][i] }, tema));
  ILHAM[tema].forEach((f, i) => ekle('fikir', String(i+1), f.baslik, {
    nitelik: f.tip === 'A' ? 'araştır' : 'kurgu',
    komut: 'node sistem.mjs hikaye yeni filmim --tema=' + tema + ' --ilham=' + (i+1)
  }, tema));
}
for (const [kod, s] of Object.entries(SAHNE)) ekle('sahne', kod, s.ad, { olay: s.ne, roller: s.roller, saniye: s.sure });
for (const [kod, k] of Object.entries(KANCA)) ekle('kanca', kod, k.ad, { olay: k.ne });
for (const [kod, a] of Object.entries(AYAR)) ekle('ayar', kod, a.ad, a);
for (const f of yeni) {
  if (!Object.hasOwn(TEMA, f.tema) || !Object.hasOwn(SAHNE, f.sahne) || !Object.hasOwn(KANCA, f.acilis) || ayarHata(f.ayar).length) {
    throw new Error('Kurgu tarifini kontrol et: ' + f.baslik);
  }
  ekle('tarif', f.tema, f.baslik, { kanca: f.kanca, akis: f.akis, sahne: f.sahne, acilis: f.acilis, ayar: f.ayar }, f.tema);
}
const sade = s => s.toLocaleLowerCase('tr').replaceAll('ı','i').normalize('NFD').replace(/\p{M}/gu,'');
const args = process.argv.slice(2);
const secim = {};
const terimler = [];
let json = false;
for (const arg of args) {
  if (arg === '--json') json = true;
  else if (/^--(tur|tema)=.+$/.test(arg)) {
    const i = arg.indexOf('=');
    secim[arg.slice(2,i)] = arg.slice(i+1);
  } else if (arg.startsWith('--')) throw new Error('Seçenekler: --tema=kod --tur=kod --json');
  else terimler.push(...sade(arg).split(/\s+/).filter(Boolean));
}
for (const [alan, deger] of Object.entries(secim)) {
  if (!kayitlar.some(k => k[alan] === deger)) throw new Error('Bilinmeyen ' + alan + ': ' + deger);
}
const sonuc = kayitlar.filter(k => {
  if (Object.entries(secim).some(([alan, deger]) => k[alan] !== deger)) return false;
  const metin = sade([k.tur, k.kod, k.ad, k.tema || '', JSON.stringify(k.detay)].join(' '));
  return terimler.every(t => metin.includes(t));
});
if (json) console.log(JSON.stringify(sonuc, null, 2));
else if (!args.length) {
  console.log('Renk Dalgası seçenekleri\n');
  for (const tur of new Set(kayitlar.map(k => k.tur))) console.log(tur.padEnd(10), kayitlar.filter(k => k.tur === tur).length);
  console.log('\nÖrnek: node bilgi/katalog.mjs --tema=kutup --tur=tarif');
} else if (!sonuc.length) console.log('Eşleşme bulunamadı.');
else for (const k of sonuc) console.log([k.tur, k.tema, k.kod, k.ad].filter(Boolean).join(' · ') + '\n' + JSON.stringify(k.detay) + '\n');
