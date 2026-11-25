// yuz.js: ifadeler, goz, kas, agiz. Degerler karistirilabilir: ifadeden ifadeye yumusak gecilir.
import { lerp, parca, elips, yol, karis, saydam, sinir } from './temel.js';
//            kas yuksek, kas aci, ust kapak, alt kapak, gulus, agiz acik, agiz en, iris, yanak
const I = (ky, ka, uk, ak, gu, ac, en, ir, ya) => ({ ky, ka, uk, ak, gu, ac, en, ir, ya });
export const IFADE = {
  notr: I(0, 0, .12, 0, .15, 0, 1, 1, .25), mutlu: I(4, -2, .1, .16, .8, 0, 1.15, 1.05, .6), gulme: I(8, -3, .2, .34, 1, .75, 1.3, 1, .8),
  saskin: I(22, -3, -.06, 0, 0, .7, .62, .72, .3), uzgun: I(3, 15, .28, .04, -.75, 0, .8, 1.1, .2), kizgin: I(-12, -17, .25, .14, -.6, .12, .9, .85, .45),
  supheci: I(2, -8, .36, .18, -.2, 0, .7, .9, .2), yorgun: I(-3, 6, .52, .1, -.2, 0, .75, 1, .12), kararli: I(-7, -11, .2, .1, .25, 0, .9, .95, .3),
  korku: I(18, 13, -.05, 0, -.5, .4, .85, .6, 0), muzip: I(6, -9, .3, .2, .9, 0, .95, 1, .5), duygulu: I(8, 12, .14, .16, .45, 0, .85, 1.25, .55),
  hayran: I(20, 4, -.04, .1, .85, .45, .9, 1.35, .9), sikilmis: I(-6, 2, .58, .06, -.35, 0, .6, .9, .1), utangac: I(6, 14, .34, .2, .4, 0, .55, 1.1, 1), igrenmis: I(-10, -12, .42, .26, -.95, .18, .7, .75, .15),
  gururlu: I(12, -5, .42, .18, .7, 0, 1.2, .95, .4), uykulu: I(2, 5, .72, .1, .05, .3, .5, 1, .2), delirmis: I(26, -14, -.1, .02, 1, .85, 1.45, .5, .6), rahat: I(8, 4, .4, .3, .6, .2, .8, 1, .45),
};
export const harman = (a, b, k) => Object.fromEntries(Object.keys(IFADE.notr).map(x => [x, lerp(IFADE[a][x], IFADE[b][x], k)]));
// Turkce dudak: harf -> [aciklik, genislik]
const VIZ = { a: [.85, 1], e: [.55, 1.2], i: [.28, 1.25], 'ı': [.3, 1.05], o: [.7, .62], 'ö': [.6, .58], u: [.35, .48], 'ü': [.3, .48], b: [0, .9], p: [0, .9], m: [0, .9], f: [.1, 1], v: [.12, .95] };
export function dudak(metin, sure, t) {
  if (t < 0 || t > sure) return null; const s = [...metin.toLocaleLowerCase('tr')], agirlik = s.map(c => /[.,!?…]/.test(c) ? 4 : c === ' ' ? .6 : 1), top = agirlik.reduce((a, b) => a + b, 0);
  let p = t / sure * top, i = 0; while (i < s.length - 1 && p > agirlik[i]) p -= agirlik[i++];
  const o = c => /[.,!?… ]/.test(c) ? [0, 1] : VIZ[c] || [.22, 1], a = o(s[i]), b = o(s[i + 1] || ' '), k = sinir(p / agirlik[i]); return [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
}
export function yuzCiz(g, K, f, { don = .6, bak = [0, 0], kirp = 0, agiz = null, goz2 = 1 } = {}) {
  const kay = don * 24, ten = K.ten, kt = karis(ten, '#7a1f3a', .5), murekkep = karis(K.sac.renk, '#140a1e', .72), kucuk = K.yas === 'cocuk' ? 1.12 : K.yas === 'yasli' ? .88 : 1;
  // yanak
  for (const x of [-52, 66]) { g.save(); g.globalAlpha = .12 + .3 * f.ya; const q = g.createRadialGradient(x + kay, 42, 0, x + kay, 42, 27); q.addColorStop(0, '#f0625a'); q.addColorStop(1, 'rgba(240,98,90,0)'); g.fillStyle = q; g.fill(elips(x + kay, 42, 27, 19)); g.restore(); }
  if (K.cil) { g.fillStyle = saydam(kt, .35); for (const [x, y] of [[-56, 34], [-44, 40], [-58, 45], [62, 36], [73, 41], [60, 46]]) g.fill(elips(x + kay, y, 2.4)); }
  // gozler
  const uk = Math.max(f.uk, kirp);
  for (const [x, en, yan] of [[-37, 20 * kucuk * lerp(1, .98, don), -1], [47, 18.5 * kucuk * lerp(1.06, .94, don), 1]]) {
    const cx = x + kay, cy = 4, ry = 28 * kucuk, e = elips(cx, cy, en, ry);
    g.save(); g.clip(e); g.fillStyle = '#fdf5ea'; g.fill(e); g.fillStyle = 'rgba(70,40,110,.22)'; g.fillRect(cx - 40, cy - 40, 80, 26);
    const ix = cx + bak[0] * 7 + don * 3, iy = cy + 2 + bak[1] * 8, r = 15.5 * f.ir * kucuk, q = g.createLinearGradient(0, iy - r, 0, iy + r); q.addColorStop(0, karis(K.goz, '#12081e', .62)); q.addColorStop(1, karis(K.goz, '#ffffff', .22));
    g.fillStyle = q; g.fill(elips(ix, iy, r * .93, r * 1.14)); g.fillStyle = '#150a1c'; g.fill(elips(ix, iy, r * .48, r * .6)); g.fillStyle = '#fff'; g.fill(elips(ix + 5, iy - 7, 4.6 * kucuk, 5.6 * kucuk)); g.globalAlpha = .65; g.fill(elips(ix - 5, iy + 8, 2.5)); g.globalAlpha = 1;
    const ky = cy - ry + 2 * ry * sinir(uk) ; g.fillStyle = karis(ten, '#5a2444', .24); g.beginPath(); g.moveTo(cx - 40, cy - 50); g.lineTo(cx + 40, cy - 50); g.lineTo(cx + 40, ky + (f.ka * yan * .18) - 2); g.quadraticCurveTo(cx, ky - 9 * (1 - uk), cx - 40, ky - f.ka * yan * .18 - 2); g.fill();
    const ay = cy + ry - 2 * ry * f.ak; g.fillStyle = ten; g.beginPath(); g.moveTo(cx - 40, cy + 50); g.lineTo(cx + 40, cy + 50); g.lineTo(cx + 40, ay + 5); g.quadraticCurveTo(cx, ay - 22 * Math.min(1, f.ak * 4), cx - 40, ay + 5); g.fill(); g.restore();
    // kirpik cizgisi: kapakla iner
    const u = sinir(uk), yy = cy - ry + 2 * ry * u, ww = en * Math.sqrt(Math.max(.22, 1 - (2 * u - 1) ** 2)) + 3; g.strokeStyle = murekkep; g.lineCap = 'round'; g.lineWidth = K.kirpik ? 6.5 : 5;
    g.beginPath(); g.moveTo(cx - ww, yy + lerp(9, -3, u)); g.quadraticCurveTo(cx, yy - lerp(7, -10, u), cx + ww, yy + lerp(9, -3, u)); g.stroke();
    if (K.kirpik) { g.lineWidth = 4.5; const s = yan < 0 ? -1 : 1; g.beginPath(); g.moveTo(cx + s * ww, yy + lerp(8, -2, u)); g.lineTo(cx + s * (ww + 8), yy + lerp(1, 0, u)); g.stroke(); }
    // kas
    const by = cy - ry - 15 - f.ky, a = f.ka * -yan * Math.PI / 180; g.save(); g.translate(cx + 2, by + (yan > 0 && f === IFADE.supheci ? -6 : 0)); g.rotate(-a * yan * yan); g.fillStyle = karis(K.sac.renk, '#1a0d22', K.yas === 'yasli' ? .12 : .45);
    g.scale(yan, 1); g.fill(yol('M-24 5 C-16 -8 8 -10 26 2 C10 -2 -10 1 -22 10 Z')); g.restore();
  }
  // burun
  const bx = 14 + kay * 1.25; g.fillStyle = saydam(kt, .62); g.fill(yol(`M${bx - 5} 38 C${bx - 1} 30 ${bx + 5} 30 ${bx + 10} 39 C${bx + 8} 47 ${bx - 1} 48 ${bx - 5} 44 Z`)); g.fillStyle = 'rgba(255,255,255,.4)'; g.fill(elips(bx + 5, 34, 3, 2));
  if (K.yas === 'yasli') { g.strokeStyle = saydam(kt, .4); g.lineWidth = 3; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(bx + s * 22, 46); g.quadraticCurveTo(bx + s * 36, 56, bx + s * 33, 70); g.stroke(); } }
  // agiz
  const mx = 9 + kay * 1.05, my = 70, ac = agiz ? Math.max(agiz[0], f.ac * .3) : f.ac, en = 27 * (agiz ? agiz[1] * lerp(1, f.en, .4) : f.en), gu = f.gu * 11;
  if (ac < .07) { g.strokeStyle = karis(kt, '#2a0c1e', .5); g.lineWidth = 5; g.lineCap = 'round'; g.beginPath(); g.moveTo(mx - en, my - gu * .6); g.quadraticCurveTo(mx, my + gu * 1.1, mx + en, my - gu * .6 - (f.gu > .85 && f.en < 1 ? 7 : 0)); g.stroke(); }
  else { const h = ac * 30, p = yol(`M${mx - en} ${my - gu * .5} Q${mx} ${my - gu * .1 - h * .25} ${mx + en} ${my - gu * .5} C${mx + en} ${my + h * .9} ${mx + en * .5} ${my + h * 1.15} ${mx} ${my + h * 1.15} C${mx - en * .5} ${my + h * 1.15} ${mx - en} ${my + h * .9} ${mx - en} ${my - gu * .5} Z`);
    g.save(); g.clip(p); g.fillStyle = '#4b1226'; g.fill(p); g.fillStyle = '#e2606b'; g.fill(elips(mx + 2, my + h * 1.1, en * .62, h * .5)); if (f.gu > .3 || h > 12) { g.fillStyle = '#fff8ee'; g.fillRect(mx - en, my - gu - 14, en * 2, 14 + gu * .5 + h * .26); } g.restore(); g.strokeStyle = '#4b1226'; g.lineWidth = 3.4; g.stroke(p); }
}
