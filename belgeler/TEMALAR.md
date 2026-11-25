# Temalar

```bash
node sistem.mjs hikaye temalar                    # tema, mekân ve karakter kodları
node sistem.mjs hikaye temakart [tema]            # görselleri yeniden üret
node sistem.mjs hikaye yeni filmim --tema=korsan  # temayla yeni hikâye iskeleti
```

Hikâyede tema mekânı: `"mekanlar": { "gemi": { "tema": "korsan", "mekan": "guverte", "parcalar": [ek dekor] } }`
Tema karakteri: `"oyuncular": { "kahraman": { "kim": "korsan-kaptan" } }`
Bir hikâyede birden çok tema karıştırılabilir: her mekân ayrı bir temadan gelebilir.

## Yeni tema eklemek
1. `motor3/temalar.js` içine tema: ışık, en az iki mekân, dört karakter. 2. `motor3/tema-kadro.js` içine altı karakter. 3. Eksik dekoru `motor3/tema-parca.js`, kıyafeti `motor/gardirop.js` içine ekle. 4. `temakart` ile bak, `test` çalıştır: aynı temadaki karakterler en az üç özellikte ayrılmalı.

## korsan
![](../galeri/kadro-korsan.jpg)
![](../galeri/tema-korsan.jpg)

## ortacag
![](../galeri/kadro-ortacag.jpg)
![](../galeri/tema-ortacag.jpg)

## misir
![](../galeri/kadro-misir.jpg)
![](../galeri/tema-misir.jpg)

## bati
![](../galeri/kadro-bati.jpg)
![](../galeri/tema-bati.jpg)

## japon
![](../galeri/kadro-japon.jpg)
![](../galeri/tema-japon.jpg)

## uzay
![](../galeri/kadro-uzay.jpg)
![](../galeri/tema-uzay.jpg)

## kutup
![](../galeri/kadro-kutup.jpg)
![](../galeri/tema-kutup.jpg)

## siber
![](../galeri/kadro-siber.jpg)
![](../galeri/tema-siber.jpg)

## modern
![](../galeri/kadro-modern.jpg)
![](../galeri/tema-modern.jpg)

## bilim
![](../galeri/kadro-bilim.jpg)
![](../galeri/tema-bilim.jpg)

## masal
![](../galeri/kadro-masal.jpg)
![](../galeri/tema-masal.jpg)

## antik
![](../galeri/kadro-antik.jpg)
![](../galeri/tema-antik.jpg)
