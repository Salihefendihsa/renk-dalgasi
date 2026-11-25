# Renk Dalgası ile başla

Bu dosyayı depoyu okuyabilen bir yapay zekâya ver. Aşağıdaki isteği olduğu gibi kullanabilir veya son cümlesini değiştirebilirsin.

> Renk Dalgası rehberini kullan. Bana farklı temalardan üç kurgu fikri öner. Her birinde açılış cümlesini, karakterin yaptığı işi ve sahnede duyulan bir sesi yaz. Şimdilik seçenekleri görmek istiyorum.

## Ne yapmak istiyorsun?

| İstek | İlk bakılacak yer | Çıktı |
|---|---|---|
| “Neler var?” | Aşağıdaki tema tablosu ve [ilham listesi](belgeler/ILHAM.md) | Birbirinden farklı üç seçenek ve her birinin hangi isteğe uyduğu |
| “Şu fikri sahnelere böl” | [Hazır sahneler](belgeler/SAHNELER.md), [oyunculuk](belgeler/OYUNCULUK.md) | Her satırda cümle, mekân, karakter, eylem ve ses |
| “Bunu kendi tarzıma uyarla” | [Ayarlar](belgeler/AYARLAR.md), [karakter rehberi](belgeler/KARAKTER_REHBERI.md) | İstenen alanları içeren küçük bir `ayar` veya `degistir` örneği |
| “Anlatıcıyı ben ekleyeceğim” | [Ses ve efektler](belgeler/SES_HAYVAN_KALABALIK.md), [üretim adımları](SKILL.md) | Kopyalanabilir anlatıcı metni, ayrı bir listede efekt ve zamanlama notu |
| “Bir video üret” | [Üretim adımları](SKILL.md), [kurulum ve ilk deneme](belgeler/BASLA.md) | Yerel komut çalıştırabilen bir ortamda denetlenmiş taslak |
| “Repoyu değerlendir” | [Komutlar](sistem.mjs), [testler](araclar/test.mjs) ve ilgili motor dosyaları | Somut örneklerle mevcut özellikler, eksikler ve doğrulama durumu |

## Her tema için yeni bir kurgu

Tema adına tıklayınca mevcut kadroya ve tema rehberine ulaşırsın. Aşağıdaki 12 fikir **kurgu**. Her birinin açılışı, olay akışı, önerilen sahnesi ve kullanılabilir ayarları [kurgu dosyasında](bilgi/kurgu.json) bulunur.

| Tema | Yeni fikir | İlk cümle |
|---|---|---|
| [korsan](belgeler/temalar/korsan.md) | Sessiz Çan | Liman çanı çaldığında güvertede kimse sesi duymadı. |
| [ortacag](belgeler/temalar/ortacag.md) | Krala Dar Gelen Kapı | Sabah kapıdan geçen kral akşam içeri sığmadı. |
| [misir](belgeler/temalar/misir.md) | Kumda Geri Giden İzler | Devenin ayak izleri suya doğru değil, geriye gidiyordu. |
| [bati](belgeler/temalar/bati.md) | İstasyondaki Son Gölge | Güneş batarken kasabadaki tek gölge uzamayı bıraktı. |
| [japon](belgeler/temalar/japon.md) | Geç Kalan Yankı | Çay ustası alkışladı, bambular cevabı epey sonra verdi. |
| [uzay](belgeler/temalar/uzay.md) | Son Koltuk | Kapsül boştu ama son koltuğun kemeri bir türlü kapanmıyordu. |
| [kutup](belgeler/temalar/kutup.md) | Yer Değiştiren Bayrak | Kamp bayrağı sabaha kadar çadırdan uzaklaşmıştı. |
| [siber](belgeler/temalar/siber.md) | Bir Dakika Erken | Gece pazarında yalnız bir tabela dükkân kapanmadan teşekkür etti. |
| [modern](belgeler/temalar/modern.md) | Tersine Alkış | Okulda herkes gösteriden önce alkışlamaya başladı. |
| [bilim](belgeler/temalar/bilim.md) | Kaçak Gölge | Seradaki filiz kıpırdamadı ama gölgesi duvara tırmandı. |
| [masal](belgeler/temalar/masal.md) | Göğü Diken Terzi | Terzi iğnesini her kaldırdığında gökte bir yıldız belirdi. |
| [antik](belgeler/temalar/antik.md) | Boş Sıranın Şampiyonu | Arenada en büyük alkışı boş bir sıra aldı. |

**Bir tarifi kullanırken:** `kanca` anlatıcının ilk cümlesi, `acilis` ise görüntünün nasıl açılacağını belirleyen motor kodudur. Bir hikâyeye aktarırken `acilis` değerini `kanca.tur` alanına, `ayar` nesnesini hikâyenin `ayar` alanına koy. `sahne` önerilen hazır sahnedir. Olay akışındaki diğer çekimleri karakterlerin yapacağı işe göre seç. Bu 12 tarif katalogda `tarif` olarak bulunur. Mevcut numaralı fikirler `fikir` türündedir ve kendi başlangıç komutlarını içerir.

## Komutsuz kullanım

Yalnızca GitHub sayfalarını okuyabilen bir asistan tema bağlantısından kadroyu, [sahne listesinden](belgeler/SAHNELER.md) hareketi ve [ses rehberinden](belgeler/SES_HAYVAN_KALABALIK.md) ortamı seçebilir. Önerdiği öğenin görünen adını ve motor kodunu birlikte versin. Çalıştırma isteyen bir adımda gereken komutu ve beklenen çıktıyı yazsın. Testin geçtiğini veya bir dosyanın üretildiğini ancak sonucu gördüğünde söylesin.

## Yerel katalog

Depo klasöründe Node 22+ ile çalışır. Katalog motorun tema, karakter, mekân, hayvan, fikir, sahne, kanca ve ayar tanımlarını okur. Ek paket veya hesap gerektirmez.

```bash
node bilgi/katalog.mjs
node bilgi/katalog.mjs --tema=kutup --tur=tarif
node bilgi/katalog.mjs --tema=korsan --tur=mekan
node bilgi/katalog.mjs --tur=sahne tirman
node bilgi/katalog.mjs --tema=misir --tur=fikir --json
```

`--tema` temaya ait kayıtları getirir. Ortak sahne, kanca ve ayarlarda yalnız `--tur` kullan. Arama Türkçe harfleri sadeleştirir; “tırman” ve “tirman” aynı sonuçları getirir. Birden fazla arama sözcüğü verirsen hepsini içeren kayıtlar döner. `--json` ile filtrelenmiş listeyi başka bir uygulamada okuyabilirsin. Komutu yalnız `--json` ile çalıştırmak tüm kataloğu verir.

## Öneriyi sahneye bağlama

“**Kutupta gerilimli ama sakin başlayan bir fikir ver**” isteğinde *Yer Değiştiren Bayrak* tarifini seç. İlk planda çadır ve uzaktaki bayrağı birlikte göster. İzleri fark eden karakteri takip planına al. Pengueni finalden önce yakın planda göstermek sürprizi erkenden açıklar. Bu nedenle son çekimi, çantaya takılan bayrağın görüleceği ana ayır. Hangi planların özel düzenleme gerektirdiğini belirt.

“**Aşçı elmayı kaptana veriyor**” isteğinde önce veren ve alan karakteri belirle. Aynı mekânda birbirlerine erişebildiklerini kontrol et. Ardından elmanın kimde başladığını ve kimde bittiğini yaz. [Olay rehberindeki](belgeler/HIKAYE_SISTEMI.md) `al` ve `ver` hareketlerini bu sıraya göre planla. Tek başına sözlükte “elma” bulunması, bu iki hareketin gerçekleştirildiğini göstermez.
