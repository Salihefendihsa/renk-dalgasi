#!/usr/bin/env node
// sistem.mjs: tek komut kapisi.  node sistem.mjs yardim
import path from 'node:path'; import { execFileSync } from 'node:child_process'; import { KOK } from './motor/cdp.mjs'; import { ALT } from './araclar/hikaye.mjs';
const [komut = 'yardim', alt, ...geri] = process.argv.slice(2), S = Object.fromEntries(geri.filter(x => x.startsWith('--')).map(x => { const [k, v] = x.slice(2).split('='); return [k, v ?? '1']; }));
const YARDIM = `Renk Dalgası
  basla                                   soru sorarak yeni film kurar
  hikaye paket [tema]                     temada hazır gelen her şey
  hikaye ayarlar [ad]                     değiştirilebilen ayarlar
  hikaye temalar                          temalar, mekânlar, karakterler
  hikaye ilham [tema] [--uret=7]          video fikirleri
  hikaye sahneler                         hazır sahneler
  hikaye kim <karakter>                   karakter kartı
  hikaye yeni <ad> --tema=korsan --ilham=2
  hikaye denetle | kareler | karsilastir | izle <ad>
  hikaye metin <ad>                       seslendirme metni ve dış ses listesi
  hikaye ses <ad>                         ses/ içindeki kayıt + müzik + efektler
  hikaye kancalar                         ilk saniye kalıpları (yeni … --kanca=geri)
  hikaye hayvanlar                        hayvanlar ve canavarlar
  hikaye render <ad> --olcek=0.5 [--bas=0 --son=10]
  hikaye temakart | paketkart | ayarkart | hayvankart | kancakart | ornek | sahnekart | vitrin | rehber   (geliştirici: görselleri ve rehberi yenile)
  test`;
try {
  if (komut === 'yardim') console.log(YARDIM);
  else if (komut === 'test') execFileSync(process.execPath, ['--test', path.join(KOK, 'araclar', 'test.mjs')], { stdio: 'inherit' });
  else if (komut === 'basla') { const { basla } = await import('./araclar/basla.mjs'); await basla(ALT); }
  else if (komut === 'hikaye') { if (!Object.hasOwn(ALT, alt || '')) throw new Error('Alt komut: ' + Object.keys(ALT).join(', ')); await ALT[alt](geri.find(x => !x.startsWith('--')), S); }
  else throw new Error('Bilinmeyen komut: ' + komut + ' (node sistem.mjs yardim)');
} catch (e) { console.error('Hata:', e.message); process.exitCode = 1; }
