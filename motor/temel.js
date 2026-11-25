// temel.js: yumusatma, renk, rastgelelik ve yol yardimcilari. Her sey yalnizca t'ye bagli: ayni t, ayni kare.
export const W = 1920, H = 1080;
export const lerp = (a, b, k) => a + (b - a) * k;
export const sinir = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
export const yumusak = x => { x = sinir(x); return x * x * x * (x * (x * 6 - 15) + 10); };
export const rampa = (t, a, b) => sinir((t - a) / (b - a));
export const yay = x => { x = sinir(x); return x === 0 || x === 1 ? x : 1 - Math.exp(-6 * x) * Math.cos(9 * x); };
export function rasgele(tohum = 1) { let s = tohum >>> 0; return () => { s = (s + 0x6D2B79F5) | 0; let z = Math.imul(s ^ s >>> 15, 1 | s); z = z + Math.imul(z ^ z >>> 7, 61 | z) ^ z; return ((z ^ z >>> 14) >>> 0) / 4294967296; }; }
export const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
export const karis = (a, b, k) => { const x = rgb(a), y = rgb(b); return '#' + x.map((v, i) => Math.round(lerp(v, y[i], k)).toString(16).padStart(2, '0')).join(''); };
export const saydam = (h, a) => `rgba(${rgb(h).join(',')},${a})`;
export const yol = d => new Path2D(d);
export const elips = (x, y, a, b = a, r = 0) => { const p = new Path2D(); p.ellipse(x, y, a, b, r, 0, 7); return p; };
export const kutu = (x, y, w, h, r = 0) => { const p = new Path2D(); p.roundRect(x, y, w, h, r); return p; };
export function tuval(w, h) { const c = document.createElement('canvas'); c.width = Math.ceil(w); c.height = Math.ceil(h); return c; }
export function dikey(g, y0, y1, ...d) { const q = g.createLinearGradient(0, y0, 0, y1); d.forEach(([k, c]) => q.addColorStop(k, c)); return q; }
export function hale(g, x, y, r, renk, a = 1) { const q = g.createRadialGradient(x, y, 0, x, y, r); q.addColorStop(0, saydam(renk, a)); q.addColorStop(.35, saydam(renk, a * .38)); q.addColorStop(1, saydam(renk, 0)); g.save(); g.globalCompositeOperation = 'screen'; g.fillStyle = q; g.fillRect(x - r, y - r, 2 * r, 2 * r); g.restore(); }
// parca: iki tonlu boyama. Yol golge rengiyle dolar, isiga dogru kaydirilmis kopyasi ana renkle boyanir.
export function parca(g, p, renk, { golge, kay = 13, aci = [1, -.7] } = {}) {
  g.save(); g.clip(p); g.fillStyle = golge || karis(renk, '#24123f', .34); g.fill(p); g.translate(aci[0] * kay, aci[1] * kay); g.fillStyle = renk; g.fill(p); g.restore();
}
// uzuv: eklemden gecen, kalinligi degisen yumusak bir govde
export function uzuv(a, m, b, w0, w1, w2) {
  const n = 18, sol = [], sag = [], c = [2 * m[0] - (a[0] + b[0]) / 2, 2 * m[1] - (a[1] + b[1]) / 2];
  // egri eklemi tam keskin gostermesin: denetim noktasi eklemle tam gecis noktasi arasinda
  const q = [lerp(m[0], c[0], .62), lerp(m[1], c[1], .62)];
  for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t, x = u * u * a[0] + 2 * u * t * q[0] + t * t * b[0], y = u * u * a[1] + 2 * u * t * q[1] + t * t * b[1];
    let dx = 2 * u * (q[0] - a[0]) + 2 * t * (b[0] - q[0]), dy = 2 * u * (q[1] - a[1]) + 2 * t * (b[1] - q[1]); const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
    const w = t < .5 ? lerp(w0, w1, t * 2) : lerp(w1, w2, t * 2 - 1); sol.push([x - dy * w, y + dx * w]); sag.push([x + dy * w, y - dx * w]); }
  const p = new Path2D(); p.moveTo(...sol[0]); sol.forEach(v => p.lineTo(...v)); sag.reverse().forEach(v => p.lineTo(...v)); p.closePath();
  const daire = (o, r) => { p.moveTo(o[0] + r, o[1]); p.arc(o[0], o[1], r, 0, Math.PI * 2, true); }; daire(a, w0); daire(b, w2); return p;
}
export function ik(a, b, l1, l2, yon = 1) {
  let dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1e-3, m = Math.min(d, l1 + l2 - 1); m = Math.max(m, Math.abs(l1 - l2) + 1);
  const ex = a[0] + dx / d * m, ey = a[1] + dy / d * m, k = (l1 * l1 - l2 * l2 + m * m) / (2 * m), h = Math.sqrt(Math.max(0, l1 * l1 - k * k));
  return [[a[0] + dx / d * k - dy / d * h * yon, a[1] + dy / d * k + dx / d * h * yon], [ex, ey]];
}
