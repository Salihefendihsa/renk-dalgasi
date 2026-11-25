// ses.mjs: muzigi filmin kendi zamanindan kurar (film.json: muzik, efekt, replikler). Sabit saniye yok, ornek dosya yok.
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync, spawnSync } from 'node:child_process'; import { rasgele } from '../motor/temel.js'; import { sesBul, UZANTI } from './metin.mjs';
const SR = 48000, hz = m => 440 * 2 ** ((m - 69) / 12);
export const RUH = { merak: { a: [[50, 57, 62, 65], [46, 53, 58, 65], [53, 57, 60, 65], [48, 55, 60, 64]], bpm: 78, ad: 2 }, oyun: { a: [[53, 57, 60, 65], [50, 57, 60, 65], [46, 53, 58, 62], [48, 55, 60, 64]], bpm: 104, ad: 4 }, gerilim: { a: [[50, 57, 62, 63], [50, 56, 62, 65]], bpm: 72, ad: 1 }, acilis: { a: [[46, 53, 58, 65], [53, 57, 60, 69], [48, 55, 64, 67]], bpm: 84, ad: 2 }, huzun: { a: [[50, 53, 57, 62], [46, 50, 53, 58], [43, 50, 55, 58]], bpm: 64, ad: 1 }, sicak: { a: [[53, 57, 60, 64], [58, 62, 65, 69], [55, 58, 62, 65], [48, 55, 60, 64]], bpm: 76, ad: 2 } };
// her efekt: (ekle, t, g, R) -> ornek dosya yok, hepsi sentez
const TAU = 6.2832, gur = (R, k) => { let y = 0; return () => (y += k * ((R() * 2 - 1) - y)); }, kay = (f0, f1, s) => u => f0 * u + (f1 - f0) * u * u / (2 * s), SES = (e, t, s, f0, f1, g, zarf, dalga = Math.sin) => { const f = kay(f0, f1, s); e(t, s, u => dalga(TAU * f(u)) * zarf(u, s) * g); }, can = (u, s) => Math.sin(Math.min(1, u / s) * Math.PI), son = k => u => Math.exp(-u * k) * Math.min(1, u / .004), boru = x => Math.tanh(2.2 * Math.sin(x)), testere = x => 1 - 2 * ((x / TAU) % 1);
const hayvanSes = (e, t, f0, f1, s, g, tit = 0, d = testere) => { const f = kay(f0, f1, s); let y = 0; e(t, s, u => { y += .22 * (d(TAU * f(u) + (tit ? Math.sin(u * TAU * tit) * 1.2 : 0)) - y); return y * can(u, s) * g; }); };
const EF = {
  dalga(e, t, g, R) { const q = gur(R, .06); e(t, 1.9, u => ((Math.sin(TAU * (150 * u - 34 * u * u)) * .16 + q() * .7) * can(u, 1.9) ** 2 + .05 * Math.sin(TAU * 1244 * u) * Math.exp(-u * 3)) * g); },
  tik(e, t, g) { for (let j = 0; j < 3; j++) SES(e, t + j * .07, .12, 1500 + j * 260, 1500 + j * 260, .22 * g, son(60)); },
  carp(e, t, g, R) { const q = gur(R, .3); e(t, .5, u => (Math.sin(TAU * 80 * u) * .5 + q() * .4) * Math.exp(-u * 13) * g); },
  vurus(e, t, g) { e(t, 2.6, u => Math.sin(TAU * (34 * u + 12 * (1 - Math.exp(-u * 4)) / 4)) * Math.exp(-u * 1.7) * .55 * g); },
  adim(e, t, g, R) { const q = gur(R, .35), f = 90 + R() * 50; e(t, .09, u => (q() * .5 + Math.sin(TAU * f * u) * .4) * Math.exp(-u * 45) * g); },
  nal(e, t, g, R) { const f = 420 + R() * 160; e(t, .07, u => Math.sin(TAU * f * u) * Math.exp(-u * 70) * .5 * g); },
  boing(e, t, g) { e(t, .55, u => Math.sin(TAU * (190 * u + 160 * u * u) + Math.sin(u * 62) * 3 * Math.exp(-u * 5)) * Math.exp(-u * 5) * .4 * g); },
  vin(e, t, g, R) { const q = gur(R, .5); let y = 0; e(t, .42, u => { const n = q(), k = .04 + .3 * can(u, .42); y += k * (n - y); return y * can(u, .42) * 1.5 * g; }); },
  kut(e, t, g, R) { const q = gur(R, .12); e(t, .4, u => (Math.sin(TAU * (95 * u - 70 * u * u)) * .7 + q()) * Math.exp(-u * 14) * .8 * g); },
  saplak(e, t, g, R) { e(t, .16, u => ((R() * 2 - 1) * Math.exp(-u * 60) + Math.sin(TAU * 210 * u) * .4 * Math.exp(-u * 28)) * .7 * g); },
  patlama(e, t, g, R) { const q = gur(R, .05), p = gur(R, .3); e(t, 1.7, u => (Math.sin(TAU * (60 * u - 14 * u * u)) * .6 * Math.exp(-u * 4) + q() * 2.2 * Math.exp(-u * 2.6) + p() * .8 * Math.exp(-u * 12)) * g * .75); },
  gurultu(e, t, g, R) { const q = gur(R, .03); e(t, 1.6, u => q() * 3 * can(u, 1.6) * (.7 + .3 * Math.sin(u * 40)) * g); },
  islik(e, t, g) { SES(e, t, .5, 1500, 380, .16 * g, can); },
  ding(e, t, g) { for (const [f, k] of [[1318, 1], [2637, .4], [1976, .5]]) SES(e, t + (f === 1976 ? .08 : 0), .9, f, f, .16 * k * g, son(5)); },
  soru(e, t, g) { SES(e, t, .16, 420, 440, .2 * g, can); SES(e, t + .17, .24, 470, 760, .2 * g, can); },
  sasir(e, t, g) { SES(e, t, .12, 520, 900, .2 * g, can); SES(e, t + .1, .3, 900, 860, .17 * g, son(9)); },
  damla(e, t, g) { for (const a of [0, .16]) SES(e, t + a, .1, 700, 1600, .2 * g, son(26)); },
  yildiz(e, t, g) { for (let i = 0; i < 6; i++) SES(e, t + i * .09, .2, 1100 + (i % 3) * 330, 1300 + (i % 3) * 330, .1 * g, son(12)); },
  kikir(e, t, g) { for (let i = 0; i < 5; i++) hayvanSes(e, t + i * .13, 430 - i * 22, 330 - i * 18, .1, .4 * g); },
  kap(e, t, g, R) { const q = gur(R, .6); e(t, .11, u => q() * can(u, .11) * .5 * g); },
  tikirti(e, t, g, R) { for (let i = 0; i < 8; i++) { const f = 500 + R() * 400; SES(e, t + i * .085, .05, f, f, .22 * g, son(70)); } },
  isilti(e, t, g, R) { for (let i = 0; i < 9; i++) { const f = 1500 + R() * 2200; SES(e, t + i * .05, .5, f, f, .05 * g, son(8)); } },
  cizirti(e, t, g, R) { e(t, .8, u => (R() > .985 ? (R() * 2 - 1) : 0) * 1.2 * can(u, .8) * g); },
  kabarcik(e, t, g, R) { for (let i = 0; i < 9; i++) { const f = 250 + R() * 500; SES(e, t + i * .1 + R() * .05, .09, f, f * 2.2, .16 * g, can); } },
  konfeti(e, t, g, R) { EF.saplak(e, t, .6 * g, R); EF.isilti(e, t + .08, g, R); },
  yagmur(e, t, g, R) { const q = gur(R, .7); e(t, 3.2, u => (q() * .1 + (R() > .997 ? (R() - .5) * .5 : 0)) * can(u, 3.2) * g); },
  ruzgar(e, t, g, R) { let y = 0; e(t, 1.8, u => { y += (.02 + .05 * (1 + Math.sin(u * 5))) * ((R() * 2 - 1) - y); return y * 2.2 * can(u, 1.8) * g; }); },
  alkis(e, t, g, R) { for (let i = 0; i < 46; i++) { const a = R() * 1.5, k = .05 + R() * .1; e(t + a, .03, u => (R() * 2 - 1) * Math.exp(-u * 130) * k * 2.4 * g); } },
  ciglik(e, t, g, R) { for (let i = 0; i < 9; i++) { const f = 380 + R() * 420; hayvanSes(e, t + R() * .8, f, f * 1.25, .5 + R() * .4, .13 * g, 7); } },
  mars(e, t, g, R) { for (let i = 0; i < 6; i++) EF.kut(e, t + i * .42, .5 * g, R); },
  gecis(e, t, g, R) { let y = 0; e(t, .2, u => { y += (.1 + .5 * can(u, .2)) * ((R() * 2 - 1) - y); return y * can(u, .2) * g; }); },
  pop(e, t, g) { SES(e, t, .11, 320, 980, .34 * g, can); },
  kisne(e, t, g) { hayvanSes(e, t, 900, 420, .9, .5 * g, 13); }, bogur(e, t, g) { hayvanSes(e, t, 170, 120, .9, .7 * g, 6); }, havla(e, t, g) { for (const a of [0, .24]) hayvanSes(e, t + a, 420, 230, .15, .8 * g); }, uluma(e, t, g) { hayvanSes(e, t, 300, 520, 1.2, .45 * g, 4, Math.sin); }, miyav(e, t, g) { hayvanSes(e, t, 520, 720, .28, .4 * g); hayvanSes(e, t + .22, 720, 430, .34, .4 * g); }, mele(e, t, g) { hayvanSes(e, t, 360, 320, .7, .6 * g, 9); },
  bip(e, t, g) { for (const [i, f] of [880, 1320, 1100].entries()) SES(e, t + i * .1, .08, f, f, .16 * g, can, boru); }, cik(e, t, g) { for (let i = 0; i < 3; i++) SES(e, t + i * .12, .09, 2100, 3100, .14 * g, can); }, gidak(e, t, g) { for (let i = 0; i < 4; i++) hayvanSes(e, t + i * .14, 560, 420, .09, .45 * g); hayvanSes(e, t + .58, 520, 820, .3, .45 * g); }, tisla(e, t, g, R) { e(t, .8, u => (R() * 2 - 1) * can(u, .8) * .22 * g); }, kukreme(e, t, g, R) { const q = gur(R, .1); hayvanSes(e, t, 95, 55, 1.3, 1.1 * g, 23); e(t, 1.3, u => q() * can(u, 1.3) * .9 * g); },
};
export const EFEKT = Object.keys(EF);
const pcm = p => { const h = execFileSync('ffmpeg', ['-v', 'error', '-i', p, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 }), v = new Float32Array(h.buffer.slice(h.byteOffset, h.byteOffset + h.length)); let t = 0; for (const q of v) t = Math.max(t, Math.abs(q)); return v.map(q => q / (t || 1)); };
// dis sesler: hikayeler/<ad>/sesler/ ya da depo kokundeki sesler/. Ad otomatik efektle ayniysa onun yerine gecer.
export function disSesler(...K) { const R = {}; for (const k of K) if (fs.existsSync(k)) for (const x of fs.readdirSync(k)) { const u = path.extname(x).toLowerCase(), ad = path.basename(x, path.extname(x)); if (UZANTI.includes(u) && !R[ad]) R[ad] = pcm(path.join(k, x)); } return R; }
export function muzikKur(f) {
  const N = Math.ceil(f.sure * SR), x = new Float32Array(N), R = rasgele(17), ekle = (t, s, fn) => { const i0 = Math.max(0, Math.round(t * SR)), n = Math.min(N - i0, Math.round(s * SR)); for (let i = 0; i < n; i++) x[i0 + i] += fn(i / SR); };
  const ped = (t, s, m, g) => ekle(t, s, u => { const e = Math.min(1, u / .9, (s - u) / .8), w = 6.2832 * hz(m); return g * Math.max(0, e) * (Math.sin(w * u) + .4 * Math.sin(w * 1.003 * u) + .25 * Math.sin(w * 2 * u) * Math.exp(-u)); }), piyano = (t, m, g) => ekle(t, 1.8, u => { let v = 0; const w = 6.2832 * hz(m); for (let k = 1; k < 6; k++) v += Math.sin(w * k * u) / k ** 1.5 * Math.exp(-u * (1.4 + k * .9)); return v * g * Math.min(1, u / .004); });
  (f.muzik || []).forEach(([t0, ad], i) => { const r = RUH[ad]; if (!r) throw new Error('Bilinmeyen müzik ruhu: ' + ad); const t1 = f.muzik[i + 1]?.[0] ?? f.sure, vur = 60 / r.bpm, ol = vur * 4; let k = 0; for (let t = t0; t < t1 - .05; t += ol, k++) { const a = r.a[k % r.a.length], s = Math.min(ol, t1 - t); a.forEach((m, j) => ped(t, Math.min(s + .5, f.sure - t), m, j ? .022 : .04)); for (let j = 0; j < 4 * r.ad; j++) { const u = j * vur / r.ad; if (u < s) piyano(t + u, a[[0, 2, 1, 3][j % 4]] + 12, .05); } } });
  for (const [t, ad, g = 1] of f.efekt || []) { const dis = f.dis && Object.hasOwn(f.dis, ad) ? f.dis[ad] : null; if (dis) { const n = Math.min(dis.length, 6 * SR); ekle(t, n / SR, u => { const i = Math.round(u * SR); return (dis[i] || 0) * g * .5 * Math.min(1, (n - i) / 2400); }); continue; } if (!Object.hasOwn(EF, ad)) throw new Error('Bilinmeyen efekt: ' + ad); EF[ad](ekle, t, g * .6, R); }
  return x;
}
const wav = x => { const b = Buffer.alloc(44 + x.length * 2); b.write('RIFF', 0); b.writeUInt32LE(36 + x.length * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22); b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(x.length * 2, 40); x.forEach((v, i) => b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v)) * 32767), 44 + i * 2)); return b; };
export function sesYap(f, D) {
  const dis = disSesler(path.join(D, 'sesler'), path.join(D, '..', '..', 'sesler')), x = muzikKur({ ...f, dis }), C = path.join(D, 'cikti'); fs.mkdirSync(C, { recursive: true }); let var_ = 0; const kis = new Float32Array(x.length).fill(1), konusma = new Float32Array(x.length);
  for (const r of f.replikler || []) { if (!/^[A-Za-z0-9_-]+$/.test(r.id)) throw new Error('Replik adı geçersiz: ' + r.id); const p = sesBul(path.join(D, 'ses'), r.id); if (!p) continue; var_++; const h = execFileSync('ffmpeg', ['-v', 'error', '-i', p, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 }), v = new Float32Array(h.buffer.slice(h.byteOffset, h.byteOffset + h.length)); if (v.length / SR > r.sure + .15) console.log(`! ${r.id}: ses ${(v.length / SR).toFixed(1)} sn, yeri ${r.sure} sn`); let e = 0; for (const q of v) e += q * q; const g = .1 / Math.sqrt(e / v.length + 1e-9), i0 = Math.round(r.t * SR); v.forEach((q, i) => { if (i0 + i < x.length) { konusma[i0 + i] += q * g; kis[i0 + i] = .42; } }); }
  let k = 1; for (let i = 0; i < x.length; i++) { k += (kis[i] - k) * .00012; x[i] = x[i] * k + konusma[i]; } let tepe = 0; for (const v of x) tepe = Math.max(tepe, Math.abs(v)); if (tepe > .9) x.forEach((v, i) => { x[i] = v * .9 / tepe; });
  const ham = path.join(C, 'ham.wav'), mix = path.join(C, 'mix.wav'); fs.writeFileSync(ham, wav(x)); const o = spawnSync('ffmpeg', ['-hide_banner', '-i', ham, '-af', 'loudnorm=I=-15:TP=-2:LRA=9:print_format=json', '-f', 'null', '-'], { encoding: 'utf8' }).stderr, j = JSON.parse(o.slice(o.lastIndexOf('{'), o.lastIndexOf('}') + 1)), kaz = Math.pow(10, (-15 - Number(j.input_i)) / 20).toFixed(5); execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', ham, '-af', `volume=${kaz},alimiter=limit=0.79:level=disabled`, '-ar', String(SR), '-ac', '2', mix]); fs.unlinkSync(ham); console.log(`→ mix.wav (${var_}/${(f.replikler || []).length} seslendirme, ${(f.efekt || []).length} efekt, ${Object.keys(dis).length} dış ses)`);
}
