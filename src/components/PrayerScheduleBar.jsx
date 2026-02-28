import React from 'react';
import useAppMode from '@/hooks/useAppMode';
import usePrayerTimes from '@/hooks/usePrayerTimes';

const PRAYER_NAMES = [
  { key: 'imsak', label: 'Imsak' },
  { key: 'subuh', label: 'Subuh' },
  { key: 'dzuhur', label: 'Dzuhur' },
  { key: 'ashar', label: 'Ashar' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isya', label: 'Isya' },
];

export default function PrayerScheduleBar({ onPrayerClick }) {
  const { isItikafMode } = useAppMode();
  const { prayerTimes, nextPrayer } = usePrayerTimes();

  return (
    <div className={`flex justify-between items-center rounded-xl px-4 py-3 shadow ${isItikafMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-900'} transition-all`}>
      {PRAYER_NAMES.map(({ key, label }) => {
        const isActive = nextPrayer === key;
        return (
          <button
            key={key}
            className={`flex flex-col items-center mx-2 px-2 py-1 rounded-lg transition-all
              ${isActive ? 'border-2 border-blue-400 bg-blue-100 text-blue-700 shadow-lg' : ''}
              ${isItikafMode ? 'bg-transparent text-slate-300 border-slate-500' : 'hover:bg-blue-50'}
            `}
            onClick={() => onPrayerClick(key)}
            type="button"
          >
            <span className="text-xs font-semibold">{label}</span>
            <span className="text-sm font-mono">{prayerTimes?.[key] || '--:--'}</span>
          </button>
        );
      })}
    </div>
  );
}
