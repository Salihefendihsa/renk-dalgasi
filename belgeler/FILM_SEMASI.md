# film.json

- `sure`, `fps`, `kahraman`, `vurgu`, `golge`, `isik`, `kural`, `bedel`, `donus`, `fizikselSaka`
- `planlar[]`: `id`, `t0`, `t1`, `adim`, `dunya` (yokus, iskele, carsi, mutfak), `kamera {x, y, z, odak}` (`[baş, son]` olabilir)
  - `oyuncular[]`: `kim`, `x`, `yon`, `s`, `poz`, `ifade`, `bak`, `rozet {n, art}`, `esya {tur: kavanoz|telefon|cay}`, `oturak`, `cikar`
    - `poz: "dur"` ya da `["dur", "sasir", 1.2]` (1,2. saniyede geçer); `ifade` aynı biçimde
    - `x: [430, 820]` yürütür; `hiz: [baş, son]` saniyeleri
  - `nesneler[]`: `tur` (simit, kavanoz, marti), `yol: [[sn, x, y, açı], …]`, `yay`, `bitis`
  - `guc: [başla, bitir]` renk dalgası, plan içi saniye; `-1` baştan açık
  - `yazi[]`: `baslik`, `sayi`, `etiket`
- `replikler[]`: `id`, `kim` (`anlatici` ya da karakter), `t`, `sure`, `metin`
- `muzik`: `[sn, merak|oyun|gerilim|acilis|huzun|sicak]` · `efekt`: `[sn, dalga|tik|carp|vurus]`
