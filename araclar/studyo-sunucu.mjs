// studyo-sunucu.mjs: yalnizca bu bilgisayardan erisilen kayit ve video API'si.
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto'; import { spawn } from 'node:child_process';
import { sunucu, KOK } from '../motor/cdp.mjs';
const AD = /^[a-z0-9-]{1,60}$/, RENK = /^#[0-9a-f]{6}$/i;
export function kadroGecerli(k) {
  if (!k || typeof k !== 'object' || Array.isArray(k) || !Object.keys(k).length) return 'Kadro boş';
  for (const [id, x] of Object.entries(k)) { if (!/^[a-z][a-z0-9]{1,19}$/.test(id)) return 'Karakter kodu geçersiz: ' + id; if (!x?.ad || !x.sac?.tur || !x.ust?.tur) return id + ': eksik alan'; for (const r of [x.ten, x.goz, x.sac.renk, x.ust.renk, x.alt?.renk]) if (!RENK.test(r || '')) return id + ': renk geçersiz'; if (!(x.boy === undefined || (x.boy >= .5 && x.boy <= 1.3))) return id + ': boy geçersiz'; }
  return null;
}
export const filmGecerli = (ad, f) => !AD.test(ad || '') ? 'Film adı geçersiz' : !f || f.ad !== ad || !Array.isArray(f.planlar) || !f.planlar.length || !Array.isArray(f.replikler) || !(f.sure > 0 && f.sure <= 1800) || !RENK.test(f.vurgu || '') ? 'Film verisi geçersiz' : null;
export async function studyoBaslat(port = 8321) {
  const anahtar = crypto.randomBytes(24).toString('hex'); let is = { durum: 'boş', satir: '' }, gercekPort;
  const filmler = () => fs.readdirSync(path.join(KOK, 'filmler')).filter(x => AD.test(x) && fs.existsSync(path.join(KOK, 'filmler', x, 'film.json')));
  const yaz = (p, v) => { if (fs.existsSync(p)) fs.copyFileSync(p, p + '.yedek'); fs.writeFileSync(p + '.yeni', JSON.stringify(v, null, 1)); fs.renameSync(p + '.yeni', p); };
  const api = (q, c) => {
    const u = new URL(q.url, 'http://x').pathname; if (!u.startsWith('/api/')) return false;
    const don = (k, v) => { if (c.writableEnded) return; c.writeHead(k, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); c.end(JSON.stringify(v)); };
    if (![`127.0.0.1:${gercekPort}`, `localhost:${gercekPort}`].includes(q.headers.host)) { don(403, { hata: 'Erişim yok' }); return true; }
    if (q.method === 'GET') { u === '/api/oturum' ? don(200, { anahtar, filmler: filmler() }) : u === '/api/is' ? don(200, is) : don(404, { hata: 'Yok' }); return true; }
    if (q.method !== 'POST' || q.headers['x-renk'] !== anahtar) { don(403, { hata: 'Yetkisiz istek' }); return true; }
    let b = [], n = 0; q.on('data', d => { n += d.length; if (n > 2e6) { don(413, { hata: 'Çok büyük' }); q.destroy(); } else b.push(d); });
    q.on('end', () => { try { const v = JSON.parse(Buffer.concat(b).toString('utf8'));
      if (u === '/api/kaydet' && v.tur === 'kadro') { const h = kadroGecerli(v.veri); if (h) return don(400, { hata: h }); yaz(path.join(KOK, 'kadro/kadro.json'), v.veri); return don(200, { tamam: true }); }
      if (u === '/api/kaydet' && v.tur === 'film') { const h = filmGecerli(v.ad, v.veri); if (h) return don(400, { hata: h }); if (!filmler().includes(v.ad)) return don(404, { hata: 'Film yok' }); yaz(path.join(KOK, 'filmler', v.ad, 'film.json'), v.veri); return don(200, { tamam: true }); }
      if (u === '/api/render') { if (is.durum === 'çalışıyor') return don(409, { hata: 'Bir video zaten hazırlanıyor' }); if (!filmler().includes(v.ad) || ![.25, .5, 1].includes(v.olcek)) return don(400, { hata: 'Geçersiz istek' });
        is = { durum: 'çalışıyor', satir: 'başlıyor' }; const ben = is, calis = (a, f) => { const p = spawn(process.execPath, [path.join(KOK, 'sistem.mjs'), ...a], { cwd: KOK }); p.stdout.on('data', d => { ben.satir = d.toString().trim().split(/[\r\n]+/).pop() || ben.satir; }); p.stderr.on('data', d => { ben.satir = d.toString().trim(); }); p.on('error', e => { ben.durum = 'hata'; ben.satir = e.message; }); p.on('close', k => f(k)); };
        calis(['ses', v.ad], k => k ? ben.durum = 'hata' : calis(['render', v.ad, '--olcek=' + v.olcek], k2 => { ben.durum = k2 ? 'hata' : 'bitti'; })); return don(202, { tamam: true }); }
      don(404, { hata: 'Yok' }); } catch (e) { don(400, { hata: e.message }); } });
    return true;
  };
  const r = await sunucu(port, api); gercekPort = r.port; return { ...r, anahtar };
}
