// src/components/WeatherCard.jsx
import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../lib/weatherApi';

export default function WeatherCard({ latitude = 52.52, longitude = 13.41 }) {
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

    if (loading) return <div>Memuat data cuaca...</div>;
    if (error) return <div>Gagal memuat cuaca: {error}</div>;
    if (!weather || !weather.current) return null;

    return (
        <div className="weather-card">
            <h2>Cuaca Saat Ini</h2>
            <ul>
                <li>Waktu: {weather.current.time}</li>
                <li>Suhu: {weather.current.temperature_2m}°C</li>
                <li>Kecepatan Angin: {weather.current.wind_speed_10m} m/s</li>
            </ul>
        </div>
    );
}
