// src/lib/sholatApi.js
// Library untuk mengambil jadwal sholat dari API myquran.com

export async function fetchSholatJadwal(cityId = 'eda80a3d5b344bc40f3bc04f65b7a357', date = null) {
    // cityId default: Jakarta
    // date format: YYYY-MM-DD
    const today = new Date();
    const d = date || today.toISOString().split('T')[0];
    const url = `https://api.myquran.com/v3/sholat/jadwal/${cityId}/${d}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Gagal mengambil jadwal sholat');
        const data = await res.json();
        return data;
    } catch (err) {
        return { error: err.message };
    }
}
