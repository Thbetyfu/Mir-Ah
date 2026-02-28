import React, { useEffect, useState } from 'react';
import { fetchWeather } from '@/lib/weatherApi';

export default function WeatherBar({ latitude = 52.52, longitude = 13.41, isItikafMode }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchWeather(latitude, longitude).then(data => {
      if (data.error) setError(data.error);
      else setWeather(data);
      setLoading(false);
    });
  }, [latitude, longitude]);

  if (loading) return <div className="mt-2 text-xs text-gray-400">Memuat cuaca...</div>;
  if (error) return <div className="mt-2 text-xs text-red-400">Gagal memuat cuaca: {error}</div>;
  if (!weather || !weather.current) return null;

  return (
    <div className={`flex justify-between items-center rounded-xl px-4 py-3 mt-2 shadow ${isItikafMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-900'} transition-all`}>
      <div className="flex flex-col items-center mx-2">
        <span className="text-xs font-semibold">Cuaca Saat Ini</span>
        <span className="text-sm font-mono">{weather.current.time}</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="text-xs font-semibold">Suhu</span>
        <span className="text-sm font-mono">{weather.current.temperature_2m}°C</span>
      </div>
      <div className="flex flex-col items-center mx-2">
        <span className="text-xs font-semibold">Angin</span>
        <span className="text-sm font-mono">{weather.current.wind_speed_10m} m/s</span>
      </div>
    </div>
  );
}
