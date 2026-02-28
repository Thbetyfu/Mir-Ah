// src/components/SholatJadwal.jsx
import React, { useEffect, useState } from 'react';
import { fetchSholatJadwal } from '../lib/sholatApi';

export default function SholatJadwal({ cityId = 'eda80a3d5b344bc40f3bc04f65b7a357', date }) {
    const [jadwal, setJadwal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchSholatJadwal(cityId, date).then(data => {
            if (data.error) setError(data.error);
            else setJadwal(data.data);
            setLoading(false);
        });
    }, [cityId, date]);

    if (loading) return <div>Memuat jadwal sholat...</div>;
    if (error) return <div>Gagal memuat jadwal: {error}</div>;
    if (!jadwal) return null;

    return (
        <div className="sholat-jadwal-card">
            <h2>Jadwal Sholat {jadwal.lokasi} ({jadwal.tanggal})</h2>
            <ul>
                <li>Imsak: {jadwal.jadwal.imsak}</li>
                <li>Subuh: {jadwal.jadwal.subuh}</li>
                <li>Dzuhur: {jadwal.jadwal.dzuhur}</li>
                <li>Ashar: {jadwal.jadwal.ashar}</li>
                <li>Maghrib: {jadwal.jadwal.maghrib}</li>
                <li>Isya: {jadwal.jadwal.isya}</li>
            </ul>
        </div>
    );
}
