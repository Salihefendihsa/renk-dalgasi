// denetle.mjs: hikaye ve teknik kurallar. Kaynak analizindeki zaaflarin her biri burada bir kural.
const SIRA = ['guc', 'tanik', 'sayi', 'soru', 'kural', 'bedel', 'donus'], DUNYA = ['yokus', 'iskele', 'carsi', 'mutfak'];
const POZ = ['dur', 'rahat', 'sasir', 'dusun', 'isaret', 'uzul', 'sakla', 'selam', 'anlat', 'otur', 'cay', 'yuru'], IFADE = ['notr', 'mutlu', 'gulme', 'saskin', 'uzgun', 'kizgin', 'supheci', 'yorgun', 'kararli', 'korku', 'muzip', 'duygulu'];
export function denetle(f, kadro) {
  const r = { gecti: [], uyari: [], hata: [] }, ok = (k, m, tur = 'hata', n = m) => (k ? r.gecti : r[tur]).push(k ? m : n), P = f.planlar || [], L = f.replikler || [];
  ok(P.length > 0, 'en az bir plan var'); if (!P.length) return r;
  ok(P[0].t0 === 0 && P.every((p, i) => p.t1 > p.t0 && (!i || Math.abs(p.t0 - P[i - 1].t1) < 1e-6)) && Math.abs(P.at(-1).t1 - f.sure) < 1e-6, 'planlar boşluksuz ve süreyle eşit');
  ok(new Set(P.map(p => p.id)).size === P.length, 'plan adları benzersiz');
  const ilk = SIRA.map(a => P.findIndex(p => p.adim === a)); ok(ilk.every(x => x >= 0), 'yedi hikâye adımı tamam', 'hata', 'eksik adım: ' + SIRA.filter((_, i) => ilk[i] < 0).join(', ')); ok(ilk.every((x, i) => !i || x > ilk[i - 1]), 'adımlar doğru sırada');
  for (const k of ['kural', 'bedel', 'donus', 'fizikselSaka']) ok((f[k] || '').length > 8, `${k} yazılmış`);
  ok(/\d/.test(f.baslik), 'başlıkta sayı var', 'uyari', 'başlıkta sayı yok (kanıt zayıf ama sayılı başlıklar daha çok izlenmiş)'); ok(!/DOLDUR/.test(JSON.stringify(f)), 'doldurulmamış alan yok');
  ok(/^#[0-9a-f]{6}$/i.test(f.vurgu || ''), 'vurgu rengi geçerli'); ok(Object.hasOwn(kadro, f.kahraman), 'kahraman kadroda');
  const soru = P.find(p => p.adim === 'soru'); if (soru) { ok(soru.t0 <= 35, 'başlık sorusu ilk 35 sn içinde', 'uyari', 'başlık sorusu 35 sn\'den sonra'); ok((soru.yazi || []).some(y => y.tur === 'baslik'), 'soru planında başlık kartı var'); }
  const oy = P.flatMap(p => p.oyuncular || []); ok(P.every(p => DUNYA.includes(p.dunya)), 'bütün dünyalar tanımlı'); ok(oy.every(o => Object.hasOwn(kadro, o.kim)), 'bütün oyuncular kadroda');
  ok(oy.every(o => [].concat(o.poz || 'dur').filter(x => typeof x === 'string').every(x => POZ.includes(x))), 'bütün pozlar tanımlı'); ok(oy.every(o => [].concat(o.ifade || 'notr').filter(x => typeof x === 'string').every(x => IFADE.includes(x))), 'bütün ifadeler tanımlı');
  ok(new Set(oy.map(o => o.kim)).size >= 3, 'en az üç karakter var', 'uyari', 'üçten az karakter var'); ok(new Set(P.map(p => p.dunya)).size >= 2, 'en az iki mekân var', 'uyari', 'tek mekân kullanılmış');
  ok(P.every(p => p.t1 - p.t0 <= 10), '10 sn\'den uzun plan yok', 'uyari', '10 sn\'den uzun plan var'); ok(P.some(p => p.guc), 'imza efekti kullanılmış'); const gs = P.filter(p => p.guc).reduce((s, p) => s + (p.guc === true ? p.t1 - p.t0 : p.guc[1] - Math.max(0, p.guc[0])), 0) / f.sure; ok(gs <= .48, `renk dalgası dengeli (%${Math.round(gs * 100)})`, 'uyari', `renk dalgası çok sık (%${Math.round(gs * 100)})`);
  ok(new Set(L.map(x => x.id)).size === L.length, 'replik adları benzersiz'); ok(L.every((x, i) => !i || x.t >= L[i - 1].t + L[i - 1].sure - .01), 'replikler çakışmıyor'); ok(L.every(x => x.t + x.sure <= f.sure), 'replikler filmin içinde');
  for (const x of L) { const h = x.metin.length / x.sure; if (h > 19) r.uyari.push(`${x.id} çok hızlı: saniyede ${h.toFixed(1)} harf`); if (x.kim !== 'anlatici') { const p = P.find(p => x.t >= p.t0 && x.t < p.t1); if (!p?.oyuncular?.some(o => o.kim === x.kim)) r.hata.push(`${x.id}: ${x.kim} konuşuyor ama karede yok`); } }
  const soz = L.reduce((s, x) => s + x.sure, 0) / f.sure; ok(soz <= .72, `nefes payı var (konuşma %${Math.round(soz * 100)})`, 'uyari', `konuşma çok yoğun (%${Math.round(soz * 100)})`); ok(L.some(x => x.kim !== 'anlatici'), 'anlatıcı dışında konuşan var');
  return r;
}
