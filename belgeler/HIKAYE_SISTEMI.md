# Tek anlatıcılı hikâye sistemi

**Filmin saati anlatıcıdır.** Olay, plan, efekt ve altyazı kelimeye bağlanır: `"C09.4"` = 9. cümlenin 4. kelimesi, `"C09.son"`, `"C09.4+0.3"`. Ses değişince (`hikaye ses`) bütün film yeniden zamanlanır.

## Yedi adım
kanca (5–14 kelime, neden saklı) → kurulum (bir sayı) → alay (alıntı) → sakin → tirmanis (≥2) → sir (≥2, gündelik benzetme) → final (sürpriz en sonda)

## Olaylar
`{"an","kim","eyle",…}`. Eylemler: `gir, gec, cik, yuru, kos, kac, poz, ifade, bak, al, ver, koy, at, irkil`.

Denetim şunları **hata** sayar: sahneye girmeden iş yapmak, yürürken mekân değiştirmek, kesme olmadan ışınlanmak, uzanamayacağı eşyayı almak, elinde olmayanı vermek, uzaktakine vermek, dolu elle almak, ekranda görünmeyen eylem, olaysız cümle.

## Planlar
`{"an","mekan","kam":{"tur","hedef","uzak","yuk","aci","fov","genis"}}`. Türler: itme, cekme, yorunge, kayma, yuksel, inis, takip, sabit. Birden çok hedef kareye kendiliğinden sığdırılır. Altyazı yüze binerse plana `yaziY` ver.

## Mekân
`parcalar` ile kurulur (`motor3/dekor.js` → `PARCA`): zemin, duvar, sutun, kemer, kubbe, iskele, ev, agac, tezgah, taht, kup, fener … `isik`, `lambalar`, `kalabalik` (arka plan kişileri), `kesitler` (sırrı gösteren canlı şema).

## Doğruluk
`dogruluk`: belgeli, rivayet ya da kurgu. Rivayet ve kurgu metinde söylenmek zorunda. En az iki kaynak bağlantısı gerekir; kaynaklar çelişiyorsa sayı verme.

## Komutlar
`node sistem.mjs hikaye yeni|denetle|kareler|kare|karsilastir|ses|render|izle <ad>`
