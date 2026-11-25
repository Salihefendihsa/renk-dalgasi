// bicim-hareket.js: her bicim kendi gibi kimildar. o: { t, yol (yurunen yol), gidiyor, z } -> z, zip, basik, donus ekleri
const sn = Math.sin, ab = Math.abs;
export const BICIM_HAREKET = {
  topak: o => ({ zip: o.gidiyor ? ab(sn(o.yol * 3.4)) * .16 : 0, basik: o.gidiyor ? 1 + sn(o.yol * 6.8 + 1.2) * .12 : 1 + sn(o.t * 3) * .018 }),
  balon: o => ({ zip: o.gidiyor ? ab(sn(o.yol * 2)) * .3 : .02 + sn(o.t * 1.4) * .02, basik: 1 + sn(o.t * 1.4 + 1) * .015 }),
  kukla: o => ({ donus: o.gidiyor ? sn(o.yol * 5) * .12 : sn(o.t * 1.3) * .02, zip: o.gidiyor ? ab(sn(o.yol * 5)) * .07 : 0 }),
  sirik: o => ({ z: { ...o.z, e: o.z.e + sn(o.t * 2.1) * 2.5 + (o.gidiyor ? sn(o.yol * 5) * 6 : 0), b: o.z.b - sn(o.t * 2.1) * 3 - (o.gidiyor ? sn(o.yol * 5) * 8 : 0) } }),
  yumurta: o => ({ z: { ...o.z, b: o.z.b + (o.gidiyor ? sn(o.yol * 6) * 9 : sn(o.t * 1.7) * 1.6) } }),
  irikafa: o => ({ z: { ...o.z, b: o.z.b + (o.gidiyor ? sn(o.yol * 5.2) * 12 : sn(o.t * 1.1) * 2) }, basik: o.gidiyor ? 1 + sn(o.yol * 10.4) * .03 : 1 }),
  hayvan: o => ({ donus: o.gidiyor ? sn(o.yol * 4.6) * .1 : 0, basik: 1 + sn(o.t * 2) * .012 }),
  nesne: o => ({ zip: o.gidiyor ? ab(sn(o.yol * 5.4)) * .09 : 0, z: { ...o.z, b: o.z.b + sn(o.t * 2.6) * 1.5 } }),
  firca: o => ({ basik: o.gidiyor ? .95 : 1, z: { ...o.z, e: o.z.e + (o.gidiyor ? 8 : 0) } }),
};
// kesik hareket: kup robot ve duvar resmi ara kare gostermez
export const ADIM_SAAT = { kutu: 9, profil: 8, vazo: 8 };
export const saatAl = (bicim, t) => ADIM_SAAT[bicim] ? Math.floor(t * ADIM_SAAT[bicim]) / ADIM_SAAT[bicim] : t;
// govde yatirma (radyan): bakis yonune gore uygulanir
export const GOVDE = { yuz: -1.25, uc: -1.05, uyu: 1.45 };
// kalca yuksekligi (cizim birimi): hayvana binince otururken
export const KALCA = { yumurta: 235, topak: 110, balon: 200, kutu: 290, kukla: 150, firca: 330, profil: 370, sirik: 500, hayvan: 180, irikafa: 190, nesne: 320, vazo: 390 };
