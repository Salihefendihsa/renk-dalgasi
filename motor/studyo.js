// studyo.js: etkilesimli karakter atolyesi ve film masasi
import { W, H, dikey, hale } from './temel.js';
import { aktor, POZ, HAREKET, pozAl, IFADE } from './aktor.js';
import { Film, DUNYA } from './film.js';
import { denetle } from '../araclar/denetle.mjs';

const $ = i => document.getElementById(i), kopya = x => JSON.parse(JSON.stringify(x));
const oturum = await (await fetch('/api/oturum')).json();
let kadro = await (await fetch('/kadro/kadro.json')).json();
const R = { mod: 'kadro', kim: Object.keys(kadro)[0], poz: 'elsalla', ifade: 'mutlu', film: null, filmAd: oturum.filmler[0], t: 0, oyna: false, plan: 0, oyuncu: 0, gecmis: [], kirli: { kadro: false, film: false } };
const c = $('sahne'), g = c.getContext('2d'); let cizer = null;
const POZLAR = [...Object.keys(POZ), ...Object.keys(HAREKET)];
const SEC = { sac: ['kivircik', 'savruk', 'kisa', 'uzun', 'topuz', 'kuyruk', 'bob', 'orgu', 'afro', 'ortu', 'ibik', 'kel'], ust: ['palto', 'mont', 'hirka', 'yelek', 'yagmurluk', 'kazak', 'hoodie', 'onluk', 'takim', 'tulum', 'elbise', 'doktor'], yas: ['yetiskin', 'cocuk', 'yasli'], ek: ['kupe', 'gozluk', 'kulaklik', 'mikrofon', 'bere', 'kasket', 'fotr', 'asci', 'bandana', 'pilotgozluk', 'cicek', 'biyik', 'sakal', 'kukuleta'] };
const durum = (m, hata) => { $('durum').textContent = m; $('durum').className = hata ? 'h' : ''; };
const sakla = () => { R.gecmis.push({ mod: R.mod, kadro: kopya(kadro), kim: R.kim, film: R.film && kopya(R.film), filmAd: R.filmAd, plan: R.plan, oyuncu: R.oyuncu }); if (R.gecmis.length > 60) R.gecmis.shift(); R.kirli[R.mod] = true; durum('Kaydedilmemiş değişiklik var'); };
const el = (ad, o = {}, ...cocuk) => { const e = document.createElement(ad); Object.assign(e, o); e.append(...cocuk); return e; };
const alan = (p, ad, girdi) => { p.append(el('label', {}, el('span', { textContent: ad }), girdi)); return girdi; };
const secim = (p, ad, liste, deger, f) => alan(p, ad, el('select', { onchange: e => { sakla(); f(e.target.value); } }, ...liste.map(x => el('option', { value: x, textContent: kadro[x]?.ad || x, selected: x === deger }))));
const metin = (p, ad, deger, f, tur = 'text') => alan(p, ad, el('input', { type: tur, value: deger ?? '', step: 'any', onchange: e => { const v = tur === 'number' ? Number(e.target.value) : e.target.value; if (tur === 'number' && !Number.isFinite(v)) return; sakla(); f(v); } }));
const surgu = (p, ad, a, b, adim, deger, f) => alan(p, ad, el('input', { type: 'range', min: a, max: b, step: adim, value: deger, onpointerdown: sakla, onkeydown: e => { if (e.key.startsWith('Arrow')) sakla(); }, oninput: e => f(Number(e.target.value)) }));
const renk = (p, ad, deger, f) => { let ilk = true; return alan(p, ad, el('input', { type: 'color', value: deger || '#888888', oninput: e => { if (ilk) { sakla(); ilk = false; } f(e.target.value); }, onchange: () => { ilk = true; } })); };
const dugme = (m, f, o = {}) => el('button', { textContent: m, onclick: f, ...o });

// ------------------------------------------------------------ karakter atolyesi
function kadroPanel() {
  const p = $('panel'); p.replaceChildren(); const k = kadro[R.kim];
  metin(p, 'Ad', k.ad, v => { k.ad = v; kadroAlt(); }); metin(p, 'Rol', k.rol, v => k.rol = v); metin(p, 'İmza eşya', k.imza, v => k.imza = v);
  p.append(el('h3', { textContent: 'Yüz ve saç' })); renk(p, 'Ten', k.ten, v => k.ten = v); renk(p, 'Göz', k.goz, v => k.goz = v); secim(p, 'Yaş', SEC.yas, k.yas || 'yetiskin', v => { if (v === 'yetiskin') delete k.yas; else k.yas = v; }); secim(p, 'Saç', SEC.sac, k.sac.tur, v => k.sac.tur = v); renk(p, 'Saç rengi', k.sac.renk, v => k.sac.renk = v);
  p.append(el('h3', { textContent: 'Kıyafet' })); secim(p, 'Üst', SEC.ust, k.ust.tur, v => k.ust.tur = v); renk(p, 'Üst rengi', k.ust.renk, v => k.ust.renk = v); renk(p, 'İç / önlük', k.ust.ic || '#f4ead7', v => k.ust.ic = v); renk(p, 'Alt', k.alt.renk, v => k.alt.renk = v); renk(p, 'Ayakkabı', k.ayak || '#3a2438', v => k.ayak = v);
  surgu(p, 'Etek boyu', 10, 170, 2, k.ust.etek ?? 40, v => k.ust.etek = v); surgu(p, 'Boy', .65, 1.15, .01, k.boy || 1, v => k.boy = v); surgu(p, 'Gövde eni', .85, 1.2, .01, k.en || 1, v => k.en = v);
  const atki = alan(p, 'Atkı', el('input', { type: 'checkbox', checked: !!k.atki, onchange: e => { sakla(); if (e.target.checked) k.atki = '#d8323c'; else delete k.atki; kadroPanel(); } })); atki.style.width = 'auto'; if (k.atki) renk(p, 'Atkı rengi', k.atki, v => k.atki = v);
  p.append(el('h3', { textContent: 'Aksesuar' })); const s = el('div', { className: 'sira' }); for (const a of SEC.ek) s.append(dugme(a, () => { sakla(); k.ek = (k.ek || []).includes(a) ? k.ek.filter(x => x !== a) : [...(k.ek || []), a]; kadroPanel(); }, { ariaPressed: String((k.ek || []).includes(a)) })); p.append(s);
  p.append(el('h3', { textContent: 'Oyunculuk' })); const s2 = el('div', { className: 'sira' }); for (const a of POZLAR) s2.append(dugme(a, () => { R.poz = a; kadroPanel(); }, { ariaPressed: String(R.poz === a) })); p.append(s2); const s3 = el('div', { className: 'sira' }); for (const a of Object.keys(IFADE)) s3.append(dugme(a, () => { R.ifade = a; kadroPanel(); }, { ariaPressed: String(R.ifade === a) })); p.append(s3);
}
function kadroAlt() {
  const a = $('alt'); a.replaceChildren(); const s = el('div', { className: 'sira' });
  for (const id of Object.keys(kadro)) s.append(dugme(kadro[id].ad, () => { R.kim = id; kadroAlt(); kadroPanel(); }, { ariaPressed: String(id === R.kim) }));
  s.append(dugme('+ Kopyala', () => { const id = (prompt('Yeni karakter kodu (küçük harf):') || '').trim(); if (!/^[a-z][a-z0-9]{1,19}$/.test(id) || Object.hasOwn(kadro, id)) return durum('Kod geçersiz ya da kullanılıyor', true); sakla(); kadro[id] = { ...kopya(kadro[R.kim]), ad: id }; R.kim = id; kadroAlt(); kadroPanel(); }),
    dugme('Rastgele', () => { sakla(); const q = x => x[Math.floor(Math.random() * x.length)], h = () => '#' + [0, 0, 0].map(() => (50 + Math.floor(Math.random() * 180)).toString(16)).join(''), k = kadro[R.kim]; k.sac = { tur: q(SEC.sac), renk: h() }; k.ust = { tur: q(SEC.ust), renk: h(), etek: 30 + Math.floor(Math.random() * 100) }; k.alt.renk = h(); k.goz = h(); k.ten = q(['#f2cbb0', '#e3a37c', '#c98a62', '#a86c48', '#8a5638']); k.ek = [q(SEC.ek)]; kadroPanel(); }));
  a.append(s);
}
const ISIK = { yon: [.8, -.6], kenar: '#ffd9a0', kenarK: .85, golge: '#24405a', ortam: '#e6e2e0', ortamK: .4 };
function kadroCiz(t) {
  g.reset(); g.fillStyle = dikey(g, 0, H, [0, '#0c2230'], [.72, '#1a5a60'], [1, '#e7a765']); g.fillRect(0, 0, W, H); hale(g, 960, 820, 800, '#f3a95c', .5); const k = kadro[R.kim], kirp = t % 3.4 < .16 ? 1 - Math.abs(t % 3.4 - .08) / .08 : 0;
  aktor(g, k, { x: 620, y: 985, s: .96, isik: ISIK, t, poz: pozAl(R.poz, t), ifade: R.ifade, kirp });
  g.save(); g.beginPath(); g.roundRect(1130, 130, 680, 760, 30); g.clip(); g.fillStyle = '#164a52'; g.fillRect(1130, 130, 680, 760); aktor(g, k, { x: 1460, y: 2080, s: 2 / (k.boy || 1), isik: ISIK, t, poz: POZ.dur, ifade: R.ifade, kirp }); g.restore();
  g.fillStyle = '#fff3dc'; g.textAlign = 'left'; g.font = '800 56px "Segoe UI"'; g.fillText(k.ad, 1130, 966); g.font = '400 28px "Segoe UI"'; g.fillText(k.imza || '', 1130, 1010);
}
// ------------------------------------------------------------ film masasi
const PLAN = () => R.film.planlar[R.plan], OYUN = () => PLAN().oyuncular?.[R.oyuncu];
async function filmAc(ad) { const r = await fetch(`/filmler/${ad}/film.json`); if (!r.ok) return durum('Film açılamadı', true); R.film = await r.json(); R.filmAd = ad; R.plan = R.oyuncu = 0; R.t = .6; R.kirli.film = false; cizer = new Film(R.film, kadro, .5); filmAlt(); filmPanel(); }
const bagla = () => { if (cizer) { cizer.f = R.film; cizer.K = kadro; } };
function planGit(i) { R.plan = i; R.oyuncu = 0; R.t = PLAN().t0 + .02; R.oyna = false; filmAlt(); filmPanel(); }
function filmAlt() {
  const a = $('alt'); a.replaceChildren(); const z = el('input', { type: 'range', id: 'zaman', min: 0, max: R.film.sure, step: .01, value: R.t, ariaLabel: 'Zaman', oninput: e => { R.t = Number(e.target.value); R.oyna = false; planBul(); } }); a.append(z);
  const s = el('div', { className: 'sira' }); s.append(dugme('Oynat / durdur', () => { R.oyna = !R.oyna; })); R.film.planlar.forEach((p, i) => s.append(dugme(`${p.id} (${p.adim})`, () => planGit(i), { ariaPressed: String(i === R.plan) }))); a.append(s);
  const r = el('div', { className: 'sira' }); r.append(dugme('Taslak video oluştur', () => render(.5)), dugme('Final video oluştur (1080p)', () => render(1))); a.append(r, el('div', { id: 'lint' })); lint();
}
function planBul() { const i = R.film.planlar.findIndex(p => R.t >= p.t0 && R.t < p.t1); if (i >= 0 && i !== R.plan) { R.plan = i; R.oyuncu = 0; filmPanel(); document.querySelectorAll('#alt .sira')[0]?.querySelectorAll('button').forEach((b, j) => { if (j) b.ariaPressed = String(j - 1 === i); }); } }
function lint() { const k = $('lint'); if (!k) return; const r = denetle(R.film, kadro); k.replaceChildren(el('ul', {}, ...r.hata.map(x => el('li', { className: 'h', textContent: x })), ...r.uyari.map(x => el('li', { className: 'u', textContent: x })), el('li', { className: 'g', textContent: `${r.gecti.length} kural geçti` }))); }
const ilkD = v => Array.isArray(v) ? v[0] : v, sonD = v => Array.isArray(v) ? v[1] : v;
function filmPanel() {
  const p = $('panel'); p.replaceChildren(); const q = PLAN(), o = OYUN(), son = () => { lint(); };
  p.append(el('h3', { textContent: 'Film' })); metin(p, 'Başlık', R.film.baslik, v => { R.film.baslik = v; son(); }); renk(p, 'Vurgu rengi', R.film.vurgu, v => R.film.vurgu = v); for (const a of ['kural', 'bedel', 'donus', 'fizikselSaka']) metin(p, a, R.film[a], v => { R.film[a] = v; son(); });
  p.append(el('h3', { textContent: `Plan: ${q.id} (${q.t0}–${q.t1} sn)` })); secim(p, 'Mekân', Object.keys(DUNYA), q.dunya, v => { q.dunya = v; son(); });
  q.kamera ||= {}; const kam = (n, a, b, st, vars) => surgu(p, `Kamera ${n}`, a, b, st, ilkD(q.kamera[n] ?? vars), v => { const e = q.kamera[n]; q.kamera[n] = Array.isArray(e) ? [v, v + (e[1] - e[0])] : v; }); kam('x', 400, 1520, 5, 960); kam('y', 250, 700, 5, 540); kam('z', .9, 2.6, .01, 1);
  const gc = el('input', { type: 'checkbox', checked: !!q.guc, onchange: e => { sakla(); if (e.target.checked) q.guc = [.5, Math.min(4, q.t1 - q.t0 - .6)]; else delete q.guc; son(); } }); alan(p, 'Renk dalgası', gc).style.width = 'auto';
  p.append(el('h3', { textContent: 'Oyuncular (sahnede sürükle)' })); const s = el('div', { className: 'sira' }); (q.oyuncular ||= []).forEach((x, i) => s.append(dugme(kadro[x.kim]?.ad || x.kim, () => { R.oyuncu = i; filmPanel(); }, { ariaPressed: String(i === R.oyuncu) })));
  s.append(dugme('+ Ekle', () => { const bos = Object.keys(kadro).find(k => !q.oyuncular.some(x => x.kim === k)); if (!bos) return; sakla(); q.oyuncular.push({ kim: bos, x: 960, poz: 'dur', ifade: 'notr' }); R.oyuncu = q.oyuncular.length - 1; filmPanel(); son(); })); if (o) s.append(dugme('Sil', () => { sakla(); q.oyuncular.splice(R.oyuncu, 1); R.oyuncu = 0; filmPanel(); son(); })); p.append(s);
  if (o) { const bosta = Object.keys(kadro).filter(k => k === o.kim || !q.oyuncular.some(x => x.kim === k)); secim(p, 'Karakter', bosta, o.kim, v => { o.kim = v; filmPanel(); son(); }); secim(p, 'Yön', ['sağa', 'sola'], o.yon === -1 ? 'sola' : 'sağa', v => o.yon = v === 'sola' ? -1 : 1); surgu(p, 'Büyüklük', .3, 1.1, .01, o.s ?? .62, v => o.s = v);
    const ikili = (ad, liste) => { const d = o[ad] ?? (ad === 'poz' ? 'dur' : 'notr'); secim(p, ad + ' (ilk)', liste, ilkD(d), v => { const e = o[ad]; o[ad] = Array.isArray(e) ? [v, e[1], e[2]] : v; son(); }); secim(p, ad + ' (sonra)', ['—', ...liste], Array.isArray(d) ? d[1] : '—', v => { o[ad] = v === '—' ? ilkD(o[ad]) : [ilkD(o[ad] ?? (ad === 'poz' ? 'dur' : 'notr')), v, 1]; filmPanel(); son(); }); if (Array.isArray(d)) surgu(p, 'Geçiş sn', 0, q.t1 - q.t0, .1, d[2] ?? .6, v => o[ad][2] = v); }; ikili('poz', POZLAR); ikili('ifade', Object.keys(IFADE)); }
  p.append(el('h3', { textContent: 'Bu plandaki replikler' })); for (const r of R.film.replikler.filter(r => r.t >= q.t0 && r.t < q.t1)) { const k = el('div', { className: 'rep' }); secim(k, r.id, ['anlatici', ...q.oyuncular.map(x => x.kim)], r.kim, v => { r.kim = v; son(); }); metin(k, 'Metin', r.metin, v => { r.metin = v; son(); }); metin(k, 'Başlangıç', r.t, v => { r.t = v; son(); }, 'number'); metin(k, 'Süre', r.sure, v => { r.sure = v; son(); }, 'number'); k.append(dugme('Sil', () => { sakla(); R.film.replikler.splice(R.film.replikler.indexOf(r), 1); filmPanel(); son(); })); p.append(k); }
  p.append(dugme('+ Replik', () => { sakla(); let n = 1; while (R.film.replikler.some(r => r.id === 'L' + String(n).padStart(2, '0'))) n++; R.film.replikler.push({ id: 'L' + String(n).padStart(2, '0'), kim: 'anlatici', t: +Math.max(q.t0, R.t).toFixed(1), sure: 2, metin: 'Yeni replik' }); R.film.replikler.sort((a, b) => a.t - b.t); filmPanel(); son(); }));
}
// surukleme
let tut = null; const yer = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; };
c.addEventListener('pointerdown', e => { if (R.mod !== 'film' || !R.film) return; const [x] = yer(e), k = cizer.kamera(PLAN(), R.t); let en = -1, mes = 170; (PLAN().oyuncular || []).forEach((o, i) => { const u = R.t - PLAN().t0, kk = Array.isArray(o.x) ? Math.max(0, Math.min(1, (u - (o.hiz?.[0] ?? 0)) / ((o.hiz?.[1] ?? PLAN().t1 - PLAN().t0) - (o.hiz?.[0] ?? 0)))) : 0, ox = Array.isArray(o.x) ? o.x[0] + (o.x[1] - o.x[0]) * kk : o.x, d = Math.abs(W / 2 + (ox - k.x) * k.z - x); if (d < mes) { mes = d; en = i; } }); if (en < 0) return; sakla(); R.oyna = false; R.oyuncu = en; filmPanel(); tut = { x, o: OYUN(), bas: kopya(OYUN().x), z: k.z }; c.setPointerCapture(e.pointerId); });
c.addEventListener('pointermove', e => { if (!tut) return; const d = (yer(e)[0] - tut.x) / tut.z; tut.o.x = Array.isArray(tut.bas) ? tut.bas.map(v => Math.round(v + d)) : Math.round(tut.bas + d); }); c.addEventListener('pointerup', () => { tut = null; }); c.addEventListener('pointercancel', () => { tut = null; });
// kayit ve video
const gonder = async (yol, v) => { const r = await fetch(yol, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Renk': oturum.anahtar }, body: JSON.stringify(v) }), j = await r.json(); if (!r.ok) throw new Error(j.hata); return j; };
async function kaydet() { try { if (R.kirli.kadro || R.mod === 'kadro') { await gonder('/api/kaydet', { tur: 'kadro', veri: kadro }); R.kirli.kadro = false; } if (R.film && (R.kirli.film || R.mod === 'film')) { await gonder('/api/kaydet', { tur: 'film', ad: R.filmAd, veri: R.film }); R.kirli.film = false; } durum('Kaydedildi'); return true; } catch (e) { durum('Kaydedilemedi: ' + e.message, true); return false; } }
async function render(olcek) { if (denetle(R.film, kadro).hata.length) return durum('Önce denetim hatalarını düzelt', true); if (!await kaydet()) return; try { await gonder('/api/render', { ad: R.filmAd, olcek }); const bak = async () => { const j = await (await fetch('/api/is')).json(); if (j.durum === 'çalışıyor') { durum('Video: ' + j.satir); setTimeout(bak, 1000); } else if (j.durum === 'bitti') { durum('Video hazır'); let a = $('indir'); if (!a) { a = el('a', { id: 'indir', target: '_blank', textContent: 'Videoyu aç' }); a.style.color = 'var(--v)'; $('alt').prepend(a); } a.href = `/filmler/${R.filmAd}/cikti/${R.filmAd}.mp4?${Date.now()}`; } else durum('Video hatası: ' + j.satir, true); }; bak(); } catch (e) { durum(e.message, true); } }
$('kaydet').onclick = kaydet;
$('geri').onclick = () => { const s = R.gecmis.pop(); if (!s) return durum('Geri alınacak değişiklik yok'); kadro = s.kadro; R.kim = s.kim; if (s.film) { R.film = s.film; R.filmAd = s.filmAd; R.plan = s.plan; R.oyuncu = s.oyuncu; $('filmSec').value = s.filmAd; } R.kirli[s.mod] = true; bagla(); R.mod === 'kadro' ? (kadroAlt(), kadroPanel()) : (filmAlt(), filmPanel()); durum('Geri alındı'); };
async function mod(m) { R.mod = m; $('sKadro').ariaPressed = String(m === 'kadro'); $('sFilm').ariaPressed = String(m === 'film'); $('filmSec').hidden = m !== 'film'; if (m === 'kadro') { kadroAlt(); kadroPanel(); } else if (!R.film) await filmAc(R.filmAd); else { bagla(); filmAlt(); filmPanel(); } }
$('sKadro').onclick = () => mod('kadro'); $('sFilm').onclick = () => mod('film'); $('filmSec').append(...oturum.filmler.map(f => el('option', { value: f, textContent: f }))); const ist = new URLSearchParams(location.search).get('film'); if (oturum.filmler.includes(ist)) { R.filmAd = ist; $('filmSec').value = ist; }
$('filmSec').onchange = e => { if (R.kirli.film && !confirm('Kaydedilmemiş değişiklikler silinsin mi?')) { e.target.value = R.filmAd; return; } R.gecmis = R.gecmis.filter(x => x.mod === 'kadro').map(x => ({ ...x, film: null })); filmAc(e.target.value); };
addEventListener('beforeunload', e => { if (R.kirli.kadro || R.kirli.film) e.preventDefault(); });
let once = performance.now(), sonHata = ''; function dongu(n) { const d = Math.min(.1, (n - once) / 1000); once = n; try { if (R.mod === 'kadro') kadroCiz(n / 1000); else if (cizer) { if (R.oyna) { R.t = (R.t + d) % R.film.sure; planBul(); } const z = $('zaman'); if (z && document.activeElement !== z) z.value = R.t; g.reset(); g.drawImage(cizer.kare(R.t), 0, 0, W, H); } sonHata = ''; } catch (e) { if (e.message !== sonHata) durum('Çizim hatası: ' + (sonHata = e.message), true); } requestAnimationFrame(dongu); }
await mod('kadro'); window.hazir = true; requestAnimationFrame(dongu);
