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
![](../galeri/karakter/korsan.jpg)
![](../galeri/mekan/korsan.jpg)

## ortacag
![](../galeri/karakter/ortacag.jpg)
![](../galeri/mekan/ortacag.jpg)

## misir
![](../galeri/karakter/misir.jpg)
![](../galeri/mekan/misir.jpg)

## bati
![](../galeri/karakter/bati.jpg)
![](../galeri/mekan/bati.jpg)

## japon
![](../galeri/karakter/japon.jpg)
![](../galeri/mekan/japon.jpg)

## uzay
![](../galeri/karakter/uzay.jpg)
![](../galeri/mekan/uzay.jpg)

## kutup
![](../galeri/karakter/kutup.jpg)
![](../galeri/mekan/kutup.jpg)

## siber
![](../galeri/karakter/siber.jpg)
![](../galeri/mekan/siber.jpg)

## modern
![](../galeri/karakter/modern.jpg)
![](../galeri/mekan/modern.jpg)

## bilim
![](../galeri/karakter/bilim.jpg)
![](../galeri/mekan/bilim.jpg)

## masal
![](../galeri/karakter/masal.jpg)
![](../galeri/mekan/masal.jpg)

## antik
![](../galeri/karakter/antik.jpg)
![](../galeri/mekan/antik.jpg)
