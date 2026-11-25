// otoses.js: ekranda olan her seyin sesi. Olay kayitlarindan okur; kimse tek tek yazmaz. Kapatmak: "otoSes": false
import { an } from './zaman.js'; import { parca } from './olay.js'; import { HAYVAN } from './hayvan-liste.js';
const ISARET_SES = { unlem: 'sasir', soru: 'soru', ter: 'damla', ampul: 'ding', yildiz: 'yildiz', kahkaha: 'kikir' };
const EFEKT_SES = { patlama: ['patlama', 1], yagmur: ['yagmur', .5], kabarcik: ['kabarcik', .6], konfeti: ['konfeti', .7], isik: ['isilti', .5], kivilcim: ['cizirti', .45], kar: ['ruzgar', .35] };
export function otoSes(h, Z, S) {
  if (h.otoSes === false) return []; const L = [], ek = (t, ad, g = 1) => { if (t >= 0 && t < Z.sure - .05) L.push([+t.toFixed(3), ad, g]); };
  const gor = (id, t) => { const p = S.planAt(t), s = S.A[id] && parca(S.A[id], t); return !!(p && s && s.mekan === p.mekan); };
  for (const o of S.olaylar) {
    if (o.kim && !gor(o.kim, o.t + .05)) continue;
    if (o.kim) { if (o.eyle === 'zipla' || (o.eyle === 'boyut' && !o.hemen)) ek(o.t, 'boing', .6); if (o.eyle === 'don') ek(o.t, 'ding', .6); if (o.eyle === 'kilik' && !o.hemen) ek(o.t, 'konfeti', .5); if (o.eyle === 'firla') { ek(o.t, 'vin', .8); ek(o.bitis, 'kut', .7); } if (o.eyle === 'dus') ek(o.t + .3, 'kut', .8); if (o.eyle === 'vur') ek(o.t, 'saplak', .9); if (o.eyle === 'irkil') ek(o.t, 'sasir', .3); if (['al', 'ver', 'koy'].includes(o.eyle)) ek(o.t + .2, 'kap', .5); if (o.eyle === 'at') ek(o.t, 'vin', .5); if (o.eyle === 'poz' && o.poz === 'alkis') ek(o.t, 'alkis', .45); if (o.eyle === 'isaretle') ek(o.t, ISARET_SES[o.tur], .55); }
    else { const p = S.planAt(o.t + .05), n = S.N[o.nesne]; if (!p || n.durum.mekan !== p.mekan) continue; if (o.eyle === 'firla') ek(o.t, 'carp', .5); if (o.eyle === 'dus') { ek(o.t, 'islik', .5); ek(o.t + (o.sure || .7), 'kut', 1); } if (o.eyle === 'yuvarlan') ek(o.t, 'gurultu', .8); if (o.eyle === 'havalan') ek(o.t, 'isilti', .4); if (o.eyle === 'salla') ek(o.t, 'tikirti', .5); if (o.eyle === 'zipla') ek(o.t, 'boing', .4); if (o.eyle === 'git' && HAYVAN[n.p]) { ek(o.t, HAYVAN[n.p].ses, .7); if (HAYVAN[n.p].ayak) for (let t = o.t; t < o.t + (o.sure || .7) && t < o.t + 4; t += .17) ek(t, 'nal', .4); } }
  }
  for (const a of Object.values(S.A)) for (const s of a.yer) if (s.tur === 'yuru' || s.tur === 'kos') { const d = s.tur === 'yuru' ? .42 : .21; for (let t = s.t0 + .1, i = 0; t < Math.min(s.t1, s.t0 + 5); t += d, i++) if (gor(a.id, t)) ek(t, 'adim', s.tur === 'kos' ? .42 : .26); }
  for (const e of h.efektler || []) { const x = EFEKT_SES[e.tur]; const t = an(Z, e.an); if (x && S.planAt(t + .05)?.mekan === e.mekan) ek(t, x[0], x[1]); }
  for (const v of h.vuruslar || []) ek(an(Z, v.an), /BUM|GÜM|GÜRR|PUF/.test(v.metin) ? 'patlama' : /VUUU/.test(v.metin) ? 'ruzgar' : 'saplak', .7);
  for (const f of h.flaslar || []) ek(an(Z, f.an), 'isilti', .4);
  for (const k of h.kitleler || []) ek(an(Z, k.an), { kacis: 'ciglik', seyirci: 'alkis', ordu: 'mars' }[k.tur], .7);
  for (const p of S.planlar.slice(1)) ek(p.t0 - .08, 'gecis', .22);
  // ayni ses ust uste binmesin
  const son = {}; return L.sort((a, b) => a[0] - b[0]).filter(([t, ad]) => { const ara = { patlama: .3, isilti: .5, alkis: 1.2, yagmur: 3, ruzgar: 1 }[ad] ?? .09; if (son[ad] !== undefined && t - son[ad] < ara) return false; son[ad] = t; return true; });
}
