// src/lib/weatherApi.js
// Library untuk mengambil data cuaca dari open-meteo.com

export async function fetchWeather(latitude = 52.52, longitude = 13.41) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Gagal mengambil data cuaca');
        const data = await res.json();
        return data;
    } catch (err) {
        return { error: err.message };
    }
}
