---
name: renk-dalgasi
description: Koddan çizilen, sinematik Türkçe "Ya … olsaydı?" filmi yapar. Kullanıcı renk dalgası filmi, yeni karakter, yeni mekân ya da bu motorla hikâye isterse kullan.
---
# Renk Dalgası
1. `belgeler/HIKAYE.md` ve `belgeler/KONULAR.md` oku. Konuyu YouTube'da ara, çok yapılmışsa değiştir. Var olan bir kanalın karakterini, başlığını ya da görünümünü kopyalama.
2. Kullanıcıyla kural, bedel, dönüş ve fiziksel şakayı netleştir.
3. `node sistem.mjs yeni <ad>`; `belgeler/FILM_SEMASI.md` ile doldur.
4. `denetle` 0 hata verene kadar düzelt.
5. `kareler` üret ve **her kareye bak**: yüz kapanıyor mu, eşya elde mi, yazı yüze biniyor mu, siluet okunuyor mu? Şaka yalnızca metinde mi, sahnede mi?
6. `olc` uyarılarını değerlendir. Ölçüm temizse bile göz kontrolü yap.
7. `ses`, sonra `render --olcek=0.5`. Final ancak kullanıcı kareleri onaylayınca.
8. Motoru değiştirdiysen `test` çalıştır. Kod yalnızca `t`ye bağlı olmalı: `Math.random`, `Date` ve kareler arası durum yok.

Tuzaklar: ağır gölge kenar ışığını öldürür; eşya karakterin maskesine çizilirse halesi siluet sanılır; tuval ayarları kareden kareye sızarsa görüntü değişir (`reset`).
