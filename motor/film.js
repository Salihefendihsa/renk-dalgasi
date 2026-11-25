// film.js: film.json'u kareye cevirir. kare(t) tek giris: ayni t, ayni kare.
import { W, H, tuval, lerp, sinir, yumusak, rampa, yay, rasgele, saydam, karis, rgb, hale, kutu, elips, yol } from './temel.js';
import { aktor, POZ, yuru, pozHarman, IFADE, harman } from './aktor.js'; import { dudak } from './yuz.js'; import { Son } from './son.js'; import { kavanoz } from '../dunyalar/carsi.js';
import * as yokus from '../dunyalar/yokus.js'; import * as iskele from '../dunyalar/iskele.js'; import * as carsi from '../dunyalar/carsi.js'; import * as mutfak from '../dunyalar/mutfak.js';
export const DUNYA = { yokus, iskele, carsi, mutfak }; const PAY = 320, onbellek = new Map();
const deger = (v, k) => Array.isArray(v) ? lerp(v[0], v[1], k) : v;
export const PARA = n => Math.round(n).toLocaleString('tr-TR');
const YAZI = '"Segoe UI", "Noto Sans", sans-serif', BASLIK = '"Segoe UI Black", "Arial Black", sans-serif';
export class Film {
  constructor(film, kadro, olcek = 1) { this.f = film; this.K = kadro; this.o = olcek; this.ham = tuval(W * olcek, H * olcek); this.kat = tuval(W * olcek, H * olcek); this.cikis = tuval(W * olcek, H * olcek); this.son = new Son(W * olcek, H * olcek); }
  plan(t) { const p = this.f.planlar; return p.find(x => t >= x.t0 && t < x.t1) || p[p.length - 1]; }
  kamera(p, t) { const k = yumusak(rampa(t, p.t0, p.t1)), c = p.kamera || {}; return { x: deger(c.x ?? 960, k), y: deger(c.y ?? 540, k), z: deger(c.z ?? 1, k), odak: deger(c.odak ?? 0, k), bul: c.bulanik ?? 3.4 }; }
  matris(c, z, g) { const p = 1 / (1 + Math.max(-.55, z) * .85), s = (1 + (c.z - 1) * p) * this.o; g.setTransform(s, 0, 0, s, W / 2 * this.o - (960 + (c.x - 960) * p) * s, H / 2 * this.o - (540 + (c.y - 540) * p) * s); return s; }
  nokta(c, x, y) { return [W / 2 + (x - c.x) * c.z, H / 2 + (y - c.y) * c.z]; }
  kare(t) {
    const p = this.plan(t), d = DUNYA[p.dunya], c = this.kamera(p, t), g = this.ham.getContext('2d'), yer = {}; g.reset(); g.fillStyle = '#101028'; g.fillRect(0, 0, this.ham.width, this.ham.height);
    const oyuncu = () => { this.matris(c, 0, g); for (const o of p.oyuncular || []) yer[o.kim] = this.oyuncu(g, o, p, t, d, c); for (const n of p.nesneler || []) this.nesne(g, n, t - p.t0, t); }; let cizildi = false;
    for (const [i, k] of d.katmanlar.entries()) {
      if (!cizildi && k.z <= 0) { oyuncu(); cizildi = true; }
      const bl = Math.abs(k.z - c.odak) * c.bul * (k.z < 0 ? 2.4 : 1) * this.o * Math.sqrt(c.z);
      let kaynak = null; if (!k.canli) { const ad = p.dunya + i; kaynak = onbellek.get(ad); if (!kaynak) { kaynak = tuval((W + 2 * PAY) * 1.5, (H + 2 * PAY) * 1.5); const q = kaynak.getContext('2d'); q.setTransform(1.5, 0, 0, 1.5, PAY * 1.5, PAY * 1.5); k.ciz(q, 0); onbellek.set(ad, kaynak); } }
      const q = this.kat.getContext('2d'); q.reset(); this.matris(c, k.z, q); if (kaynak) q.drawImage(kaynak, -PAY, -PAY, W + 2 * PAY, H + 2 * PAY); else k.ciz(q, t);
      g.setTransform(1, 0, 0, 1, 0, 0); g.filter = bl > .6 ? `blur(${bl.toFixed(2)}px)` : 'none'; g.drawImage(this.kat, 0, 0); g.filter = 'none';
    }
    if (!cizildi) oyuncu();
    const kah = yer[this.f.kahraman], m = kah ? this.nokta(c, ...kah.bas) : [960, 480]; let guc = 0, dalga = 0;
    if (p.guc) { const [a, b] = p.guc === true ? [0, p.t1 - p.t0] : p.guc, u = t - p.t0; if (u >= a && u < b + .5) { guc = 1 - rampa(u, b, b + .5); dalga = a < 0 ? 1 : yumusak(rampa(u, a, a + .9)); } }
    const V = this.f.vurgu, ss = this.f.sure, cr = this.son.ciz(this.ham, { merkez: [m[0] / W, m[1] / H], guc, dalga, vurgu: V, golge: this.f.golge || '#1d2a5a', isik: this.f.isik || '#ffd9a0', tohum: Math.round(t * 24) % 997, karart: Math.max(1 - rampa(t, 0, .5), rampa(t, ss - .7, ss)) });
    const x = this.cikis.getContext('2d'); x.reset(); x.drawImage(cr, 0, 0); x.setTransform(this.o, 0, 0, this.o, 0, 0);
    for (const o of p.oyuncular || []) if (o.rozet) this.rozet(x, o, p, t, yer[o.kim], c);
    for (const y of p.yazi || []) this.yazi(x, y, p, t); this.altyazi(x, t);
    return this.cikis;
  }
  oyuncu(g, o, p, t, d, c) {
    const u = t - p.t0, sure = p.t1 - p.t0, k = rampa(u, o.hiz?.[0] ?? 0, o.hiz?.[1] ?? sure), x = deger(o.x, Array.isArray(o.x) ? k : 0), K = this.K[o.kim], s = (o.s ?? .62);
    const yurur = Array.isArray(o.x) && k > 0 && k < 1, poz = a => a === 'yuru' ? yuru(Math.abs(x - o.x[0]) / (330 * s)) : POZ[a];
    let z; if (Array.isArray(o.poz)) z = pozHarman(poz(o.poz[0]), poz(o.poz[1]), yay(rampa(u, o.poz[2] ?? .6, (o.poz[2] ?? .6) + .55))); else z = poz(o.poz || (yurur ? 'yuru' : 'dur')); if (!z) throw new Error('Bilinmeyen poz: ' + o.poz);
    let f = IFADE.notr; if (Array.isArray(o.ifade)) f = harman(o.ifade[0], o.ifade[1], yumusak(rampa(u, o.ifade[2] ?? .6, (o.ifade[2] ?? .6) + .3))); else f = IFADE[o.ifade || 'notr'];
    let agiz = null; for (const r of this.f.replikler || []) if (r.kim === o.kim) agiz = dudak(r.metin, r.sure, t - r.t) || agiz;
    const R = rasgele(K.tohum || 1)() * 3, e = (t + R) % 3.4, kirp = e < .16 ? 1 - Math.abs(e - .08) / .08 : 0, esya = o.esya && ((q, b) => this.esya(q, o.esya, b, t));
    const y = o.y ?? d.zemin; if (o.oturak) this.oturak(g, x, y, s * (K.boy || 1), o.yon || 1, d);
    const sonuc = aktor(g, K, { cikar: o.cikar, x, y, s, yon: o.yon || 1, isik: d.isik, katsayi: c.z * this.o, t, poz: z, ifade: f, agiz, kirp, bak: o.bak || [0, 0], don: o.don ?? .6 });
    if (esya) { g.save(); g.translate(...sonuc.el); g.scale(sonuc.S * (o.yon || 1), sonuc.S); esya(g, [0, 0]); g.restore(); }
    return sonuc;
  }
  // nesne: yol = [[saniye, x, y, aci], ...]; yay > 0 ise iki durak arasinda havadan gider
  nesne(g, n, u, t) { const Y = n.yol; if (u < Y[0][0]) return; let i = 0; while (i + 1 < Y.length && Y[i + 1][0] <= u) i++; const a = Y[i], b = Y[i + 1] || a, k = b === a ? 0 : rampa(u, a[0], b[0]); if (n.bitis && u > n.bitis) return;
    g.save(); g.translate(lerp(a[1], b[1], k), lerp(a[2], b[2], k) - Math.sin(k * Math.PI) * (n.yay || 0)); g.rotate(lerp(a[3] || 0, b[3] || 0, k)); const s = n.s || 1; g.scale(s, s);
    if (n.tur === 'simit') { g.lineWidth = 22; g.strokeStyle = '#a85a22'; g.stroke(elips(0, 0, 34)); g.lineWidth = 12; g.strokeStyle = '#d98a3c'; g.stroke(elips(-2, -3, 34)); g.fillStyle = '#ffe9bd'; for (let j = 0; j < 22; j++) g.fill(elips(Math.cos(j * 2.4) * (30 + j % 4 * 3), Math.sin(j * 2.4) * (30 + j % 4 * 3), 3.2, 2)); }
    if (n.tur === 'kavanoz') kavanoz(g, 0, 34, 1.2, n.renk || this.f.vurgu, t);
    if (n.tur === 'marti') { const d = Math.sin(t * 13) * 26; g.fillStyle = '#fff6ea'; g.fill(yol(`M-92 ${-d} Q-40 -30 0 0 Q40 -30 92 ${-d} Q42 4 12 18 L-12 18 Q-42 4 -92 ${-d} Z`)); g.fill(elips(4, 8, 36, 14)); g.fillStyle = '#f2a03c'; g.fill(yol('M38 4 L60 12 L38 16 Z')); g.fillStyle = '#1a1030'; g.fill(elips(28, 3, 3)); }
    g.restore(); }
  oturak(g, x, y, s, yon, d) { g.save(); g.translate(x, y); g.scale(s * yon, s); g.fillStyle = karis('#8a4a3a', d.isik.golge, .35); for (const a of [-120, 24]) g.fillRect(a, -150, 22, 150); g.fillStyle = '#a8633f'; g.fill(kutu(-145, -184, 215, 34, 10)); g.fillStyle = '#d99a5f'; g.fill(kutu(-145, -184, 215, 10, 5)); g.restore(); }
  esya(g, e, [x, y], t) { g.save(); g.translate(x, y);
    if (e.tur === 'kavanoz') kavanoz(g, 30, 34, 1.75, e.renk || this.f.vurgu, t);
    if (e.tur === 'telefon') { g.rotate(-.18); g.fillStyle = '#201a34'; g.fill(kutu(4, -62, 44, 84, 9)); g.fillStyle = '#bfe9ff'; g.fill(kutu(9, -55, 34, 68, 4)); hale(g, 26, -22, 85, '#8fd4ff', .5); }
    if (e.tur === 'cay') { g.translate(26, 2); g.fillStyle = 'rgba(255,255,255,.35)'; g.fill(yol('M-20 -54 L20 -54 Q10 -32 18 0 L-18 0 Q-10 -32 -20 -54 Z')); g.fillStyle = '#c2401f'; g.fill(yol('M-17 -42 L17 -42 Q9 -28 15 -3 L-15 -3 Q-9 -28 -17 -42 Z')); g.fillStyle = '#f4e3c6'; g.fill(elips(0, 2, 32, 7)); } g.restore(); }
  rozet(g, o, p, t, yer, c) { // basin ustunde calisan sayac
    const r = o.rozet, u = t - p.t0, k = yay(rampa(u, r.gir ?? .2, (r.gir ?? .2) + .5)); if (k <= 0) return; const [x, y0] = this.nokta(c, ...yer.bas), y = y0 - 210 * yer.S * c.z - 34, n = Array.isArray(r.n) ? Math.round(lerp(r.n[0], r.n[1], yumusak(rampa(u, r.art ?? 1, (r.art ?? 1) + (r.artS ?? .4))))) : r.n;
    const art = Array.isArray(r.n) ? Math.exp(-Math.pow((u - (r.art ?? 1) - .25) / .16, 2)) : 0, s = k * (1 + .28 * art) * sinir(.75 + c.z * .25, 1, 1.5), m = PARA(n) + (r.ek || ''); g.save(); g.translate(x, y); g.scale(s, s); g.font = `900 46px ${BASLIK}`; const w = Math.max(74, g.measureText(m).width + 46);
    g.shadowColor = this.f.vurgu; g.shadowBlur = 34 + 40 * art; g.fillStyle = this.f.vurgu; g.fill(kutu(-w / 2, -36, w, 70, 35)); g.shadowBlur = 0; g.fill(yol('M-13 30 L13 30 L0 52 Z')); g.strokeStyle = 'rgba(255,255,255,.75)'; g.lineWidth = 3; g.stroke(kutu(-w / 2 + 5, -31, w - 10, 60, 30)); const L = rgb(this.f.vurgu), koyuYazi = (.299 * L[0] + .587 * L[1] + .114 * L[2]) > 165; g.fillStyle = koyuYazi ? '#1a1030' : '#fff8ea'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(m, 0, 2); g.restore(); }
  yazi(g, y, p, t) { const u = t - p.t0, a = rampa(u, y.gir ?? .3, (y.gir ?? .3) + .45) * (1 - rampa(u, (p.t1 - p.t0) - .35, p.t1 - p.t0)); if (a <= 0) return; g.save(); g.globalAlpha = a; g.textAlign = 'center';
    const X = y.x ?? 960, Y = y.y ?? 300;
    if (y.tur === 'baslik') { const q = g.createLinearGradient(0, Y - 190, 0, Y + 190); q.addColorStop(0, 'rgba(14,12,40,0)'); q.addColorStop(.5, 'rgba(14,12,40,.72)'); q.addColorStop(1, 'rgba(14,12,40,0)'); g.fillStyle = q; g.fillRect(0, Y - 190, W, 380); const ac = 1 - yumusak(rampa(u, y.gir ?? .3, (y.gir ?? .3) + 1)); g.letterSpacing = `${6 + ac * 20}px`; g.font = `700 54px ${YAZI}`; g.fillStyle = '#fff3dc'; g.fillText(y.ust, X, Y - 38); let b = 112; g.letterSpacing = '1px'; do { g.font = `900 ${b}px ${BASLIK}`; b -= 4; } while (g.measureText(y.alt).width > 1640); g.shadowColor = this.f.vurgu; g.shadowBlur = 46; g.fillStyle = karis(this.f.vurgu, '#ffffff', .12); g.fillText(y.alt, X, Y + 78); g.shadowBlur = 0; g.fillText(y.alt, X, Y + 78); }
    if (y.tur === 'sayi') { const n = lerp(y.n[0], y.n[1], yumusak(rampa(u, y.gir ?? .4, (y.gir ?? .4) + 1.5))); g.fillStyle = 'rgba(14,12,40,.66)'; g.fill(kutu(X - 300, Y - 190, 600, 310, 34)); g.strokeStyle = saydam(this.f.vurgu, .8); g.lineWidth = 4; g.stroke(kutu(X - 300, Y - 190, 600, 310, 34)); g.fillStyle = '#fff3dc'; g.font = `600 36px ${YAZI}`; g.fillText(y.ust, X, Y - 122); let b = 148; do { g.font = `900 ${b}px ${BASLIK}`; b -= 4; } while (g.measureText(PARA(y.n[1]) + (y.ek || '')).width > 540); g.shadowColor = this.f.vurgu; g.shadowBlur = 40; g.fillStyle = karis(this.f.vurgu, '#ffffff', .18); g.fillText(PARA(n) + (y.ek || ''), X, Y + 26); g.shadowBlur = 0; g.font = `600 32px ${YAZI}`; g.fillStyle = '#fff3dc'; g.fillText(y.alt, X, Y + 88); }
    if (y.tur === 'etiket') { g.font = `700 38px ${YAZI}`; const w = g.measureText(y.metin).width + 70; g.fillStyle = 'rgba(14,12,40,.74)'; g.fill(kutu(X - w / 2, Y - 46, w, 72, 36)); g.fillStyle = karis(this.f.vurgu, '#ffffff', .3); g.fillText(y.metin, X, Y + 3); }
    g.restore(); }
  altyazi(g, t) { const r = (this.f.replikler || []).find(r => t >= r.t && t < r.t + r.sure + .15); if (!r) return; const kim = r.kim === 'anlatici' ? '' : this.K[r.kim].ad; g.save(); g.font = `600 38px ${YAZI}`; g.textAlign = 'center'; const s = []; let l = ''; for (const w of r.metin.split(' ')) { if (g.measureText(l + ' ' + w).width > 1180) { s.push(l); l = w; } else l = l ? l + ' ' + w : w; } s.push(l); const w = Math.max(...s.map(x => g.measureText(x).width)) + 64, h = s.length * 50 + 24, y = 1018 - h; g.fillStyle = 'rgba(14,12,36,.7)'; g.fill(kutu(960 - w / 2, y, w, h, 22)); if (kim) { g.font = `800 24px ${YAZI}`; const kw = g.measureText(kim).width + 34; g.fillStyle = this.f.vurgu; g.fill(kutu(960 - w / 2 + 18, y - 24, kw, 38, 19)); const L = rgb(this.f.vurgu); g.fillStyle = (.299 * L[0] + .587 * L[1] + .114 * L[2]) > 165 ? '#1a1030' : '#fff8ea'; g.fillText(kim, 960 - w / 2 + 18 + kw / 2, y + 3); } g.font = `600 38px ${YAZI}`; g.fillStyle = '#fff6e6'; s.forEach((x, i) => g.fillText(x, 960, y + 48 + i * 50)); g.restore(); }
}
