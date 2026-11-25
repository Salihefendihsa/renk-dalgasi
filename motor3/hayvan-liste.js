// hayvan-liste.js: hayvanlarin adi, sesi ve hangi temada hazir geldigi (tarayicisiz da okunur)
export const HAYVAN = {
  at: { ad: 'At', ses: 'kisne', ayak: 1 }, deve: { ad: 'Deve', ses: 'bogur', ayak: 1 }, kopek: { ad: 'Köpek', ses: 'havla', ayak: 1 }, kurt: { ad: 'Kurt', ses: 'uluma', ayak: 1 }, kedi: { ad: 'Kedi', ses: 'miyav' }, koyun: { ad: 'Koyun', ses: 'mele', ayak: 1 },
  robokopek: { ad: 'Robot köpek', ses: 'bip', ayak: 1 }, papagan: { ad: 'Papağan', ses: 'cik' }, tavuk: { ad: 'Tavuk', ses: 'gidak' }, penguen: { ad: 'Penguen', ses: 'cik' }, yarasa: { ad: 'Yarasa', ses: 'cik' }, kaplumbaga: { ad: 'Kaplumbağa', ses: 'tikirti' },
  yilan: { ad: 'Yılan', ses: 'tisla' }, ahtapot: { ad: 'Ahtapot', ses: 'kabarcik' }, kopekbaligi: { ad: 'Köpek balığı', ses: 'kukreme' }, ejder: { ad: 'Ejderha', ses: 'kukreme' }, uzayli: { ad: 'Uzaylı yaratık', ses: 'bip' },
};
// tema: [yoldas hayvan, dev canavar]
export const TEMA_HAYVAN = { korsan: ['papagan', 'ahtapot'], ortacag: ['at', 'ejder'], misir: ['deve', 'yilan'], bati: ['at', 'kurt'], japon: ['kedi', 'ejder'], uzay: ['uzayli', 'ahtapot'], kutup: ['penguen', 'kopekbaligi'], siber: ['robokopek', 'robokopek'], modern: ['kopek', 'tavuk'], bilim: ['tavuk', 'uzayli'], masal: ['koyun', 'ejder'], antik: ['kaplumbaga', 'yilan'] };
