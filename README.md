# Renk Dalgası

**Temanı seç, ilham al, sahneleri diz, videonu üret.** Türkçe, tek anlatıcılı, hareketli hikâye videoları için hazır kit. Claude Code ile konuşarak kullanılır; her şey koddan çizilir.

![Her temanın baş kahramanı](galeri/ana-kadro.jpg)

▶ **[42 hazır sahne, tek videoda](galeri/sahneler.mp4)**

| | |
|---|---|
| **12 tema** | Her biri ayrı bir çizgi dünyası |
| **120 tema karakteri** | 12 farklı biçim: damla, yumurta, duvar resmi, sırık, mürekkep, balon, hayvan, küp robot, dev kafa, nesne kafa, kukla, vazo |
| **42 hazır sahne** | Kovalamaca, düello, dev canavar, mahkeme, sel, küçülme, zaman donması, kılık değiştirme… |
| **6 kanca türü** | Son sahneden başla, geri sarma, donan kare, geri sayım, yanlış cevaplar, dev soru |
| **17 hayvan ve yaratık** | At, deve, ejderha, ahtapot, robot köpek… Her temanın bir yoldaşı ve bir canavarı var |
| **Seslendirme metni** | ElevenLabs'e hazır; sesi koyunca film ona göre zamanlanır |
| **Müzik ve dış sesler** | 40 efekt olaydan kendiliğinden çıkar; kendi seslerini koyabilirsin |
| **Sözle beliren nesneler** | Anlatıcı "soğan" deyince soğan ekranda |
| **96 video fikri** | Her temada 8; istersen yenisini üretir |
| **6 örnek hikâye** | Kopyala, değiştir |

## 1. Kur (bir kez)

Gerekenler: [Node 22+](https://nodejs.org), Google Chrome, [ffmpeg](https://ffmpeg.org). Kurulacak npm paketi yok.

```bash
git clone https://github.com/Salihefendihsa/renk-dalgasi
cd renk-dalgasi
node sistem.mjs hikaye temalar
```

## 2. En kolay yol: Claude'a söyle

Klasörü Claude Code'da aç ve yaz:

> Korsan temasıyla, soğan atan korsanlar hakkında bir video yap.

Claude `SKILL.md` dosyasını izler: fikri seçer, metni yazar, sahneleri dizer, kareleri gösterir, sen onaylayınca videoyu oluşturur. Codex gibi başka ajanlar `AGENTS.md` ile başlar. Her yerden çağırmak istersen klasörü `~/.claude/skills/renk-dalgasi/` altına kopyala.

## 3. Elle yapmak istersen

```bash
node sistem.mjs hikaye ilham korsan                          # fikir bul
node sistem.mjs hikaye yeni filmim --tema=korsan --ilham=2 --kanca=donuk   # sahneleriyle hazır gelir
#  → hikayeler/filmim/hikaye.json içindeki cümleleri doldur
node sistem.mjs hikaye denetle filmim                        # hata var mı?
node sistem.mjs hikaye kareler filmim                        # nasıl görünüyor?
node sistem.mjs hikaye metin filmim                          # seslendirme metni (ElevenLabs'e yapıştır)
#  → sesi hikayeler/filmim/ses/tam.mp3 olarak koy
node sistem.mjs hikaye ses filmim                            # ses + müzik + efektler
node sistem.mjs hikaye render filmim --olcek=0.5             # taslak; --olcek=1 final
```

## Temalar

| Tema | Karakterler | Hareketli örnek | Ne üretilir? |
|---|---|---|---|
| **[Korsan Denizi](belgeler/temalar/korsan.md)**<br>Damla | ![](galeri/karakter/korsan.jpg) | ![](galeri/ornek/korsan.webp) | [8 video fikri](belgeler/ilham/korsan.md) |
| **[Orta Çağ Kalesi](belgeler/temalar/ortacag.md)**<br>Yumurta kafa | ![](galeri/karakter/ortacag.jpg) | ![](galeri/ornek/ortacag.webp) | [8 video fikri](belgeler/ilham/ortacag.md) |
| **[Antik Mısır](belgeler/temalar/misir.md)**<br>Duvar resmi | ![](galeri/karakter/misir.jpg) | ![](galeri/ornek/misir.webp) | [8 video fikri](belgeler/ilham/misir.md) |
| **[Vahşi Batı](belgeler/temalar/bati.md)**<br>Sırık | ![](galeri/karakter/bati.jpg) | ![](galeri/ornek/bati.webp) | [8 video fikri](belgeler/ilham/bati.md) |
| **[Sakura Bahçesi](belgeler/temalar/japon.md)**<br>Mürekkep | ![](galeri/karakter/japon.jpg) | ![](galeri/ornek/japon.webp) | [8 video fikri](belgeler/ilham/japon.md) |
| **[Uzay Üssü](belgeler/temalar/uzay.md)**<br>Balon | ![](galeri/karakter/uzay.jpg) | ![](galeri/ornek/uzay.webp) | [8 video fikri](belgeler/ilham/uzay.md) |
| **[Kutup Seferi](belgeler/temalar/kutup.md)**<br>Hayvanlar | ![](galeri/karakter/kutup.jpg) | ![](galeri/ornek/kutup.webp) | [8 video fikri](belgeler/ilham/kutup.md) |
| **[Neon Şehir](belgeler/temalar/siber.md)**<br>Küp robot | ![](galeri/karakter/siber.jpg) | ![](galeri/ornek/siber.webp) | [8 video fikri](belgeler/ilham/siber.md) |
| **[Modern Şehir](belgeler/temalar/modern.md)**<br>Dev kafa | ![](galeri/karakter/modern.jpg) | ![](galeri/ornek/modern.webp) | [8 video fikri](belgeler/ilham/modern.md) |
| **[Çılgın Laboratuvar](belgeler/temalar/bilim.md)**<br>Nesne kafa | ![](galeri/karakter/bilim.jpg) | ![](galeri/ornek/bilim.webp) | [8 video fikri](belgeler/ilham/bilim.md) |
| **[Masal Ormanı](belgeler/temalar/masal.md)**<br>Keçe kukla | ![](galeri/karakter/masal.jpg) | ![](galeri/ornek/masal.webp) | [8 video fikri](belgeler/ilham/masal.md) |
| **[Antik Ege](belgeler/temalar/antik.md)**<br>Vazo figürü | ![](galeri/karakter/antik.jpg) | ![](galeri/ornek/antik.webp) | [8 video fikri](belgeler/ilham/antik.md) |

Temalar karıştırılabilir: robot, orta çağ kalesine girebilir.

## Hazır sahneler

Her sahne her temada ve her karakterle çalışır. Hareket, kamera, eşya, efekt ve sarsıntı içindedir. [Hepsi görselli](belgeler/SAHNELER.md)

| | |
|---|---|
| ![](galeri/sahne/kovalamaca.jpg) | ![](galeri/sahne/patlama.jpg) |
| ![](galeri/sahne/tuzak.jpg) | ![](galeri/sahne/duello.jpg) |
| ![](galeri/sahne/ucan.jpg) | ![](galeri/sahne/kesif.jpg) |
| ![](galeri/sahne/canavar.jpg) | ![](galeri/sahne/panik.jpg) |
| ![](galeri/sahne/mahkeme.jpg) | ![](galeri/sahne/kilik.jpg) |
| ![](galeri/sahne/ordu.jpg) | ![](galeri/sahne/alkisseli.jpg) |

## Kanca türleri

İlk saniyede izleyiciyi tutan kalıplar. [Nasıl kullanılır?](belgeler/KANCALAR.md)

![Kancalar](galeri/kancalar.jpg)

## Hayvanlar ve yaratıklar

![Hayvanlar](galeri/hayvanlar.jpg)

## Belgeler

- **[Kim kimdir, nerede kullanılır?](belgeler/KARAKTER_REHBERI.md)** 124 karakterin görevi
- **[Ne üretebilirim?](belgeler/ILHAM.md)** 96 fikir
- **[Hazır sahneler](belgeler/SAHNELER.md)**
- **[Kanca türleri](belgeler/KANCALAR.md)**
- **[Ses, hayvanlar, kalabalık, sözle beliren nesneler](belgeler/SES_HAYVAN_KALABALIK.md)**
- [Hikâye sistemi](belgeler/HIKAYE_SISTEMI.md) · [Tema ekleme](belgeler/TEMALAR.md) · [Rakip analizi](belgeler/RAKIP_ANALIZI.md)

## Kurallar

- **Tek anlatıcı konuşur**, karakterler oynar.
- Gerçek konu anlatıyorsan en az iki kaynak gerekir; kurguysa videoda söylenir. Denetim bunu zorunlu tutar.
- Başka bir kanalın karakterini, metnini ya da hikâyesini kopyalama.

## Bilinen sınırlar

- Anlatıcı sesi depoda yok; metin hazır gelir, sesi sen eklersin.
- 1080p final yavaştır; önce `--olcek=0.5` ile dene.
- Karakterler 3/4 ya da yandan çizilir, arkadan görünüş yok.
- Yazı tipi Segoe UI; başka sistemde yedeğe düşer.

MIT lisanslıdır. three.js 0.170.0 (MIT) `dis/` klasöründedir.
