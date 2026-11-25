# 5 adımda video

Hiç kod bilmen gerekmez. Her tema kendi karakterleri, hayvanları, canavarı, mekânları, müziği ve sesleriyle hazır gelir.

## 1. Filmi kur

```bash
node sistem.mjs basla
```

Dört soru sorar: tema, fikir, nasıl başlasın, filmin adı. Sahneler ve kadro kendiliğinden dizilir.

## 2. Metni yaz

`hikayeler/filmim/hikaye.json` dosyasını aç, `DOLDUR` yazan yerleri doldur. Ya da Claude'a söyle: "filmim hikâyesinin metnini yaz".

## 3. Bak

```bash
node sistem.mjs hikaye denetle filmim
node sistem.mjs hikaye izle filmim
```

## 4. Sesi ekle

```bash
node sistem.mjs hikaye metin filmim
```

`metin/tam.txt` içeriğini ElevenLabs'e yapıştır, çıkan sesi `hikayeler/filmim/ses/tam.mp3` olarak koy. Sonra:

```bash
node sistem.mjs hikaye ses filmim
```

Müzik, ortam sesi, adımlar ve efektler kendiliğinden eklenir.

## 5. Videoyu al

```bash
node sistem.mjs hikaye render filmim --olcek=0.5
```

Beğenirsen `--olcek=1` ile son hâlini al. Video: `hikayeler/filmim/cikti/filmim.mp4`

---

## Değiştirmek istersen

| İstediğin | Nereye yaz |
|---|---|
| Gece olsun, yağmur yağsın, renkler değişsin | `"ayar"`: [ayarlar](AYARLAR.md) |
| Karakterin rengi, boyu, şapkası | `"degistir"`: [ayarlar](AYARLAR.md#karakteri-değiştir) |
| Başka sahne | `"sahne"`: [42 hazır sahne](SAHNELER.md) |
| Başka hayvan ya da canavar | `"ayar": { "hayvan": "tilki", "canavar": "yeti" }` |
| Kendi ses efektin | `sesler/` klasörü: [sesler](SES_HAYVAN_KALABALIK.md) |
| Başka başlangıç | `"kanca"`: [kanca türleri](KANCALAR.md) |
| Yeni tema, yeni karakter | [tema ekleme](TEMALAR.md) |

Bir temada neler var: `node sistem.mjs hikaye paket korsan`
