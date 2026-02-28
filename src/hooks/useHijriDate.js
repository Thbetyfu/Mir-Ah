'use client';

import dayjs from 'dayjs';

/**
 * useHijriDate — menghitung tanggal Hijriah berdasarkan kalender Islam Umal Qura.
 * Menggunakan offset -1 hari (kemarin) sesuai logika aplikasi.
 *
 * @returns {{ hijriDate: string, hijriDay: number }}
 */
const useHijriDate = () => {
  const hijriMonths = [
    'Muharram',
    'Safar',
    "Rabi'ul Awwal",
    "Rabi'ul Akhir",
    'Jumadil Awwal',
    'Jumadil Akhir',
    'Rajab',
    "Sya'ban",
    'Ramadhan',
    'Syawwal',
    "Dzulqa'dah",
    'Dzulhijjah',
  ];

  const getHijriDate = () => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      // Gunakan formatter untuk mendapatkan angka hari, bulan, dan tahun Hijriah
      const formatter = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric', // Kita ambil angka bulan untuk dipetakan manual
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
      });

      const parts = formatter.formatToParts(yesterday);
      const day = parts.find((p) => p.type === 'day')?.value || '';
      const monthNum = parts.find((p) => p.type === 'month')?.value || '';
      const year = parts.find((p) => p.type === 'year')?.value || '';

      // Map angka bulan ke nama bulan Hijriah yang konsisten
      const monthIndex = parseInt(monthNum, 10) - 1;
      const monthName =
        monthIndex >= 0 && monthIndex < 12
          ? hijriMonths[monthIndex]
          : 'Ramadhan';

      return `${day} ${monthName} ${year}`;
    } catch (error) {
      console.error('Gagal memformat tanggal Hijriah:', error);
      return '10 Ramadhan 1447';
    }
  };

  const hijriDateRaw = getHijriDate();
  const hijriDate = `${hijriDateRaw} H`;
  const hijriDay = parseInt(hijriDateRaw.split(' ')[0], 10) || 10;

  return { hijriDate, hijriDay };
};

export default useHijriDate;
