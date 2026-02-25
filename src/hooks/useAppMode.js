'use client';

import { useState, useEffect } from 'react';

export default function useAppMode() {
  const [isPWA, setIsPWA] = useState(false);
  const [isItikafMode, setIsItikafMode] = useState(false);

  useEffect(() => {
    // Fungsi untuk mengecek apakah aplikasi berjalan sebagai PWA (Standalone)
    const checkMode = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone ||
        document.referrer.includes('android-app://');

      setIsPWA(isStandalone);
    };

    checkMode();

    // Dengarkan perubahan jika sewaktu-waktu user menginstal aplikasi saat web sedang terbuka
    window
      .matchMedia('(display-mode: standalone)')
      .addEventListener('change', checkMode);

    // Load Itikaf mode dari local storage
    const savedItikaf = localStorage.getItem('itikafMode') === 'true';
    if (savedItikaf) {
      setIsItikafMode(true);
    }

    return () => {
      window
        .matchMedia('(display-mode: standalone)')
        .removeEventListener('change', checkMode);
    };
  }, []);

  const toggleItikafMode = () => {
    setIsItikafMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('itikafMode', newValue.toString());
      return newValue;
    });
  };

  return { isPWA, isItikafMode, toggleItikafMode };
}
