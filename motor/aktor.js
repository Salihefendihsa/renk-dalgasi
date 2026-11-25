// aktor.js: kadro/*.json tarifinden cizilen, eklemli, isik alan karakter. Birim: yetiskin boyu yaklasik 860.
import { lerp, parca as P, elips, kutu, yol, uzuv, ik, karis, saydam, tuval, rasgele, sinir } from './temel.js';
import { IFADE, harman, yuzCiz } from './yuz.js'; import { ustCiz, ekCiz } from './gardirop.js'; import { BICIM } from './bicim.js';
// poz: kalca [x,y], egim, bas (derece), el hedefleri (arka, on), ayaklar (arka, on), el bicimi
export const POZ = {
  dur: { k: [0, -372], e: 0, b: 0, ea: [-84, -352], eo: [98, -356], aa: [-44, 0], ao: [42, 0] },
  rahat: { k: [10, -368], e: -2, b: 3, ea: [-108, -412], eo: [92, -352], aa: [-62, 0], ao: [54, 0] },
  sasir: { k: [-6, -368], e: -6, b: -4, ea: [-128, -640], eo: [156, -650], aa: [-58, 0], ao: [52, 0], el: 'acik' },
  dusun: { k: [0, -372], e: 2, b: 6, ea: [40, -455], eo: [116, -606], aa: [-42, 0], ao: [46, 0] },
  isaret: { k: [0, -372], e: 3, b: 0, ea: [-92, -362], eo: [242, -590], aa: [-54, 0], ao: [58, 0], el: 'isaret' },
  uzul: { k: [0, -362], e: 8, b: 14, ea: [-32, -342], eo: [86, -338], aa: [-34, 0], ao: [34, 0] },
  sakla: { k: [0, -368], e: 4, b: 6, ea: [52, -478], eo: [74, -492], aa: [-40, 0], ao: [42, 0], el: 'tut' },
  selam: { k: [0, -372], e: -3, b: -4, ea: [-88, -356], eo: [172, -748], aa: [-46, 0], ao: [46, 0], el: 'acik' },
  anlat: { k: [0, -372], e: 2, b: 2, ea: [-136, -452], eo: [178, -500], aa: [-50, 0], ao: [50, 0], el: 'acik' },
  otur: { k: [-40, -212], e: 2, b: 0, ea: [50, -262], eo: [104, -258], aa: [95, 0], ao: [135, 0] },
  cay: { k: [-40, -212], e: 1, b: 2, ea: [50, -262], eo: [112, -400], aa: [95, 0], ao: [135, 0], el: 'tut' },
};
export function yuru(ph) { const s = Math.sin(ph * 6.283), c = Math.cos(ph * 6.283); return { k: [0, -366 - Math.abs(c) * 8], e: 4, b: 1, ea: [-62 + s * 92, -368 - Math.abs(s) * 25], eo: [72 - s * 92, -368 - Math.abs(s) * 25], aa: [-s * 112, -Math.max(0, c) * 46], ao: [s * 112, -Math.max(0, -c) * 46] }; }
// HAREKET: zamana bagli, dongulu oyunculuk. Her biri (t) -> poz.
const S = (t, f, a = 0) => Math.sin((t * f + a) * 6.2832);
export const HAREKET = {
  yuru: t => yuru(t * 1.15),
  kos: t => { const ph = t * 2.1, s = S(ph, 1), c = Math.cos(ph * 6.2832); return { k: [0, -352 - Math.abs(c) * 34], e: 15, b: -6, ea: [-40 + s * 130, -470 + s * 40], eo: [96 - s * 130, -470 - s * 40], aa: [-s * 150, -Math.max(0, c) * 120], ao: [s * 150, -Math.max(0, -c) * 120] }; },
  zipla: t => { const p = (t * .9) % 1, h = p < .2 ? 0 : Math.max(0, Math.sin((p - .2) / .8 * Math.PI)) * 120, c = p < .2 ? Math.sin(p / .2 * Math.PI) * 46 : 0, y = h / 120; return { k: [0, -366 - h + c], e: 2, b: -4 * y, ea: [-100 - 30 * y, -390 - 270 * y - h + c], eo: [110 + 40 * y, -390 - 270 * y - h + c], aa: [-40, -h * 1.02], ao: [40, -h * .96], el: 'acik' }; },
  dans: t => { const s = S(t, .95), c = S(t, 1.9); return { k: [s * 30, -356 - Math.abs(c) * 10], e: s * 9, b: -s * 9, ea: [-196 + s * 18, -620 + s * 84], eo: [206 + s * 18, -620 - s * 84], aa: [-52, -Math.max(0, s) * 26], ao: [54, -Math.max(0, -s) * 26], el: 'acik' }; },
  alkis: t => { const k = Math.abs(S(t, 1.7)); return { k: [0, -372 + k * 4], e: -2, b: 2, ea: [26 - k * 40, -500], eo: [66 + k * 56, -504], aa: [-44, 0], ao: [44, 0], el: 'acik' }; },
  elsalla: t => ({ k: [0, -372], e: -3, b: -5 + S(t, .6) * 3, ea: [-84, -356], eo: [192 + S(t, 1.8) * 38, -744 + Math.abs(S(t, 1.8)) * 14], aa: [-46, 0], ao: [46, 0], el: 'acik' }),
  yaz: t => ({ k: [0, -372], e: 6, b: 8, ea: [40, -452 + S(t, 4.2) * 9], eo: [128, -456 + S(t, 4.2, .5) * 9], aa: [-44, 0], ao: [44, 0] }),
  titre: t => ({ k: [S(t, 9) * 3, -360], e: -5, b: 4 + S(t, 8) * 1.5, ea: [-132, -590 + S(t, 9) * 6], eo: [142, -596 + S(t, 9, .4) * 6], aa: [-30, 0], ao: [30, 0] }),
  ara: t => { const s = S(t, .35); return { k: [s * 8, -370], e: 5 + s * 4, b: s * 8, ea: [-92, -380], eo: [150 + s * 12, -792], aa: [-50, 0], ao: [54, 0], el: 'acik' }; },
  gulkahkaha: t => { const c = Math.abs(S(t, 2.6)); return { k: [0, -366 + c * 8], e: -7 + c * 6, b: -8 + c * 7, ea: [26, -440 + c * 6], eo: [80, -436 + c * 6], aa: [-50, 0], ao: [50, 0] }; },
  tasi: t => { const y = yuru(t * .9); return { ...y, e: 8, ea: [74, -440 + S(t, 1.8) * 5], eo: [118, -436 + S(t, 1.8) * 5], el: 'tut' }; },
  onayla: t => ({ k: [0, -372], e: 1, b: 2 + Math.max(0, S(t, 1.1)) * 12, ea: [-80, -356], eo: [112, -480], aa: [-44, 0], ao: [44, 0], el: 'acik' }),
};
export const pozAl = (ad, t = 0) => Object.hasOwn(POZ, ad) ? POZ[ad] : Object.hasOwn(HAREKET, ad) ? HAREKET[ad](t) : null;
// konusurken el ve bas ritmi: sabit poz canli kalsin
export function konusma(p, t) { const a = S(t, 1.3) * .6 + S(t, 2.17, .3) * .4; return { ...p, b: p.b + S(t, .9) * 2.6, e: p.e + S(t, .55) * 1.2, eo: [p.eo[0] + a * 12 + 10, p.eo[1] - Math.abs(a) * 34], ea: [p.ea[0] - a * 8, p.ea[1] - Math.abs(S(t, 1.05)) * 12] }; }
export function pozHarman(a, b, k) { const v = (x, y) => [lerp(x[0], y[0], k), lerp(x[1], y[1], k)]; return { k: v(a.k, b.k), e: lerp(a.e, b.e, k), b: lerp(a.b, b.b, k), ea: v(a.ea, b.ea), eo: v(a.eo, b.eo), aa: v(a.aa, b.aa), ao: v(a.ao, b.ao), el: k > .5 ? b.el : a.el }; }
const KOPYA = new Map(); const ic = (ad, w, h) => { let c = KOPYA.get(ad); if (!c || c.width !== w || c.height !== h) KOPYA.set(ad, c = tuval(w, h)); const g = c.getContext('2d'); g.reset(); return g; };

function el(g, p, aci, ten, bicim, on) {
  g.save(); g.translate(...p); g.rotate(aci); const q = new Path2D();
  q.ellipse(10, 0, 20, 17, 0, 0, 7);
  if (bicim === 'acik') for (const [a, l] of [[-.5, 25], [-.16, 29], [.16, 28], [.48, 23]]) { const u = uzuv([18, a * 20], [18 + l * .5, a * 32], [18 + l * Math.cos(a), a * 20 + l * Math.sin(a)], 7, 6.4, 5); q.addPath(u); }
  else if (bicim === 'isaret') { q.addPath(uzuv([18, -8], [38, -9], [56, -9], 7.4, 6.6, 5.2)); q.ellipse(22, 5, 14, 11, 0, 0, 7); }
  else q.addPath(uzuv([14, -2], [26, 2], [34, 8], 13, 12, 8));
  q.addPath(uzuv([4, -9], [14, -20], [24, bicim === 'acik' ? -29 : -18], 7.5, 7, 5.5)); P(g, q, ten, { kay: 6 }); g.restore();
}
function bacak(g, kalca, ayak, K, arka) {
  const r = K.alt.renk, renk = arka ? karis(r, '#1a1030', .3) : r, [d, b] = ik(kalca, [ayak[0], ayak[1] - 34], 166, 160, -1), bol = K.alt.bol || 0;
  P(g, uzuv(kalca, d, [b[0], b[1] - 4], 42, 34 + bol * .6, 25 + bol), renk);
  g.save(); g.translate(b[0], b[1] + 34); const kalk = Math.atan2(d[0] - b[0], b[1] - d[1]); g.rotate(sinir(kalk * .35, -.5, .6));
  const ayk = K.ayak || '#3a2438', ar = arka ? karis(ayk, '#120a20', .35) : ayk;
  P(g, yol('M-25 -38 C-10 -44 12 -44 23 -38 C30 -24 62 -24 66 -3 L66 0 L-26 0 C-31 -10 -30 -26 -25 -38 Z'), ar, { kay: 7 }); g.fillStyle = K.taban || '#f3e3cc'; g.fill(kutu(-28, -7, 96, 10, 5)); g.restore();
}
function kol(g, o, hedef, K, arka, bicim) {
  const r = K.ust.kol || K.ust.renk, renk = arka ? karis(r, '#1a1030', .3) : r, [d, b] = ik(o, hedef, 122, 116, (arka ? -1 : 1) * sinir(Math.max((Math.abs(hedef[0] - o[0]) * ((arka ? hedef[0] < o[0] : hedef[0] > o[0]) ? 1 : -1) - 60) / 26, (o[1] - 20 - hedef[1]) / 26), -1, 1)), a = Math.atan2(b[1] - d[1], b[0] - d[0]);
  el(g, [b[0] + Math.cos(a) * 8, b[1] + Math.sin(a) * 8], a, arka ? karis(K.ten, '#3a1838', .22) : K.ten, bicim);
  P(g, uzuv(o, d, b, 32, 28, 23), renk);
  if (K.ust.serit) { // seritler kolun egrisine dik
    const c = [2 * d[0] - (o[0] + b[0]) / 2, 2 * d[1] - (o[1] + b[1]) / 2], q = [lerp(d[0], c[0], .62), lerp(d[1], c[1], .62)];
    g.save(); g.clip(uzuv(o, d, b, 32, 28, 23)); g.strokeStyle = arka ? karis(K.ust.serit, '#1a1030', .3) : K.ust.serit; g.lineWidth = 15;
    for (const k of Math.hypot(b[0] - o[0], b[1] - o[1]) < 130 ? [.12, .9] : [.22, .46, .7, .92]) { const u = 1 - k, x = u * u * o[0] + 2 * u * k * q[0] + k * k * b[0], y = u * u * o[1] + 2 * u * k * q[1] + k * k * b[1], e = Math.atan2(u * (q[1] - o[1]) + k * (b[1] - q[1]), u * (q[0] - o[0]) + k * (b[0] - q[0])); g.beginPath(); g.moveTo(x - Math.sin(e) * 50, y + Math.cos(e) * 50); g.lineTo(x + Math.sin(e) * 50, y - Math.cos(e) * 50); g.stroke(); } g.restore(); }
  const m = [b[0] - Math.cos(a) * 4, b[1] - Math.sin(a) * 4]; g.save(); g.translate(...m); g.rotate(a); P(g, kutu(-12, -26, 20, 52, 8), K.ust.manset || karis(renk, '#1a1030', .28), { kay: 5 }); g.restore();
  return { b, a };
}
function govde(g, K, t) {
  const u = K.ust, hem = u.etek ?? 40, gen = u.genis ?? 88, om = u.omuz ?? 86;
  const p = yol(`M${-om + 14} -240 C${-om - 10} -232 ${-om - 2} -160 ${-om + 8} -110 C${-om + 10} -60 ${-gen} ${hem - 40} ${-gen} ${hem} Q0 ${hem + 18} ${gen + 4} ${hem} C${gen + 4} ${hem - 50} ${om - 4} -60 ${om - 4} -110 C${om + 8} -165 ${om + 8} -236 ${om - 16} -242 C40 -262 -40 -262 ${-om + 14} -240 Z`);
  P(g, p, u.renk, { kay: 20 }); g.save(); g.clip(p);
  if (u.serit) { g.strokeStyle = u.serit; g.lineWidth = 17; for (let y = -205; y < hem; y += 50) { g.beginPath(); g.moveTo(-130, y - 8); g.quadraticCurveTo(0, y + 24, 130, y - 8); g.stroke(); } }
  const koyu = karis(u.renk, '#1a1030', .42), ac = karis(u.renk, '#fff4dc', .28);
  if (u.tur === 'palto') { g.strokeStyle = koyu; g.lineWidth = 4; g.beginPath(); g.moveTo(26, -220); g.quadraticCurveTo(34, -80, 30, hem + 20); g.stroke(); g.fillStyle = u.dugme || '#f6d28a'; for (const y of [-150, -95, -40]) { g.fill(elips(8, y, 7.5)); g.fill(elips(52, y, 7.5)); }
    g.fillStyle = saydam(koyu, .6); g.fill(kutu(-72, 5, 54, 13, 6)); P(g, yol('M-20 -246 L-60 -210 L-30 -170 L24 -205 Z'), ac, { kay: 6 }); P(g, yol('M26 -250 L78 -214 L56 -170 L24 -205 Z'), ac, { kay: 6 }); }
  if (u.tur === 'mont') { g.strokeStyle = saydam(koyu, .55); g.lineWidth = 5; for (const y of [-180, -115, -50]) { g.beginPath(); g.moveTo(-120, y); g.quadraticCurveTo(10, y + 20, 120, y); g.stroke(); } g.strokeStyle = '#f4e2bd'; g.lineWidth = 4; g.beginPath(); g.moveTo(26, -250); g.quadraticCurveTo(36, -80, 30, hem + 20); g.stroke(); g.fillStyle = koyu; g.fillRect(-140, hem - 27, 300, 50); }
  if (u.tur === 'hirka') { g.fillStyle = u.ic || '#f2e3cb'; g.fill(yol('M-14 -252 L46 -252 L28 -130 Z')); g.strokeStyle = ac; g.lineWidth = 9; g.beginPath(); g.moveTo(-14, -252); g.quadraticCurveTo(30, -130, 28, hem + 20); g.moveTo(48, -252); g.quadraticCurveTo(46, -160, 28, -125); g.stroke(); g.fillStyle = '#f6d28a'; for (const y of [-95, -50, -5]) g.fill(elips(44, y, 7)); g.fillStyle = saydam('#fff4dc', .13); for (let y = -220; y < hem; y += 16) for (let x = -100; x < 100; x += 18) g.fill(elips(x + (y / 16 % 2) * 9, y, 3.2, 5)); }
  if (u.tur === 'yelek') { g.fillStyle = u.ic || '#f4ead7'; g.fill(yol('M-40 -262 L70 -262 L26 -105 Z')); g.fillStyle = u.kravat || '#b8433f'; g.fill(yol('M14 -236 L34 -236 L38 -216 L46 -130 L26 -112 L10 -130 L14 -216 Z')); g.fillStyle = '#f6d28a'; for (const y of [-88, -48, -8]) g.fill(elips(26, y, 6)); g.strokeStyle = koyu; g.lineWidth = 4; g.beginPath(); g.moveTo(26, -105); g.lineTo(26, hem + 10); g.stroke(); }
  if (u.tur === 'yagmurluk') { g.strokeStyle = koyu; g.lineWidth = 4; g.beginPath(); g.moveTo(26, -250); g.lineTo(30, hem + 20); g.stroke(); g.fillStyle = '#7a4a1c'; for (const y of [-165, -100, -35]) g.fill(kutu(14, y, 30, 10, 5)); g.fillStyle = saydam(koyu, .4); g.fill(kutu(-78, -55, 60, 52, 10)); g.fillStyle = 'rgba(255,255,255,.28)'; g.fill(yol('M56 -220 Q80 -120 70 20 L60 20 Q66 -120 46 -220 Z')); }
  if (u.tur === 'hoodie') { g.fillStyle = koyu; g.fill(yol('M-70 -60 L90 -60 L106 10 L-84 10 Z')); g.strokeStyle = ac; g.lineWidth = 5; g.beginPath(); g.moveTo(-2, -236); g.lineTo(-6, -165); g.moveTo(44, -236); g.lineTo(46, -165); g.stroke(); P(g, yol('M-60 -262 C-70 -222 -20 -200 22 -202 C64 -202 96 -224 82 -262 Z'), karis(u.renk, '#1a1030', .14), { kay: 7 }); if (u.amblem) { g.fillStyle = u.amblem; g.fill(yol('M30 -160 L4 -108 L26 -108 L12 -70 L58 -124 L34 -124 L48 -160 Z')); } }
  if (u.tur === 'onluk') { g.fillStyle = u.ic || '#fff6e6'; g.fill(yol('M-46 -200 L78 -200 L84 -70 L110 60 L-100 60 L-60 -70 Z')); g.strokeStyle = u.ic || '#fff6e6'; g.lineWidth = 13; g.beginPath(); g.moveTo(-40, -200); g.lineTo(-56, -262); g.moveTo(72, -200); g.lineTo(78, -262); g.stroke(); g.strokeStyle = 'rgba(60,30,70,.25)'; g.lineWidth = 4; g.stroke(kutu(-24, -50, 88, 56, 10)); }
  if (u.tur === 'takim') { g.fillStyle = u.ic || '#f6efe2'; g.fill(yol('M-30 -262 L66 -262 L24 -90 Z')); P(g, yol('M-34 -262 L-58 -200 L-24 -186 L-38 -168 L24 -84 Z'), ac, { kay: 5 }); P(g, yol('M68 -262 L88 -200 L58 -186 L70 -168 L24 -84 Z'), ac, { kay: 5 }); g.fillStyle = u.dugme || '#f6d28a'; for (const y of [-60, -10]) g.fill(elips(26, y, 7)); g.fillStyle = saydam(koyu, .6); g.fill(kutu(-74, 0, 48, 12, 5)); }
  if (u.tur === 'tulum') { g.fillStyle = u.ic || '#f2e3cb'; g.fillRect(-140, -270, 300, 110); g.fillStyle = u.renk; g.fill(yol('M-48 -176 L80 -176 L84 -140 L-52 -140 Z')); g.strokeStyle = u.renk; g.lineWidth = 24; g.beginPath(); g.moveTo(-36, -170); g.lineTo(-54, -262); g.moveTo(68, -170); g.lineTo(78, -262); g.stroke(); g.fillStyle = '#f6d28a'; g.fill(elips(-38, -164, 10)); g.fill(elips(69, -164, 10)); g.strokeStyle = ac; g.lineWidth = 4; g.stroke(kutu(-18, -110, 68, 60, 8)); g.fillStyle = '#c9ccd8'; g.fill(kutu(22, -130, 9, 46, 4)); }
  if (u.tur === 'elbise') { g.strokeStyle = saydam(koyu, .5); g.lineWidth = 5; for (const x of [-66, -22, 22, 66]) { g.beginPath(); g.moveTo(x * .5, -70); g.quadraticCurveTo(x * .9, 10, x * 1.4, hem + 10); g.stroke(); } g.fillStyle = u.kusak || '#f6d28a'; g.fill(yol('M-120 -92 Q0 -66 120 -92 L120 -58 Q0 -32 -120 -58 Z')); g.strokeStyle = u.yaka || '#fff6e6'; g.lineWidth = 12; g.beginPath(); g.ellipse(10, -262, 64, 30, 0, 0, 7); g.stroke(); }
  if (u.tur === 'doktor') { g.fillStyle = u.ic || '#4f9aa0'; g.fill(yol('M-40 -262 L74 -262 L26 -100 Z')); g.strokeStyle = 'rgba(80,60,120,.35)'; g.lineWidth = 4; g.beginPath(); g.moveTo(26, -100); g.lineTo(28, hem + 20); g.stroke(); g.stroke(kutu(-72, -20, 54, 60, 8)); g.strokeStyle = '#3a3a58'; g.lineWidth = 8; g.beginPath(); g.moveTo(-34, -250); g.quadraticCurveTo(-30, -130, 20, -130); g.quadraticCurveTo(64, -130, 70, -250); g.moveTo(20, -130); g.lineTo(44, -84); g.stroke(); g.fillStyle = '#cfd6e4'; g.fill(elips(46, -76, 15)); g.fillStyle = '#e0533f'; g.fillRect(-58, -128, 24, 7); g.fillRect(-50, -136, 7, 24); }
  if (u.tur === 'kaftan') { g.fillStyle = u.ic || '#f2e3c4'; g.fill(yol('M-8 -262 L44 -262 L40 60 L60 400 L-30 400 L8 60 Z')); g.strokeStyle = u.serit2 || '#e8c06a'; g.lineWidth = 11; g.beginPath(); g.moveTo(-10, -256); g.quadraticCurveTo(14, -60, -30, hem + 20); g.moveTo(46, -256); g.quadraticCurveTo(36, -60, 62, hem + 20); g.stroke(); g.fillStyle = u.desen || saydam(u.serit2 || '#e8c06a', .8); for (const [x, y] of [[-62, -170], [-70, -70], [-66, 30], [-78, 130], [84, -150], [80, -50], [86, 50], [96, 150], [-74, 220], [100, 240]]) { for (let i = 0; i < 6; i++) { const a = i * 1.047; g.fill(elips(x + Math.cos(a) * 11, y + Math.sin(a) * 11, 6)); } } g.fillStyle = u.kusak || '#b3383c'; g.fill(yol('M-120 -70 Q10 -46 120 -70 L120 -28 Q10 -2 -120 -28 Z')); g.strokeStyle = saydam(koyu, .5); g.lineWidth = 3; for (const y of [-58, -46]) { g.beginPath(); g.moveTo(-110, y); g.quadraticCurveTo(10, y + 26, 110, y); g.stroke(); } }
  ustCiz(g, u, hem);
  if (u.canta) { g.strokeStyle = u.canta; g.lineWidth = 15; g.beginPath(); g.moveTo(66, -262); g.lineTo(-112, 24); g.stroke(); }
  g.restore();
}
function atki(g, renk, t, s = 1) {
  const d = Math.sin(t * 2.1) * 9, k = karis(renk, '#2a0a2a', .3);
  P(g, yol(`M-58 -258 C-120 -236 ${-150 + d} -190 ${-190 + d * 2} -${150 - d} C${-178 + d * 2} -120 ${-160 + d * 2} -108 ${-146 + d} -116 C-110 -160 -82 -200 -34 -222 Z`), k, { kay: 8 });
  g.strokeStyle = karis(renk, '#fff0d8', .5); g.lineWidth = 6; g.beginPath(); g.moveTo(-186 + d * 2, -143 + d); g.lineTo(-154 + d * 1.5, -113); g.stroke();
}
function atkiOn(g, renk, t) { const d = Math.sin(t * 2.1 + 1) * 4;
  P(g, yol(`M18 -226 C36 -180 40 -120 ${30 + d} -70 L${74 + d} -66 C82 -130 80 -190 62 -232 Z`), karis(renk, '#2a0a2a', .14), { kay: 8 }); g.strokeStyle = karis(renk, '#fff0d8', .5); g.lineWidth = 7; g.beginPath(); g.moveTo(34 + d, -88); g.lineTo(73 + d, -84); g.stroke();
  P(g, yol('M-72 -270 C-40 -292 60 -294 84 -268 C96 -244 84 -216 60 -212 C20 -200 -40 -204 -66 -222 C-82 -236 -84 -256 -72 -270 Z'), renk, { kay: 10 }); g.strokeStyle = karis(renk, '#2a0a2a', .4); g.lineWidth = 3.5; g.beginPath(); g.moveTo(-64, -244); g.quadraticCurveTo(0, -222, 74, -250); g.stroke(); }
const sacArka = (g, K, t) => { const r = karis(K.sac.renk, '#150a24', .34), s = K.sac.tur, d = Math.sin(t * 1.7) * 4;
  if (s === 'kivircik') { const q = new Path2D(), R = rasgele(4); for (let i = 0; i < 17; i++) { const a = 2.1 + i / 16 * 4.9, x = Math.cos(a) * (112 + R() * 12) - 14, y = Math.sin(a) * (108 + R() * 10) - 22; q.moveTo(x + 50, y); q.arc(x, y, 38 + R() * 14, 0, 7); } q.moveTo(90, -20); q.ellipse(-14, -16, 112, 112, 0, 0, 7); P(g, q, r, { kay: 14 }); }
  if (s === 'uzun') P(g, yol(`M-60 -120 C-140 -90 -136 40 ${-128 + d} 130 C${-120 + d} 200 ${-90 + d} 226 ${-58 + d} 238 C-20 200 40 180 88 150 C110 60 100 -60 60 -120 Z`), r);
  if (s === 'topuz') { P(g, elips(-56 + d * .3, -128, 52, 48), K.sac.renk, { kay: 10 }); g.strokeStyle = saydam(r, .7); g.lineWidth = 4; g.beginPath(); g.arc(-56, -128, 27, .5, 4.6); g.stroke(); }
  if (s === 'kuyruk') P(g, yol(`M-60 -80 C-150 -110 -176 -20 ${-158 + d * 2} 70 C${-150 + d * 2} 100 ${-130 + d} 112 ${-122 + d} 84 C-118 30 -110 -20 -56 -30 Z`), r);
  if (s === 'bob') P(g, yol(`M-50 -128 C-136 -110 -136 10 ${-118 + d} 92 C-90 112 -50 104 -30 84 L60 60 C104 30 108 -70 60 -120 Z`), r);
  if (s === 'orgu') for (const [x, y, yy] of [[-112, 40, 1], [86, 46, -1]]) for (let i = 0; i < 6; i++) P(g, elips(x + Math.sin(t * 1.7 + i * .4) * i * 2, y + i * 33, 25 - i * 1.6, 23), r, { kay: 6 });
  if (s === 'afro') { const q = new Path2D(); for (let i = 0; i < 22; i++) { const a = i / 22 * 6.283; q.moveTo(Math.cos(a) * 112 + 34, Math.sin(a) * 108 - 48); q.arc(Math.cos(a) * 112, Math.sin(a) * 108 - 48, 34, 0, 7); } q.moveTo(122, -48); q.ellipse(0, -48, 122, 118, 0, 0, 7); P(g, q, r, { kay: 16 }); }
  if (s === 'ortu') P(g, yol(`M0 -156 C-130 -150 -136 0 ${-112 + d * .4} 120 C-60 170 60 160 92 100 C124 0 124 -140 0 -156 Z`), r, { kay: 12 });
  if (s === 'savruk' || s === 'kisa') P(g, yol('M-92 -80 C-118 -20 -104 46 -72 62 L-40 20 L-40 -100 Z'), r); };
const sacOn = (g, K, t) => { const r = K.sac.renk, ac = karis(r, '#ffe2b8', .26), s = K.sac.tur;
  const tel = d => { g.strokeStyle = saydam(ac, .75); g.lineWidth = 6; g.lineCap = 'round'; g.stroke(yol(d)); };
  if (s === 'kivircik') { const q = new Path2D(); for (const [x, y, w] of [[-92, -48, 34], [-78, -92, 42], [-34, -122, 46], [20, -132, 44], [66, -112, 38], [94, -78, 27], [-38, -86, 34], [8, -96, 31], [48, -92, 26], [-100, -4, 27], [-98, 36, 23]]) { q.moveTo(x + w, y); q.arc(x, y, w, 0, 7); } P(g, q, r, { kay: 12 }); for (const [x, y, w] of [[-70, -98, 24], [-24, -128, 26], [30, -138, 25], [74, -114, 18], [-92, -38, 17]]) { g.strokeStyle = saydam(ac, .6); g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.arc(x + 4, y - 2, w, -1.7, .25); g.stroke(); } }
  if (s === 'savruk') { P(g, yol('M-104 -10 C-118 -110 -70 -158 0 -160 C40 -186 92 -166 122 -128 C114 -124 110 -122 104 -122 C116 -104 118 -84 110 -58 C96 -86 78 -94 52 -92 C58 -84 60 -78 58 -70 C30 -90 -10 -88 -38 -66 C-58 -50 -66 -26 -70 16 C-84 22 -98 10 -104 -10 Z'), r, { kay: 12 }); tel('M-62 -108 C-20 -146 40 -150 84 -126'); tel('M-40 -86 C-6 -110 30 -114 60 -106'); }
  if (s === 'kisa') { P(g, yol('M-102 10 C-116 -100 -60 -146 8 -142 C78 -140 108 -96 102 -44 C96 -70 84 -84 66 -90 C20 -80 -30 -86 -54 -74 C-66 -50 -66 -20 -74 14 Z'), r, { kay: 12 }); tel('M-58 -106 C-20 -128 30 -128 66 -112'); }
  if (s === 'uzun' || s === 'topuz' || s === 'kuyruk') { P(g, yol('M-104 20 C-122 -90 -66 -150 8 -146 C82 -144 116 -88 106 -8 C100 -44 84 -76 52 -96 C20 -72 -34 -62 -62 -46 C-76 -20 -78 10 -84 40 Z'), r, { kay: 12 }); tel('M-66 -96 C-30 -128 20 -130 58 -116'); tel('M-72 -68 C-44 -92 -6 -104 34 -106');
    if (s === 'uzun') P(g, yol('M-92 -30 C-124 40 -118 110 -100 168 C-80 130 -66 60 -66 -10 Z'), karis(r, '#150a24', .1), { kay: 8 }); }
  if (s === 'bob' || s === 'orgu') { P(g, yol('M-106 30 C-126 -96 -64 -154 10 -150 C86 -146 118 -84 106 2 L96 10 C100 -30 94 -58 84 -72 C40 -62 -20 -62 -64 -58 C-76 -30 -80 10 -84 44 Z'), r, { kay: 12 }); tel('M-64 -104 C-24 -132 30 -132 66 -112'); tel('M-74 -72 C-40 -90 20 -92 60 -84'); }
  if (s === 'afro') { const q = new Path2D(); for (let i = 0; i < 9; i++) { const x = -92 + i * 23, y = -92 - Math.sin(i / 8 * 3.14) * 22; q.moveTo(x + 32, y); q.arc(x, y, 32, 0, 7); } P(g, q, r, { kay: 10 }); }
  if (s === 'ortu') { const q = yol('M-120 30 C-136 -110 -70 -166 8 -164 C92 -162 128 -92 112 30 C104 92 70 128 24 136 C-40 136 -108 100 -120 30 Z M-80 4 C-80 60 -30 96 20 98 C62 96 92 56 94 0 C94 -70 64 -104 8 -104 C-52 -104 -82 -60 -80 4 Z'); g.save(); g.clip(q, 'evenodd'); g.fillStyle = karis(r, '#24123f', .34); g.fill(q, 'evenodd'); g.translate(10, -7); g.fillStyle = r; g.fill(q, 'evenodd'); g.restore(); tel('M-104 -20 C-104 -104 -56 -140 6 -140'); }
  if (s === 'ibik') { P(g, yol('M-60 -100 C-70 -170 -20 -214 40 -204 C84 -196 92 -150 78 -112 C40 -128 -20 -124 -60 -100 Z'), r, { kay: 12 }); tel('M-34 -124 C-30 -170 10 -188 44 -180'); g.fillStyle = saydam(r, .4); g.fill(yol('M-96 -10 C-104 -90 -70 -118 -50 -112 C-70 -80 -78 -40 -80 6 Z')); }
  if (K.sac.tur === 'kel') { g.fillStyle = 'rgba(255,255,255,.28)'; g.fill(elips(28, -92, 32, 14, .3)); P(g, yol('M-98 -20 C-108 10 -100 50 -82 60 C-74 30 -78 0 -84 -30 Z'), r); } };
function aksesuar(g, K, kat) { const A = K.ek || [];
  if (kat === 'on') {
    if (A.includes('biyik')) { const r = karis(K.sac.renk, '#150a24', .1), x = 22; P(g, yol(`M${x} 52 C${x - 18} 44 ${x - 46} 52 ${x - 58} 72 C${x - 40} 70 ${x - 18} 74 ${x} 64 C${x + 18} 74 ${x + 36} 70 ${x + 50} 70 C${x + 40} 50 ${x + 16} 44 ${x} 52 Z`), r, { kay: 4 }); }
    if (A.includes('sakal')) P(g, yol('M-84 10 C-90 70 -50 118 14 122 C66 120 100 70 100 18 C92 44 82 54 66 56 C46 46 2 46 -24 58 C-54 62 -70 40 -84 10 Z'), K.sac.renk, { kay: 8 });
    if (A.includes('gozluk')) { g.strokeStyle = K.gozluk || '#c98b3a'; g.lineWidth = 6; for (const x of [-23, 61]) { g.fillStyle = 'rgba(255,255,255,.12)'; const e = elips(x, 8, 37, 37); g.fill(e); g.stroke(e); g.fillStyle = 'rgba(255,255,255,.3)'; g.fill(yol(`M${x - 18} -14 L${x - 4} -22 L${x - 22} 16 L${x - 28} 6 Z`)); } g.beginPath(); g.moveTo(14, 6); g.quadraticCurveTo(19, -2, 24, 6); g.moveTo(-60, 6); g.lineTo(-94, -4); g.stroke(); }
    if (A.includes('kulaklik')) { g.strokeStyle = '#f2e6d2'; g.lineWidth = 15; g.beginPath(); g.lineCap = 'round'; g.ellipse(2, -8, 104, 152, 0, Math.PI * 1.02, Math.PI * 1.66); g.stroke(); P(g, kutu(-124, -40, 46, 88, 22), K.kulaklik || '#ff7a3d', { kay: 8 }); g.fillStyle = 'rgba(255,255,255,.45)'; g.fill(kutu(-110, -22, 9, 46, 5)); }
    if (A.includes('bere')) { const r = K.bere || '#c94a4a'; P(g, yol('M-110 -42 C-122 -130 -70 -182 4 -180 C78 -178 120 -128 110 -58 Z'), r, { kay: 14 }); g.strokeStyle = karis(r, '#1a1030', .3); g.lineWidth = 4; for (let i = -3; i < 4; i++) { g.beginPath(); g.moveTo(i * 28, -60); g.quadraticCurveTo(i * 20, -130, i * 8, -174); g.stroke(); } P(g, kutu(-122, -78, 246, 46, 20), karis(r, '#fff0d8', .22), { kay: 8 }); P(g, elips(2, -186, 27), karis(r, '#fff0d8', .5), { kay: 8 }); }
    if (A.includes('kasket')) { const r = K.kasket || '#56506a'; P(g, yol('M-112 -56 C-124 -128 -60 -164 10 -160 C88 -158 126 -118 118 -78 C60 -96 -40 -92 -112 -56 Z'), r, { kay: 12 }); P(g, yol('M30 -100 C90 -100 150 -78 158 -54 C118 -62 70 -66 24 -70 Z'), karis(r, '#150a24', .35), { kay: 5 }); }
    if (A.includes('asci')) { P(g, yol('M-104 -66 C-160 -110 -130 -190 -70 -176 C-50 -230 50 -234 70 -178 C134 -190 152 -110 108 -70 Z'), '#fff8ee', { kay: 14, golge: '#cfc3dc' }); P(g, kutu(-110, -92, 222, 48, 12), '#f4e8da', { kay: 8, golge: '#c2b4d0' }); }
    if (A.includes('kavuk')) { const r = K.kavuk || '#b3383c'; P(g, yol('M-58 -120 C-64 -210 -40 -232 6 -232 C52 -232 72 -206 64 -120 Z'), r, { kay: 10 }); P(g, yol('M-128 -70 C-150 -150 -90 -186 4 -184 C98 -186 152 -146 126 -66 C70 -92 -70 -92 -128 -70 Z'), '#fbf3e4', { kay: 16, golge: '#c5b6d4' }); g.strokeStyle = 'rgba(110,80,140,.35)'; g.lineWidth = 4; for (const d of ['M-116 -100 C-40 -150 60 -150 118 -96', 'M-104 -128 C-30 -172 50 -170 104 -126', 'M-60 -84 C-20 -130 40 -160 90 -160']) g.stroke(yol(d)); if (K.sorguc) { g.fillStyle = '#e8c06a'; g.fill(elips(40, -136, 19, 23)); g.fillStyle = '#2fa890'; g.fill(elips(40, -136, 11, 14)); P(g, yol('M34 -156 C20 -214 44 -262 72 -282 C70 -232 64 -192 52 -156 Z'), '#f6efe0', { kay: 5, golge: '#b9a6cc' }); } }
    if (A.includes('takke')) P(g, yol('M-96 -86 C-96 -150 -50 -172 6 -172 C66 -172 104 -146 102 -82 C50 -104 -50 -104 -96 -86 Z'), K.takke || '#e8d8b4', { kay: 10 });
    if (A.includes('fotr')) { const r = K.fotr || '#6a5748'; P(g, yol('M-92 -76 C-90 -150 -50 -190 0 -176 C50 -194 92 -150 94 -76 Z'), r, { kay: 12 }); g.fillStyle = karis(r, '#1a1030', .55); g.fill(yol('M-92 -100 C-40 -88 40 -88 94 -100 L94 -72 C40 -60 -40 -60 -92 -72 Z')); P(g, yol('M-168 -66 C-110 -92 110 -92 172 -60 C110 -38 -100 -38 -168 -66 Z'), r, { kay: 7 }); }
    if (A.includes('pilotgozluk')) { g.fillStyle = '#4a3040'; g.fill(yol('M-124 -100 C-60 -128 70 -128 122 -92 L120 -66 C70 -98 -60 -98 -122 -72 Z')); for (const x of [-30, 50]) { P(g, elips(x, -96, 42, 34), '#c98b3a', { kay: 5 }); P(g, elips(x, -96, 31, 24), '#7fd8e6', { kay: 8, golge: '#2f6f9a' }); g.fillStyle = 'rgba(255,255,255,.6)'; g.fill(elips(x + 10, -104, 8, 5)); } }
    if (A.includes('bandana')) { const r = K.bandana || '#e0533f'; P(g, yol('M-112 -56 C-100 -118 60 -138 112 -70 L104 -48 C50 -84 -50 -84 -104 -30 Z'), r, { kay: 8 }); g.fillStyle = '#fff0d8'; for (const [x, y] of [[-70, -78], [-30, -94], [14, -98], [58, -88], [90, -72]]) g.fill(elips(x, y, 5)); P(g, yol('M-104 -50 L-156 -70 L-146 -36 Z M-104 -44 L-150 -14 L-122 -4 Z'), r, { kay: 5 }); }
    if (A.includes('cicek')) { for (let i = 0; i < 6; i++) { const a = i * 1.047; g.fillStyle = '#ffd3df'; g.fill(elips(-72 + Math.cos(a) * 18, -96 + Math.sin(a) * 18, 13)); } g.fillStyle = '#f2a03c'; g.fill(elips(-72, -96, 11)); }
    if (A.includes('mikrofon')) { g.strokeStyle = '#2a2038'; g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(-98, 40); g.quadraticCurveTo(-70, 104, -20, 98); g.stroke(); g.fillStyle = '#2a2038'; g.fill(elips(-16, 98, 13, 10)); }
    ekCiz(g, A, K);
    if (A.includes('kukuleta')) P(g, yol('M-118 40 C-136 -110 -70 -176 10 -174 C92 -172 130 -100 116 14 C104 -60 84 -116 12 -120 C-52 -122 -84 -70 -78 20 C-78 70 -60 100 -30 116 C-80 112 -112 84 -118 40 Z'), K.ust.renk, { kay: 12 }); }
  if (kat === 'kulak' && A.includes('kupe')) { g.fillStyle = '#f7c65b'; g.fill(elips(-84, 52, 8)); g.lineWidth = 4; } }

// Isiksiz cizim. ob: { t, poz, ifade (ad ya da deger), don, bak, agiz, kirp, esya(g, el) }
export function ciz(g, K, ob = {}) {
  if (K.bicim) return BICIM[K.bicim](g, K, { ...ob, poz: ob.poz || POZ.dur }, { aksesuar });
  const t = ob.t || 0, z = ob.poz || POZ.dur, nef = Math.sin(t * 2.2 + (K.tohum || 0)) * 2.5, e = z.e * Math.PI / 180;
  const k = [z.k[0], z.k[1]], don = p => [k[0] + p[0] * Math.cos(e) - p[1] * Math.sin(e), k[1] + p[0] * Math.sin(e) + p[1] * Math.cos(e)];
  const oA = don([-64, -212 + nef]), oO = don([62, -208 + nef]), bas = don([6, -366 + nef]);
  const katman = f => { g.save(); g.translate(...k); g.rotate(e); f(); g.restore(); };
  const basK = f => { g.save(); g.translate(...bas); g.rotate((z.b + z.e * .4) * Math.PI / 180); f(); g.restore(); };
  if (K.pelerin) katman(() => { const d = Math.sin(t * 1.6) * 12, d2 = Math.sin(t * 1.6 + 1) * 10; P(g, yol(`M-78 -248 C-150 -150 ${-176 + d} 60 ${-190 + d} 250 C-110 ${276 + d2} 60 ${270 - d2} ${126 + d2} 246 C130 60 116 -150 88 -246 Z`), K.pelerin, { kay: 18 }); });
  if (K.atki) katman(() => atki(g, K.atki, t));
  basK(() => { sacArka(g, K, t); });
  kol(g, oA, z.ea, K, true, z.el === 'isaret' ? null : z.el);
  bacak(g, [k[0] - 32, k[1] + 12], z.aa, K, true); bacak(g, [k[0] + 34, k[1] + 12], z.ao, K, false);
  katman(() => { g.translate(0, nef * .5); govde(g, K, t); P(g, yol('M-30 -306 L44 -306 L48 -240 Q8 -214 -36 -240 Z'), karis(K.ten, '#5a1f3e', .3), { kay: 8 }); if (K.atki) atkiOn(g, K.atki, t); });
  basK(() => {
    P(g, elips(-82, 18, 21, 27), karis(K.ten, '#6a2440', .12), { kay: 6 }); aksesuar(g, K, 'kulak');
    P(g, yol('M-92 -16 C-96 -104 -50 -130 6 -130 C72 -130 102 -84 99 -18 C98 42 72 96 22 106 C-26 110 -86 62 -92 -16 Z'), K.ten, { kay: 12, golge: karis(K.ten, '#8a2f52', .34) });
    const f = typeof ob.ifade === 'object' ? ob.ifade : IFADE[ob.ifade || 'notr']; const sakal = (K.ek || []).includes('sakal');
    if (sakal) aksesuar(g, { ...K, ek: ['sakal'] }, 'on');
    g.save(); g.clip(yol('M-92 -16 C-96 -104 -50 -130 6 -130 C72 -130 102 -84 99 -18 C98 42 72 96 22 106 C-26 110 -86 62 -92 -16 Z')); yuzCiz(g, K, f, { don: ob.don ?? .6, bak: ob.bak || [0, 0], kirp: ob.kirp || 0, agiz: ob.agiz }); g.restore();
    sacOn(g, K, t); aksesuar(g, { ...K, ek: (K.ek || []).filter(x => x !== 'sakal') }, 'on');
  });
  const s = kol(g, oO, z.eo, K, false, z.el);
  return { bas, el: s.b };
}
// Isikli cizim: hacim golgesi, ortam rengi, kenar isigi. x,y = ayak; s = olcek; yon = 1 saga, -1 sola bakar
export function aktor(g, K0, { x, y, s = .62, yon = 1, isik, katsayi = 1, ...ob }) {
  const K = ob.cikar ? { ...K0, ek: (K0.ek || []).filter(e => !ob.cikar.includes(e)) } : K0;
  const boy = K.boy || 1, S = s * boy, R = Math.min(2.4, S * katsayi), w = Math.ceil(1060 * R), h = Math.ceil(1240 * R), a = ic('a', w, h), b = ic('b', w, h), m = ic('m', w, h);
  a.setTransform(R * yon * (K.en || 1), 0, 0, R, w / 2, h - 60 * R); const bilgi = ciz(a, K, ob); a.setTransform(1, 0, 0, 1, 0, 0);
  const [lx, ly] = isik.yon, gec = (hedef, kayX, kayY, bulan, renk, mod, alfa) => { m.globalCompositeOperation = 'source-over'; m.clearRect(0, 0, w, h); m.drawImage(a.canvas, 0, 0); m.globalCompositeOperation = 'destination-out'; m.filter = bulan ? `blur(${bulan}px)` : 'none'; m.drawImage(a.canvas, kayX, kayY); m.filter = 'none'; m.globalCompositeOperation = 'source-in'; m.fillStyle = renk; m.fillRect(0, 0, w, h); hedef.globalCompositeOperation = mod; hedef.globalAlpha = alfa; hedef.drawImage(m.canvas, 0, 0); hedef.globalAlpha = 1; hedef.globalCompositeOperation = 'source-over'; };
  b.drawImage(a.canvas, 0, 0); b.globalCompositeOperation = 'source-atop'; b.globalAlpha = 1;
  const or = (mod, renk, alfa) => { m.globalCompositeOperation = 'source-over'; m.clearRect(0, 0, w, h); m.drawImage(a.canvas, 0, 0); m.globalCompositeOperation = 'source-in'; m.fillStyle = renk; m.fillRect(0, 0, w, h); b.globalCompositeOperation = mod; b.globalAlpha = alfa; b.drawImage(m.canvas, 0, 0); b.globalAlpha = 1; b.globalCompositeOperation = 'source-over'; };
  or('multiply', isik.ortam, isik.ortamK ?? .5);
  const ayak = m.createLinearGradient(0, h * .45, 0, h); ayak.addColorStop(0, saydam(isik.golge, 0)); ayak.addColorStop(1, saydam(isik.golge, .6)); or('multiply', ayak, 1);
  gec(b, lx * 46 * R, ly * 40 * R, 16 * R, isik.golge, 'multiply', .6);
  gec(b, -lx * 26 * R, -ly * 22 * R, 9 * R, isik.kenar, 'soft-light', .7);
  gec(b, -lx * 6.5 * R, -ly * 6 * R, .8, isik.kenar, 'screen', isik.kenarK ?? .95);
  // yere dusen golge
  g.save(); g.globalCompositeOperation = 'multiply'; const gx = x - lx * 46 * S, q = g.createRadialGradient(0, 0, 0, 0, 0, 1); q.addColorStop(0, saydam(isik.golge, .75)); q.addColorStop(1, saydam(isik.golge, 0)); g.translate(gx, y + 2); g.scale(175 * S, 26 * S); g.fillStyle = q; g.beginPath(); g.arc(0, 0, 1, 0, 7); g.fill(); g.restore();
  g.drawImage(b.canvas, x - w / 2 * S / R, y - (h - 60 * R) * S / R, w * S / R, h * S / R);
  return { bas: [x + bilgi.bas[0] * S * yon, y + bilgi.bas[1] * S], el: [x + bilgi.el[0] * S * yon, y + bilgi.el[1] * S], S };
}
export { IFADE, harman };
