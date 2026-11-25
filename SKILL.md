---
name: renk-dalgasi
description: Tema, konu ya da fikir verilince Türkçe, tek anlatıcılı, hareketli dikey hikâye videosu üretir. 12 tema, 12 karakter biçimi, hazır sahneler ve ilham listesi vardır. Korsan, uzay, orta çağ gibi bir temayla video, Shorts ya da hikâye istendiğinde kullan.
---
# Renk Dalgası: konudan videoya

Kullanıcı bir konu ya da yalnızca bir tema söyler. Sen videoyu çıkarırsın. Dikey 1080×1920, **tek anlatıcı**, karakterler konuşmadan oynar.

1. **Tema:** konunun yer ve dönemine göre seç (`hikaye temalar`). Konu yoksa `hikaye ilham <tema>` ile üç fikir öner, kullanıcı seçsin.
2. **İskelet:** `hikaye yeni <ad> --tema=<t> --ilham=<n>` (ya da `--uret=<sayı>`). Kadro ve sahneler hazır gelir.
3. **Doğruluk:** `araştır` fikri gerçek sayma. WebSearch ile en az iki kaynak bul; bulamazsan kurgu yap ya da konuyu değiştir. Kaynaklar çelişirse sayı verme.
4. **Metin:** cümleleri doldur. Kanca 5–14 kelime ve garip bir eylem; neden sır bölümünde. Cümle başına en çok 12 kelime. Sırda gündelik bir benzetme. Sürpriz en sonda. Metni kullanıcıya göster.
5. **Sahne:** cümlede olanla sahne uyuşmuyorsa sahneyi değiştir (`hikaye sahneler`, `belgeler/SAHNELER.md`). Özel an için `planlar`, `olaylar`, `nesneler` ekle (`belgeler/HIKAYE_SISTEMI.md`).
6. `hikaye denetle` → 0 hata. `hikaye kareler` → **her kareye bak**: cümle ile görüntü aynı şeyi mi anlatıyor, yüz karede mi, altyazı yüze biniyor mu?
7. `hikaye karsilastir`. Sonra `hikaye ses`, `hikaye render --olcek=0.5`. Final ancak kullanıcı onaylayınca.

Yeni karakter biçimi: `motor/bicim.js`. Yeni sahne: `motor3/sahneler.js`. Yeni fikir: `motor3/ilham.js`. Değiştirdikten sonra `hikaye rehber` ve `test`.

Yasak: bir kanalın ya da tanınmış bir eserin karakterini, metnini, hikâyesini kopyalamak; kaynaksız iddiayı gerçek diye anlatmak.

Büyük işte ajan ekibi (`.claude/agents/`): rakip-analisti, arastirmaci → senarist → olay-kurgucusu → karakter/sahne tasarımcısı → animator → ses-yonetmeni → kalite-denetcisi. Küçük işte ekip kurma.

---

# Eski yatay film akışı (yalnızca istenirse)
1. `belgeler/HIKAYE.md` ve `belgeler/KONULAR.md` oku. Konuyu YouTube'da ara, çok yapılmışsa değiştir. Var olan bir kanalın karakterini, başlığını ya da görünümünü kopyalama.
2. Kullanıcıyla kural, bedel, dönüş ve fiziksel şakayı netleştir.
3. `node sistem.mjs yeni <ad>`; `belgeler/FILM_SEMASI.md` ile doldur.
4. `denetle` 0 hata verene kadar düzelt.
5. `kareler` üret ve **her kareye bak**: yüz kapanıyor mu, eşya elde mi, yazı yüze biniyor mu, siluet okunuyor mu? Şaka yalnızca metinde mi, sahnede mi?
6. `olc` uyarılarını değerlendir. Ölçüm temizse bile göz kontrolü yap.
7. `ses`, sonra `render --olcek=0.5`. Final ancak kullanıcı kareleri onaylayınca.
8. Motoru değiştirdiysen `test` çalıştır. Kod yalnızca `t`ye bağlı olmalı: `Math.random`, `Date` ve kareler arası durum yok.

Tuzaklar: ağır gölge kenar ışığını öldürür; eşya karakterin maskesine çizilirse halesi siluet sanılır; tuval ayarları kareden kareye sızarsa görüntü değişir (`reset`).

