# Kaynak analizi: ne öğrendik, neyi değiştirdik?

İncelenen: `kodlaciz/siluet-stili` deposu ve Kodla Çiz videosu (112 kare + metin), Kasım 2026. Kod ve görsel alınmadı.

| Kaynakta gördüğümüz | Buradaki çözüm |
|---|---|
| Müzik tek filmin saniyelerine sabit | Müzik `film.json` içindeki bölümlerden kurulur |
| 40 saniyelik hikâye yaklaşık 1.390 satır kod | Bir film tek JSON; motor ve mekânlar ortak |
| Film başlık sorusundan sonra bitiyor | Yedi adım zorunlu: güç, tanık, sayı, soru, **kural, bedel, dönüş** |
| Siyah silüet çöp adamlar | Yüzü, saçı, kıyafeti ve ifadesi olan 15 karakter |
| Sinema bandı ve soğuyan görüntü | Renk dalgası; bant yok |
| Mor gece paleti | Petrol yeşili, kayısı, zümrüt; mor oranı ölçülüp uyarılır |
| Ağız sabit hızla açılıp kapanıyor | Türkçe harflere göre dudak biçimi |
| Ölçüm betikleri yayımlanmamış | `olc` komutu depoda |
| npm uyarıları (9 yüksek) | Sıfır npm bağımlılığı |
| Kupa alna gidiyordu | Eller hedefe ters kinematikle uzanır |
| Otomatik test yok | 25 test; aynı anın aynı kareyi vermesi dahil |

## Verileri okurken

- Konu ve başlık sonuçları tek kanalın 24 videosundan geliyor; neden-sonuç göstermez.
- 139 yorum küçük bir örnek. Beğeniler birkaç yorumda toplanıyor.
- Bu yüzden başlıkta sayı **uyarı**, hikâye eksikleri ise **hata** sayılır.
- Bu sistemin filmleri yayımlanmadı; izlenme sonucu hakkında bir iddiası yoktur.
