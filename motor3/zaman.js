// zaman.js: filmin saati ANLATICIDIR. Olaylar, planlar ve efektler saniyeye degil cumleye/kelimeye baglanir;
// ses degisince butun film kendiliginden yeniden zamanlanir.
export function zamanla(h) {
  const hiz = h.kelimeSaniye || 2.75; let t = h.basPay ?? .15; const C = [];
  for (const c of h.cumleler) {
    const w = c.metin.trim().split(/\s+/), ag = w.map(x => .55 + .085 * x.replace(/[^\p{L}\d]/gu, '').length + (/[.!?…]["”]?$/.test(x) ? .55 : /[,;:]$/.test(x) ? .28 : 0)), top = ag.reduce((a, b) => a + b, 0);
    const sure = h.sesSureleri?.[c.id] ?? w.length / hiz, ara = c.ara ?? .12; let u = t; const k = w.map((s, i) => { const b = u; u += ag[i] / top * sure; return { s, t0: b, t1: u }; });
    C.push({ ...c, t0: t, t1: t + sure, kelimeler: k }); t += sure + ara;
  }
  return { cumleler: C, sure: t + (h.sonPay ?? .5) };
}
// an: 3.2 | "C03" | "C03.4" (4. kelime) | "C03.son" | "C03.4+0.3" | "C03-0.2" | "bas" | "bitis"
export function an(Z, r) {
  if (typeof r === 'number') { if (!Number.isFinite(r) || r < 0) throw new Error('Geçersiz an: ' + r); return r; }
  if (r === 'bas') return 0; if (r === 'bitis') return Z.sure;
  const m = /^(\w+?)(?:\.(\d+|son))?([+-]\d+(?:\.\d+)?)?$/.exec(r); if (!m) throw new Error('Anlaşılmayan an: ' + r);
  const c = Z.cumleler.find(x => x.id === m[1]); if (!c) throw new Error('Cümle yok: ' + r); let t = c.t0;
  if (m[2] === 'son') t = c.t1; else if (m[2]) { const k = c.kelimeler[+m[2] - 1]; if (!k) throw new Error('Kelime yok: ' + r); t = k.t0; }
  return Math.max(0, t + Number(m[3] || 0));
}
// ekrandaki 1-2 kelimelik altyazi
export function altyazi(Z, t) {
  const c = Z.cumleler.find(c => t >= c.t0 && t < c.t1 + .08); if (!c) return null;
  const g = []; for (let i = 0; i < c.kelimeler.length;) { const a = c.kelimeler[i], b = c.kelimeler[i + 1]; if (b && a.s.length + b.s.length <= 11 && !/[.,!?…:;]["”]?$/.test(a.s)) { g.push({ s: a.s + ' ' + b.s, t0: a.t0, t1: b.t1, i }); i += 2; } else { g.push({ s: a.s, t0: a.t0, t1: a.t1, i }); i++; } }
  const x = g.find((x, j) => t >= x.t0 && t < (g[j + 1]?.t0 ?? c.t1 + .08)); return x && { ...x, vurgu: (c.vurgu || []).some(v => x.s.toLocaleLowerCase('tr').includes(v.toLocaleLowerCase('tr'))) };
}
