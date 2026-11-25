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
   Tema paketine bak (`hikaye paket <tema>`): hayvan, canavar, ortam sesi hazırdır. Kullanıcı görünüm isterse `"ayar"` ve `"degistir"` ile yap (`belgeler/AYARLAR.md`), motora dokunma.
   Kanca türü seç (`hikaye kancalar`, `belgeler/KANCALAR.md`); her filmde aynısını kullanma.
5. **Sahne:** cümlede olanla sahne uyuşmuyorsa sahneyi değiştir (`hikaye sahneler`, `belgeler/SAHNELER.md`). Hayvan, kalabalık, ses ve sözle beliren nesneler: `belgeler/SES_HAYVAN_KALABALIK.md`. `denetle` hangi sözün hangi nesneyi çıkardığını yazar; yanlışsa cümleye `"goster"` koy. Özel an için `planlar`, `olaylar`, `nesneler` ekle (`belgeler/HIKAYE_SISTEMI.md`).
6. `hikaye denetle` → 0 hata. `hikaye kareler` → **her kareye bak**: cümle ile görüntü aynı şeyi mi anlatıyor, yüz karede mi, altyazı yüze biniyor mu?
7. `hikaye karsilastir`. Sonra `hikaye metin` (tam.txt ve yönergeyi kullanıcıya ver; sesi ElevenLabs'ten kendisi ekler, sen üretme), ses gelince `hikaye ses`, `hikaye render --olcek=0.5`. Final ancak kullanıcı onaylayınca.

Yeni karakter biçimi: `motor/bicim.js`. Yeni sahne: `motor3/sahneler.js`. Yeni fikir: `motor3/ilham.js`. Değiştirdikten sonra `hikaye rehber` ve `test`.

Yasak: bir kanalın ya da tanınmış bir eserin karakterini, metnini, hikâyesini kopyalamak; kaynaksız iddiayı gerçek diye anlatmak.

Büyük işte ajan ekibi (`.claude/agents/`): rakip-analisti, arastirmaci → senarist → olay-kurgucusu → karakter/sahne tasarımcısı → animator → ses-yonetmeni → kalite-denetcisi. Küçük işte ekip kurma.
