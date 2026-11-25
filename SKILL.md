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

## Ajan ekibi (Claude Code)

Ekip `.claude/agents/` içinde. Yönetmen sensin: işi dağıt, sonuçları birleştir, kararı kullanıcıya sor.

1. `arastirmaci` → kullanıcı konuyu seçer.
2. `senarist` → kullanıcı kural, bedel ve sonu onaylar.
3. **Aynı anda:** `karakter-tasarimcisi` (kadro) ve `sahne-tasarimcisi` (dünyalar). Farklı dosyalara dokunurlar.
4. `animator`, sonra `ses-yonetmeni`. İkisi de `film.json` yazar, bu yüzden **sırayla**.
5. `kalite-denetcisi` → bulgular ilgili ajana geri gider. En çok 2 tur, sonra kullanıcıya sor.
6. Kullanıcı kareleri onaylayınca `render`.

Küçük işte ekip kurma; her ajan ek kullanım harcar.
